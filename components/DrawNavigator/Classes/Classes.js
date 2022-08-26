import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authentication, db } from '../../../firebase/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient"

const Classes = () => {

  const dispatch = useDispatch();
  const selectedClass = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: item
    })
  }

  const [info, setInfo] = useState([]);

  const fileRef = collection(db, `/users/${authentication.currentUser?.email}/Rooms`);
  useEffect(() => {
    onSnapshot(
      fileRef,
      querySnapshot => {
        const info = []
        querySnapshot.forEach((doc) => {
          const {className, section, subjectName} = doc.data()
          info.push({ id: doc.id, className, section, subjectName
          })
        })
        setInfo(info);
      }
    )
  },[]);

  const navigation = useNavigation();
  const handleCreate = () => {
    navigation.navigate("Create a Room");
  }
  
  const handleJoin = () => {
    navigation.navigate("Join a Room");
  }

  return (
    <ScrollView style = {styles.main}>
      <View>
        <View style = {styles.container}>
          <View style = {styles.direction}>
            <TouchableOpacity onPress = {handleCreate}>
              <Text style = {styles.buttons}>Create Room</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handleJoin}>
              <Text style = {styles.buttons}>Join Room</Text>
            </TouchableOpacity> 
          </View>
          {/* <View>
            <LottieView 
              style = {{ alignSelf: "center", height: 200 }}
              source = {require("../../../assets/json/classes.json")}
              autoPlay
              loop
            />
          </View> */}
          <View style = {{ alignItems: "center", marginTop: 10 }}></View>
            {info.map((item, index) => (
              <TouchableOpacity
                key = {index}
                style = {styles.box}
                onPress = {() => 
                  navigation.navigate("Server", { 
                    id: item.id,
                    className: item.className, 
                    section: item.section, 
                    subjectName: item.subjectName 
                  })}
              >
                <View style = {styles.view}>
                  <Text style = {styles.heading}>{item.className} {item.section}</Text>
                  <Text>
                    <TouchableOpacity 
                      onPress = {() => selectedClass(item)}
                    >
                      <MaterialIcons name = "archive" size = {25} color = "white" /> 
                    </TouchableOpacity>
                  </Text>
                </View>
                  <Text style = {styles.subject}>{item.subjectName}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Classes

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    color: "black"
  },
  box: {
    backgroundColor: "rgb(0, 89, 178)",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  },
  subject: {
    fontSize: 18,
    color: "white",
    marginTop: 20
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: "#fff",
    color: "#0c002b",
    fontWeight: "800",
    padding: 10,
    margin: 10,
    fontSize: 17,
    borderWidth: 3,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    marginTop: "5%",
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "800",
    color: "#120A8F"
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  icon: {
    color: "#fff"
  },
  top: {
    color: "#120A8F",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {
    backgroundColor: "#0c002b",
    height: "100%"
  },
  modal: {
    height: '23%',
    marginTop: 'auto',
    backgroundColor: "#0c002b",
    borderRadius: 10
  },
  footer: {
    justifyContent: "center",
    padding: 10
  },
  room: {
    margin: 10,
    color: "#fff",
    fontSize: 17,
  },
  addButton: {
    width: "100%"
  },
  add: {
    height: '23%',
    display: "flex",
    marginTop: '40%',
    backgroundColor: "#0c002b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }
})