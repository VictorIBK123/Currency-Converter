import React, {useState, useRef, useEffect,useContext } from "react";
import {View, Text, StyleSheet, TouchableHighlight, TextInput, TouchableOpacity, Pressable, TouchableWithoutFeedback, ScrollView} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from "./myStyles";
import { useWindowDimensions } from "react-native";
import { FlatListCountry } from "./flatlistcountry";
import CountryFlag from "react-native-country-flag";
import { myContext } from "./myContext";
// import flags from "react-native-country-flag/data";
export default function ConvertTab() {
  const {clickedN, setClickedN,countryConvertedAmount, setCountryConvertedAmount,isoCodeConvertedAmount, setisoCodeConvertedAmount,countryAmount, setCountryAmount,isoCodeAmount, setIsocodeAmount,currencySelected,listVisible1, setListVisible1,listVisible2,setListVisible2,convertingCurrency, setConvertingCurrency,setRates, rates} = useContext(myContext)
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
  useEffect(()=>{(()=>{
    if (componentRef1.current){
      componentRef1.current.measure((x, y, width, height, pageX, pageY) => {
       setPageX1(pageX);
       setPageY1(pageY+height);
      })
    }
    if (componentRef2.current){
      componentRef2.current.measure((x,y,width,height,pageX,pageY)=>{
        setPageX2(pageX);
        setPageY2(pageY+height)
      })
    }
    
  })()
  },[])
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

  const addNumber =(params)=>{
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
  }
  return(
      <Pressable onPress={()=>{setListVisible1(false);setListVisible2(false);setIsVisible(false);setClicked(null)}} style={{flex:1, backgroundColor: '#0000ff22'}}>
        {/* The view below is the container of all component on this screen */}
          <View style={styles.mainContainer}>
            {/* The view below is the container for the header component */}
            <View style={styles.mainHeaderComponent}>
              <View style={styles.currencyConverterTitle}>
              <Text style={styles.currencyConverterTitleText}>Currency Converter</Text>
              </View>
              <View style={styles.currencyConverterDetails}>
                <Text style={styles.currencyConverterDetailsText}>Check live rates, set rate alerts, receive notifications and more</Text>
              </View>
            </View>
            {/* The view below is the container for the main converter component which contains three view components */}
            <View style={styles.mainConverterComponent}>
              {/* This view below is the container for the first currency details, amount and name of country, it also contains two views */}
              <View style={styles.mainConverterComponent1}>
                {/* The view below is the container for the component title "Amount" */}
                <View style={styles.amountAndConvertedAmount}>
                  <Text style={styles.amountAndConvertedAmountText}>Amount</Text>
                </View>
                {/* The view below contains two other views which are the one that contains the currency details like flag, abbr, and currency */}
                <View style={styles.currencyDetailsAndTextInput}>
                  {/* This view contains the flag view, abbr view and currency view */}
                  <TouchableOpacity ref={componentRef1} onPress={()=>{setListVisible1(true);setListVisible2(false);setIsVisible(false)}} style={styles.currencyAbbrFlag}>
                    <View >
                      <CountryFlag isoCode={isoCodeAmount} size={30} style={{borderRadius: 50}} />
                    </View>
                    <View >
                      <Text>{countryAmount}</Text>
                    </View>
                    <View >
                      <AntDesign name="down" size={14} color="grey" />
                    </View>
                  </TouchableOpacity> 
                  {/* This is the component for entering the currency value */}
                  <View style={styles.textInputContainer}>
                    <Pressable disabled={listVisible1 || listVisible2}
                    onPress={()=>{changeVisibility(); setClicked('amount'); setConvertingCurrency(countryAmount); setClickedN('amount')}} 
                    style={(()=>{
                      if (clicked === 'amount'){
                        return([styles.textInput, {backgroundColor: '#0000ff55'}])
                      }
                      else {
                        return(styles.textInput)
                      }
                    })()}>
                      <ScrollView horizontal={true} nestedScrollEnabled={true}>
                        <TextInput editable={false}  scrollEnabled={true} value={amount} style={styles.textInputStyle}/>
                      </ScrollView>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.mainConverterComponent2}>

              </View>
              {/* This view below is the container for the second currency details, amount and name of country,  it also contains two views */}
              <View style={styles.mainConverterComponent3}>
                {/* The view below is the container for the component title "Converted Amount"*/}
                <View style={styles.amountAndConvertedAmount}>
                  <Text style={styles.amountAndConvertedAmountText}>Converted Amount</Text>
                </View>
                {/* The view below contains two other views which are the one that contains the currency details like flag, abbr, and currency */}
                <View style={styles.currencyDetailsAndTextInput}>
                  {/* This view contains the flag view, abbr view and currency view */}
                  <TouchableOpacity ref={componentRef2} onPress={()=>{setListVisible1(false);setListVisible2(true);setIsVisible(false)}}  style={styles.currencyAbbrFlag}>
                    <View>
                      <CountryFlag isoCode={isoCodeConvertedAmount} size={30} style={{borderRadius: 50}} />
                    </View>
                    <View>
                      <Text>{countryConvertedAmount}</Text>
                    </View>
                    <View>
                      <AntDesign name="down" size={14} color="grey" />
                    </View>
                  </TouchableOpacity>
                  {/* This consists the component for entering the currency value */}
                  <View style={styles.textInputContainer}>
                    <Pressable disabled={listVisible1 || listVisible2} onPress={()=>{changeVisibility(); setClicked('convertedAmount'); setConvertingCurrency(countryConvertedAmount);setClickedN('convertedAmount')}} 
                    style={(()=>{
                      if (clicked === 'convertedAmount'){
                        return([styles.textInput, {backgroundColor: '#0000ff55'}])
                      }
                      else {
                        return(styles.textInput)
                      }
                    })()}>
                      <ScrollView horizontal={true} nestedScrollEnabled={true}>
                        <TextInput editable={false}  scrollEnabled={true} value={convertedAmount} style={styles.textInputStyle}/>
                      </ScrollView>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            {/* This view component consist of two other views, title and the value of converted currency */}
            {!isVisible && 
            <View style={styles.otherViews}>
              <View>
                <Text>Indicative Exchange Rate</Text>
              </View>
              <View>
                <Text>
                  {(()=>{
                    let [beforeDecimal, afterDecimal] = amount.split('.')
                    let display =''
                    for (let i=0;i<beforeDecimal.length;i++){
                      if ((i+1)%3==0){
                        display= " "+beforeDecimal[beforeDecimal.length-1-i]+display
                      }
                      else{
                        display= beforeDecimal[beforeDecimal.length-1-i]+display
                      }
                    }
                    if (afterDecimal!=undefined){
                      return (display.concat('.', afterDecimal,' '))
                    }
                    else{
                      return(display.concat(' '))
                    }
                  })()} 
                   {countryAmount} = {(()=>{
                    let [beforeDecimal, afterDecimal] = convertedAmount.split('.')
                    let display =''
                    for (let i=0;i<beforeDecimal.length;i++){
                      if ((i+1)%3==0){
                        display= " "+beforeDecimal[beforeDecimal.length-1-i]+display
                      }
                      else{
                        display= beforeDecimal[beforeDecimal.length-1-i]+display
                      }
                    }
                    if (afterDecimal!=undefined){
                      return (display.concat('.', afterDecimal,' '))
                    }
                    else{
                      return(display.concat(' '))
                    }
                  })()}  {countryConvertedAmount}
                </Text>
              </View>
            </View>}
            {isVisible &&
              <View style={styles.addNumber}>
                <View style={styles.row}>
                  <TouchableHighlight onPress={()=>{addNumber('1')}} underlayColor='#0000ff55' style={[styles.col, {flex: 1/3}]}>
                    <Text style={styles.buttonText}>1</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('2')}} underlayColor='#0000ff55' style={[styles.col, {flex: 1/3}]}>
                    <Text style={styles.buttonText}>2</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('3')}} underlayColor='#0000ff55' style={[styles.col, {flex: 1/3}]}>
                    <Text style={styles.buttonText}>3</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.row}>
                  <TouchableHighlight onPress={()=>{addNumber('4')}} underlayColor='#0000ff55' style={[styles.col, {flex: 1/3}]}>
                    <Text style={styles.buttonText}>4</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('5')}} underlayColor='#0000ff55' style={[styles.col, {flex: 1/3}]}>
                    <Text style={styles.buttonText}>5</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('6')}} underlayColor='#0000ff55' style={[styles.col, {flex: 1/3}]}>
                    <Text style={styles.buttonText}>6</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.row}>
                  <TouchableHighlight onPress={()=>{addNumber('7')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>7</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('8')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>8</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('9')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>9</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('0')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>0</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.row}>
                  <TouchableHighlight onPress={()=>{addNumber('ce')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>CE</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('del')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>Del</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('.')}} underlayColor='#0000ff55' style={styles.col}>
                    <Text style={styles.buttonText}>.</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>{addNumber('done')}} underlayColor='#0000ff55' style={styles.col}>
                    <FontAwesome name="check" size={24} color="green" />
                  </TouchableHighlight>
                </View>
              </View>
            }
          {listVisible1 &&  
                    <View style={[styles.currencies,{top: pageY1-50, height: height-pageY1 }]}>
                      <FlatListCountry prop={"amount"}/>
                    </View>
                  } 
          {listVisible2 &&  
                    <View style={[styles.currencies, {top: pageY2-50, height: height-pageY2 }]}>
                      <FlatListCountry prop={"convertedAmount"}/>
                    </View>
                  }
          </View>
      </Pressable>
  )
}
