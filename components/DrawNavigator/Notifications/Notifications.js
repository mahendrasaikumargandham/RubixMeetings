import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Notifications = () => {
  return (
    <View style = {styles.main}>
      <Text style = {{color: "#fff", fontSize: 20}}>Notifications</Text>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0c002b",
    height: "100%"
  }
})