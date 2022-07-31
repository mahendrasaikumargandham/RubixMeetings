import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from '../../firebase/firebase-config';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const ForgotPassword = () => {

    const forgotPassword = () => {
        if (email)
            sendPasswordResetEmail(authentication, email);     
    }

    const navigation = useNavigation();
    const redirect = () => {
        navigation.replace("Login");
    }
    const [email, setEmail] = useState('');
  return (
    <ScrollView style = {styles.main}>
        <View> 
            <Text style = {styles.rubix}>Rubix Meetings</Text>
        </View>
        <View>
            <LottieView 
                style = {{ alignSelf: "center", height: 200}}
                source = {require("../../assets/json/forgot.json")}
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
                    placeholder = "Enter your email to reset password" 
                    value = {email} 
                    autoComplete='off'
                    onChangeText = {text => setEmail(text)} 
                    style = {styles.input}
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPress = {forgotPassword}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <View style  = {{ width: "150%"}}><Text style = {styles.new}>If you have an account, then reset mail is sent to your registered email. Check your spam as well.</Text></View>
                <TouchableOpacity
                    onPress = {redirect}
                    style = {[styles.button, styles.buttonOutline]}
                >
                    <Text style = {styles.buttonOutlineText}>Get back to Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default ForgotPassword

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
        marginTop: 20,
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
    new: {
        marginTop: 15,
        color: "#fff",
        textAlign: "center"
    }, 
    main: {
        backgroundColor: "#0c002b"
    }
})