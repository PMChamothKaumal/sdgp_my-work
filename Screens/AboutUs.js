import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Avatar, Card, } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AboutUs = () => {

    const navigation = useNavigation();

    const GoHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeO" }]
        })
    }

    return (

        <ImageBackground source={require('../Images/backg3.jpg')} resizeMode="cover" style={Styles.image}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>

                <View style={{ marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={GoHome}>
                        <Ionicons name='arrow-back' color={"black"} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={Styles.view}>
                    <Text style={Styles.ab}>About_Us</Text>
                </View>

                <View style={{ flex: 2 }}>

                    <Card style={Styles.card}>
                        <Card.Content>
                            <Text variant="bodyMedium" style={Styles.cardName}>We, a dedicated team of second-year students at the Informatics Institute of Technology, are thrilled to introduce our project, TesSage, as a part of our software development group endeavor.
                                {'\n\n'}
                                TesSage is an innovative application designed specifically for tea estate owners. With TesSage, owners can conveniently monitor their weekly profits based on tea weight.
                                {'\n\n'}
                                Our team comprises five enthusiastic members committed to delivering excellence in our project. Should you have any questions, or encounter any issues with our application,
                                {'\n\n'}
                                please do not hesitate to reach out to us.</Text>
                        </Card.Content>
                    </Card>

                    <TouchableOpacity>
                        <Card.Title
                            style={Styles.card2}
                            title={<Text style={{ fontWeight: "bold", color: "black" }}>Chamoth Kaumal</Text>}
                            titleStyle={{ marginBottom: 16 }}
                            subtitle={
                                <View>
                                    <Text style={{ fontSize: 16 }}>pmchamoth@gmail.com</Text>
                                    <Text>077-1482649</Text>
                                </View>
                            }
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Card.Title
                            style={Styles.card2}
                            title={<Text style={{ fontWeight: "bold", color: "black" }}>Kavithra Methnula</Text>}
                            titleStyle={{ marginBottom: 16 }}
                            subtitle={
                                <View>
                                    <Text style={{ fontSize: 16 }}>pmchamoth@gmail.com</Text>
                                    <Text>077-1482649</Text>
                                </View>
                            }
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <Card.Title
                            style={Styles.card2}
                            title={<Text style={{ fontWeight: "bold", color: "black" }}>Iduranga Theshan</Text>}
                            titleStyle={{ marginBottom: 16 }}
                            subtitle={
                                <View>
                                    <Text style={{ fontSize: 16 }}>pmchamoth@gmail.com</Text>
                                    <Text>077-1482649</Text>
                                </View>
                            }
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Card.Title
                            style={Styles.card2}
                            title={<Text style={{ fontWeight: "bold", color: "black" }}>Chathnuka Mintharu</Text>}
                            titleStyle={{ marginBottom: 16 }}
                            subtitle={
                                <View>
                                    <Text style={{ fontSize: 16 }}>pmchamoth@gmail.com</Text>
                                    <Text>077-1482649</Text>
                                </View>
                            }
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Card.Title
                            style={Styles.card2}
                            title={<Text style={{ fontWeight: "bold", color: "black" }}>Anupama Wijesingha</Text>}
                            titleStyle={{ marginBottom: 16 }}
                            subtitle={
                                <View>
                                    <Text style={{ fontSize: 16 }}>pmchamoth@gmail.com</Text>
                                    <Text>077-1482649</Text>
                                </View>
                            }
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        />
                    </TouchableOpacity>

                    {/* Additional content to enable scrolling */}
                    <View style={{ height: 20 }}></View>

                </View>

            </KeyboardAwareScrollView>
        </ImageBackground>


    )
}

const Styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10
    },
    ab: {
        fontSize: 32,
        color: "black",
        fontStyle: "italic",
        marginTop: 0,
        fontWeight: "bold"
    },
    view: {
        alignItems: 'center',
        textAlign: 'center'
    },
    view2: {
        fontSize: 16,
        color: "black"
    },
    txtName: {
        fontSize: 20,
        color: "rgb(221, 230, 237)",
        fontWeight: "bold"


    },
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    },
    card: {

        backgroundColor: "rgb(221, 230, 237)",
        margin: 15

    },
    cardName: {
        fontSize: 16,
        color: "rgb(39, 55, 77)",
        textAlign: "center"
    },
    bio: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold"
    },
    card2: {
        backgroundColor: "rgb(221, 230, 237)",
        margin: 8,
        borderRadius: 20,
        color: "black"
    }
})

export default AboutUs