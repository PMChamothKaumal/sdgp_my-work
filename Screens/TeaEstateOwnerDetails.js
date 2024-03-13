import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function TeaEstateOwnerDeatils() {

    const [selectedId, setSelectedId] = useState();
    const [searchQuery, setSearchQuery] = React.useState('');

    const [data, setData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch] = useState('')


    const Item = ({ item, onPress, backgroundColor, textColor }) => (


        <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>

            <Text style={styles.text}> Tea Estate Id: <Text>{item.TeaEstateId}</Text></Text>
            <Text style={styles.text}>State Owner Name: {item.Username}</Text>


            <MapView
                style={{ width: 342, height: 160, marginTop: 15 }}
                initialRegion={{
                    latitude: parseFloat(item.Latitude),
                    longitude: parseFloat(item.Longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: parseFloat(item.Latitude), longitude: parseFloat(item.Longitude) }}
                    title='Marker'
                />
            </MapView>

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

        fetch('http://192.168.1.103:3000/api/sdgp_database/Get_TeaEstateOwner_Details')
            .then((response) => response.json())
            .then((responseJson) => {
                const sortedData = responseJson;
                setData(sortedData);
                setmasterData(sortedData);
            });

    }


    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.Username ? item.Username.toLowerCase()
                    : ''.toLowerCase();
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setsearch(text)
        } else {
            setData(masterData);
            setsearch(text);
        }
    }



    const renderItem = ({ item }) => {
        const backgroundColor = item.TeaEstateId === selectedId ? 'rgb(65, 109, 25)' : 'rgb(191, 234, 124)';
        const color = item.TeaEstateId === selectedId ? 'white' : 'black';

        return (
            <View >
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.TeaEstateId)}
                    backgroundColor={backgroundColor}
                    textColor={color}
                    height={120}
                />
            </View>
        );
    };

    return (
        <ImageBackground source={require('../Images/backg1.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>


                <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <TouchableOpacity onPress={GoTranporter}>
                        <Ionicons name='arrow-back' color={"black"} size={30} />
                    </TouchableOpacity>

                    <View style={{ marginTop: 10 }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={(text) => searchFilter(text)}
                            value={search}
                        />

                    </View>

                </View>
                <View style={{ marginTop: 20, borderRadius: 20 }}>
                    <FlatList
                        data={data}
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
    },
    drop: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "black",
        alignSelf: 'center',
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    icon: {
        width: 20,
        height: 20
    }
});

export default TeaEstateOwnerDeatils;