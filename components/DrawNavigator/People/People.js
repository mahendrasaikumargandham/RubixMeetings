import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { authentication, db } from '../../../firebase/firebase-config';

const People = ({route}) => {

  const { id, className, section, subjectName } = route.params;
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);
  const fileRef = collection(db, `/users/${authentication.currentUser?.email}/Rooms/${id}/Participants/`);

  useEffect(() => {
    onSnapshot(
      fileRef,
      querySnapshot => {
        const info = []
        querySnapshot.forEach((doc) => {
          const {currentMail} = doc.data()
          info.push({ id: doc.id, currentMail
          })
        })
        setInfo(info);
      }
    )
  },[]);

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
      <Text style = {styles.note}>Only creator of the Room can access the participants list</Text>
      <View>
        <LottieView 
          style = {{ height: 250, alignSelf: "center"}}
          source = {require("../../../assets/json/participants.json")}
          autoPlay
          loop
        />
      </View>
      <View>
            
          <Text style = {styles.list}>Participants</Text>
          <View style = {{ flexDirection: "row", alignItems: "center", marginTop: 20}}>
            <MaterialIcons name = "account-circle" color = "#fff" size = {40} />
            <Text style = {styles.usersText}>{authentication.currentUser?.email}</Text>
          </View>
          <View>
            {info.map((item, index) =>
              <View key = {index} style = {{ flexDirection: "row", alignItems: "center", marginTop: 10}}>
                <MaterialIcons name = "account-circle" color = "#fff" size = {40} />
                <Text style = {styles.usersText}>{item.currentMail}</Text>
              </View>
            )}
          </View>
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
  },
  participant: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },
  participants: {
    borderTopColor: "#fff",
    borderTopWidth: 1,
    width: "90%",
    alignSelf: "center",
    padding: 10, 
  },
  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: "white",
    alignSelf: "center"
  },
  note: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },
  usersText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  list: {
    color: "#0c002b",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 10
  }
})