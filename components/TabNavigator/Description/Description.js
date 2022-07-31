import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const Description = () => {

    const item = useSelector(
        (state) => state.classReducer.selectedItems.items    
      );
      console.log(item);
  return (
      <View style={styles.main}>
              <TouchableOpacity
              style = {styles.box}
              >
                <View style = {styles.view}>
                  <Text style = {styles.heading}>{item.className} {item.section}</Text>
                </View>
                  <Text style = {styles.subject}>{item.subjectName}</Text>
              </TouchableOpacity>
      </View>
  )
}

export default Description

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0c002b",
        height: "100%"
    },
    textHeading: {
        color: "#fff"
    },
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
        backgroundColor: "rgb(0, 89, 178)",
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
})