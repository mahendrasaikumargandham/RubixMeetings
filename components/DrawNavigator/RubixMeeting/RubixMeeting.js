import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const RubixMeeting = ({ route }) => {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const { id, className, section, subjectName } = route.params;
    const navigation = useNavigation();

    const handleRedirect = () => {
        navigation.navigate("DashBoard");
    }

  return (
    <ScrollView style = {styles.main}>
        <KeyboardAvoidingView
            style = {styles.container}
            behavior = "padding"
        >   
            <View> 
                <Text style = {styles.rubix}>Rubix Meeting</Text>
            </View>
            <View>
                <LottieView 
                    style = {{ height: 200, alignSelf: "center"}}
                    source = {require("../../../assets/json/meet.json")}
                    autoPlay
                    loop
                />
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
    </ScrollView>
  )
}

export default RubixMeeting

const styles = StyleSheet.create({
    rubix: {
        marginTop: "10%",
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