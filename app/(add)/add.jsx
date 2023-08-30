import { View, Text, Pressable, ScrollView, TextInput, StyleSheet } from 'react-native'
import { R } from '../../config';
import NumberPad from '../../components/layouts/numberPad';
import {  getAllWallets , getAllTransactionCategories} from '../../api/getUserPreferranceAPI';
import { useEffect, useState } from 'react';
import Hr from '../../components/atoms/hr';
import { Icons } from '../../icons';
import { handleKeypadInput, updateCurrentAmount } from '../../utils/app.utils';
import { TRANSACTION_MODE, EVAL_STATUS } from '../../enum';
import { DEFAULT } from '../../defaults';
import useTransactionDetails from '../../hooks/TransactionDetails';



const Add = () => {
  const [allTransactionCategories,setAllTransactionCategories] = useState(getAllTransactionCategories())
  const wallets = getAllWallets()
  
  const [transactionDetails,updateTransactionDetails] = useTransactionDetails()

  const [panelStatus,setPanelStatus] = useState(0) 
    //1 : Show all Payment Categories , -1: Show all Wallets
  
  const [keypadStatus,setKeypadStatus] = useState(true)
  const [evalError,setEvalError] = useState(false)
  

  const handleCategoryChange = (category) => () => {
    updateTransactionDetails("category",category)
    setPanelStatus(0)
  }
  const handleWalletChange = (wallet) => () => {
    updateTransactionDetails("wallet",wallet)
    setPanelStatus(0)
  }
  const handleModeChange = (newMode) => () => {
    updateTransactionDetails("mode",newMode)
    updateTransactionDetails("category",DEFAULT.TransactionCategories[newMode][0])
  }
  const handleCategoryPanelOpen = () => setPanelStatus(1)
  const handleWalletPanelOpen = () => setPanelStatus(-1)
  
  const handleKeyPress = (key) => () => handleKeypadInput(key,transactionDetails,updateTransactionDetails,evalError,setEvalError,handleSubmit);
  const setKeyPadStatusHandler = (flag) => () => setKeypadStatus(flag)
  const handleDescriptionUpdate = (e) => {
    setKeypadStatus(true)
    updateTransactionDetails("description",e.nativeEvent.text)
  }
  const handleSubmit = (transactionDetails) =>  {
    console.log(transactionDetails)
  }
  return (
    <View style={{
      flex : 1,
      paddingTop : 40,
      alignItems:'center'
    }}>
      <Text
      style={{
        width : '100%',
        textAlign : 'center',
        color : '#545454',
        marginVertical : 5
      }}>You've Spent $1000 today</Text>

      <View style={Style.container}>

      <View style={Style.modeContainer}>
        <Pressable 
          style={transactionDetails.mode===TRANSACTION_MODE.INCOME ? Style.modeSwitch_Pressed : Style.modeSwitch}
          onPress={handleModeChange(TRANSACTION_MODE.EXPENSE)}
          >
          <Text style={Style.modeSwitch_text}>Expense</Text>
        </Pressable>
        <Pressable 
          style={transactionDetails.mode===TRANSACTION_MODE.EXPENSE ? Style.modeSwitch_Pressed : Style.modeSwitch}
          onPress={handleModeChange(TRANSACTION_MODE.INCOME)}
          >
          <Text style={Style.modeSwitch_text}>Income</Text>
        </Pressable>
      </View>

        <Text style={Style.label}>Amount</Text>
        <Pressable onPress={setKeyPadStatusHandler(true)}>
          <ScrollView >
            <Text style={[{color:evalError?R.Colors.accent.danger : R.Colors.text.primary},Style.amount]}>
              {evalError ? '' : '₹'}
              {transactionDetails.amount}</Text>
          </ScrollView>
          <Hr/>
        </Pressable>
        <View >

          {/* Expense Category (i.e. Foods , LifeStyle etc etc) */}
          <Text style={Style.label}>{transactionDetails.mode === TRANSACTION_MODE.EXPENSE?'Expense Made for':'Income from'} </Text>
          <Pressable style={Style.currentCategory} onPress={handleCategoryPanelOpen}>
            {transactionDetails.category.icon(transactionDetails.category.color,35)}
            <Text style={{paddingHorizontal : 15,fontSize:20,fontWeight:'bold'}}>{transactionDetails.category.name}</Text>
            <Text style={{position:'absolute',right:0}}>
              <Icons.downCircleArrowHollow color={transactionDetails.category.color} dim={30}/>
            </Text>
          </Pressable>

          {/* Expense Wallet (i.e Cash , UPI etc) */}
          <Text style={Style.label}>Select a Wallet</Text>
          <Pressable style={Style.currentCategory} onPress={handleWalletPanelOpen}>
            <transactionDetails.wallet.icon color = {transactionDetails.wallet.color} dim = {25}/>
            <Text style={{paddingHorizontal : 15,fontSize:18,}}>{transactionDetails.wallet.name}</Text>
            <Text style={{position:'absolute',right:0}}>
              <Icons.downCircleArrowHollow color={transactionDetails.wallet.color} dim={25}/>
            </Text>
          </Pressable>

          {/* Expense Details */}
          <Text style={Style.label}>Description</Text>
          <TextInput 
            onTouchStart={setKeyPadStatusHandler(false)} 
            onSubmitEditing={handleDescriptionUpdate}
            style={{marginHorizontal : 10,}} 
            placeholder='Add Description'/>
        </View>

      </View>


      <NumberPad visibility={keypadStatus} handleKeyPress = {handleKeyPress}/>
      {
        panelStatus === 1? 
        <PaymentCategories allCategories={allTransactionCategories[transactionDetails.mode]} currCategory = {transactionDetails.category} handleCategoryChange = {handleCategoryChange}/>
        :
        ''
      }
      {
        panelStatus === -1?
        <Wallets allWallets={wallets} currWallet={transactionDetails.wallet} handleWalletChange={handleWalletChange}/>
        :
        ''
      }

    </View>
  )
}


export default Add


const Wallets = ({allWallets,currWallet,handleWalletChange}) => {
  return (
    <View style={Style.panelScreen}>
    <View style={Style.screen}/>
    <View style={Style.panelContainer}>
      <ScrollView >
        <View style={Style.panel}>
        {
          allWallets.map((item,key)=>(
            <Pressable
            key = {key}
              style ={[
                Style.categoryItem,
                {
                  opacity : currWallet.name === item.name ? 1 : 0.4,
                  backgroundColor : item.color,
                  borderRadius : 0,
                }]}
              onPress={handleWalletChange(item)}
            >
              <item.icon color='#343434' dim = {60}/>
                <Text style={{fontSize : 12, paddingHorizontal: 15, overflow : 'hidden',color : '#343434'}}>{item.name}</Text>
            </Pressable>
          ))
        }
        </View>
      </ScrollView>
    </View>
    </View>
)
}

const PaymentCategories = ({allCategories,currCategory,handleCategoryChange}) => {
  return (
    <View style={Style.panelScreen}>
      <View style={Style.screen}/>
      <View style={Style.panelContainer}>
        <ScrollView >
          <View style = {Style.panel}> 
          {
            allCategories.map((item,key)=>(
              <Pressable
              key = {key}
                style ={[
                  Style.categoryItem,
                  {
                    opacity : currCategory.name === item.name ? 1 : 0.4,
                    backgroundColor : item.color
                  }]}
                onPress={handleCategoryChange(item)}
              >
                {item.icon('#343434',60)}
                  <Text style={{fontSize : 12, paddingHorizontal: 15, overflow : 'hidden',color : '#343434'}}>{item.name}</Text>
              </Pressable>
            ))
          }
          </View>
        </ScrollView>
      </View>
      </View>
  )
}

const Style = StyleSheet.create({
  container : {
    width:'95%',
    backgroundColor:'#fff',
    borderRadius:25,
    paddingVertical:10,
    paddingHorizontal:15
  },
  label : {
    padding:3,
    marginLeft:5,
    marginTop: 5,
    fontSize:15,
    fontWeight:'bold',
    color:R.Colors.text.secondary
  },
  amount :{
    fontSize : 50,
    textAlign : 'left',
    marginLeft: 10,
    width : '100%',
    height : 60,
    overflow : 'scroll'
  },
  currentCategory : {
    flexDirection: 'row',
    alignItems : 'center',
    marginLeft : 25
  },
  panelScreen : {
    position: 'absolute',
    top : 0,
    bottom : 0,
    left : 0,
    right : 0,
    display : 'flex',
    justifyContent : 'center',
    alignContent : 'center',
    alignItems : 'center'
  },
  panelContainer: {
    maxHeight : '90%',
    width : '95%',
    backgroundColor: 'mistyrose',
    borderRadius : 25,
    paddingVertical : 20,
  },
  panel : {
    flexDirection : 'row',
    flexWrap : 'wrap',
    alignItems : 'center',
    justifyContent : 'space-evenly',
    height : '100%'
  },
  categoryItem : {
    alignContent : 'center',
    alignItems : 'center',
    alignContent : 'center',
    justifyContent : 'center',
    margin : 5,
    width : 120,
    height : 120,
    marginVertical : 5,
    borderRadius : 60,
  },
  screen: {
    position : 'absolute',
    width : '100%',
    height : '100%',
    backgroundColor : '#000',
    opacity : 0.5,
  },
  modeContainer :{
    width:"95%",
    height:50,
    marginHorizontal:'2.5%',
    flexDirection:'row'
  },
  modeSwitch : {
    flex:1,
    alignItems : 'center',
    justifyContent : 'center',
    margin : 2,
    backgroundColor : R.Colors.accent.secondary,
    borderRadius:5,
    elevation : 20
  },
  modeSwitch_Pressed :{
    flex:1,
    alignItems : 'center',
    justifyContent : 'center',
    margin : 2,
    backgroundColor : R.Colors.accent.disabled,
    borderRadius:0,
  },
  modeSwitch_text : {
    fontSize : 20,
    fontWeight:'bold',
    color : '#fff'
  }
})