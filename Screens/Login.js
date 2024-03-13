import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react';
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
                console.log('You can use the camera');
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
        Axios.post('http://192.168.1.103:3000/api/sdgp_database/TeaEstateOwner_Validation', {
            method: 'POST',
            Email: Email,
            password: Password,
        })
            .then((response) => {
                if (response.data.message) {
                    setLoginSt(response.data.message);
                } else {
                    { GoHome() }
                }
            })
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


    const validate = () => {
        if (Email.trim() === "") {
            setNameError("Username Required.");
        } else if (Password.trim() === "") {
            setNameError(null);
            setpwError("Password Required.");
        } else {
            setpwError(null);
        }
    }

    const merge = () => {
        validate();
        LoginData();

    };

    const txt = () => {
        if (loginSt.trim() === "Wrong user name or password") {
            Alert.alert('Invalid Credentials', 'Please check your username and password.');
            return <Text style={{ color: "red", fontSize: 18, marginTop: 10, fontWeight: "bold" }}>  {loginSt}</Text>;

        } else {
            return <Text style={{ color: "green" }}>{loginSt}</Text>;
        }
    }

    const [rememberMe, setRememberMe] = useState(false);
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
                        <TextInput mode="outlined" label="Email:" onChangeText={(data) => { setEmail(data) }} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
                        {!!nameError && (<Text style={{ color: "red" }}>   {nameError}</Text>)}

                        <Text style={Styles.txt2}>    Password:</Text>
                        <TextInput mode="outlined" label="Password:" onChangeText={(data) => { setPassword(data) }} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required />

                        <TouchableOpacity onPress={GoForgotPw}>
                            <Text style={{ color: "black", marginLeft: 258, fontSize: 15, marginTop: 11, fontWeight: "bold", textDecorationLine: "underline" }}>forgot password? </Text>
                        </TouchableOpacity>

                        {!!pwError && (<Text style={{ color: "red" }}>   {pwError}</Text>)}


                    </View>

                    <View style={{ flex: 4, }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 16 }} onPress={GoHome}>
                            <Text style={Styles.btn}>Login</Text>
                        </TouchableOpacity>

                        {txt()}

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
        marginTop: 45,
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