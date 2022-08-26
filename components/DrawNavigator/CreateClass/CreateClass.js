import { ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from "firebase/firestore"; 
import { authentication, db } from '../../../firebase/firebase-config';
import LottieView from "lottie-react-native";

const CreateClass = () => {

    const navigation = useNavigation();
    const handleReturn = () => {
        navigation.navigate("Rooms");
    }
    
    const [className, setClassName] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = async () => {
        if (className == "" || className == null || sectionId == "" || sectionId == null || subjectName == "" || subjectName == null) {
            setIsDisabled(true);
        }
        {
            const classesRef = collection(db, 'users');
            await addDoc(collection(classesRef, authentication.currentUser?.email, "Rooms"), {
                className: className,
                section: sectionId,
                subjectName: subjectName
            })
            .then(() => {
                setClassName('');
                setSectionId('');
                setSubjectName('');
                console.log("successfull");
            })
            .then(() => {
                navigation.navigate("Rooms");
            })
            .catch((error) => console.log(error));
        }
    }

  return (
    <ScrollView style = {styles.main}>
        <View> 
            <Text style = {styles.rubix}>Rubix Meetings</Text>
        </View>
        <KeyboardAvoidingView
            style = {styles.container}
            behavior = "padding"
        >
            {/* <View>
                <LottieView 
                    style = {{ height: 170, alignSelf: "center" }}
                    source = {require("../../../assets/json/create.json")}
                    autoPlay
                    loop
                />
            </View> */}
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Room Name" 
                    value = {className} 
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
                    value = {subjectName} 
                    onChangeText = {text => setSubjectName(text)} 
                    style = {styles.input}
                    autoComplete= 'off'
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    style = {[styles.button, {backgroundColor: className ? "rgb(0, 89, 178)" : "#fff"} ]}
                    onPress = {handleSubmit}
                    disabled = {isDisabled}
                >
                    <Text style = {[styles.buttonText, { color: className ? "#fff" : "#0c002b"}]}>Create Room</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress = {handleReturn}
                >
                <Text style = {styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default CreateClass

const styles = StyleSheet.create({
    rubix: {
        marginTop: "25%",
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'center',
        color: "#fff",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
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
        // backgroundColor: '#fff',
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
    cancel: {
      textDecorationLine: "underline",
      marginTop: 10,
      color: "#fff",
    },
    main: {
        backgroundColor: "#0c002b"
    }
})