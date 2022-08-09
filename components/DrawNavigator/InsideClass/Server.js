import { Share, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";

const Server = ({route}) => {
  const { id, className, section, subjectName } = route.params;
  const navigation = useNavigation();
  const inputValue = `${id}`
  console.log(inputValue)
  const ShareMessage = () => {
    Share.share({
        message: inputValue.toString()
    })
    .then((result) => console.log(result))
  }

  return (
    <View style = {styles.main}>
      <View>
        <View style = {styles.bottom}>
          <TouchableOpacity 
            style = {styles.top}
            onPress = {() => 
            navigation.navigate("Rooms", { 
                id: id,
                className: className, 
                section: section, 
                subjectName: subjectName 
            })}
          >
            <MaterialIcons name = "arrow-back" size = {30} color = "#0c002b" />
          </TouchableOpacity>
          <TouchableOpacity 
            style = {styles.top}
            onPress = {() => 
            navigation.navigate("Server", { 
                id: id,
                className: className, 
                section: section, 
                subjectName: subjectName 
            })}
          >
            <MaterialIcons name = "description" size = {30} color = "#0c002b" />
          </TouchableOpacity>
          <TouchableOpacity 
            style = {styles.top}
            onPress = {() => 
            navigation.navigate("Participants", { 
                id: id,
                className: className, 
                section: section, 
                subjectName: subjectName 
            })}
          >
            <MaterialIcons name = "group" size = {30} color = "#0c002b" />
          </TouchableOpacity>
          <TouchableOpacity 
            style = {styles.top}
            onPress = {() => 
            navigation.navigate("Room Settings", { 
                id: id,
                className: className, 
                section: section, 
                subjectName: subjectName 
            })}
          >
            <MaterialIcons name = "settings" size = {30} color = "#0c002b" />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.box}>
        <Text style = {styles.className}>{className} {section}</Text>
        <Text style = {styles.subjectName}>{subjectName}</Text>
      </View>
      <TouchableOpacity 
        style = {styles.code}
        onPress = {() => ShareMessage()}
      >
        <MaterialIcons name = "share" size = {25} color = "#0c002b" />
        <Text style = {styles.textCode}>Share Code</Text> 
      </TouchableOpacity>
      <View style = "lottieView">
        <LottieView 
          style = {styles.lottie}
          source = {require("../../../assets/json/server.json")}
          autoPlay
          loop
        />
      </View>
      <View style = {styles.view}>
        <TouchableOpacity 
          style = {styles.start}
          onPress = {() => 
            navigation.navigate("Verifier", { 
                id: id,
                className: className, 
                section: section, 
                subjectName: subjectName 
            })}
        >
          <MaterialIcons name = "meeting-room" size = {30} color = "#fff" />
          <Text style = {styles.meetingText}>Start Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Server

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0c002b",
    height: "100%"
  },
  image: {
    color: "#fff"
  },
  box: {
    backgroundColor: "rgb(0, 89, 178)",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  code: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textCode: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 10
  },
  className: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff",
    fontWeight: "800"
  },
  subjectName: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "700"
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10
  },
  start: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    backgroundColor: "rgb(0, 89, 178)",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  view: {
    alignItems: "center",
  },
  meetingText: {
    fontSize: 17,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "700"
  },
  lottie: {
    height: 250,
    alignSelf: "center"
  },
  lottieView: {
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10
  }
})