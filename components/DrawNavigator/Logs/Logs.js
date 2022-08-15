import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Logs = ({ modalVisible, setModalVisible, messages, currentLocation }) => {
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
            <View>
                <LottieView 
                    style = {{ alignSelf: "center", height: 200 }}
                    source = {require("../../../assets/json/logs.json")}
                    autoPlay
                    loop
                />
            </View>
            <Text style = {styles.log}>Messages Log</Text>
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
                            <Text style = {styles.location}>
                                {/* {item.currentLocation.slice(110, 120)} {item.currentLocation.slice(143, 153)} */}
                                {item.currentLocation}
                            </Text>
                        </TouchableOpacity>
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
    }
})