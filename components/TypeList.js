import React from 'react'
import {StyleSheet, Button, View, FlatList, Dimensions, Text, TouchableWithoutFeedback} from 'react-native'

import Type from './Type'
import {types} from '../types'

export default class TypeList extends React.Component {
   render() {
      return (
         <View>
            <TouchableWithoutFeedback onPress = {this.props.onTypeListPressOut}>
               <View style = {styles.background}/>
            </TouchableWithoutFeedback>

            <View style = {styles.list}>
               <FlatList
                  data = {Object.keys(types)}
                  keyExtractor = {(item, index) => index.toString()}
                  renderItem = {({item}) => <Type type = {types[item]} onTypePress = {this.props.onTypePress}/>}
               />
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   background: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },

   list: {
      position: 'absolute',
      bottom: 50,
      right: 20,
      backgroundColor: 'white',
      borderRadius: 20
   }
})
