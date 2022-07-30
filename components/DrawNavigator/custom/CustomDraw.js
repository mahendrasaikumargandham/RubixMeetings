import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { authentication } from '../../../firebase/firebase-config'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native'
const CustomDraw = (props) => {

  const navigation = useNavigation();
  const handleLogout = () => {
    authentication
    .signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch(error => alert(error.message));
  }

  const handleProfile = () => {
    navigation.navigate("Profile");
  }
  return (
    <ScrollView style = {{backgroundColor: "#0c002b", height: "100%"}}>
      <View style = {{flex: 1}}>
        <DrawerContentScrollView 
          {...props} 
          contentContainerStyle= {{backgroundColor: "#0c002b", height: "100%"}}
        >
          <View style = {styles.header}>
            <Image 
              source = {require("../../../assets/images/bio.png")} 
              style = {{height: 90, width: 90, borderRadius: 50}}
            />
            <Text style = {styles.name}>{authentication.currentUser?.displayName}</Text>
            <TouchableOpacity onPress = {handleProfile}>
              <Text style = {styles.title}>View Profile</Text>
            </TouchableOpacity>
          </View>
          <DrawerItemList {...props} />
          <View style = {styles.bottom}>
            <TouchableOpacity style = {styles.button} onPress = {handleLogout}>
              <MaterialIcons name = "logout" size = {30} color = "white" />
              <Text style = {styles.signout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      </View>
    </ScrollView>
  )
}

export default CustomDraw

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 5
  },
  signout: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "600"
  },
  bottom: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#f5f5f5",
    marginTop: 5,
    marginBottom: 10,
    textDecorationLine: "underline",
  }
})