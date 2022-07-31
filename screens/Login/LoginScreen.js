import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { authentication } from '../../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const LoginScreen = () => {

    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const emailRef = useRef();

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(user => {
            if(user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with ',user.email);
        })
        .catch(error => alert(error.message));
    }

    const handleForgot = () => {
        navigation.replace("ForgotPassword");
    }

    const redirect = () => {
        navigation.replace("Register");
    }
  return (
    <ScrollView style = {styles.main}>
        <View> 
            <Text style = {styles.rubix}>Rubix Meetings</Text>
        </View>
        <View>
            <LottieView 
                style = {styles.lottie}
                source = {require('../../assets/json/login.json')}
                autoPlay
                loop
            />
        </View>
        <KeyboardAvoidingView
            style = {styles.container}
            behavior = "padding"
        >
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Username or Email" 
                    value = {email} 
                    ref={emailRef}
                    autoComplete= 'off'
                    onChangeText = {text => setEmail(text)} 
                    style = {styles.input}
                />
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
                <TouchableOpacity
                        onPress={handleForgot}
                >
                    <Text style = {styles.forgot}>forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {handleLogin}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity> 
                <View><Text style = {styles.new}>New to Rubix Meetings?</Text></View>
                <TouchableOpacity
                    onPress = {redirect}
                    style = {[styles.button, styles.buttonOutline]}
                >
                    <Text style = {styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    rubix: {
        marginTop: "20%",
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
        backgroundColor: '#fff',
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
        color: '#0c002b',
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
    }
})