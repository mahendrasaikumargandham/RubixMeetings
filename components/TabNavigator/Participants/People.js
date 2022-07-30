import { StyleSheet, Text, View, Image, Share } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const People = () => {
  const [inputValue, setinputValue] = useState('hello world');

  const students = [
    { name: "Student 1" },
    { name: "Classmate 2" },
    { name: "Student 3" },
    { name: "Student 4" },
    { name: "Classmate 5" },
    { name: "Student 6" },
    { name: "Classmate 7" },
    { name: "Classmate 8" }
  ]
  const ShareMessage = () => {
    Share.share({
        message: inputValue.toString()
    })
    .then((result) => console.log(result))
  }
  return (
    <ScrollView style = {styles.container}>
        <View>
            <View style = {styles.heading}>
                <Text style = {styles.textHeading}>People</Text>
                <TouchableOpacity>
                    <MaterialIcons name = "person-add" size = {30} color = "#fff" />
                </TouchableOpacity>
            </View>
            <View style = {styles.imageStyle}>
                <Image 
                    source={require("../../../assets/images/people.png")} 
                    style = {styles.image}
                />
            </View>
            <View style = {styles.imageStyle}>
                <TouchableOpacity 
                    style = {styles.inviteButton}
                    onPress = {ShareMessage}
                >
                    <Text style = {styles.invite}>Invite</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style = {styles.studentList}>
            {students.map((student, index) => 
                <TouchableOpacity key = {index} style = {styles.students}>
                    <MaterialIcons name = "account-circle" size = {40} color = "#fff" />
                    <Text style = {styles.studentName}>{student.name}</Text>
                </TouchableOpacity>
            )}
            <Text></Text>
        </View>
    </ScrollView>
  )
}

export default People

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0c002b",
        height: "100%"
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
        marginTop: "10%"
    },
    textHeading: {
        fontSize: 20,
        fontWeight: "800",
        color: "#fff"
    },
    image: {
        width: "90%",
        height: 180,
        marginTop: "10%"
    },
    imageStyle: {
        alignItems: "center",
    },
    inviteButton: {
        width: "40%",
        backgroundColor: "#fff",
        marginTop: "10%",
        padding: 10,
        borderRadius: 10
    },
    invite: {
        textAlign: "center",
        color: "#0c002b",
        fontSize: 18,
    },
    students: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        marginTop: "10%"
    },
    studentList: {
        marginTop: "10%",
        borderTopColor: "#fff",
        borderTopWidth: 1,
    },
    studentName: {
        marginLeft: 10,
        fontSize: 20,
        color: "#fff"
    }
})