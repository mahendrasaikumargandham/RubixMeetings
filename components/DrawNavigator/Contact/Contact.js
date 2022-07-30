import { ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Contact = () => {
    const navigation = useNavigation();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

  return (
    <ScrollView style = {styles.main}>
        <View> 
            <Text style = {styles.rubix}>Rubix Meetings</Text>
        </View>
        <KeyboardAvoidingView
            style = {styles.container}
            behavior = "padding"
        >
        <View style = {styles.inputContainer}>
            <TextInput 
                placeholder = "Name" 
                value = {name} 
                onChangeText = {text => setName(text)} 
                style = {styles.input}
                autoComplete= 'off'
            />
            <TextInput 
                placeholder = "Email" 
                value = {email} 
                onChangeText = {text => setEmail(text)} 
                style = {styles.input}
                autoComplete= 'off'
            />
            <TextInput 
                placeholder = "Phone" 
                value = {number} 
                onChangeText = {text => setNumber(text)} 
                style = {styles.input}
                autoComplete= 'off'
            />
            <TextInput 
                placeholder = "Message" 
                value = {password} 
                onChangeText = {text => setPassword(text)} 
                style = {styles.message}
                autoComplete= 'off'
                multiline = {true}
            />
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity
                // onPress = {handleSignUp}
                style = {styles.button}
            >
                <Text style = {styles.buttonText}>Contact</Text>
            </TouchableOpacity> 
        </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Contact

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
        marginTop: '10%',
    },
    message: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        height: 100,
        
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
        color: '#fff'
    },
    main: {
        backgroundColor: "#0c002b"
    }
})