import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { authentication } from '../../../firebase/firebase-config';

const Profile = () => {
  return (
    <View style = {styles.main}>
      <View style = {styles.avatar}>
        <Image style = {styles.image} source = {require("../../../assets/images/bio.png")} />
      </View>
      <View style = {styles.detail}>
        <MaterialIcons name = "person" size = {30} color = "#fff" />
        <Text style = {styles.name}>{authentication.currentUser?.displayName}</Text>
      </View>
      <View style = {styles.detail}>
        <MaterialIcons name = "mail" size = {30} color = "#fff" />
        <Text style = {styles.name}>{authentication.currentUser?.email}</Text>
      </View>
      <View style = {styles.detail}>
        <MaterialIcons name = "call" size = {30} color = "#fff" />
        <Text style = {styles.name}>+91 9999 999 999</Text>
      </View>
      <View style = {styles.detail}>
        <MaterialIcons name = "pin-drop" size = {30} color = "#fff" />
        <Text style = {styles.name}>Andhra Pradesh, India</Text>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0c002b",
    height: "100%"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 70,
    marginTop: 20
  }, 
  avatar: {
    alignItems: "center"
  },
  name: {
    color: "#fff",
    marginLeft: 10
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    margin: 10
  }
})