import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Rates from "./RatesTab";
import { ActivityIndicator, Button, StatusBar, Text, View } from "react-native";
import ConvertTab from "./ConvertTab";
import React, { useState, useEffect} from "react";
import { MaterialIcons,FontAwesome } from '@expo/vector-icons';
import { myContext } from "./myContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChooseDefaultCurrency from "./ChooseDefaultCurrency";

export default function App(){
  const [activityIndicator, setActivityIndicator] = useState(true)
  const [internetConnection, setInternetConnection] = useState(true)
  const [isoCodeAmount, setIsocodeAmount] = useState("**")
  const [countryAmount, setCountryAmount] = useState("Select Currency")
  const [isoCodeConvertedAmount, setisoCodeConvertedAmount] = useState("**")
  const [countryConvertedAmount, setCountryConvertedAmount] = useState("Select Currency")
  const [clickedN, setClickedN] = useState('amount')
  const [convertingCurrency, setConvertingCurrency] = useState(null)
  const [showMain, setShowMain] = useState(false)
  const [rates, setRates] = useState({"NGN":100})
  const [isVisible, setIsVisible] = useState(false)
  const [componentShown, setComponentShown] = useState(true)
  // The below is for stating maybe the currency list for the first amount should be displayed
  const [listVisible1, setListVisible1] = useState(false)
  // The below is for stating maybe the currency list for the second amount should be displayed
  const [listVisible2, setListVisible2] = useState(false)
  useEffect(()=>{
    (async()=>{
      const storage = await AsyncStorage.getItem('stored')
      const {cca, icca,ca,ica,cc} = storage!=null? JSON.parse(storage):{cca:"Select Currency",icca:"**", ca:"Select Currency", ica: "**", cc: null }
      setCountryConvertedAmount(cca)
      setisoCodeConvertedAmount(icca)
      setCountryAmount(ca)
      setIsocodeAmount(ica)
      setConvertingCurrency(cc)
      setShowMain(cc!=null?true:false)
    })()
  },[])
  useEffect(()=>{
    let stored = {cca: countryConvertedAmount,icca: isoCodeConvertedAmount,ca: countryAmount,ica: isoCodeAmount,cc: convertingCurrency}
    stored = JSON.stringify(stored)
    AsyncStorage.setItem('stored',stored )
  },[convertingCurrency, isoCodeAmount, isoCodeConvertedAmount])
  
  // the below is just to know the one clicked out of the TextInputs
  const currencySelected =(amountOrConvertedAmount, isoCode, country)=>{
    if (amountOrConvertedAmount==="amount"){
      setIsocodeAmount(isoCode);setCountryAmount(country);setClickedN("convertedAmount");setConvertingCurrency(countryConvertedAmount)
    }
    else if (amountOrConvertedAmount==="convertedAmount"){
      setisoCodeConvertedAmount(isoCode); setCountryConvertedAmount(country);setClickedN("amount");setConvertingCurrency(countryAmount)
    }
}

useEffect(()=>{
  if (countryAmount!="Select Currency"){
    setShowMain(true)
  }
  else{
    setShowMain(false)
  }
  fetch('https://openexchangerates.org/api/latest.json?app_id=0904e09597d840a7937cc6dab3f623e4')
  .then((response)=>response.json())
  .then((json)=>{setRates(json.rates);setComponentShown(true); setActivityIndicator(false)}) 
  .catch((error)=>{setComponentShown(false);setActivityIndicator(false)})
},[internetConnection])
  const Tab = createMaterialTopTabNavigator()
  
  if (activityIndicator=== true){
    return (<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator size='large' color={'blue'} />
    </View>)
  }
  else {
  return(
    <myContext.Provider value={{setShowMain,clickedN, setClickedN,countryConvertedAmount, setCountryConvertedAmount,isoCodeConvertedAmount, setisoCodeConvertedAmount,countryAmount, setCountryAmount,isoCodeAmount, setIsocodeAmount,currencySelected,listVisible1, setListVisible1,listVisible2,setListVisible2,convertingCurrency, setConvertingCurrency,setRates, rates}}>
      <StatusBar backgroundColor={'black'} hidden={false}/>
      {componentShown && !showMain && <ChooseDefaultCurrency />}
      {componentShown && showMain && <NavigationContainer>
        <Tab.Navigator initialRouteName='ConvertTab'  tabBarPosition="bottom" screenOptions={{tabBarActiveTintColor: '#55ff55',tabBarInactiveTintColor: '#ffcccc',tabBarLabelStyle:{fontSize: 13}, tabBarStyle:{height:60,backgroundColor: '#224466'}, }}>
          <Tab.Screen 
          name='ConvertTab' 
          component={ConvertTab}
          options={{tabBarIcon: ({ color})=>{
            return(<FontAwesome name="exchange" size={20} color={color} />)
          }, title: 'Convert', tabBarIndicatorStyle: {opacity:1,},}}
          
          />
          <Tab.Screen 
          name='RatesTab' 
          component={Rates}
          options={{tabBarIcon:({ color})=>{
            return ((<MaterialIcons name="currency-exchange" size={20} color={color} />))
          }, title:'Rates'}}
          />
        </Tab.Navigator>
      </NavigationContainer>}
      {!componentShown && 
      <View>
        <Text style={{fontSize: 18, padding: 8}}>Network Error: Make Sure you turn on your internet connection</Text>
        <View style={{flexDirection: 'row-reverse', padding: 8}}>
          <Button onPress={()=>{setInternetConnection(!internetConnection); setActivityIndicator(true)}} title="Refresh"/>
        </View>
      </View>}
    </myContext.Provider>
  )}
}