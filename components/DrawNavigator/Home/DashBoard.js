import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const DashBoard = () => {
    const navigation = useNavigation();
    const handleRooms = () => {
        navigation.navigate("Rooms");
    }
    const handleMeeting = () => {
        navigation.navigate("Emergency Meeting");
    }
    return (
        <View style = {styles.container}>
            <Image 
                source={require('../../../assets/images/meet.png')} 
                style = {styles.image}
            />
            <Text style = {styles.caption}>The top tier online video conferencing app</Text>
            <View style = {styles.meeting}>
                <TouchableOpacity  onPress = {handleRooms}>
                    <Text style = {styles.text1}>Navigate to Rooms</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.rooms}>
                <TouchableOpacity onPress = {handleMeeting}>
                    <Text style = {styles.text2}>Emergency Meeting</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DashBoard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0c002b",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    image: {
        width: "100%",
        height: 200,
    },
    meeting: {
        margin: "5%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        width: "60%"
    }, 
    text1 : {
        color: "#0c002b",
        fontSize: 17,
        fontWeight: "700",
        textAlign: "center"
    },
    caption: {
        fontSize: 20,
        fontWeight: "900",
        marginBottom: "10%",
        textAlign: "center",
        color: "#fff",
        marginTop: "10%"
    },
    rooms: {
        margin: "5%",
        backgroundColor: "#0c002b",
        padding: 10,
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 2, 
        width: "60%"  
    },
    text2: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
        textAlign: "center"
    }
})