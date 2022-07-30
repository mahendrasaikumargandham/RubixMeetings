import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const About = () => {
  return (
    <ScrollView>
      <View style = {styles.main}>
        <View>
            <Text style = {styles.head}>Rubix Coders</Text>
        </View>
        <View style = {styles.team}>
            <Text style = {styles.name}>Akhila Reddy Biyyam</Text>
            <View style = {styles.items}>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "github" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity onPress = {() => Linking.openURL("mailto:20pa1a0520@vishnu.edu.in")}><FontAwesome5 style = {styles.links} name = "envelope" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "dev" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "facebook" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "instagram" size = {30} color = "#fff" /></TouchableOpacity>
            </View>
        </View>
        <View style = {styles.team}>
            <Text style = {styles.name}>Mahendra Gandham</Text>
            <View style = {styles.items}>
                <TouchableOpacity onPress = {() => Linking.openURL("https://github.com/mahendrasaikumargandham")}><FontAwesome5 style = {styles.links} name = "github" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity onPress = {() => Linking.openURL("mailto:21pa5a0504@vishnu.edu.in")}><FontAwesome5 style = {styles.links} name = "envelope" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "dev" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "facebook" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "instagram" size = {30} color = "#fff" /></TouchableOpacity>
            </View>
        </View>
        <View style = {styles.team}>
            <Text style = {styles.name}>Karthik Bajinku</Text>
            <View style = {styles.items}>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "github" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity onPress = {() => Linking.openURL("mailto:20pa1a0514@vishnu.edu.in")}><FontAwesome5 style = {styles.links} name = "envelope" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "dev" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "facebook" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "instagram" size = {30} color = "#fff" /></TouchableOpacity>
            </View>
        </View>
        <View style = {styles.team}>
            <Text style = {styles.name}>Swathi Chatrathi</Text>
            <View style = {styles.items}>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "github" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity onPress = {() => Linking.openURL("mailto:20pa1a0527@vishnu.edu.in")}><FontAwesome5 style = {styles.links} name = "envelope" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "dev" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "facebook" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "instagram" size = {30} color = "#fff" /></TouchableOpacity>
            </View>
        </View>
        <View style = {styles.team}>
            <Text style = {styles.name}>Bala Krishna Akula</Text>
            <View style = {styles.items}>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "github" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity onPress = {() => Linking.openURL("mailto:20pa1a0504@vishnu.edu.in")}><FontAwesome5 style = {styles.links} name = "envelope" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "dev" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "facebook" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "instagram" size = {30} color = "#fff" /></TouchableOpacity>
            </View>
        </View>
        <View style = {styles.team}>
            <Text style = {styles.name}>Dinesh Boddapati</Text>
            <View style = {styles.items}>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "github" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity onPress = {() => Linking.openURL("mailto:20pa1a0521@vishnu.edu.in")}><FontAwesome5 style = {styles.links} name = "envelope" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "dev" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "facebook" size = {30} color = "#fff" /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 style = {styles.links} name = "instagram" size = {30} color = "#fff" /></TouchableOpacity>
            </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default About

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0c002b",
        height: "100%",
        alignItems: "center",
    },
    head: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "700"
    },
    team: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around", 
        borderColor: "#fff",
        borderWidth: 2,
        width: "90%",
        margin: 10,
        borderRadius: 10,
        backgroundColor: "rgb(0, 89, 178)"
    },
    items: {
        flexDirection: "row",
        borderTopColor: "#fff",
        borderTopWidth: 2

    },
    name: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
        margin: 10
    },
    links: {
        margin: 10
    }
})