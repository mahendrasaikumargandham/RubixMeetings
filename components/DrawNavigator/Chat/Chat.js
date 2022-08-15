import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { authentication } from '../../../firebase/firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from "lottie-react-native";

const Chat = ({
    modalVisible, 
    setModalVisible, 
    message, 
    setMessage,
    sendMessage,
    messages,
    isDisabled,
}) => {
    const currentUser = `${authentication.currentUser?.email}`;
  return (
    <View style = {styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style = {styles.header}>
            <MaterialIcons name = "arrow-back-ios" size = {30} color = "#fff" />
            <Text style = {styles.headerText}>Back</Text>
        </TouchableOpacity>
        <ScrollView style = {{ flex:1 }}>
            <View>
                <LottieView 
                    style = {{ alignSelf: "center", height: 160 }}
                    source = {require("../../../assets/json/chatting.json")}
                    autoPlay
                    loop
                />
            </View>
            {messages.map((each, index) => 
                <TouchableOpacity key = {index} style = {[styles.messageBox]}>
                        <Text style = {styles.location}>{each.currentLocation}</Text>
                        <Text style = {styles.users}>~{each.name}</Text>
                        <LinearGradient colors={['rgb(0, 89, 178)', '#3b5998', 'rgb(80, 30, 180)']}
                            style={styles.linearGradient}>
                            <Text style = {styles.messages}>{each.message}</Text>
                            <Text style = {styles.timeStamp}>{each.time}</Text>
                        </LinearGradient>       
                </TouchableOpacity>
            )}
        </ScrollView>
        
        <View style = {{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
                value = {message}
                onChangeText = {text => setMessage(text)}
                autoCorrect = {false}
                placeholder = "Enter message"
                placeholderTextColor = "gray"
                onSubmitEditing={() => sendMessage()}
                style = {[styles.textInput, { borderColor: message ? "rgb(0, 89, 178)": "gray"}]}
            />
            <TouchableOpacity
                style = {[{ backgroundColor: message ? "rgb(0,89,178)" : "#fff" }, styles.button]}
                onPress = {() => sendMessage()}
                disabled = {isDisabled}
            >
                <MaterialIcons name = "send" size = {26} color = {message ? "#fff" : "#0c002b"} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#0c002b",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700"
    },
    textInput: {
        color: "#fff",
        margin: 5,
        padding: 10,
        borderWidth: 2,
        flex: 1,
        borderRadius: 10,
        fontWeight: "600",
        fontSize: 16
    },
    button: {
        padding: 12,
        borderRadius: 10,
        marginRight: 5,
    },
    users: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
    messages: {
        color: "#fff",
        fontSize: 18,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        fontWeight: "700",
        backgroundColor: "transparent",
        flex: 1
    },
    messageBox: {
        margin: 10,
    },
    location: {
        color: "#0c002b",
        fontSize: 1,   
    },
    linearGradient: {
        borderRadius: 10,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    timeStamp: {
        color: "#fff",
        fontSize: 12,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        fontWeight: "700",
        backgroundColor: "transparent",
    }
})


