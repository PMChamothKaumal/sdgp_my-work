import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, ImageBackground, Dimensions, Alert, Image, Linking } from 'react-native'
import Geolocation from '@react-native-community/geolocation';


function LocationDeatils() {

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

    const openMaps = () => {
        const { latitude, longitude } = currentLocation
        if (latitude, longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            Linking.openURL(url)
        }
        else {
            alert("location not available")
        }
    }




    return (
        <View>
            <Text>Get Coord</Text>
            <View style={{
                backgroundColor: "white",
                padding: 10,
                margin: 10,
                alignItems: 'center'
            }}>
                <Text> Latitude: {currentLocation ? currentLocation.latitude : 'Loading...'}</Text>
                <Text> Latitude: {currentLocation ? currentLocation.longitude : 'Loading...'}</Text>
            </View>

            {currentLocation ? (
                <>
                    <TouchableOpacity onPress={openMaps}>
                        <View style={{
                            backgroundColor: "red",
                            padding: 10,
                            alignItems: 'center',
                            margin: 10
                        }}>
                            <Text>Open Maps</Text>
                        </View>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={Permission}>
                        <View style={{
                            backgroundColor: "green",
                            padding: 10,
                            alignItems: 'center',
                            margin: 10
                        }}>
                            <Text>Get Location</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )
            }
        </View>
    );
}

export default LocationDeatils;