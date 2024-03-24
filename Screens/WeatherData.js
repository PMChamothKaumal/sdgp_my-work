import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Card, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTime from '../Components/DateTime';
import WeatherScroll from '../Components/WeatherScroll';
import Geolocation from '@react-native-community/geolocation';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const API_KEY = '37f1b19aefb8e746792424bb7eb037c3';

function WeatherData() {

    const route = useRoute();
    const { Email } = route.params;

    const navigation = useNavigation();
    const GoHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeO", params: { Email: Email } }]
        })
    }



    const [data, setData] = useState({});

    const [currentLocation, setCurrentLocation] = useState(null);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                console.log(latitude, longitude);
            },
            error => alert('Error', error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (currentLocation) {
            const { latitude, longitude } = currentLocation;
            fetchDataFromApi(latitude, longitude);
        } else {
            // Set default values for latitude and longitude
            const defaultLatitude = 6.032161703967615;
            const defaultLongitude = 80.21851893105946;
            fetchDataFromApi(defaultLatitude, defaultLongitude);
        }
    }, [currentLocation]);

    const fetchDataFromApi = (latitude, longitude) => {
        if (latitude && longitude) {
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

                setData(data)
            })
        }

    }


    return (

        <KeyboardAwareScrollView>
            <ImageBackground source={require('../Images/cloud1.jpg')} resizeMode="cover" style={Styles.image}>
                <View style={Styles.container}>
                    <View style={{ marginLeft: 10, marginTop: 10 }}>

                        <TouchableOpacity onPress={GoHome}>
                            <Ionicons name='arrow-back' color={"black"} size={30} />
                        </TouchableOpacity>
                    </View>

                    <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} />
                    <WeatherScroll weatherData={data.daily} />


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

export default WeatherData;