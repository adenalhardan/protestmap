import Firebase from 'firebase'

import * as Storage from './storage'

const config = {
    apiKey: "AIzaSyA9gnOqyMZwf7iVM63Mds2DQtoRMpQXdJ8",
    authDomain: "protestmap-706e1.firebaseapp.com",
    databaseURL: "https://protestmap-706e1.firebaseio.com",
    projectId: "protestmap-706e1",
    storageBucket: "protestmap-706e1.appspot.com",
    messagingSenderId: "363029104916",
    appId: "1:363029104916:web:a8a3a46e3446f02f35da01",
    measurementId: "G-E0J0YX37DF"
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
