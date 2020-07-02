import React from 'react'
import {Image} from 'react-native'
import {Marker} from 'react-native-maps'

const UserPin = (props) => (
   <Marker coordinate = {props.coordinate}>
      <Image style = {{height: 30, width: 30}} source = {require('../assets/user.png')}/>
   </Marker>
)

export default UserPin
