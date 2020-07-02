import React from 'react'
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native'

const PositioningButtons = (props) => (
   <View style = {styles.container}>
      <TouchableOpacity onPress = {props.onConfirmPress}>
         <View style = {styles.confirm}>
            <Image style = {styles.buttonImage} source = {require('../assets/confirm.png')}/>
         </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {props.onCancelPress}>
         <View style = {styles.cancel}>
            <Image style = {styles.buttonImage} source = {require('../assets/cancel.png')}/>
         </View>
      </TouchableOpacity>
   </View>
)

export default PositioningButtons

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      position: 'absolute',
      top: '65%'
   },


   confirm: {
      height: 75,
      width: 100,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      justifyContent: 'center',
      backgroundColor: 'green'
   },

   cancel: {
      height: 75,
      width: 100,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center',
      backgroundColor: 'red'
   },

   buttonImage: {
      alignSelf: 'center',
      height: 40,
      width: 40
   }
})
