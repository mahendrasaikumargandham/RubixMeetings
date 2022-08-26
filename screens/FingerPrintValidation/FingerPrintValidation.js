import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import LottieView from "lottie-react-native";
import { TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

const FingerPrintValidation = () => {
    const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(false);
    const navigation = useNavigation();

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
        navigation.navigate("Home")
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

  return (
    <View style = {styles.container}>
        <View>
            <Text style = {styles.rubix}>Rubix Meetings</Text>
        </View>
      {/* <View>
        <LottieView 
            style = {{ alignSelf: "center", height: 250 }}
            source = {require("../../assets/json/fingerprint.json")}
            autoPlay
            loop
        />
      </View> */}
      <View>
        <TouchableOpacity onPress = {() => handleFingerPrintAuth()}>
            <Text style = {styles.fingerPrint}>Verify FingerPrint</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FingerPrintValidation

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#0c002b"
    },
    rubix: {
        marginTop: "30%",
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'center',
        color: "#fff"
    },
    fingerPrint: {
        color: "#0c002b",
        alignSelf: "center",
        backgroundColor: "#fff",
        padding: 10,
        margin: 20,
        borderRadius: 10,
        fontSize: 17,
        fontWeight: "700"
    }
})