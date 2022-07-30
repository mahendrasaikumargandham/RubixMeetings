import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';

const Materials = () => {
  return (
    <View style = {styles.main}>
      <View style = {styles.box}>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>Physics</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>Mathematics</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>Python</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style = {styles.box}>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>React</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>Cyber</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>Java</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style = {styles.box}>
        <TouchableOpacity>
          <View style = {styles.content}>
            <MaterialIcons name = "folder" size = {100} color = "#fff"/>
            <Text style = {styles.text}>DBMS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Materials

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0c002b",
    height: "100%"
  },
  box: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  content: {
    alignItems: "center"
  },
  text: {
    color: "#fff"
  }
})