import { StyleSheet } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Materials from '../../components/DrawNavigator/Materials/Materials';
import Classes from '../../components/DrawNavigator/Classes/Classes';
import Archive from "../../components/DrawNavigator/Archive/Archive";
import Notifications from '../../components/DrawNavigator/Notifications/Notifications';
import CreateClass from '../../components/DrawNavigator/CreateClass/CreateClass'
import JoinClass from '../../components/DrawNavigator/JoinClass/JoinClass';
import Server from '../../components/DrawNavigator/InsideClass/Server';
import Profile from '../../components/DrawNavigator/Profile/Profile';
import DashBoard from '../../components/DrawNavigator/Home/DashBoard';
import Meeting from '../../components/DrawNavigator/Meeting/Meeting';
import CustomDraw from '../../components/DrawNavigator/custom/CustomDraw';
import SettingsScreen from '../../components/DrawNavigator/Settings/SettingsScreen';
import About from '../../components/DrawNavigator/About/About';
import Contact from '../../components/DrawNavigator/Contact/Contact';
import People from '../../components/DrawNavigator/People/People';
import Settings from '../../components/DrawNavigator/RoomSettings/Settings';
import Phone from '../../components/DrawNavigator/PhoneVerifier/Phone';
import Verifier from '../../components/DrawNavigator/Verifier/Verifier';
import RubixMeeting from '../../components/DrawNavigator/RubixMeeting/RubixMeeting';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <Drawer.Navigator 
      useLegacyImplementation
      screenOptions = {{
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#0c002b",
        drawerInactiveTintColor: "#fff",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#0c002b",
        },
        drawerLabelStyle : {
          marginLeft: -20
        }
      }}
      drawerContent = {
        (props) => <CustomDraw {...props} />
      } 
    >
        <Drawer.Screen 
          name="DashBoard" 
          component = {DashBoard}
          options = {{
            drawerIcon: ({color}) => (
              <MaterialIcons name = "dashboard" size = {30} color = {color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Rooms" 
          component = {Classes} 
          options = {{
            drawerIcon: ({color}) => (
              <MaterialIcons name = "groups" size = {30} color = {color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Materials" 
          component = {Materials}
          options = {{
            drawerIcon: ({color}) => (
              <MaterialIcons name = "menu-book" size = {30} color = {color} />
            )
          }} 
        />
        <Drawer.Screen 
          name="Archived" 
          component = {Archive} 
          options = {{
            drawerIcon: ({color}) => (
              <MaterialIcons name = "archive" size = {30} color = {color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Notifications" 
          component = {Notifications} 
          options = {{
            drawerIcon: ({color}) => (
              <MaterialIcons name = "notifications" size = {30} color = {color} />
            )
          }}
        />
      <Drawer.Screen 
        name="Settings" 
        component = {SettingsScreen} 
        options = {{
          drawerIcon: ({color}) => (
            <MaterialIcons name = "settings" size = {30} color = {color} />
          )
        }}
      />
      <Drawer.Screen 
        name="About" 
        component = {About} 
        options = {{
          drawerIcon: ({color}) => (
            <MaterialIcons name = "contacts" size = {30} color = {color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Contact" 
        component = {Contact} 
        options = {{
          drawerIcon: ({color}) => (
            <MaterialIcons name = "mail" size = {30} color = {color} />
          )
        }}
      />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Profile" component = {Profile} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Create a Room" component = {CreateClass} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Join a Room" component = {JoinClass} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Server" component = {Server} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Emergency Meeting" component = {Meeting} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Participants" component = {People} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Room Settings" component = {Settings} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Phone Verification" component = {Phone} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Verifier" component = {Verifier} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="Start Meeting" component = {RubixMeeting} />
    </Drawer.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    flexDirection: "row",
    flex:1,
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 25,
  },
  heading: {
    fontSize: 20,
    fontWeight: "800"
  },
  modalView: {
    margin: 20,
    marginTop: "40%",
    backgroundColor: "#120A8F",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0
  },
  textStyle: {
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "#120A8F",
    padding: 10,
    borderRadius: 5,
    borderColor: "#120A8F",
    borderWidth: 3,
    fontWeight: "800",
    fontSize: 15,
    margin: 20
  }
})