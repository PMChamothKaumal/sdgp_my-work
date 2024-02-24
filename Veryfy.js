import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { TextInput, Checkbox, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function VerifyPw() {

    const navigation = useNavigation();

    const GoNewPw = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "newPassword" }]
        })
    }


    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('./Images/back.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>

                    <Text style={Styles.header}>Verify Your Email</Text>

                    <View style={{ marginTop: 10, overflow: 'hidden', backgroundColor: "transparent" }}>
                        <Image source={require("./Images/verify.png")} style={{ width: 420, height: 340 }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={Styles.txt}>Please Enter The 4 Digit Code Sent To  </Text>
                        <Text style={Styles.txt}>pmchamoth@gmail.com</Text>
                    </View>

                    <View style={{ marginTop: 22 }}>
                        <TextInput mode="outlined" label="enter 4 Digit Code" right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
                    </View>

                    <TouchableOpacity>
                        <Text style={{ color: "black", textAlign: "center", fontSize: 15, marginTop: 16, fontWeight: "bold", textDecorationLine: "underline" }}>Resend Code </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 12 }} onPress={GoNewPw}>
                        <Text style={Styles.btn}>Verify</Text>
                    </TouchableOpacity>


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
        width: 260,
        marginLeft: 70,
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

export default VerifyPw;