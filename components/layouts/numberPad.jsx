import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import NumberKey from '../atoms/numberKey'
import { Ionicons } from '@expo/vector-icons';
import { R } from '../../config';

const NumberPad = ({handleKeyPress,visibility}) => {
    const Keys = [
        [['C','C'],['÷','÷'],['×','×'],['⌫','B']],
        [['1','1'],['2','2'],['3','3'],['-','-']],
        [['4','4'],['5','5'],['6','6'],['+','+']],
        [['7','7'],['8','8'],['9','9'],['=','=']],
        [['.','.'],['0','0'],['00','Z'],['✓','S']]
    ]
    return (
        <View style={{position : 'absolute',bottom : 0,display:visibility?'flex':'none'}}>
            {
                Keys.map((row,_key)=>(
                    <View style={{
                        display:'flex',
                        flexDirection : 'row',
                        justifyContent : 'center'
                    }}>
                        {
                            row.map((key,_key)=>(
                                <NumberKey 
                                    onPress = {handleKeyPress(key[1])}
                                    color={key[1]=='S' ? 
                                        R.Colors.accent.danger 
                                        : 
                                        R.Colors.text.primary} label={key[0]} 
                                    key={_key} />
                            ))
                        }
                    </View>
                ))
            }
        </View>
    )
}

export default NumberPad