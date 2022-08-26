import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { authentication } from '../../../firebase/firebase-config';
// import { useEffect } from 'react';

let locationParams = [];
let isCreateHtml = false;
let isOpenBrowse = false;
let isGetUrl = false;


const Logs = ({ modalVisible, setModalVisible, messages, currentLocation }) => {

    let messageList = [];
    for (let i=0;i<messages.length;i++) {
        messageList = messageList + "\n" + "Email ID: " + messages[i].email + "\n" + "Latitude: " +messages[i].latitude+ "\n" + "Longitude: " +messages[i].longitude+ "\n"  + "UserName: " +messages[i].name + "\n" + "Message: " +messages[i].message + "TimeStamp: " +messages[i].timeStamp + "\n\n";
    }
    console.log(messageList)
    const html = `
        <html>
            <body>
                <h1>Hello, ${authentication.currentUser.displayName} </h1>
                <h2>Your log is ready!</h2>
                <h2>Total Messages sent in the session: ${messages.length}</h2>
                <h3>${messageList}</h3>
            </body>
        </html>
    `;

    const generateToPdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false,
        });

        await shareAsync(file.uri);
    }

    const geomap = () => {
        locationParams = [messages["latitude"], messages["longitude"]];
        const cars = {
            "createHtml": [true, locationParams],
            "openBrowse": [true],
            "grtUrl"    : [true], 

        };
        fetch("http://192.168.137.47:5001/recei", 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(cars)}).then(res=>{
                    if(res.ok) {
                        return res.json()
                    } else{
                        alert("something is wrong at app.py or in this function")
                    }
                }
            ).catch((err) => console.error(err)
        )};

  return (
    <View style = {styles.container}>
        <TouchableOpacity 
            style = {styles.headerBack} 
            onPress = {() => setModalVisible(!modalVisible)}
        >
            <MaterialIcons 
                name = "arrow-back-ios" 
                size = {30} 
                color = "#fff" 
            />
            <Text style = {styles.headerText}>Back</Text> 
        </TouchableOpacity>
        <ScrollView>
            {/* <View>
                <LottieView 
                    style = {{ alignSelf: "center", height: 200 }}
                    source = {require("../../../assets/json/logs.json")}
                    autoPlay
                    loop
                />
            </View> */}
            <View>
                <TouchableOpacity
                    onPress = {() => generateToPdf()}
                >
                    <Text style = {styles.export}>Export Log</Text>
                </TouchableOpacity>
            </View>
            {messages.map((item, index) => 
                <LinearGradient  key = {index} colors={['rgb(0, 89, 178)', '#3b5998', 'rgb(80, 30, 180)']} style={styles.box}>
                        <TouchableOpacity style = {styles.mailID}>
                            <MaterialIcons name = "contact-mail" size = {25} />
                            <Text style = {styles.email}>{item.email}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {styles.locationID}
                            onPress = {() => 
                                Linking.openURL(`https://google.com/maps/place/${item.currentLocation.slice(110,120)}N+${item.currentLocation.slice(143,153)}E`)
                            }
                        >
                            <MaterialIcons name = "location-on" size = {30} />
                            <View>
                                <Text style = {styles.location}>
                                    • Latitude: {JSON.stringify(item.latitude)}
                                </Text>
                                <Text style = {styles.location}>
                                    • Longitude: {JSON.stringify(item.longitude)}
                                </Text>
                                <Text style = {styles.location}>
                                    • At Time: {JSON.stringify(item.timeStamp)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.nameID}>
                            <MaterialIcons name = "home" size = {30} />
                            <Text style = {styles.name}>{item.ipAddress}</Text>
                        </View>
                        <View style = {styles.nameID}>
                            <MaterialIcons name = "person" size = {30} />
                            <Text style = {styles.name}>{item.name}</Text>
                        </View>
                        <View style = {styles.message}>
                            <MaterialIcons name = "chat" size = {25} color = "#0c002b" />
                            <Text style = {styles.messages}>{item.message}</Text>
                        </View>          
                </LinearGradient>
            )}
      </ScrollView>
    </View>
  )
}

export default Logs

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0c002b",
        height: "100%",
    },
    text: {
        color: "#fff"
    },
    headerBack : {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: "800"
    },
    mailID: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    nameID: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    message: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#1e90ff",
        borderRadius: 5,
        marginBottom: 10,
    },
    box: {
        backgroundColor: "transparent",
        margin: 10,
        borderRadius: 10,
    },
    email: {
       fontWeight: "800",
       fontSize: 18,
       marginLeft: 7,
       color: "#0c002b" 
    },
    messages: {
        color: "#0c002b",
        fontWeight: "800",
        fontSize: 16,
        marginLeft: 5,
        marginRight: 5
    },
    locationID: {
        flexDirection: "row",
        alignItems: "center"
    },
    location: {
        marginLeft: 5,
        marginRight: 10,
        fontSize: 10,
        fontWeight: "700"
    },
    log: {
        color: "#fff",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "800",
        marginBottom: 10
    },
    name: {
        marginLeft: 5,
        fontWeight: "700"
    },
    export: {
        alignSelf: "center",
        color: "#0c002b",
        margin: 10,
        backgroundColor: "#fff",
        fontSize: 17,
        padding: 10,
        fontWeight: "700",
        borderRadius: 10,
    }
})