import React from 'react'
import {StyleSheet, Dimensions, Alert} from 'react-native'

import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as Linking from 'expo-linking'

import SelectedPin from './SelectedPin'
import UserPin from './UserPin'
import Pins from './Pins'
import PositioningButtons from './PositioningButtons'

const deltas = {
   latitudeDelta: 0.0922 / 8,
   longitudeDelta: 0.0421 / 8
}

export default class Map extends React.Component {
   state = {
      location: null,
      position: null
   }

   componentDidMount() {
      this.getLocation()
      Location.watchPositionAsync({distanceInterval: 5}, this.getLocation)
   }

   render() {
      if(this.state.location) {
         return (
            <>
               <MapView ref = {ref => (this.map = ref)} style = {styles.map} initialRegion = {{...this.state.location, ...deltas}}>
                  {this.props.positioning &&
                     <SelectedPin
                        coordinate = {{...this.state.location, latitude: this.state.location.latitude + 0.001}}
                        onDragEnd = {(event) => this.setState({position: event.nativeEvent.coordinate})}
                        setInitialPosition = {this.setInitialPosition}
                        image = {this.props.pin.type.image}
                     />
                  }

                  {this.props.pins && <Pins pins = {this.props.pins} onPinPress = {this.props.onPinPress}/>}

                  <UserPin coordinate = {this.state.location}/>

               </MapView>

               {this.props.positioning &&
                  <PositioningButtons
                     onConfirmPress = {() => this.props.onConfirmPress(this.state.position)}
                     onCancelPress = {this.props.onCancelPress}
                  />
               }
            </>
         )
      } else {
         return null
      }
   }

   setInitialPosition = (coordinate) => {
      this.setState({
         position: coordinate
      })
   }

   getLocation = async () => {
      let {status} = await Permissions.askAsync(Permissions.LOCATION)

      if(status === 'granted') {
         let location = await Location.getCurrentPositionAsync({})

         this.setState({location: {
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude,
         }})

      } else {
         Alert.alert('Location Error', 'Please make sure your location services are enabled in settings', [{
            text: 'Open Settings',
            onPress: () => {Linking.openURL('app-settings:')},
            style: 'cancel'
         }], {canceable: false})

         throw new Error('Location Non Grata!')
      }
   }

   centerOnLocation = () => {
      this.map.animateToRegion({...this.state.location, ...deltas})
   }

   centerOnPin = (pin) => {
      this.map.animateToRegion({...pin.position, ...deltas})
   }
}

const styles = StyleSheet.create({
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
   }
})
