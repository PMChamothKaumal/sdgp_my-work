import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, PermissionsAndroid } from 'react-native'
import React, { useState, useRef } from 'react';
import { TextInput, Checkbox } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import Axios from "react-native-axios"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function Login() {

    const navigation = useNavigation();

    const GoForgotPw = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "ForgotPw", params: { Subject: "TeaEstateOwner" } }]
        })
    }

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [loginSt, setLoginSt] = useState('')
    const [nameError, setNameError] = useState(null);
    const [pwError, setpwError] = useState(null);

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const Permission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: ' Location Permission',
                    message:
                        ' needs access to your camera ',

                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const [currentLocation, setCurrentLocation] = useState(null);

    const getCurrentLocation = () => {

        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude })
                console.log(latitude, longitude)
            },
            error => alert('Error', error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }


    const LoginData = () => {
        // Check if both email and password are entered
        if (Email && Password) {
            Axios.post('http://16.16.216.239:3000/api/sdgp_database/TeaEstateOwner_Validation', {
                method: 'POST',
                Email: Email,
                password: Password,
            })
                .then((response) => {
                    if (response.data.message) {
                        setLoginSt(response.data.message);
                        emailInputRef.current.clear();
                        passwordInputRef.current.clear();
                    } else {
                        // If successful login, navigate to home screen
                        GoHome();
                    }
                })
                .catch(error => {
                    // Handle error, such as displaying error message
                    console.error('Error occurred during login:', error);
                });
        } else {
            // If email or password is not entered, display appropriate error messages
            if (!Email) {
                setNameError("Email is required.");
            }
            if (!Password) {
                setpwError("Password is required.");
            }
        }
    }

    const GoHome = () => {
        Permission();

        navigation.reset({
            index: 0,
            routes: [{ name: "HomeO" }]
        })
    }

    const GoMenu = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Menu" }]
        })
    }

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('../Images/backg4.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>

                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={GoMenu}>
                            <Ionicons name='arrow-back' color={"black"} size={30} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 3 }}>
                        <View style={{ alignItems: "center", textAlign: "center" }}>
                            <Text style={Styles.txt3}>Tea Estate Owner's</Text>
                        </View>
                        <Text style={Styles.txt}>Login</Text>
                    </View>

                    <View style={{ flex: 3, marginTop: 40 }}>

                        <Text style={Styles.txt2}>    Email:</Text>
                        <TextInput mode="outlined" label="Email:" onChangeText={(data) => { setEmail(data) }} ref={emailInputRef} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
                        {!!nameError && (<Text style={{ color: "red" }}>   {nameError}</Text>)}

                        <Text style={Styles.txt2}>    Password:</Text>
                        <TextInput mode="outlined" label="Password:" onChangeText={(data) => { setPassword(data) }} ref={passwordInputRef} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required />
                        {!!pwError && (<Text style={{ color: "red" }}>   {pwError}</Text>)}

                        <TouchableOpacity onPress={GoForgotPw}>
                            <Text style={{ color: "black", marginLeft: 258, fontSize: 15, marginTop: 4, fontWeight: "bold", textDecorationLine: "underline" }}>forgot password? </Text>
                        </TouchableOpacity>


                    </View>

                    <View style={{ flex: 3, }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 12 }} onPress={LoginData}>
                            <Text style={Styles.btn}>Login</Text>
                        </TouchableOpacity>

                        <Text style={{ color: "red", fontSize: 18, marginTop: 10, fontWeight: "bold" }}>{loginSt}</Text>

                    </View>

                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>

    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txt: {
        fontSize: 70,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: "center",
        marginTop: 12,
        fontStyle: 'italic',
        fontFamily: "serif"
    },
    txt3: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: "center",
        marginTop: 40,
        fontStyle: 'italic',
        fontFamily: "serif"
    },

    Inputs: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'rgb(221, 230, 237)',
        color: "black",
        marginTop: -0,
        fontSize: 18,
    },
    btn: {
        marginTop: 65,
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
    foter: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'rgb(97, 103, 122)',
        backgroundColor: "rgb(221, 230, 237)",
        height: 32,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    },
    txt2: {
        fontSize: 16,
        color: "black",
        marginTop: 10,
        fontWeight: "bold"
    },
    sign: {
        fontSize: 20,
        color: "rgb(39, 40, 41)"
    }
})

export default Login;