import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native';
import { authentication } from '../../../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const Verifier = ({ route }) => {        
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const emailRef = useRef();
    const {id, className, subjectName, section } = route.params;
    const currentEmail = `${authentication.currentUser?.email}`;

    const handleLogin = () => {
        signInWithEmailAndPassword(authentication, currentEmail, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Verified as ',user.email);
        })
        .then(() => {
            setPassword("")
        })
        .then(() => {
            navigation.navigate("FingerPrint")
        })
        .catch(error => alert(error));
    }
  return (
    <ScrollView style = {styles.main}>
        <View> 
            <Text style = {styles.rubix}>Rubix Verifier</Text>
        </View>
        <View>
            <LottieView 
                style = {{ alignSelf: "center", height: 230 }}
                source = {require("../../../assets/json/verified.json")}
                autoPlay
                loop
            />
        </View>
        <View>
            <Text style = {styles.caption}>Please verify your credentials to enter the meeting</Text>
        </View>
        <KeyboardAvoidingView style = {styles.container} behavior = "padding">
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Password" 
                    value = {password} 
                    autoComplete= 'off'
                    onChangeText = {text => setPassword(text)} 
                    style = {styles.input}
                    secureTextEntry
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleLogin()} style = {styles.button}>
                    <Text style = {styles.buttonText}>Verify</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    onPress = {() => 
                        navigation.navigate("Server", { 
                            id: id,
                            className: className, 
                            section: section, 
                            subjectName: subjectName 
                    })}
                >
                    <Text style = {styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Verifier

const styles = StyleSheet.create({
    rubix: {
        marginTop: "25%",
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'center',
        color: "#fff"
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
        backgroundColor: 'rgb(0, 89, 178)',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#0c002b',
        marginTop: 10,
        padding: 10,
        borderColor: '#fff',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    forgot: {
        marginBottom: 10,
        textDecorationLine: "underline",
        color: "#fff"
    },
    new: {
        marginTop: 5,
        color: "#fff"
    },
    main: {
        backgroundColor: "#0c002b"
    },
    lottie: {
        alignSelf: "center",
        height: 200
    },
    cancel: {
        textDecorationLine: "underline",
        marginTop: 10,
        color: "#fff"
    },
    caption: {
        color: "#fff",
        textAlign: "center",
        fontSize: 17,
        margin: 10,
        fontWeight: "600"
    }
})