import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Modal, ScrollView } from 'react-native';
import StartMeeting from '../StartMeeting/StartMeeting';
import { io } from "socket.io-client";
import { authentication } from "../../../firebase/firebase-config";
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import Chat from "./../Chat/Chat";
import MeetingParticipants from '../MeetingParticipants/MeetingParticipants';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

let socket; 
const RubixMeeting = () => {
    let [currentLocation, setCurrentLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [roomId, setRoomId] = useState();
    const [activeUsers, setActiveUsers] = useState([]);
    const [startCamera, setStartCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [cameraStatus, setCameraStatus] = useState(false);
    const [micStatus, setMicStatus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [participants, setParticipants] = useState(false);
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const name = `${authentication.currentUser?.displayName}`;
    const email = `${authentication.currentUser?.email}`;
    const navigation = useNavigation();
    let currentUsers = [];
    let reachedTime = new Date();
    let hours = (reachedTime.getHours() < 10 ? '0' : '') + reachedTime.getHours();
    let minutes = (reachedTime.getMinutes() < 10 ? '0' : '') + reachedTime.getMinutes();
    let time = hours + ':' + minutes;

    const _startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status == "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Premission Denied");
        }
    }

    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setCurrentLocation(currentLocation);
    })();

    if (errorMsg) {
        currentLocation = errorMsg;
    } 
    else if (currentLocation) {
        currentLocation = JSON.stringify(currentLocation);
    }

    useEffect(() => {
        socket = io("https://5f92-2409-4070-2389-5beb-68b6-8d9e-d688-8982.in.ngrok.io");
        socket.on("connection", () => console.log("Connected"));
        socket.on("all-users", users => {
            users = users.filter(user => (user.userName != name))
            setActiveUsers(users);
        })
        socket.on("messages", ({ userName: name, userEmail: email ,message: message, currentLocation: currentLocation, reachedTime: time }) => {  
            messages.push({ name, message, email, currentLocation, time });
            setMessages(messages);
        })
    },[])


    const joinRoom = () => {
        _startCamera();
        socket.emit("join-room", ({ userName: name, userEmail: email, roomId: roomId, currentLocation: currentLocation, reachedTime: time }));
        setRoomId('');
        console.log(roomId);
    }

    const sendMessage = () => {
        if (message == "" || message == null) {
            setIsDisabled(true);
        }
        socket.emit("messages", ({ userName: name, userEmail: email, message: message, currentLocation: currentLocation, reachedTime: time }));
        setMessage('');
    }

    const leaveRoom = () => {
        socket.disconnect();
        setStartCamera(false); 
        navigation.navigate("Lobby", {
            messages: messages,
            currentLocation: currentLocation,
        });
    }

  return (
    <ScrollView style = {styles.main}>
        {startCamera ? (
            <View style = {styles.container}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    presentationStyle={"fullScreen"}
                    visible={participants}
                    onRequestClose={() => {
                        setParticipants(!participants)
                    }} 
                >
                    <MeetingParticipants 
                        participants = {participants}
                        setParticipants = {setParticipants}
                        name = {name}
                        activeUsers = {activeUsers}
                        setActiveUsers = {setActiveUsers}
                        currentUsers = {currentUsers}

                    />
                </Modal>
                <Modal
                    animationType='slide'
                    transparent={false}
                    presentationStyle={"fullScreen"}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                >
                    <Chat 
                        modalVisible = {modalVisible}
                        setModalVisible = {setModalVisible}
                        message = {message}
                        setMessage = {setMessage}
                        sendMessage = {sendMessage}
                        name = {name}
                        messages = {messages}
                        currentLocation = {currentLocation}
                        isDisabled = {isDisabled}
                        setIsDisabled = {setIsDisabled}
                    />
                </Modal>
                <View style = {styles.menu}>
                    <TouchableOpacity 
                        style = {styles.options}
                        onPress = {() => {micStatus ? setMicStatus(false) : setMicStatus(true)}}
                    >
                        <MaterialIcons name = {micStatus? "mic" : "mic-off"} size = {30} color = "#0c002b" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.options}
                        onPress = {() => {cameraStatus ? setCameraStatus(false): setCameraStatus(true)}}
                    >
                        <MaterialIcons name = {cameraStatus ? "videocam" : "videocam-off"} size = {30} color = "#0c002b" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress = {() => setParticipants(true)}
                        style = {styles.options}
                    >
                        <MaterialIcons name = "groups" size = {30} color = "#0c002b" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.options}
                        onPress={() => {
                            setType(type == CameraType.back ? CameraType.front : CameraType.back);
                        }}    
                    >
                        <MaterialIcons name = "flip-camera-android" size = {30} color = "#0c002b" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.options}
                        onPress = {() => setModalVisible(true)}
                    >
                        <MaterialIcons name = "chat" size = {30} color = "#0c002b" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress = {() => leaveRoom()}
                        style = {styles.optionsRed}
                    >
                        <MaterialIcons name = "call-end" size = {30} color = "#fff" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.cameraContainer}>
                    <View>
                        {cameraStatus ? (
                            <Camera type={type} style = {{ width: 160, height: 190,}}></Camera>
                        ) : (
                            <LinearGradient colors={['rgb(0, 89, 178)', '#3b5998', 'rgb(80, 30, 180)']} style = {styles.activeUsersContainer}>
                                <View style = {styles.text}>
                                    <Text><MaterialIcons name = "account-circle" size = {100} color = "#fff" /></Text>
                                </View>
                            </LinearGradient> 
                        )}
                        <View><Text style = {styles.caption}>You</Text></View>
                    </View>
                    <View style = {styles.members}>
                        {activeUsers.map((activeUser, index) => 
                            <View key = {index} >
                                <LinearGradient colors={['rgb(0, 89, 178)', '#3b5998', 'rgb(80, 30, 180)']} style = {styles.activeUsersContainer}>
                                    <View style = {styles.text}>
                                        <Text>
                                            <MaterialIcons name = "account-circle" size = {100} color = "#fff" />
                                        </Text>
                                    </View>
                                </LinearGradient>
                                <Text style = {styles.caption}>{activeUser.userName}</Text>
                            </View>
                        )}
                    </View> 
                </View>
            </View>
        ) : (
            <StartMeeting 
                name = {name}
                roomId = {roomId}
                setRoomId = {setRoomId}
                joinRoom = {joinRoom}
            />
        )
    }     
    </ScrollView>
  )
}

export default RubixMeeting

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0c002b"
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: "#0c002b",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "5%",
    },
    container: {
        marginTop: "10%"
    },
    options: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10
    },
    optionsRed: {
        backgroundColor: "rgb(200, 30, 50)",
        padding: 5,
        borderRadius: 10
    },
    activeUsersContainer: {
        borderColor: "#fff",
        borderWidth: 2,
        width: 165,
        height: 195,
        justifyContent: "center",
        margin: 5,
        borderRadius: 10,
        padding: 20,
        backgroundColor: "transparent"
    },
    activeUsers: {
        color: "#0c002b",
        fontSize: 60,
        padding: 10
    },
    members: {
        flexDirection: "row", 
        flexWrap: "wrap",
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        alignItems: "center",
        borderRadius: 999
    },
    caption: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    userOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5
    },
    shareId: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 17,
        fontWeight: "700"
    }
})