import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Chat = ({
    modalVisible, 
    setModalVisible, 
    message, 
    setMessage,
    sendMessage,
    name,
    messages,
    setMessages
}) => {
  return (
    <View style = {styles.container}>
        <TouchableOpacity 
            onPress={() => setModalVisible(!modalVisible)}
            style = {styles.header}
        >
            <MaterialIcons name = "arrow-back-ios" size = {30} color = "#fff" />
            <Text style = {styles.headerText}>Back</Text>
        </TouchableOpacity>
        <ScrollView style = {{ flex:1 }}>
            {messages.map((each, index) => (
                <View key = {index}>
                    <TouchableOpacity style = {styles.messageBox}>
                        <Text style = {styles.users}>~{each.name}</Text>
                        <Text style = {styles.messages}>{each.message}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
        <View style = {{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
                value = {message}
                onChangeText = {text => setMessage(text)}
                autoCorrect = {false}
                placeholder = "Enter message"
                placeholderTextColor = "gray"
                onSubmitEditing={() => sendMessage()}
                style = {styles.textInput}
            />
            <TouchableOpacity
                style = {[{ backgroundColor: message ? "rgb(0,89,178)" : "#fff" }, styles.button]}
                onPress = {() => sendMessage()}
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
        borderColor: "rgb(0, 89, 178)",
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
        fontSize: 13
    },
    messages: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800"
    },
    messageBox: {
        backgroundColor: "rgb(0, 89, 178)",
        margin: 10,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: "60%"
    }
})