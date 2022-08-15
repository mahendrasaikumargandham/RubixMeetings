import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import LottieView from "lottie-react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

const FingerPrint = ({ route }) => {
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
        navigation.navigate("Start Meeting");
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
            <Text style = {styles.rubix}>Rubix Verifier</Text>
        </View>
      <View>
        <LottieView 
            style = {{ alignSelf: "center", height: 250 }}
            source = {require("../../../assets/json/validate.json")}
            autoPlay
            loop
        />
      </View>
      <View>
        <TouchableOpacity onPress = {() => handleFingerPrintAuth()}>
            <Text style = {styles.verify}>Verify FingerPrint</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FingerPrint

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
    verify: {
        color: "#fff",
        alignSelf: "center",
        backgroundColor: "#8f00ff",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        fontSize: 17,
        fontWeight: "700",
    }
})