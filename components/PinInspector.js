import React from 'react'
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'

export default class PinInspector extends React.Component {
   render() {
      return (
         <>
            <TouchableWithoutFeedback onPress = {this.props.onInspectorPressOut}>
               <View style = {styles.background}/>
            </TouchableWithoutFeedback>

            <View style = {styles.container}>
               <Image style = {styles.image} source = {this.props.pin.type.image}/>
               <Text style = {styles.type}> {this.props.pin.type.text} </Text>
               <Text style = {styles.time}> {this.formatTime(this.props.pin.time)} </Text>

               {!this.props.pin.voted &&
                  <>
                     <TouchableOpacity onPress = {() => {this.props.onVotePress(1)}}>
                        <View style = {styles.upvote}>
                           <Image style = {styles.voteImage} source = {require('../assets/upvote.png')}/>
                        </View>
                     </TouchableOpacity>

                     <TouchableOpacity onPress = {() => {this.props.onVotePress(-1)}}>
                        <View style = {styles.downvote}>
                           <Image style = {styles.voteImage} source = {require('../assets/downvote.png')}/>
                        </View>
                     </TouchableOpacity>
                  </>
               }

            </View>
         </>
      )
   }

   formatTime = (time) => {
      const hour = time.getHours() < 13 ? time.getHours().toString() : (time.getHours() - 12).toString()
      const minute = time.getMinutes() < 10 ? '0' + time.getMinutes().toString() : time.getMinutes().toString()
      const period = time.getHours() < 12 ? 'AM' : 'PM'

      return hour + ':' + minute + ' ' + period
   }
}

const styles = StyleSheet.create({
   container: {
      width: Dimensions.get('window').width,
      height: 130,
      backgroundColor: 'white',
      position: 'absolute',
   },

   background: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },

   image: {
      position: 'absolute',
      top: '40%',
      left: '5%',
      height: 60,
      width: 60
   },

   type: {
      position: 'absolute',
      top: '50%',
      left: '20%',
      alignSelf: 'center',
      fontSize: 30
   },

   time: {
      position: 'absolute',
      top: '55%',
      right: '5%',
      alignSelf: 'center',
      fontSize: 20
   },

   upvote: {
      position: 'absolute',
      top: 130,
      left: 0,
      height: 75,
      width: Dimensions.get('window').width / 2,
      backgroundColor: 'green',
      justifyContent: 'center'
   },

   downvote: {
      position: 'absolute',
      top: 130,
      right: 0,
      height: 75,
      width: Dimensions.get('window').width / 2,
      backgroundColor: 'red',
      justifyContent: 'center'
   },

   voteImage: {
      alignSelf: 'center',
      height: 60,
      width: 55
   }
})
