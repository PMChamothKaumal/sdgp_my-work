import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, Portal, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function HomeO() {

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    const navigation = useNavigation();

    const GoContactPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Contact" }]
        })
    }


    async function fetchWeatherData() {
        setLoaded(false);
        const API = 'https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=37f1b19aefb8e746792424bb7eb037c3'
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
                console.log(weatherData);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData();
        //console.log(weatherData);
    }, [])

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
                                paddingTop: 15,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingLeft: 280,
                                position: "absolute"
                            }}>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={<Button style={{ marginLeft: 50, marginTop: 0 }} onPress={openMenu}><Entypo name='dots-three-vertical' color={"black"} size={30} /></Button>}>
                                <Menu.Item onPress={() => { }} title="Past Tea Data" />
                                <Menu.Item onPress={() => { }} title="Weather Forecast" />
                                <Menu.Item onPress={() => { }} title="Fertilizer Plan" />
                                <Menu.Item onPress={GoContactPage} title="Contact Factory" />
                            </Menu>
                        </View>

                        <View style={{ marginTop: 20, marginLeft: 15 }}>
                            <Text style={{ fontSize: 20, marginBottom: 6, color: "black", fontWeight: 'bold' }}>Hello,</Text>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: "black", fontWeight: 'bold' }}>  Minchu Paca</Text>
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

export default HomeO;