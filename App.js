import React from 'react'
import {StyleSheet, TouchableOpacity, Image, Text, View, Dimensions} from 'react-native'

import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

import {AdMobBanner} from 'expo-ads-admob'

import Map from './components/Map'
import TypeList from './components/TypeList'
import PinInspector from './components/PinInspector'

import * as Database from './database'
import * as Storage from './storage'

export default class App extends React.Component {
   state = {
      pins: null,
      pin: null,
      selecting: false,
      positioning: false,
      inspecting: false,
   }

   constructor(props) {
      super(props)

      this.map = React.createRef()

      Storage.clean()
   }

   componentDidMount() {
      Database.download((pins) => {
         this.setState({pins})
      })
   }

   render() {
      return (
         <View style = {styles.container}>
            <Map
               ref = {this.map}
               pins = {this.state.pins}
               pin = {this.state.pin}
               positioning = {this.state.positioning}
               onConfirmPress = {this.onConfirmPress}
               onCancelPress = {this.onCancelPress}
               onPinPress = {this.onPinPress}
            />

            {!this.state.inspecting &&
               <AdMobBanner
                  style = {styles.ad}
                  bannerSize = 'banner'
                  adUnitID = 'ca-app-pub-5767244355381431/7061449482'
                  servePersonalizedAds = {false}
                  onDidFailToReceiveAdWithError = {(error) => {throw new Error(error)}}
               />
            }

            {this.state.inspecting &&
               <PinInspector
                  pin = {this.state.pin}
                  onInspectorPressOut = {this.onInspectorPressOut}
                  onVotePress = {this.onVotePress}
               />
            }

            <TouchableOpacity onPress = {() => {this.map.current.centerOnLocation()}}>
               <Image style = {styles.center} source = {require('./assets/center.png')}/>
            </TouchableOpacity>

            {!this.state.selecting && !this.state.positioning &&
               <TouchableOpacity onPress = {this.onAddPress}>
                  <Image style = {styles.add} source = {require('./assets/add.png')}/>
               </TouchableOpacity>
            }

            {this.state.selecting &&
               <TypeList
                  onTypePress = {this.onTypePress}
                  onTypeListPressOut = {this.onTypeListPressOut}
               />
            }
         </View>
      )
   }

   onAddPress = () => {
      this.setState({
         selecting: true,
         inspecting: false
      })
   }

   onTypePress = (type) => {
      this.setState({
         pin: {type: type},
         selecting: false,
         positioning: true
      })

      this.map.current.centerOnLocation()
   }

   onTypeListPressOut = () => {
      this.setState({
         selecting: false
      })
   }

   onPinPress = (pin) => {
      if(!this.state.positioning) {
         this.setState({
            pin: pin,
            inspecting: true
         })

         this.map.current.centerOnPin(pin)
      }
   }

   onConfirmPress = (position) => {
      let pin = {...this.state.pin, position: position, time: new Date(), vote: 1, voted: true}

      pin = Database.upload(pin)

      this.setState((prevState) => ({
         pins: [...prevState.pins, pin],
         pin: null,
         positioning: false
      }))
   }

   onCancelPress = () => {
      this.setState({
         positioning: false,
         selecting: true
      })
   }

   onInspectorPressOut = () => {
      this.setState({
         inspecting: false,
         pin: null
      })
   }

   onVotePress = (vote) => {
      const index = this.state.pins.findIndex((item) => (item.key === this.state.pin.key))

      let pins = [...this.state.pins]
      let pin = {...this.state.pin, vote: this.state.pin.vote + vote, voted: true}

      if(vote === 1) {
         pin.time = new Date()
      }

      if(index > -1) {
         pins[index] = pin

         this.setState({
            pins: pins,
            pin: pin
         })

         Database.update(pin)
      }
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },

   add: {
      position: 'absolute',
      bottom: 50,
      right: 20,
      height: 75,
      width: 75,
      borderRadius: 20
   },

   center: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      height: 75,
      width: 75,
      borderRadius: 20
   },

   ad: {
      position: 'absolute',
      alignSelf: 'center',
      top: 50,
   }
})
