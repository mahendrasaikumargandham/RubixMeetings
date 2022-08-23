import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
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
    const [type, setType] = useState(CameraType.front);
    const [cameraStatus, setCameraStatus] = useState(false);
    const [micStatus, setMicStatus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [participants, setParticipants] = useState(false);
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(true); 
    const [textColor, setTextColor] = useState('#fff');
    const [alertVisible, setAlertVisible] = useState(false);
    const [finalAlert, setFinalAlert] = useState(false);
    let [count, setCount] = useState(0);
    const name = `${authentication.currentUser?.displayName}`;
    const email = `${authentication.currentUser?.email}`;

    const navigation = useNavigation();
    let currentUsers = [];
    let reachedTime = new Date();
    let hours = (reachedTime.getHours() < 10 ? '0' : '') + reachedTime.getHours();
    let minutes = (reachedTime.getMinutes() < 10 ? '0' : '') + reachedTime.getMinutes();
    let time = hours + ':' + minutes;
    let meetingParticipants;
    let jsonResponse;
    let responseStr;
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
        socket = io("https://ab1a-2409-4070-208e-7656-8cee-f06a-463c-bc5f.in.ngrok.io");
        socket.on("connection", () => console.log("Connected"));
        socket.on("all-users", users => {
            users = users.filter(user => (user.userName != name))
            setActiveUsers(users);
            // console.log(users);
        })
        socket.on("all-users", meetingParticipants => {
            meetingParticipants.filter(user => (user.roomId == roomId));
            // console.log(meetingParticipants[0].roomId);
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
        // console.log(name);
        console.log(activeUsers);
    }

    function sendMessage() {
        if (message == "" || message == null) {
            setIsDisabled(true);
        }
        socket.emit("messages", ({ userName: name, userEmail: email, message: message, currentLocation: currentLocation, reachedTime: time }));
        setMessage('');
        console.log(message);
        const cars = {
            text: `${message}`
        }
        fetch("http://192.168.43.248:5001/receiver", 
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
            ).then((jsonResponse) => {  
                    // console.log(Object.values(jsonResponse))
                    if(Object.values(jsonResponse) == "Abusive") {
                        // setShowMessage(false);
                        setTextColor('transparent');
                    } else if(Object.values(jsonResponse) != "Abusive") {
                        setTextColor('#fff');
                    }
                    responseStr = Object.values(jsonResponse);
                    removeuser(responseStr);

                } 
            ).catch((err) => console.error(err));   
    }
    
    const removeuser = (response) => {  
        if(response == "Abusive") {
            count = count + 1;
            if (count == 1) {
                // alert(`You have used abusive word for ${count} time`);
                setAlertVisible(true);
            } else if (count == 2) {
                // alert("This is the last warning. You will be removed out of meeting");
                setAlertVisible(true);
            }
            setCount(count);
        }
        console.log(count);
        if (count > 2) {
            alert("You have used Abusive words for more than limit of 3 times. You are out from the meeting.")
            leaveRoom();
        }
        return response;    
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
                    animationType='fade'
                    transparent={true}
                    visible={alertVisible}
                    presentationStyle={"overFullScreen"}
                >
                    <View style = {{ flex: 1}}>

                    </View>
                    <View style = {styles.modalAlert}>
                        { (count == 2) ? (
                            <Text style = {styles.alertText}>This is the last warning. You will be removed out of meeting</Text>
                        ) : (
                            <Text style = {styles.alertText}>You have used abusive word for {count} time</Text>
                        )}
                        <TouchableOpacity 
                            onPress = {() => setAlertVisible(!alertVisible)} style = {styles.alertButtons}>
                            <Text style = {{ flex: 1}}></Text>
                            <Text style = {styles.alertOk}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
                        meetingParticipants = {meetingParticipants}

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
                        showMessage = {showMessage}
                        textColor = {textColor}
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
                <View><Text>Meeting ID: {roomId}</Text></View>
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
    },
    modalAlert: {
        backgroundColor: "red",
        alignSelf: "center",
        borderRadius: 10,
        padding: 10,
        marginBottom: "20%"
    },
    alertButtons: {
        flexDirection: "row",
    },
    alertOk: {
        backgroundColor: "#fff",
        color: "red",
        padding: 3,
        borderRadius: 5,
        paddingLeft: 7,
        paddingRight: 7,
        fontWeight: "800",
    },
    alertText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "800",
    }
})