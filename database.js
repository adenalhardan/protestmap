import Firebase from 'firebase'

import * as Storage from './storage'

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
 }

const app = Firebase.initializeApp(config)
const database = app.database()

export const update = (pin) => {
   const update = {
      time: pin.time.toString(),
      vote: pin.vote,
   }

   database.ref('pins/').child(pin.key).update(update)
   Storage.store(pin.key)
}

export const upload = (pin) => {
   const key = database.ref().child('pins').push().key

   database.ref('pins/' + key).set({
      type: pin.type,
      position: pin.position,
      time: pin.time.toString(),
      vote: pin.vote,
   })

   return {...pin, key: key}
}

export const download = (callback) => {
   let pins = []

   database.ref('/pins/').once('value').then((snapshot) => {
      const result = snapshot.val()

      for(let key in result) {
         if(Date.now() - new Date(result[key].time).getTime() > 3600000 || result[key].vote < 0) {
            database.ref('pins/').child(key).remove().catch((error) => {
               throw error
            })

         } else {
            Storage.get(key).then((voted) => {
               pins.push({
                  type: result[key].type,
                  position: result[key].position,
                  time: new Date(result[key].time),
                  vote: result[key].vote,
                  voted: voted,
                  key: key
               })
            })
         }
      }
   })

   callback(pins)
}
