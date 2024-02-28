import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, Portal, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function HomeO() {

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


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
                                anchor={<Button onPress={openMenu}>Show menu</Button>}>
                                <Menu.Item onPress={() => { }} title="Past Tea Data" />
                                <Menu.Item onPress={() => { }} title="Weather Forecast" />
                                <Menu.Item onPress={() => { }} title="Fertilizer Plan" />
                                <Menu.Item onPress={() => { }} title="Contact Factory" />
                            </Menu>
                        </View>

                        <Card style={{ marginTop: 30, width: 390, height: 150 }}>
                            <Card.Content>
                                <Text variant="titleLarge">Card title</Text>
                                <Text variant="bodyMedium">Card content</Text>
                            </Card.Content>
                        </Card>

                        <Card style={{ marginTop: 30, width: 390, height: 400 }}>
                            <Card.Content>
                                <Text variant="titleLarge">Week Analyze</Text>
                                <Text variant="bodyMedium">Card content</Text>
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