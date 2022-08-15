import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import LottieView from "lottie-react-native";

const StartMeeting = ({ name, roomId, setRoomId, joinRoom }) => {
  return (
    <KeyboardAvoidingView
        style = {styles.container}
        behavior = "padding"
    >  
        <View>
            <Text style = {styles.heading}>Start Meeting</Text>
        </View>
        <View>
            <LottieView 
                style = {{ height: 200, alignSelf: "center"}}
                source = {require("../../../assets/json/startmeeting.json")}
                autoPlay
                loop
            />
        </View>
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Meeting ID" 
                    value = {roomId} 
                    autoComplete= 'off'
                    onChangeText = {text => setRoomId(text)} 
                    style = {styles.input}
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => joinRoom()}
                >
                    <Text style = {styles.buttonText}>Start Meeting</Text>
                </TouchableOpacity> 
            </View>
    </KeyboardAvoidingView>
  )
}

export default StartMeeting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "15%"
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#0c002b',
        fontWeight: '700',
        fontSize: 16,
    },
    forgot: {
        marginTop: 10,
        textDecorationLine: "underline",
        color: "#fff"
    },
    menu: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#120A8F",
        padding: 20,
    },
    camera: {
        flex: 1,
        justifyContent: "center",  
    },
    main: {
        backgroundColor: "#0c002b"
    },
    heading: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "700",
        marginTop: "20%"
    },
    otp: {
        backgroundColor: "transparent",
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        color: "#fff",
        
    }
})