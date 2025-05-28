import React, {useState, useRef, useEffect,useContext, useCallback } from "react";
import {View, Text, StyleSheet, TouchableHighlight, TextInput, TouchableOpacity, Pressable, TouchableWithoutFeedback, ScrollView} from "react-native";

import { styles } from "../myStyles";
import { useWindowDimensions } from "react-native";
import FlatListCountry from "../components/flatlistcountry";
import { ClickedNContext, ConvertingCurrencyContext, CountryAmountContext, CountryConvertedAmountContext, CurrencySelectedContext, IsoCodeAmountContext, IsoCodeConvertedAmountContext, ListVisible1Context, ListVisible2Context, RatesContext, ShowMainContext } from "../myContext";
import Header from '../components/converttabheader'
import ConvertComponentContainer from '../components/convert-container'
import IndicativeExchangeRate from '../components/indicative-rate'
import CalculateButtons from "../components/calculate-buttons";
// import flags from "react-native-country-flag/data";
export default function ConvertTab() {
  const { 
    showMain, setShowMain 
  } = useContext(ShowMainContext) || {};

  const { 
    clickedN, 
    setClickedN 
  } = useContext(ClickedNContext) || {};

  const { 
    countryConvertedAmount, 
    setCountryConvertedAmount 
  } = useContext(CountryConvertedAmountContext) || {};

  const { 
    isoCodeConvertedAmount, 
    setisoCodeConvertedAmount 
  } = useContext(IsoCodeConvertedAmountContext) || {};

  const { 
    countryAmount, 
    setCountryAmount 
  } = useContext(CountryAmountContext) || {};

  const { 
    isoCodeAmount, 
    setIsocodeAmount 
  } = useContext(IsoCodeAmountContext) || {};

  const { 
    currencySelected 
  } = useContext(CurrencySelectedContext) || {};

  const { 
    listVisible1, 
    setListVisible1 
  } = useContext(ListVisible1Context) || {};

  const { 
    listVisible2, 
    setListVisible2 
  } = useContext(ListVisible2Context) || {};

  const { 
    convertingCurrency, 
    setConvertingCurrency 
  } = useContext(ConvertingCurrencyContext) || {};

  const { 
    rates, 
    setRates 
  } = useContext(RatesContext) || {};
  // const {clickedN, setClickedN,countryConvertedAmount, setCountryConvertedAmount,isoCodeConvertedAmount, setisoCodeConvertedAmount,countryAmount, setCountryAmount,isoCodeAmount, setIsocodeAmount,currencySelected,listVisible1, setListVisible1,listVisible2,setListVisible2,convertingCurrency, setConvertingCurrency,setRates, rates} = useContext(myContext)
  const [amountToConvert, setAmountToConvert] = useState(null)
  const [convertedCurrency,setConvertedCurrency] = useState(null)
  const{width, height} = useWindowDimensions()
  const componentRef1= useRef(null)
  const componentRef2 = useRef(null)
  const [clicked, setClicked] = useState(null)
  const [pageX1, setPageX1] = useState(null)
  const [pageX2, setPageX2] = useState(null)
  const [pageY1, setPageY1] = useState(null)
  const [pageY2,  setPageY2] = useState(null)
  // The below is used for stating maybe the keyboard should be shown or not
  const [isVisible, setIsVisible] = useState(false)
  const [amount, setAmount] = useState("1")
  // the below is just to know the one clicked out of the TextInputs
  const [convertedAmount, setConvertedAmount] = useState("0")
  const changeVisibility =()=>{
    // sets isVisible to true anytime the text input is focused or clicked on
    setIsVisible(true)
  }
  useEffect(()=>{
    let value=0;
    if (clickedN === 'amount'){
      value = (parseFloat(amount)/rates[convertingCurrency]) * rates[countryConvertedAmount]
      setConvertedAmount(value.toString())
    }
    else if (clickedN ==='convertedAmount' ){
      value= (parseFloat(convertedAmount)/rates[convertingCurrency]) * rates[countryAmount]
      setAmount(value.toString())
    }
  },[amount, convertedAmount, isoCodeAmount, isoCodeConvertedAmount, convertingCurrency, countryAmount, countryConvertedAmount])

  const addNumber =useCallback( (params: any)=>{
    if (params === 'done'){
      setIsVisible(false)
      setClicked(null)
    }
    else if (clicked === 'amount'){
      if (isNaN(params)  === false || params==='.'){
        if (parseFloat(amount)===0 && params!='.'&& amount!='0.'){
          setAmount(params)
        }
        else{
          setAmount(amount+params)
        }
      }
      else if (params === 'ce'){
        setAmount('0')
      }
      else if (params === 'del'){
        if (amount.length ===1){
          setAmount('0')
        }
        else{
          setAmount(amount.slice(0,amount.length-1))
        }
      }
    }
    else if (clicked === 'convertedAmount'){
      if (isNaN(params) === false || params==='.'){
        if (parseFloat(convertedAmount) ===0 && params!='.' && convertedAmount!='0.'){
          setConvertedAmount(params)
        }
        else{
          setConvertedAmount(convertedAmount+params)
        }
      }
      else if (params === 'ce'){
        setConvertedAmount('0')
      }
    else if (params === 'del'){
      if (convertedAmount.length === 1){
        setConvertedAmount('0')
        }
      else{
          setConvertedAmount(convertedAmount.slice(0,convertedAmount.length-1))
          }
      }
    }
  },[amount, convertedAmount, clicked, setAmount, setConvertedAmount, setIsVisible, setClicked])
  const amountInputClicked = useCallback((param: string)=>{
    if (param=='countryAmount'){
      changeVisibility(); 
    setClicked('amount'); 
    setConvertingCurrency(countryAmount); 
    setClickedN('amount')
    }
    else{
      changeVisibility(); 
      setClicked('convertedAmount'); 
      setConvertingCurrency(countryConvertedAmount);
      setClickedN('convertedAmount')
    }
  },[changeVisibility, setClicked, setClickedN, setConvertingCurrency, countryAmount, countryConvertedAmount])
  return(
      <Pressable onPress={()=>{setListVisible1(false);setListVisible2(false);setIsVisible(false);setClicked(null)}} style={{flex:1, backgroundColor: '#0000ff22'}}>
        {/* The view below is the container of all component on this screen */}
          <View style={styles.mainContainer}>
            <Header />
            <ConvertComponentContainer setListVisible1={setListVisible1} setListVisible2={setListVisible2} setIsVisible={setIsVisible} isoCodeAmount={isoCodeAmount} countryAmount={countryAmount} listVisible1={listVisible1} listVisible2={listVisible2} amountInputClicked={amountInputClicked} clicked={clicked} isoCodeConvertedAmount={isoCodeConvertedAmount} amount={amount} countryConvertedAmount={countryConvertedAmount} convertedAmount={convertedAmount} />
            {/* This view component consist of two other views, title and the value of converted currency */}
            {!isVisible && 
              <IndicativeExchangeRate amount={amount} countryAmount={countryAmount} convertedAmount={convertedAmount} countryConvertedAmount={countryConvertedAmount} />
            }
            {isVisible &&
              <CalculateButtons addNumber={addNumber} />
            }
            <View style={[styles.currencies, { height:'85%',width:'95%',alignSelf:'center', zIndex:10, display: listVisible1?"flex":'none' }]}>
              <FlatListCountry prop={"amount"}/>
            </View>
            <View style={[styles.currencies, { height:'85%',width:'95%',alignSelf:'center', display:listVisible2?'flex':'none' }]}>
              <FlatListCountry prop={"convertedAmount"}/>
            </View>
          </View>
      </Pressable>
  )
}
