import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import  { io } from "socket.io-client";
import { Camera } from 'expo-camera';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

let socket;
const Meeting = () => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [activeUsers, setActiveUsers] = useState();
    const [startCamera, setStartCamera] = useState(false);
    
    const navigation = useNavigation();

    const handleRedirect = () => {
        navigation.navigate("DashBoard");
    }

    useEffect(() => {
        socket = io("https://3f79-157-48-186-22.in.ngrok.io")
        socket.on("connection", () => console.log("Connected"));
        socket.on("all-users", users => {
            console.log("Acrtive Users")
            console.log(users)
            setActiveUsers(users)
        })
    }, []);
    const camera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Access Denied");
        }
    }
    const joinRoom = () => {
        camera();
        socket.emit("join-room", { roomId: roomId, name: name });
    }
  return (
    <ScrollView style = {styles.main}>
     
        {startCamera ? (
            <View style = {{ flex : 1 }}> 
                <View style = {styles.camera}>
                    <Camera type = {"front"} style = {{ width: "100%", height: 550 }}></Camera>
                </View> 
                <View style = {styles.menu}>
                    <TouchableOpacity>
                        <MaterialIcons name = "mic" size = {35} color = "white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name = "videocam-off" size = {35} color = "white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name = "chat" size = {35} color = "white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name = "groups" size = {35} color = "white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name = "screen-share" size = {35} color = "white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name = "call-end" size = {35} />
                    </TouchableOpacity>
                </View>
            </View>
        ): (   
            <KeyboardAvoidingView
                style = {styles.container}
                behavior = "padding"
            >   
                 <View> 
                    <Text style = {styles.rubix}>Rubix Meetings</Text>
                </View>
                    <View style = {styles.inputContainer}>
                        <TextInput 
                            placeholder = "Room Name" 
                            value = {name} 
                            autoComplete= 'off'
                            onChangeText = {text => setName(text)} 
                            style = {styles.input}
                        />
                        <TextInput 
                            placeholder = "Room ID" 
                            value = {roomId} 
                            autoComplete= 'off'
                            onChangeText = {text => setRoomId(text)} 
                            style = {styles.input}
                            secureTextEntry
                        />
                    </View>
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            // onPress = {() => joinRoom()}
                            style = {styles.button}
                        >
                            <Text style = {styles.buttonText}>Start Meeting</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity
                            onPress={handleRedirect}
                        >
                            <Text style = {styles.forgot}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
        )} 
    </ScrollView>
  )
}

export default Meeting

const styles = StyleSheet.create({
    rubix: {
        marginTop: "20%",
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'center',
        color: "#fff",
        marginBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
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
    }
})