import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function TeaEstateOwnerDeatils() {

    const [selectedId, setSelectedId] = useState();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [DATA, setDATA] = useState([]);

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>

            <Text style={styles.text}> Tea Estate Id: <Text>{item.TeaEstateId}</Text></Text>
            <Text style={styles.text}>State Owner Name: {item.username}</Text>
            <Text style={styles.text}>State Address: </Text>

        </TouchableOpacity>
    );


    const navigation = useNavigation();

    const GoTranporter = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeT" }]
        })
    }




    useEffect(() => {
        GetDetails();
    }, []);

    const GetDetails = () => {

        fetch('http://192.168.1.100:3000/api/sdgp_database/Get_TeaEstateOwner_Details')
            .then((response) => response.json())
            .then((json) => setDATA(json))

    }


    const renderItem = ({ item }) => {
        const backgroundColor = item.TeaEstateId === selectedId ? 'rgb(65, 109, 25)' : 'rgb(191, 234, 124)';
        const color = item.TeaEstateId === selectedId ? 'white' : 'black';

        return (

            <Item
                item={item}
                onPress={() => setSelectedId(item.TeaEstateId)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <ImageBackground source={require('./Images/backg1.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>


                <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <TouchableOpacity onPress={GoTranporter}>
                        <Ionicons name='arrow-back' color={"black"} size={30} />
                    </TouchableOpacity>

                    <View style={{ marginTop: 10 }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />

                    </View>
                </View>
                <View style={{ marginTop: 20, borderRadius: 20 }}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.TeaEstateId}
                        extraData={selectedId}
                    />
                </View>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height: screenHeight,
        width: screenWidth,
    },

    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 6,
        borderRadius: 20
    },
    title: {
        fontSize: 32,
    },
    text: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "bold",
        color: "black"

    }
});

export default TeaEstateOwnerDeatils;