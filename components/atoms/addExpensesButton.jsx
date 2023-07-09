import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Animated, { useSharedValue,useAnimatedStyle,withSpring, withTiming } from 'react-native-reanimated'
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { R } from '../../config';
import { useRouter } from 'expo-router';


const AddExpensesButton = () => {
    const router = useRouter()
    const [open , setOpen] = useState(false)
    const offset = useSharedValue(0)
    const handleAdd = () => {setOpen(false);offset.value=0;router.push('/add')};
    const handleToogle = (open) => () => {offset.value=100*(!open),setOpen(!open)}
    const handleAddExpensePress = (open) => () => {
      if(!open){
        setOpen(!open)
        offset.value=100
      }else{
        handleAdd()
      }
    }
  
    
    return(
      <>
      <Animated.View style={[
          {position : 'absolute',
          bottom : 0,
          right : 0,
          },
          useAnimatedStyle(()=>(
            {
              height : withSpring(offset.value.toString()+'%', {
                stiffness: 20,
                mass: 0.3,
            }),
              width : withSpring(offset.value.toString()+'%', {
                stiffness: 20,
                mass: 0.3,
            }),
              display: open ? 'flex' : 'none'
            }
          ))
        ]}>
          <Pressable style={{
            position:'absolute',
            height:'100%',
            width:'100%',}} onPress={handleToogle(open)}>
                <Animated.View style={[{
                    position:'absolute',
                    height:'60%',
                    bottom : 0,
                    width:'100%',
                    backgroundColor : '#22222255',
                    borderTopLeftRadius : 1000,
                },useAnimatedStyle(()=>({
                    // borderTopStartRadius : withSpring(10000 - 100*offset.value,{mass:1,stiffness:20})
              }))]}></Animated.View>
            </Pressable>

            
          <View style={{
            height : 60,
            width : 60,
            borderRadius : 100,
            right : 35,
            bottom : 200,
            position : 'absolute',
            backgroundColor : R.Colors.secondaryAccent,
            display : 'flex',
            justifyContent : 'center',
            alignContent : 'center',
            alignItems : 'center',
            elevation : 20
          }}>
            <FontAwesome name="exchange" size={24} color="#fefefe" />
            <Text style={{
              backgroundColor : '#222222aa',
              borderRadius : 10,
              position : 'absolute',
              textAlign : 'center',
              right : 80,
              color :'#fefefe',
              width : 150,
              padding : 5
            }}>Transfer</Text>
          </View>
        </Animated.View>
        
          <Pressable onPress={handleAddExpensePress(open)} style={{
            height : 75,
            width : 75,
            borderRadius : 100,
            right : 25,
            bottom : 100,
            position : 'absolute',
            backgroundColor : R.Colors.primaryAccent,
            display : 'flex',
            justifyContent : 'center',
            alignContent : 'center',
            alignItems : 'center',
            elevation : 20
          }}>
            {open ? <FontAwesome5 name="pencil-alt" size={24} color="#fefefe" /> : <Fontisto name="plus-a" size={24} color="#fefefe" />}
            
            <Text style={{
              backgroundColor : '#222222aa',
              borderRadius : 10,
              position : 'absolute',
              textAlign : 'center',
              right : 80,
              color :'#fefefe',
              width : 150,
              padding : 5,
              display: open ? 'flex' : 'none'
            }}>Add New Entry</Text>
          </Pressable>

  
      </>
    )
}

export default AddExpensesButton