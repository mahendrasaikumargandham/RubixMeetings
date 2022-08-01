import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { authentication, db } from "../../../firebase/firebase-config";
import LottieView from "lottie-react-native";

const JoinClass = () => {
    const [join, setJoin] = useState('');
    const [email, setEmail] = useState('');
    const [classExists, setClassExists] = useState(false);
    const [info, setInfo] = useState('');
    const navigation = useNavigation();
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [subjectName, setSubjectName] = useState('');

    const handleReturn = () => {
        navigation.navigate("Rooms");
    }

    const handleSubmit = async () => {
        const docRef = doc(db, `/users/${email}/Rooms`, `${join}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.owner !== authentication.currentUser?.email) {
            const info = [];
            console.log("Document data:", docSnap.data());
            const {className, section, subjectName} = docSnap.data();
            info.push({ id: docSnap.id, className, section, subjectName});
            setClassName(className);
            setSection(section);
            setSubjectName(subjectName);
            setInfo(info);
            const classesRef = collection(db, 'users');
            await addDoc(collection(classesRef, authentication.currentUser?.email, "Rooms"), {
                className, section, subjectName
            })
            .then(() => {
                setJoin('');
                setEmail('');
            })
            .then(() => {
                navigation.navigate("Rooms");
            })
            .catch((error) => {
                console.log(error.message)
            })
        } else {
            console.log("No such document!");
            setClassExists(false);
            return;
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
            <View>
                <LottieView 
                    style = {{ height: 180, alignSelf: "center" }}
                    source = {require("../../../assets/json/join.json")}
                    autoPlay
                    loop
                />
            </View>
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Room Code" 
                    value = {join} 
                    autoComplete= 'off'
                    onChangeText = {text => setJoin(text)} 
                    style = {styles.input}
                />
                <TextInput 
                    placeholder = "Creater Email ID" 
                    value = {email} 
                    autoComplete= 'off'
                    onChangeText = {text => setEmail(text)} 
                    style = {styles.input}
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => handleSubmit()}
                >
                    <Text style = {styles.buttonText}>Join Room</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress = {handleReturn}>
                    <Text style = {styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default JoinClass

const styles = StyleSheet.create({
    rubix: {
        marginTop: "10%",
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'center',
        color: "#fff"
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
    cancel: {
        textDecorationLine: "underline",
        marginTop: 10,
        color: "#fff"
    },
    main: {
        backgroundColor: "#0c002b"
    }
})