import { View, Text } from 'react-native'
import React from 'react'
import { R } from '../../config'

const Hr = () => {
  return (
    <View
        style={{
            width:'100%',
            height : 2,
            backgroundColor : R.Colors.text.secondary
        }}
    >
    </View>
  )
}

export default Hr