import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FAB, Button, Menu, Divider, PaperProvider, Appbar, Modal, Portal, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "react-native-axios"

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function PastData() {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const route = useRoute();
    const { Email } = route.params;
    const [PastData, setPastData] = useState('');

    const GoHomePage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeO", params: { Email: Email } }]
        })
    }

    useEffect(() => {
        GetPastData();
    }, []);

    const [toDateArray, setToDateArray] = useState([]);
    const [incomeArray, setIncomeArray] = useState([]);
    const [deductWeight, setDeductWeight] = useState([]);
    const [dispatchWeight, setDispatchWeight] = useState([]);

    const GetPastData = () => {
        // Check if email is entered
        setLoading(true);
        if (Email) {
            Axios.post('http://192.168.1.104:3000/api/sdgp_database/Get_Past_Data', {
                Email: Email,
            })
                .then((response) => {
                    // Handle successful response
                    // You can directly use response.data here
                    setPastData(response.data);
                    const toDates = response.data.map(item => item.ToDate.split('T')[0]);
                    const incomes = response.data.map(item => parseInt(item.income));
                    const deduct = response.data.map(item => parseInt(item.deduct_Weight));
                    const dispatch = response.data.map(item => parseInt(item.Dispatch_Weight));

                    setToDateArray(toDates);
                    setIncomeArray(incomes);
                    setDeductWeight(deduct);
                    setDispatchWeight(dispatch)
                    //console.log(incomes);
                    console.log(dispatch);

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
            <ScrollView>
                <ScrollView horizontal={true} >
                    <View style={Styles.container}>
                        <PaperProvider>
                            <View style={{ marginLeft: 10, marginTop: 10 }}>
                                <TouchableOpacity onPress={GoHomePage}>
                                    <Ionicons name='arrow-back' color={"black"} size={30} />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 20, marginLeft: 120, marginTop: 12, color: "black", fontWeight: "bold", marginBottom: 20 }}>Past Tea Records</Text>
                                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Income</Text>

                                {incomeArray.length > 0 ? (
                                    <LineChart
                                        data={{
                                            labels: toDateArray,
                                            datasets: [
                                                {
                                                    data: incomeArray
                                                }
                                            ]
                                        }}
                                        width={1200}
                                        height={360}
                                        yAxisLabel=" LKR. "
                                        yAxisSuffix=""
                                        yAxisInterval={1}
                                        chartConfig={{
                                            backgroundColor: "rgb(168, 205, 159)",
                                            backgroundGradientFrom: "rgb(153, 188, 133)",
                                            backgroundGradientTo: "rgb(168, 205, 159)",
                                            decimalPlaces: 2,
                                            color: (opacity = 1) => `rgb(226, 244, 197), ${opacity})`,
                                            labelColor: (opacity = 1) => `rgb(0, 0, 0), ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                ) : (
                                    <Text style={{ color: "black", fontSize: 16, marginTop: 20 }}>No income data available</Text>
                                )}
                            </View>


                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 15 }}>   Dispatch Weights</Text>
                                {dispatchWeight.length > 0 ? (
                                    <LineChart
                                        data={{
                                            labels: toDateArray,
                                            datasets: [
                                                {
                                                    data: dispatchWeight
                                                }
                                            ]
                                        }}
                                        width={1200} // from react-native
                                        height={360}
                                        yAxisLabel=""
                                        yAxisSuffix=" Kg"
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            backgroundColor: "rgb(168, 205, 159)",
                                            backgroundGradientFrom: "rgb(153, 188, 133)",
                                            backgroundGradientTo: "rgb(168, 205, 159)",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgb(226, 244, 197), ${opacity})`,
                                            labelColor: (opacity = 1) => `rgb(0, 0, 0), ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                ) : (
                                    <Text style={{ color: "black", fontSize: 16, marginTop: 20 }}>No Dispatch data available</Text>
                                )}
                            </View>



                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", marginTop: 15 }}>   Deduct Weights</Text>
                                {deductWeight.length > 0 ? (
                                    <LineChart
                                        data={{
                                            labels: toDateArray,
                                            datasets: [
                                                {
                                                    data: deductWeight
                                                }
                                            ]
                                        }}
                                        width={1200} // from react-native
                                        height={360}
                                        yAxisLabel=""
                                        yAxisSuffix=" Kg"
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            backgroundColor: "rgb(168, 205, 159)",
                                            backgroundGradientFrom: "rgb(153, 188, 133)",
                                            backgroundGradientTo: "rgb(168, 205, 159)",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgb(226, 244, 197), ${opacity})`,
                                            labelColor: (opacity = 1) => `rgb(0, 0, 0), ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                ) : (
                                    <Text style={{ color: "black", fontSize: 16, marginTop: 20 }}>No Deduct data available</Text>
                                )}
                            </View>

                        </PaperProvider>
                        <View style={{ height: 20 }}></View>

                    </View>
                </ScrollView>
            </ScrollView>
        </ImageBackground>

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