import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { TextInput, Checkbox, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "react-native-axios";
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function NewPassword() {


    const route = useRoute();
    const { email } = route.params;
    const { Sep } = route.params;


    const [newPassword, setnewPassword] = useState('');
    const [conPassword, setconPassword] = useState('');
    const [loginSt, setLoginSt] = useState('')


    const navigation = useNavigation();

    const GoLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }


    const UpdatePassword = () => {
        // Check if email, newPassword, and conPassword are not empty
        if (!email || !newPassword || !conPassword) {
            console.log('newPassword, or conPassword cannot be empty.');
            setLoginSt('newPassword, or conPassword cannot be empty.')
            return;
        }

        // Check if newPassword and conPassword match
        if (newPassword !== conPassword) {
            console.log('New password and confirm password do not match.');
            setLoginSt('New password and confirm password do not match.')
            return;
        }

        Axios.post('http://16.16.216.239:3000/api/sdgp_database/Update_TeaEstateOwner_Passwords', {
            method: 'POST',
            Email: email,
            newPassword: newPassword,
            conPassword: conPassword,
            Validation: Sep,
        })
            .then((response) => {
                if (response.data.message) {
                    setLoginSt(response.data.message);
                    console.log(response.data.message);
                    GoLogin();
                } else {
                    GoLogin();
                }
            })
            .catch((error) => {
                console.error('Error updating password:', error);
            });
    };


    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('../Images/back.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>

                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <TouchableOpacity>
                            <Ionicons name='arrow-back' color={"black"} size={30} />
                        </TouchableOpacity>

                    </View>


                    <Text style={Styles.header}>Create New Password</Text>

                    <View style={{ marginTop: 10, overflow: 'hidden', backgroundColor: "transparent" }}>
                        <Image source={require("../Images/new.png")} style={{ alignItems: "center", width: 400, height: 320 }} />
                    </View>

                    <View style={{ marginTop: -10 }}>
                        <Text style={Styles.txt}>Your New Pasword Must Be Different </Text>
                        <Text style={Styles.txt}>From Previously Used Password</Text>
                    </View>

                    <View style={{ marginTop: 22 }}>
                        <Text style={Styles.txt2}>    New Password: </Text>
                        <TextInput mode="outlined" label="enter new password" onChangeText={(data) => { setnewPassword(data) }} right={<TextInput.Affix text="/15" />} secureTextEntry style={Styles.Inputs} required />

                        <Text style={Styles.txt2}>    Confirm Password: </Text>
                        <TextInput mode="outlined" label="Re enter password" onChangeText={(data) => { setconPassword(data) }} right={<TextInput.Affix text="/15" />} secureTextEntry style={Styles.Inputs} required />
                    </View>

                    <TouchableOpacity onPress={UpdatePassword} style={{ alignItems: 'center', justifyContent: "center", marginTop: 12 }}>
                        <Text style={Styles.btn}>Save</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: "red" }}>{loginSt}</Text>
                    </View>


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