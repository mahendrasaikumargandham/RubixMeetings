import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const Archive = () => {
  const items = useSelector(
    (state) => state.classReducer.selectedItems.items
  );
  const dispatch = useDispatch();
  const removeClass = (item) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item
    })
  }
  return (
    <ScrollView style={styles.main}>
      <View>
        {items.map((item, index) =>(
              <TouchableOpacity
              style = {styles.box}
              // onPress = {handleRedirect}
              key = {index}
              >
                <View style = {styles.view}>
                  <Text style = {styles.heading}>{item.className} {item.section}</Text>
                  <Text>
                    <TouchableOpacity 
                      // onPress = {() => removeClass(item)}
                    >
                      <MaterialIcons name = "unarchive" size = {25} color = "white" /> 
                    </TouchableOpacity>
                  </Text>
                </View>
                  <Text style = {styles.subject}>{item.subjectName}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </ScrollView>
    
  );
};

export default Archive;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0c002b",
    height: "100%",
    flex: 1, 
  },
  text: {
    color: "#fff",
    fontSize: 20
  },
  box: {
    backgroundColor: "rgb(80, 30, 180)",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  },
  subject: {
    fontSize: 18,
    color: "white",
    marginTop: 20
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
});

