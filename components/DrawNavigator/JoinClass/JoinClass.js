import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinClass = () => {
    const [join, setJoin] = useState('');
    const navigation = useNavigation();

    const handleReturn = () => {
        navigation.navigate("Rooms");
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
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Room Code" 
                    value = {join} 
                    autoComplete= 'off'
                    onChangeText = {text => setJoin(text)} 
                    style = {styles.input}
                />
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    style = {styles.button}
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