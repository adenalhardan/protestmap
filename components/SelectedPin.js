import React from 'react'
import {Image, Animated, StyleSheet} from 'react-native'
import {Marker} from 'react-native-maps'

const size = 30

export default class SelectedPin extends React.Component {
   scale = new Animated.Value(size)

   componentDidMount() {
      this.props.setInitialPosition(this.props.coordinate)
      this.pulse()
   }

   pulse = () => {
      Animated.sequence([
         Animated.timing(this.scale, {toValue: 1.5 * size}),
         Animated.timing(this.scale, {toValue: size})
      ]).start(() => this.pulse())
   }

   render() {
      return (
         <Marker draggable coordinate = {this.props.coordinate} onDragEnd = {this.props.onDragEnd}>
            <Animated.Image style = {[{height: this.scale, width: this.scale}]} source = {this.props.image}/>
         </Marker>
      )
   }
}
