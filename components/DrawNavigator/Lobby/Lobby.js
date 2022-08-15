import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logs from '../Logs/Logs';
import { LinearGradient } from "expo-linear-gradient";

const Lobby = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const { messages, currentLocation } = route.params;

  return (
    <View style = {styles.container}>
      <Modal
        animationType='slide'
        transparent={false}
        presentationStyle={"fullScreen"}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible)
        }}
      >
        <Logs
          modalVisible = {modalVisible}
          setModalVisible = {setModalVisible}
          messages = {messages}
          currentLocation = {currentLocation}
        />
      </Modal>
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
        <LinearGradient colors={['rgb(0, 89, 178)', '#3b5998', 'rgb(80, 30, 180)']} style = {styles.button}>
          <TouchableOpacity onPress = {() => navigation.navigate("DashBoard")}>
              <Text style = {styles.insideButton}>Return to DashBoard</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View>
        <TouchableOpacity style = {styles.logs} onPress = {() => setModalVisible(true)}>
          <MaterialIcons name = "description" size = {25} color = "#0c002b" style = {{ marginLeft: 4 }} />
          <Text style = {styles.log}>View Logs</Text>
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
    backgroundColor: "transparent",
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "10%"
  },
  insideButton: {
    color: "#fff",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "800"
  },
  logs: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "40%",
    alignSelf: "center",
    padding: 10,
    marginTop: "10%",
    borderRadius: 10
  },
  log: {
    color: "#0c002b",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "800"
  }
})