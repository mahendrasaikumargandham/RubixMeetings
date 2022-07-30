import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import People from '../../TabNavigator/Participants/People';

const Tab = createBottomTabNavigator();

function VideoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#0c002b", height: "100%"  }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#0c002b", height: "100%"  }}>
      <Text>Settings!</Text>
    </View>
  );
}
const Server = () => {

  const navigation = useNavigation();

  return (
    <View style = {styles.main}> 
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: "#0c002b", height: "12%"},
          tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: "rgb(0, 89, 178)",
          tabBarLabelStyle: {fontSize: 12, marginBottom: "10%"}
        }}
      >
        <Tab.Screen 
          name="description" 
          component={VideoScreen}
          options = {{
            tabBarIcon: ({ color}) => (
              <MaterialIcons name = "description" size = {27} color = {color} />
            )
          }}
        />
        <Tab.Screen 
          name="People" 
          component={People}
          options = {{
            tabBarIcon: ({ color}) => (
              <MaterialIcons name = "group" size = {27} color = {color} />
            )
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options = {{
            tabBarIcon: ({ color}) => (
              <MaterialIcons name = "settings" size = {27} color = {color} />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default Server

const styles = StyleSheet.create({
  code: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  servercode: {
    color: "#fff",
    fontSize: 17
  },
  meet: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 3,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  fix: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  memname: {
    marginLeft: 20,
    fontSize: 20,
    fontSize: 20,
    fontWeight: "900",
    color: "#fff"
  },
  id: {
    backgroundColor: "#fff",
    padding: 10, 
    margin: 10,
    borderRadius: 10,
    color: "#0c002b"
  },
  main: {
    backgroundColor: "#0c002b",
    height: "100%"
  },
  image: {
    color: "#fff"
  }
})