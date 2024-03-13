import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { TextInput, FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, MD3Colors, Portal, Card, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';



const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function HomeT() {


    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [isClicked, setIsClicked] = useState(false);
    const [selectId, setSelectId] = useState('Select ID');
    const [data, setdata] = useState(Dataset);

    const Dataset = [
        { Id: "001" },
        { Id: "002" },
        { Id: "003" },
        { Id: "004" }
    ];

    const location = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    const img = require('../Images/weight.jpeg');
    useEffect(() => {

    }, []);


    const navigation = useNavigation();
    const [image, setImage] = useState(null);

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

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                //setSelectedImage(imageUri);
                console.log("ImageURI:" + imageUri);
            }
        });
    }

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('../Images/backg1.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>



                    <PaperProvider>
                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <TouchableOpacity>
                                <Ionicons name='arrow-back' color={"black"} size={30} />
                            </TouchableOpacity>

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
                                <Menu.Item onPress={() => { }} title="Estate Location" />
                                <Menu.Item onPress={GoMainMenu} title="Log Out" />
                                <Menu.Item onPress={() => { }} title="Item 4" />
                            </Menu>
                        </View>


                        <View style={{ marginTop: 100 }}>
                            <Text style={Styles.txt2}>    Tea Estate ID:</Text>

                            <View>
                                <TouchableOpacity style={Styles.drop} onPress={() => setIsClicked(!isClicked)}>
                                    <Text style={{ fontSize: 17 }}>    {selectId}</Text>
                                    {isClicked ? (
                                        <Image source={require('../Images/up.png')} style={Styles.icon} />
                                    ) : (
                                        <Image source={require('../Images/down.png')} style={Styles.icon} />
                                    )}
                                </TouchableOpacity>

                                {isClicked && (
                                    <View style={Styles.dropdownarea}>
                                        <FlatList
                                            data={Dataset} // Use Dataset as data source
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity style={Styles.items} onPress={() => { setSelectId(item.Id); setIsClicked(false) }}>
                                                        <Text style={{ fontSize: 16 }}>{item.Id}</Text>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            keyExtractor={(item) => item.Id}
                                        />
                                    </View>
                                )}
                            </View>


                            <Text style={Styles.txt2}>    Tea waight:</Text>
                            <TextInput mode="outlined" label="Tea weight" right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} />

                            <TouchableOpacity onPress={handleCameraLaunch} style={{ marginTop: 8 }}>
                                <Text style={Styles.btn1}>Capture Tea weight</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 8 }}>
                                <Text style={Styles.btn}>Send</Text>
                            </TouchableOpacity>

                        </View>
                    </PaperProvider>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>

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
        height: 30,
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
    }
})

export default HomeT;