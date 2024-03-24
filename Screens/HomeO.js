import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, ActivityIndicator, AsyncStorage, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, Portal, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "react-native-axios"

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function HomeO() {

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [Notification, setNotification] = useState('')
    const [loading, setLoading] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const [weelyReport, setWeeklyReport] = useState('');


    const navigation = useNavigation();

    const route = useRoute();
    const { Email } = route.params;

    const GoContactPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Contact", params: { Email: Email } }]
        })
    }

    const GoWeatherData = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "WeatherData", params: { Email: Email } }]
        })
    }

    const GoAboutUs = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "AboutUs", params: { Email: Email } }]
        })
    }

    const GoPastdataPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "PastData", params: { Email: Email } }]
        })
    }

    const GoMainMenu = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Menu" }]
        })
    }

    useEffect(() => {
        GetWeeklyReport();
    }, []);

    const Notify = () => {
        // Check if both email and password are entered
        setLoading(true);

        if (Email) {
            Axios.post('http://192.168.1.104:3000/api/sdgp_database/Notify_transporter', {
                method: 'POST',
                tea_state_id: Email,
                notification: "Successfully notified"
            })
                .then((response) => {
                    if (response.data.message) {
                        setNotification(response.data.message);
                        console.log(response.data.message)
                        alert(response.data.message);

                    } else {
                        // If successful login, navigate to home screen
                        // GoHome();
                        setNotification(response.data.message);
                        console.log(response.data.message);
                        alert(response.data.message);
                        setIsButtonPressed(true);

                    }
                })
                .catch(error => {
                    // Handle error, such as displaying error message
                    console.log('Error occurred during sending notification:', error);
                    alert("Already Notified the Transporter");
                    setIsButtonPressed(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // Handle case where email is not entered
            console.error('Email is required.');
            setLoading(false);
        }
    }


    const GetWeeklyReport = () => {
        // Check if email is entered
        setLoading(true);
        if (Email) {
            Axios.post('http://192.168.1.104:3000/api/sdgp_database/Weekly_Report', {
                Email: Email,
            })
                .then((response) => {
                    // Handle successful response
                    // You can directly use response.data here
                    setWeeklyReport(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle error
                    console.log('Error fetching data', error);
                    alert("Error fetching data");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };


    return (


        <ImageBackground source={require('../Images/backg1.jpg')} resizeMode="cover" style={Styles.image}>

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
                            <Menu.Item onPress={GoPastdataPage} title="Past Tea Data" />
                            <Menu.Item onPress={GoWeatherData} title="Weather Forecast" />
                            <Menu.Item onPress={() => { }} title="Fertilizer Plan" />
                            <Menu.Item onPress={GoContactPage} title="Contact Factory" />
                            <Menu.Item onPress={GoMainMenu} title="Log Out" />
                            <Menu.Item onPress={GoAboutUs} title="About Us" />
                        </Menu>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, marginBottom: 6, color: "black", fontWeight: 'bold' }}>Hello,</Text>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: "black", fontWeight: 'bold' }}>  Tea Estate Owner,</Text>
                    </View>

                    <Card style={{ marginLeft: 45, marginTop: 10, width: 300, height: 150, backgroundColor: 'transparent' }}>
                        <Card.Content>
                            <Text style={{ fontSize: 18, marginLeft: 10, marginTop: 10, textAlign: "center", color: "black" }}>Are You Dispatch TeaWeight TODAY?</Text>

                            {loading && <ActivityIndicator size="large" color="#0000ff" />}

                            <TouchableOpacity onPress={Notify} style={{ alignItems: 'center', justifyContent: "center", marginTop: 12 }}>
                                <Text style={Styles.btn}>{isButtonPressed ? 'Notified' : 'Notify Transporter'}</Text>
                            </TouchableOpacity>

                        </Card.Content>
                    </Card>

                    <Card style={{ marginTop: 30, width: 365, height: 420, backgroundColor: 'rgb(168, 205, 159)', marginLeft: 15, marginRight: 15 }}>
                        <Card.Content>
                            <Text style={{ fontSize: 22, marginLeft: 65, marginTop: 2, color: "black", fontWeight: "bold" }}>Week Analyze Report</Text>
                            {loading && <ActivityIndicator size="large" color="#0000ff" />}

                            {!weelyReport ? (
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Can't Find Any Tea Records!</Text>
                            ) : (
                                <FlatList
                                    data={weelyReport}
                                    renderItem={({ item }) => (
                                        <View style={{ width: 310, height: 340, backgroundColor: "transparent", borderRadius: 10, marginTop: 15 }}>
                                            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold", marginTop: -10, marginLeft: 115 }}>{item.ToDate.split('T')[0]}</Text>
                                            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 40, marginLeft: 15 }}>Dispatch Weight   :-  {item.Dispatch_Weight}.0 Kg</Text>
                                            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Gross Weight         :-  {item.gross_Weight}.0 Kg</Text>
                                            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Deduct Weight       :-  {item.deduct_Weight}.0 Kg</Text>
                                            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Net Weight              :-  {item.net_Weight}.0 Kg</Text>
                                            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold", marginTop: 20, marginLeft: 15 }}>Total Income  :-   LKR: {item.income}.00</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.eatate_ID}
                                />
                            )}
                        </Card.Content>
                    </Card>

                </PaperProvider>
                <View style={{ height: 20 }}></View>

            </View>

        </ImageBackground>

    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        marginTop: 4,
        backgroundColor: 'rgb(168, 205, 159)',
        width: 200,
        height: 30,
        fontSize: 18,
        color: "black",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
        justifyContent: "center"
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