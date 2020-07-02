import React from 'react'
import {Image} from 'react-native'
import {Marker} from 'react-native-maps'

const Pins = (props) => (
   props.pins.map((pin, index) => (
      <Marker key = {index} coordinate = {pin.position} onPress = {() => {props.onPinPress(pin)}}>
         <Image source = {pin.type.image} style = {{height: 30, width: 30}}/>
      </Marker>
   ))
)

export default Pins
