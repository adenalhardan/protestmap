import React from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'

export default class Type extends React.Component {
   render() {
      return (
         <TouchableOpacity onPress = {() => {this.props.onTypePress(this.props.type)}}>
            <View style = {styles.container}>
               <Image style = {styles.image} source = {this.props.type.image}/>
               <Text style = {styles.text}> {this.props.type.text} </Text>
            </View>
         </TouchableOpacity>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5
   },

   image: {
      height: 50,
      width: 50
   },

   text: {
      fontSize: 15
   }
})
