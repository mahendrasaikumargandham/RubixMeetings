import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const People = ({route}) => {
    const { id, className, section, subjectName } = route.params;
    const navigation = useNavigation();
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
      <View>
        <LottieView 
          style = {{ height: 250, alignSelf: "center"}}
          source = {require("../../../assets/json/participants.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default People

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
        padding: 15,
        margin: 10,
        borderRadius: 10,
      },
      code: {
        backgroundColor: "#fff",
        padding: 15,
        margin: 10,
        marginTop: 5,
        borderRadius: 10,
      },
      textCode: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "800",
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
      top: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10
      }
})