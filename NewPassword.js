import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { TextInput, Checkbox, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function NewPassword() {

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('./Images/back.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>

                    <Text style={Styles.header}>Create New Password</Text>

                    <View style={{ marginTop: 10, overflow: 'hidden', backgroundColor: "transparent" }}>
                        <Image source={require("./Images/new.png")} style={{ alignItems: "center", width: 400, height: 320 }} />
                    </View>

                    <View style={{ marginTop: 0 }}>
                        <Text style={Styles.txt}>Your New Pasword Must Be Different </Text>
                        <Text style={Styles.txt}>From Previously Used Password</Text>
                    </View>

                    <View style={{ marginTop: 22 }}>
                        <Text style={Styles.txt2}>    New Password: </Text>
                        <TextInput mode="outlined" label="enter new password" right={<TextInput.Affix text="/15" />} secureTextEntry style={Styles.Inputs} required />

                        <Text style={Styles.txt2}>    Confirm Password: </Text>
                        <TextInput mode="outlined" label="Re enter password" right={<TextInput.Affix text="/15" />} secureTextEntry style={Styles.Inputs} required />
                    </View>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 12 }}>
                        <Text style={Styles.btn}>Save</Text>
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

export default NewPassword;