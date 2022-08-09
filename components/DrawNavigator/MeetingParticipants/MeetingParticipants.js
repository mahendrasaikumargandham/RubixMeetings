import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { authentication } from '../../../firebase/firebase-config';

const MeetingParticipants = ({
    participants,
    setParticipants,
    name,
    activeUsers,
    setActiveUsers
}) => {
  return (
    <View style = {styles.container}>
        <TouchableOpacity 
            style = {styles.header}
            onPress = {() => setParticipants(!participants)}
        >
            <MaterialIcons name = "arrow-back-ios" size = {27} color = "#fff" />
            <Text style = {styles.textHeading}>Back</Text>
        </TouchableOpacity>
        <View style = {styles.searchContainer}>
            <MaterialIcons name = "search" size = {30} color = "#fff" />
            <TextInput 
                style = {styles.search}
                autoCorrect = {false}
                placeholder = "Search Participants"
                placeholderTextColor= "gray"
            />
        </View>
        <View>
            <Text style = {styles.host}>{authentication.currentUser?.displayName}</Text>
            {activeUsers.map((user, index) => (
                <View key = {index}>
                    <Text>{user.userName}</Text>
                </View>
            ))}
        </View>
    </View>
  )
}

export default MeetingParticipants

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#0c002b"
    },
    textHeading: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
        marginLeft: 10
    },
    host: {
        color: '#fff',
        marginLeft: 10,

    },
    search: {
        color: '#fff',
        fontWeight: "600",
        flex: 1,
        marginLeft: 10
    },
    searchContainer: {
        flexDirection: "row", 
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 2,
        margin: 10,
        padding: 10,
        borderRadius: 20,
    }
})