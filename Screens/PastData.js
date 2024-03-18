import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, Portal, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function PastData() {

    const navigation = useNavigation();

    const GoHomePage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeO" }]
        })
    }

    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('../Images/backg1.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>
                    <PaperProvider>
                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <TouchableOpacity onPress={GoHomePage}>
                                <Ionicons name='arrow-back' color={"black"} size={30} />
                            </TouchableOpacity>

                        </View>

                        <Card style={{ marginTop: 30, width: 390, height: 580, backgroundColor: 'transparent' }}>
                            <Card.Content>
                                <Text style={{ fontSize: 18, marginLeft: 10, marginTop: 10 }}>Week Analyze Report</Text>

                            </Card.Content>
                        </Card>
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
    }
})

export default PastData;