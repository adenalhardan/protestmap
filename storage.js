import {AsyncStorage} from 'react-native'

export const clean = async () => {
   const keys = await AsyncStorage.getAllKeys()
   const times = await AsyncStorage.multiGet(keys)

   times.map((time, index) => {
      if(Date.now() - new Date(time).getTime() > (3600000 * 24)) {
         deleteKey(keys[index])
      }
   })
}

export const store = async (key) => {
   try {
      await AsyncStorage.setItem(key, Date.now().toString())
   } catch(error) {
      throw error
   }
}

export const get = async (key) => {
   try {
      const time = await AsyncStorage.getItem(key) || null

      if(time) {
         return true
      } else {
         deleteKey(key)
         return false
      }

   } catch(error) {
      throw error
   }
}

const deleteKey = async (key) => {
   try {
      await AsyncStorage.removeItem(key)
   } catch(error) {
      throw error
   }
}
