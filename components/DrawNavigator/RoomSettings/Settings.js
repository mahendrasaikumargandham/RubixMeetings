import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from "lottie-react-native";

const Settings = ({route}) => {
    const navigation = useNavigation();
    const { id, className, section, subjectName } = route.params;
    const [classname, setClassName] = useState(className);
    const [sectionId, setSectionId] = useState(section);
    const [subjectname, setSubjectName] = useState(subjectName);
  return (
    <ScrollView style = {styles.main}>
    <View>
      <View style = {styles.bottom}>
        <TouchableOpacity onPress = {() => 
          navigation.navigate("Rooms", { 
              id: id,
              className: className, 
              section: section, 
              subjectName: subjectName 
          })}
        >
          <MaterialIcons name = "arrow-back" size = {30} color = "#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => 
          navigation.navigate("Server", { 
              id: id,
              className: className, 
              section: section, 
              subjectName: subjectName 
          })}
        >
          <MaterialIcons name = "description" size = {30} color = "#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => 
          navigation.navigate("Participants", { 
              id: id,
              className: className, 
              section: section, 
              subjectName: subjectName 
          })}
        >
          <MaterialIcons name = "group" size = {30} color = "#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => 
          navigation.navigate("Room Settings", { 
              id: id,
              className: className, 
              section: section, 
              subjectName: subjectName 
          })}
        >
          <MaterialIcons name = "settings" size = {30} color = "#fff" />
        </TouchableOpacity>
      </View>
    </View>
    <View>
        <LottieView 
            style = {{ alignSelf: "center", height: 100 }}
            source = {require("../../../assets/json/update.json")}
            autoPlay
            loop
        />
    </View>
    <View style = {styles.heading}>
        <Text style = {styles.updateHeading}>Update Room</Text>
        <MaterialIcons name = "edit" size = {27} color = "#fff" />
    </View>
    <KeyboardAvoidingView
        style = {styles.container}
        behavior = "padding"
    >
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Room Name" 
                    value = {classname} 
                    onChangeText = {text => setClassName(text)} 
                    style = {styles.input}
                    autoComplete= 'off'
                />
                <TextInput 
                    placeholder = "Section" 
                    value = {sectionId} 
                    onChangeText = {text => setSectionId(text)} 
                    style = {styles.input}
                    autoComplete= 'off'
                />
                <TextInput 
                    placeholder = "Subject" 
                    value = {subjectname} 
                    onChangeText = {text => setSubjectName(text)} 
                    style = {styles.input}
                    autoComplete= 'off'
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    style = {styles.button}
                    // onPress = {handleSubmit}
                >
                    <Text style = {styles.buttonText}>Update Room</Text>
                </TouchableOpacity> 
            </View>
            <View>
                <TouchableOpacity style = {styles.leave}>
                    <MaterialIcons name = "logout" size = {30} color = "#fff" />
                    <Text style = {styles.leaveText}>Leave the Room</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
  </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0c002b",
        height: "100%"
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
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#0c002b',
        fontWeight: '700',
        fontSize: 16,
    },
    updateHeading: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
        marginRight: 10
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%"
    },
    leave: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0, 89, 178)",
        padding: 10,
        borderRadius: 10,
        marginTop: "10%",
    },
    leaveText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 10
    },
    id: {
        color: "#fff",

    }
})