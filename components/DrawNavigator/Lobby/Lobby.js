import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const Lobby = () => {
    const navigation = useNavigation();
    const handleRedirect = () => {
        navigation.navigate("DashBoard");
    }
  return (
    <View style = {styles.container}>
      <View>
        <Text style = {styles.heading}>Rubix Lobby</Text>
      </View>
      <View>
        <LottieView 
            style = {{ alignSelf: "center", height: 200 }}
            source = {require("../../../assets/json/lobby.json")}
            autoPlay
            loop
        />
      </View>
      <View>
        <Text style = {styles.message}>The call has ended</Text>
        <TouchableOpacity
            style = {styles.button}
            onPress = {() => handleRedirect()}
        >
            <Text style = {styles.insideButton}>Return to DashBoard</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Lobby

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0c002b",
        height: "100%"
    },
    heading: {
        textAlign: "center",
        fontSize: 35,
        color: '#fff',
        marginTop: "30%",
        fontWeight: "800"
    },
    message: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700"
    },
    button : {
        backgroundColor: "#fff",
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: "10%"
    },
    insideButton: {
        color: "#0c002b",
        textAlign: "center",
        padding: 10,
        fontSize: 20,
        fontWeight: "800"
    }
})