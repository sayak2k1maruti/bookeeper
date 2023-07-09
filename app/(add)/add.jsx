import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { R } from '../../config';
import { useRouter } from 'expo-router';
import NumberPad from '../../components/layouts/numberPad';
import { getAllDebitCategories } from '../../api/getUserPreferranceAPI';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const Add = () => {
  //const [allDebitCategories,setAllDebitCategories] = useState(getAllDebitCategories())
  const allDebitCategories = getAllDebitCategories()
  const [currCategory,setCurrCategory] = useState(allDebitCategories[0].name)
  const handleCategoryChange = (name) => () => {
    // let index = 0
    // for (let i = 0 ; i < allDebitCategories.length ; i++){
    //   if ( allDebitCategories[i].name === name){
    //     index = i
    //     break
    //   }
    //   let modifiedList = [allDebitCategories[index],...allDebitCategories.slice(0,index),...allDebitCategories.slice(index+1,allDebitCategories.length)]
    //   setAllDebitCategories([...modifiedList])
    // }
    setCurrCategory(name)
  }
  return (
    <View style={{
      flex : 1,
      paddingTop : 30
    }}>
      <Text
      style={{
        width : '100%',
        textAlign : 'center',
        color : '#545454',
        marginVertical : 15
      }}>You Spent $1000 today</Text>
      <Text style={{
        fontSize : 50,
        marginTop : 20,
        textAlign : 'center',
        width : '100%'
      }}>
        $450.7
      </Text>
      <Text
        style={{width : '100%',fontSize:15,textAlign : 'center',color : '#545454',marginTop : 50}}>
         {currCategory}
      </Text>
      <TextInput
        style={{width : '100%',fontSize: 20,textAlign : 'center',color : '#545454',marginTop:10 ,marginBottom : 50}}
        placeholder='Add Note'
        />

      <NumberPad/>
        <PaymentCategories 
        allCategories={allDebitCategories} 
        currCategory = {currCategory}
        handleCategoryChange = {handleCategoryChange}
        />
      <Close/>
    </View>
  )
}

const Close = () => {
  const router = useRouter()
  const handleClose = () => router.back()
  return(
    <Pressable  
      onPress={handleClose}
      style={{
        position : 'absolute',
        bottom : 10,
        left : '25%',
        right: '25%',
        elevation : 20,
        height : R.Dim.navBarHeight*.7,
        backgroundColor : R.Colors.accentDanger,
        alignItems   : 'center',
        justifyContent : 'center',
        borderRadius: 100
      }}>
      <MaterialIcons name="close-fullscreen" size={35} color="#fefefe" />
    </Pressable>
  )
}
export default Add

const PaymentCategories = ({allCategories,currCategory,handleCategoryChange}) => {
  const [panelState,setPanelState ] = useState(false)
  const handleClick = (name) => () => {
    console.log(name)
    handleCategoryChange(name)()
    setPanelState(false)
  }
  return (
    <>
    {
      panelState ?
      <ScrollView style={{
        position : 'absolute',
        top : 100,
        bottom : 100,
        borderRadius : 30,
        padding : 25,
        left : 10,
        right : 10,
        backgroundColor : 'mistyrose',
        elevation : 50,
        zIndex : 100,
      }}>
        <View
          style = {{
            flexDirection : 'row',
            flexWrap : 'wrap',
            width : '100%',
            height : '100%',
            justifyContent : 'space-evenly'
          }}
        >
          {
            allCategories.map((item,key)=>(
              <Pressable
              key = {key}
                style ={{
                  alignContent : 'center',
                  alignItems : 'center',
                  alignContent : 'center',
                  justifyContent : 'center',
                  width : 120,
                  height : 120,
                  backgroundColor : item.color,
                  marginVertical : 5,
                  borderRadius : 60,
                  opacity : currCategory === item.name ? 1 : 0.4
                }}
                onPress={handleClick(item.name)}
              >
                {item.icon('#343434',60)}
                  <Text style={{fontSize : 12, paddingHorizontal: 15, overflow : 'hidden',color : '#343434'}}>{item.name}</Text>
              </Pressable>
            ))
          }
        </View>
        
      </ScrollView>:
      ''
    }
    
    <View style={{
      flexDirection:'row',
      width : '100%',
      marginVertical : 10
    }}>
      <ScrollView
        horizontal = {true}
        style={{
          width : '80%',
          flexDirection : 'row',

        }}
      >
        {
          allCategories.map((item,key)=>(
            <Pressable 
            key = {key}
              style = {{
                opacity : 1,
                flexDirection : 'row',
                paddingVertical : 6,
                paddingHorizontal: 10,
                alignItems : 'center',
                backgroundColor : item.color,
                marginHorizontal : 4,
                borderRadius : 50,
                opacity : currCategory === item.name ? 1 : 0.4
              }}
              onPress={handleCategoryChange(item.name)}
            >
              {item.icon('#343434',25)}
              <Text style={{fontSize : 15, color : '#343434',marginHorizontal : 2}}>{item.name}</Text>
            </Pressable>
          ))
        }
      </ScrollView>
      <Pressable style={{width : '20%', justifyContent :'center', alignItems : 'center', elevation : 20}} onPress={()=>setPanelState(true)}>
      <Feather name="more-horizontal" size={24} color="black" />
      </Pressable>
    </View>
    </>
  )
}