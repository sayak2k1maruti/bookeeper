import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import NumberKey from '../atoms/numberKey'
import { Ionicons } from '@expo/vector-icons';

const NumberPad = () => {
    const Keys = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['.','0',<Ionicons name="backspace-outline" size={24} color="black" />]
    ]
    return (
        <View >
            {
                Keys.map((row,_key)=>(
                    <View style={{
                        display:'flex',
                        flexDirection : 'row',
                        justifyContent : 'center'
                    }}>
                        {
                            row.map((key,_key)=>(
                                <NumberKey label = {key} key={_key}/>
                            ))
                        }
                    </View>
                ))
            }
        </View>
    )
}

export default NumberPad