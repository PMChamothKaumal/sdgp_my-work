import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { TextInput, Checkbox, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import Axios from "react-native-axios";

function ForgotPw() {

    const navigation = useNavigation();

    const GoVeryfyMail = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "VerifyPw" }]
        })
    }

    const [Email, setEmail] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const checkEmail = () => {
        Axios.post('http://192.168.1.104:3000/api/sdgp_database/Check_email_validations', {
            method: 'POST',
            Email: Email,
        })
            .then((response) => {
                if (response.data.length > 0) {
                    setLoginStatus('Success: Email exists in the database.');
                    GoVeryfyMail();
                } else {
                    setLoginStatus('Error: Email does not exist in the database.');
                }
            })
            .catch((error) => {

                setLoginStatus('Error: Email does not exist in the database.');

            });
    };


    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('./Images/back.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>

                    <Text style={Styles.header}>Forgot Password</Text>

                    <View style={{ marginTop: 10, overflow: 'hidden', backgroundColor: "transparent" }}>
                        <Image source={require("./Images/forgot.png")} style={{ alignItems: "center", width: 400, height: 320 }} />
                    </View>

                    <View style={{ marginTop: 6 }}>
                        <Text style={Styles.txt}>Please Enter Your TeaEstate Id To </Text>
                        <Text style={Styles.txt}>Recive a Verification Code. </Text>
                    </View>

                    <View style={{ marginTop: 22 }}>
                        <Text style={Styles.txt2}>    Tea Estate ID:</Text>
                        <TextInput mode="outlined" label="enter your Id here" onChangeText={(data) => { setEmail(data) }} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
                    </View>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 12 }} onPress={checkEmail}>
                        <Text style={Styles.btn}>Send</Text>
                    </TouchableOpacity>
                    <Text>{loginStatus}</Text>


                </View>
            </ImageBackground>
        </KeyboardAwareScrollView >

    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    },
    txt: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: "center",
        marginTop: 8,
        fontStyle: 'italic',
        fontFamily: "serif"
    },
    Inputs: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'white',
        color: "white",
        marginTop: -0,
        fontSize: 18,
        width: 320,
        marginLeft: 48,
        marginTop: 6
    },
    txt2: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    btn: {
        marginTop: 12,
        backgroundColor: 'rgb(232, 200, 114)',
        width: 200,
        height: 40,
        fontSize: 26,
        color: "rgb(39, 55, 77)",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: "center",
        marginTop: 18,
        fontStyle: 'italic',
        fontFamily: "serif"
    }
})

export default ForgotPw;