import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native';
import { authentication } from '../../../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

const Verifier = ({ route }) => {

    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const emailRef = useRef();
    const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(false);
    const { id, className, section, subjectName } = route.params;

    useEffect(() => {
        (async() => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsFingerPrintSupported(compatible);
        })();
    }, []);

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
          {
            text: btnTxt,
            onPress: btnFunc
          }
        ]);
    }

    const twoButtonAlert = () => {
        navigation.navigate("Start Meeting", { 
            id: id,
            className: className, 
            section: section,
            subjectName: subjectName 
        })
    }

    const handleFingerPrintAuth = async () => {
        const isFingerPrintAvailable = await LocalAuthentication.hasHardwareAsync();
        if(!isFingerPrintAvailable) {
          return alertComponent(
            () => fallBackToDefaultAuth()
          )
        }
    
        let supportedFingerPrint;
        if(isFingerPrintAvailable) {
          supportedFingerPrint = await LocalAuthentication.supportedAuthenticationTypesAsync()
        }
        const savedFingerPrint = await LocalAuthentication.isEnrolledAsync();
        if(!savedFingerPrint) {
          alertComponent(
            () => fallBackToDefaultAuth()
          )
        }
    
        const FingerPrintAuth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Please Verify your Finger Print ID",
          disableDeviceFallback: false
        });
    
        if(FingerPrintAuth) {
          twoButtonAlert();
        }
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Verified as ',user.email);
        })
        .then(() => {
            setEmail("")
            setPassword("")
        })
        .then(() => {
            handleFingerPrintAuth();
        })
        .catch(error => alert(error));
    }
  return (
    <ScrollView style = {styles.main}>
        <View> 
            <Text style = {styles.rubix}>Rubix Verifier</Text>
        </View>
        <View>
            <Text style = {styles.caption}>Please verify your login credentials to enter the meeting</Text>
        </View>
        <KeyboardAvoidingView
            style = {styles.container}
            behavior = "padding"
        >
            <View style = {styles.inputContainer}>
                <TextInput 
                    placeholder = "Email ID" 
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
                    onPress={() => handleLogin()}
                    style = {styles.button}
                >
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
        marginTop: "40%",
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
    },
    cancel: {
        textDecorationLine: "underline",
        marginTop: 10,
        color: "#fff"
    },
    caption: {
        color: "#fff",
        textAlign: "center",
        marginTop: "10%",
        fontSize: 17,
        margin: 10,
        fontWeight: "600"
    }
})