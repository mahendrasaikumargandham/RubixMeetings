import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from "lottie-react-native";
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { authentication, db } from "../../../firebase/firebase-config";


const Settings = ({route}) => {
    const navigation = useNavigation();
    const { id, className, section, subjectName } = route.params;
    const [classname, setClassName] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [subjectname, setSubjectName] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = async (id) => {
      if (classname == "" || classname == null || sectionId == "" || sectionId == null || subjectname == "" || subjectname == null) {
        setIsDisabled(true);
      }
      else {
        const idRef = doc(db, `/users/${authentication.currentUser?.email}/Rooms`, `${id}`);
        const payload = (idRef, {
          className: classname,
          section: sectionId,
          subjectName: subjectname
        });
        setDoc(idRef, payload)
        .then(() => {
            console.log("successfull");
        })
        .then(() => {
            navigation.navigate("Rooms")
        })
        .then(() => {
          setClassName('')
          setSectionId('')
          setSubjectName('')
        })
        .catch((error) => console.log(error));
      }
    }

    const handleDelete = async (id) => {
      await deleteDoc(doc(db, `/users/${authentication.currentUser?.email}/Rooms`, `${id}`))
      .then(() => {
        console.log("delete successfully")
      })
      .then(() => {
        navigation.navigate("Rooms");
      })
      .catch((error) => console.log(error.message))
    }
  return (
    <ScrollView style = {styles.main}>
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
    {/* <View>
        <LottieView 
            style = {{ alignSelf: "center", height: 100 }}
            source = {require("../../../assets/json/update.json")}
            autoPlay
            loop
        />
    </View> */}
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
                    onPress = {() => handleSubmit(id)}
                    disabled = {isDisabled}
                >
                    <Text style = {styles.buttonText}>Update Room</Text>
                </TouchableOpacity> 
            </View>
            <View>
                <TouchableOpacity 
                  style = {styles.leave}
                  onPress = {() => handleDelete(id)}
                >
                    <MaterialIcons name = "delete-outline" size = {30} color = "#fff" />
                    <Text style = {styles.leaveText}>Delete Room</Text>
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
        height: "100%",
        overflowY: "hidden"
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
        backgroundColor: "rgb(178, 30, 0)",
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
    top: {
      backgroundColor: "#fff",
      padding: 5,
      borderRadius: 10
    }
})