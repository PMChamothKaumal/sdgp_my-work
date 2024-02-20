import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Axios from "react-native-axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Signup = () => {

    const [Username, setUsername] = useState('')
    const [TeaEstateId, setTeaEstateId] = useState('')
    const [ConPassword, setConPassword] = useState('')
    const [Password, setPassword] = useState('')
    const [Register, setRegister] = useState('')
    const [UsError, setUsError] = useState(null)
    const [IdError, setIdError] = useState(null)
    const [PwError, setPwError] = useState(null)
    const [CopError, setCopError] = useState(null)
    const [bool, setbool] = useState(false)

    const SaveData = () => {

        Axios.post('http://192.168.1.104:3000/api/teasage_database/Register_TeaEstateOwners', {
            method: 'POST',
            username: Username,
            TeaEstateId: TeaEstateId,
            password: Password,
            confirm_password: ConPassword
        })
            .then((response) => {
                if (response.data && response.data.message) {
                    setRegister(response.data.message);
                } else {
                    setRegister("Account created successfully");
                    alert("Account created successfully");
                }
            })

            .catch((error) => {
                console.error("Error during API request:", error);
                setRegister("An error occurred while signing up");
                alert("An error occurred while signing up");
            });

    }

    const navigation = useNavigation();
    const GoLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }
    const validate = () => {
        let isValid = true;
        if (Username.trim() === "") {
            setUsError("Username required.");
            isValid = false
        } else {
            setUsError("");
        }
        if (TeaEstateId.trim() === "") {
            setIdError("Tea Estate Id required");
            isValid = false
        } else {
            setIdError("");
        } if (Password.trim() === "") {
            setPwError("Password required");
            isValid = false
        } else {
            setPwError("");
        } if (ConPassword.trim() === "") {
            setCopError("Confirmation password required");
            isValid = false
        } else if (ConPassword !== Password) {
            setCopError("Passwords do not match");
            isValid = false
        } else {
            setCopError("");
        }
        setbool(isValid);
    }
    const merge = () => {
        validate();
        console.log(bool);
        if (bool) {
            SaveData()
        }

    }
    const txt = () => {
        if (Register.trim() === "Enter correct details") {
            return <Text style={{ color: "red", fontSize: 18, marginTop: 10, fontWeight: "bold" }}>  {Register}</Text>;
        } else {
            return <Text style={{ color: "green", fontSize: 18, marginTop: 10, fontWeight: "bold" }}>{Register}</Text>;
        }
    }

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('./Images/5.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={{ flex: 1 }}>

                    <View style={{ flex: 1 }}>
                        <Text style={Styles.txt}>Signup</Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <Text style={Styles.txt2}>    Tea Estate ID:</Text>
                        <TextInput mode="outlined" label="EstateId" onChangeText={(data) => { setTeaEstateId(data) }} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
                        {!!IdError && (<Text style={{ color: "red" }}>   {IdError}</Text>)}

                        <Text style={Styles.txt2}>    Username:</Text>
                        <TextInput mode="outlined" label="Username" onChangeText={(data) => { setUsername(data) }} right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />
                        {!!UsError && (<Text style={{ color: "red" }}>   {UsError}</Text>)}

                        <Text style={Styles.txt2}>    Password:</Text>
                        <TextInput mode="outlined" label="Password" onChangeText={(data) => { setPassword(data) }} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required />
                        {!!PwError && (<Text style={{ color: "red" }}>   {PwError}</Text>)}

                        <Text style={Styles.txt2}>    Confirm Password:</Text>
                        <TextInput mode="outlined" label="Confirm Password" onChangeText={(data) => { setConPassword(data) }} secureTextEntry right={<TextInput.Icon icon="eye" />} style={Styles.Inputs} required />
                        {!!CopError && (<Text style={{ color: "red" }}>   {CopError}</Text>)}

                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center" }} onPress={merge}>
                            <Text style={Styles.btn}>Signup</Text>
                        </TouchableOpacity>
                        {txt()}
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={Styles.foter}>Already Have An Account?<Text style={Styles.sign} onPress={GoLogin}>  Login</Text></Text>
                    </View>

                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}

const Styles = StyleSheet.create({
    txt: {
        fontSize: 50,
        color: 'rgb(221, 230, 237)',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: "center",
        marginTop: 40,
        fontStyle: 'italic',
        fontFamily: "serif"
    },
    txt2: {
        fontSize: 16,
        color: "rgb(221, 230, 237)",
        marginTop: 10
    },
    Inputs: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'rgb(221, 230, 237)',
        color: "white",
        marginTop: -0,
        fontSize: 16,
    },
    btn: {
        marginTop: 85,
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
        fontSize: 20,
        color: 'rgb(97, 103, 122)',
        marginTop: 58,
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
    sign: {
        fontSize: 20,
        color: "rgb(39, 40, 41)"
    }
})

export default Signup