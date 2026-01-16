import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function Button() {
  return (
    <Pressable onPress={()=> console.log('nothing')}>
        <Text></Text>
    </Pressable>
  )
}