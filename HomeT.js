import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
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

    useEffect(() => {
        location();
    }, []);


    const navigation = useNavigation();

    const GoTeaEstateOwnerDetails = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "TeaStateOwnerDetails" }]
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
                console.log(imageUri);
            }
        });
    }

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('./Images/backg1.jpg')} resizeMode="cover" style={Styles.image}>
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
                                <Menu.Item onPress={() => { }} title="Item 3" />
                                <Menu.Item onPress={() => { }} title="Item 4" />
                            </Menu>
                        </View>


                        <View style={{ marginTop: 100 }}>
                            <Text style={Styles.txt2}>    Tea Estate ID:</Text>
                            <TextInput mode="outlined" label="ID:" onChangeText={(data) => { setUsername(data) }} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />


                            <Text style={Styles.txt2}>    Tea waight:</Text>
                            <TextInput mode="outlined" label="Tea weight" onChangeText={(data) => { setPassword(data) }} right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} />

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
        marginTop: 10,
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
    }
})

export default HomeT;