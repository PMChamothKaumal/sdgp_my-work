import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, MD3Colors, Portal, Card, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Axios from "react-native-axios"
import TextRecognition from '@react-native-ml-kit/text-recognition';



const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function HomeT() {


    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [isClicked, setIsClicked] = useState(false);
    const [selectId, setSelectId] = useState('Select ID');
    const [data, setdata] = useState('');
    const [weight, setWeight] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [Notification, setNotification] = useState('');

    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const weightInputRef = useRef(null);

    const [visibleM, setVisibleM] = React.useState(false);

    const showModal = () => setVisibleM(true);
    const hideModal = () => setVisibleM(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, height: 580, margin: 20 };


    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: "photo" });
            if (!result.didCancel) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to pick image. Please try again.");
        }
    };


    const openCamera = async () => {
        try {
            const result = await launchCamera({ mediaType: "photo" });
            if (!result.didCancel) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error opening camera:", error);
            Alert.alert("Error", "Failed to open camera. Please try again.");
        }
    };

    const recognizeText = async () => {
        if (image) {
            setLoading(true);
            try {
                const result = await TextRecognition.recognize(image);
                if (result && result.text) {
                    setText(result.text);
                    console.log(result.text)
                } else {
                    setText('');
                    Alert.alert("Error", "No text found in the image.");
                }
            } catch (error) {
                //console.error("Error recognizing text:", error);
                Alert.alert("Error", "Failed to recognize text. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            setText('');
            console.log("first")
        }
    };

    const GetNotifications = () => {
        fetch('http://192.168.1.104:3000/api/sdgp_database/Get_Notifications')
            .then((response) => response.json())
            .then((responseJson) => {
                // Sort the data by date
                const sortedData = responseJson.sort((a, b) => {
                    // Convert date strings to Date objects for comparison
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    // Compare the dates
                    return dateA - dateB;
                });
                // Update the state with the sorted data
                setNotification(sortedData);
                console.log(sortedData);
            })
            .catch((error) => {
                console.error('Error fetching notifications:', error);
            });
    };


    const GetEstateId = () => {

        fetch('https://ts.teasage.social/api/sdgp_database/Get_TeaEstateOwner_Details')
            .then((response) => response.json())
            .then((responseJson) => {
                const sortedData = responseJson;
                setdata(sortedData);
            });
    }

    const Dispatch_Weight = async () => {
        try {
            if (!selectId || !weight) {
                alert('Please fill records');
                return;
            }

            const response = await Axios.post('http://192.168.1.104:3000/api/sdgp_database/Dispatch_TeaWeights', {
                estate_ID: selectId,
                Dispatch_Weight: weight,
            });

            if (response.status === 200) {
                // Data insertion successful
                alert(response.data.message);
                setSelectId(null);
                weightInputRef.current.clear();
            } else if (response.status === 400) {
                // Data already exists for the provided Tea Estate ID on the current date
                alert(response.data.message);
                setSelectId(null);
                weightInputRef.current.clear();
            } else {
                // Other errors
                alert('An error occurred while processing your request.');
                setSelectId(null);
                weightInputRef.current.clear();
            }
        } catch (error) {
            console.log('Error occurred during data dispatch:', error);
            alert('Data already stored for the provided Tea Estate ID on the current date.');
            setSelectId(null);
            weightInputRef.current.clear();
            // Display error message to user or set a state to display this message in your UI
        }
    };




    useEffect(() => {
        recognizeText();
    }, [image]);

    useEffect(() => {
        GetEstateId();
    }, []);

    useEffect(() => {
        GetNotifications();
    }, []);



    const navigation = useNavigation();
    //const [image, setImage] = useState(null);

    const GoTeaEstateOwnerDetails = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "TeaStateOwnerDetails" }]
        })
    }

    const GoMainMenu = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Menu" }]
        })
    }


    return (


        <ImageBackground source={require('../Images/backg1.jpg')} resizeMode="cover" style={Styles.image}>
            <View style={Styles.container}>

                <PaperProvider>
                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <TouchableOpacity>
                            <Ionicons name='arrow-back' color={"black"} size={30} />
                        </TouchableOpacity>

                        <Portal>
                            <Modal visible={visibleM} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <Text style={{ fontWeight: "bold", color: "black", fontSize: 16, textAlign: "center", marginBottom: "20" }}>Notification Panel</Text>
                                <FlatList
                                    data={Notification} // Use Dataset as data source
                                    renderItem={({ item }) => (
                                        <View style={{ width: 310, height: 100, backgroundColor: "rgb(168, 205, 159)", borderRadius: 10, marginTop: 15 }}>
                                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>{item.tea_state_id}</Text>
                                            <Text style={{ fontSize: 14, color: "black", marginTop: 4, marginLeft: 15 }}>Tea weight dispatched Today; kindly arrange transportation accordingly.</Text>
                                            <Text style={{ fontSize: 14, color: "black", marginTop: 4, marginLeft: 15 }}>                                                         {item.Date_Column.split('T')[0]}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.tea_state_id}
                                />
                            </Modal>
                        </Portal>
                        <Button style={{ marginTop: 10 }} onPress={showModal}>
                            <Text style={{ fontSize: 16 }}>Show Notification Panel</Text>
                        </Button>


                        <Text style={{ marginTop: 30, fontSize: 20, color: "black", fontWeight: "bold" }}>Hello,</Text>
                        <Text style={{ marginTop: 2, fontSize: 24, color: "black", fontWeight: "bold" }}>Tea Transporter</Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingLeft: 280,
                            position: "absolute"
                        }}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button style={{ marginLeft: 50, marginTop: 0 }} onPress={openMenu}><Entypo name='dots-three-vertical' color={"black"} size={30} /></Button>}>
                            <Menu.Item onPress={GoTeaEstateOwnerDetails} title="Tea Estate Owner Details" />
                            <Menu.Item onPress={GoMainMenu} title="Log Out" />

                        </Menu>
                    </View>


                    <View style={{ marginTop: 50 }}>
                        <Text style={Styles.txt2}>    Tea Estate ID:</Text>

                        <View>
                            <TouchableOpacity style={Styles.drop} onPress={() => setIsClicked(!isClicked)}>
                                <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>    {selectId}</Text>
                                {isClicked ? (
                                    <Image source={require('../Images/up.png')} style={Styles.icon} />
                                ) : (
                                    <Image source={require('../Images/down.png')} style={Styles.icon} />
                                )}
                            </TouchableOpacity>

                            {isClicked && (
                                <View style={Styles.dropdownarea}>
                                    <FlatList
                                        data={data} // Use Dataset as data source
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity style={Styles.items} onPress={() => { setSelectId(item.TeaEstateId); setIsClicked(false) }}>
                                                    <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>{item.TeaEstateId} - {item.FirstName}</Text>
                                                </TouchableOpacity>
                                            );
                                        }}
                                        keyExtractor={(item) => item.TeaEstateId}
                                    />
                                </View>
                            )}
                        </View>


                        <Text style={Styles.txt2}>    Tea waight:</Text>
                        <TextInput mode="outlined" value={text} label="Tea weight" ref={weightInputRef} onChangeText={(data) => { setWeight(data) }} right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} />

                        <TouchableOpacity onPress={openCamera} style={{ marginTop: 8 }}>
                            <Text style={Styles.btn1}>Capture Tea weight</Text>
                            <Image source={require('../Images/camera.png')} style={Styles.iconCamera} />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={Dispatch_Weight} style={{ alignItems: 'center', justifyContent: "center", marginTop: 8 }}>
                            <Text style={Styles.btn}>Send</Text>
                        </TouchableOpacity>

                    </View>
                </PaperProvider>
            </View>
        </ImageBackground>

    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Inputs: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'rgb(221, 230, 237)',
        color: "black",
        marginTop: -0,
        fontSize: 18,
    },
    txt2: {
        fontSize: 16,
        color: "black",
        marginTop: 16,
        fontWeight: "bold"
    },
    btn: {
        marginTop: 35,
        backgroundColor: 'rgb(221, 230, 237)',
        width: 280,
        height: 40,
        fontSize: 26,
        color: "rgb(39, 55, 77)",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    },
    btn1: {
        marginLeft: 16,
        marginTop: 11,
        backgroundColor: 'rgb(221, 230, 237)',
        width: 220,
        height: 80,
        fontSize: 20,
        color: "rgb(39, 55, 77)",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
    },
    drop: {
        width: 370,
        height: 48,
        borderWidth: 0.5,
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 8,
        borderRadius: 3,
        backgroundColor: 'rgb(221, 230, 237)',
        color: "black",
        fontSize: 18,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 16
    },
    dropdownarea: {
        width: '80%',
        height: 200,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: 'rgb(221, 230, 237)',
        elevation: 5,
        alignSelf: "center",

    },
    items: {
        width: '85%',
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: '#8e8e8e',
        alignSelf: "center",
        justifyContent: "center"
    },
    iconCamera: {
        width: 38,
        height: 38,
        marginTop: 45,
        marginLeft: 105,
        position: 'absolute'
    },
})

export default HomeT;