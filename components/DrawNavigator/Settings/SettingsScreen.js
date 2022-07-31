import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <View style = {styles.main}>
      <Text style = {{color: "#fff", fontSize: 20}}>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0c002b",
        height: "100%"
      }
})