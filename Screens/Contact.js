import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Card, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function Contact() {

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const navigation = useNavigation();

    const route = useRoute();
    const { Email } = route.params;

    const GoHomePage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeO", params: { Email: Email } }]
        })
    }

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('../Images/backg4.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>
                    <PaperProvider>
                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <TouchableOpacity onPress={GoHomePage}>
                                <Ionicons name='arrow-back' color={"black"} size={30} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ marginTop: 6, marginLeft: 15, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 32, marginBottom: 6, color: "black", fontWeight: 'bold' }}>Get In Touch</Text>

                        </View>
                        <View>
                            <Card style={{ marginTop: 30, width: 390, height: 580, backgroundColor: 'transparent' }}>
                                <Card.Content>
                                    <View>
                                        <Text style={Styles.txt2}>    Username:</Text>
                                        <TextInput mode="outlined" label="Username:" right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />

                                        <Text style={Styles.txt2}>    Email:</Text>
                                        <TextInput mode="outlined" label="Email:" right={<TextInput.Affix text="/15" />} style={Styles.Inputs} required />

                                        <Text style={Styles.txt2}>    Message:</Text>
                                        <TextInput mode="outlined" right={<TextInput.Affix text="/85" />} multiline={true} style={Styles.InputArea} required />
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                        <View>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center", marginTop: 5 }}>
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

    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
    },
    txt2: {
        fontSize: 16,
        color: "black",
        marginTop: 10,
        fontWeight: "bold"
    },
    Inputs: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'rgb(221, 230, 237)',
        color: "white",
        marginTop: -0,
        fontSize: 18,
    },
    InputArea: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'rgb(221, 230, 237)',
        color: "white",
        marginTop: 6,
        fontSize: 18,
        height: 280
    },
    btn: {
        marginTop: -20,
        backgroundColor: 'rgb(221, 230, 237)',
        width: 280,
        height: 40,
        fontSize: 26,
        color: "rgb(39, 55, 77)",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
    }
})

export default Contact;