import React, {useEffect, useState, useContext } from "react";
import { TouchableOpacity, View, Text, FlatList, TouchableHighlight, Pressable,  } from "react-native";
import { myContext } from "./myContext";
import CountryFlag from "react-native-country-flag";
import { countriesDetails } from "./countryDetails";
import { AntDesign } from '@expo/vector-icons';
export default function ChooseDefaultCurrency (){
    const { setShowMain, setCountryConvertedAmount, setisoCodeConvertedAmount, setCountryAmount, setIsocodeAmount,setConvertingCurrency} = useContext(myContext)
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [defaultValue, setDefaultValue] = useState(null)
    const [isoCodeDefaultCurrency, setIsocodeDefaultCurrency] = useState('')
    const [isoCodeDefaultConvert, setIsoCodeDefaultConvert] = useState('')
    const [countryNameDefaultCurrency, setCountryNameDefaultCurrency] = useState('')
    const [countryNameDefaultConvert, setCountryNameDefaultConvert] = useState('')
    const [countryAbrDefaultCurrency, setCountryAbrDefaultCurrency] = useState('')
    const [countryAbrDefaultConvert, setCountryAbrDefaultConvert] = useState('')
    const [disabled, setDisabled] = useState(true)
    const handleSubmit =()=>{
        setCountryConvertedAmount(countryAbrDefaultConvert)
        setisoCodeConvertedAmount(isoCodeDefaultConvert)
        setCountryAmount(countryAbrDefaultCurrency)
        setIsocodeAmount(isoCodeDefaultCurrency)
        setShowMain(true)
    }
    const pressHandler =(defaults)=>{
        setDefaultValue(defaults)
        setIsVisible(true)
    }
    const listHandler =(isoCode, countryName, countryAbr)=>{
        if (defaultValue=== 'defaultCurrency'){
            setIsocodeDefaultCurrency(isoCode)
            setCountryNameDefaultCurrency(countryName)
            setCountryAbrDefaultCurrency(countryAbr)
            setConvertingCurrency(countryAbr)
        }
        else if (defaultValue === 'defaultConvert'){
            setIsoCodeDefaultConvert(isoCode)
            setCountryNameDefaultConvert(countryName)
            setCountryAbrDefaultConvert(countryAbr)
        }
        setIsVisible(false)
        
    }
    useEffect(()=>{
        let keys = Object.keys(countriesDetails)
        let values = Object.values(countriesDetails)
        setData(keys.map((element, index)=>{
            return({countryAbr: element, countryName: values[index],key: values[index]})
        }))
    } ,[])
    useEffect(()=>{
        setDisabled(isoCodeDefaultConvert=='' || isoCodeDefaultCurrency=='')
    },[isoCodeDefaultConvert, isoCodeDefaultCurrency])
    return(
        <Pressable onPress={()=>{setIsVisible(false)}} style={{justifyContent: 'center',  flex:1, backgroundColor:'#0000ff22'}}>
            <View style={{marginBottom: 20, alignItems: 'center'}}>
                <Text style={{color: '#000088', fontWeight: 'bold', fontSize: 24}}>Default Currencies</Text>
            </View>
            <View style={{ backgroundColor: 'blue', marginHorizontal: '10%', padding:8, borderRadius:8, height: 250, justifyContent: 'center'}}>
                <View style={{marginVertical:15, backgroundColor: 'white',borderRadius:5, padding: 5, flex:0.4, justifyContent: 'space-evenly'}}>
                    <TouchableOpacity onPress={()=>{pressHandler('defaultCurrency')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'blue', marginRight: 5}}>Select Your Default Currency</Text>
                            <AntDesign name="down" size={14} color="blue" />
                        </View>
                    </TouchableOpacity>
                        <View style={{flexDirection: 'row', }}>
                            <View>
                                <CountryFlag isoCode={isoCodeDefaultCurrency} size={20} style={{borderRadius: 50}} />
                            </View>
                            <View>
                                <Text style={{paddingLeft: 10, color: 'blue',fontSize:14}}>{countryNameDefaultCurrency}</Text>
                            </View>
                            <View>
                                <Text style={{paddingLeft:5, color: 'blue'}}>{countryAbrDefaultCurrency}</Text>
                            </View>
                        </View>
                </View>
                <View style={{marginVertical:15, backgroundColor: 'white', borderRadius:5, padding: 5, flex:0.4, justifyContent: 'space-evenly'}}>
                    <TouchableOpacity onPress={()=>{pressHandler('defaultConvert')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'blue',  marginRight: 5}}>Convert to Currency</Text>
                            <AntDesign name="down" size={14} color="blue" />
                        </View>
                    </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <CountryFlag isoCode={isoCodeDefaultConvert} size={20} style={{borderRadius: 50}} />
                            </View>
                            <View>
                                <Text style={{paddingLeft: 10, color: 'blue',fontSize:14}}>{countryNameDefaultConvert}</Text>
                            </View>
                            <View>
                                <Text style={{paddingLeft:5, color: 'blue'}}>{countryAbrDefaultConvert}</Text>
                            </View>
                        </View>
                </View>
            </View>
            <TouchableOpacity disabled={disabled} onPress={handleSubmit} underlayColor={'blue'} style={{flexDirection: 'row-reverse', marginTop: 40, marginHorizontal:'10%', }}>
                <Text style={{fontSize:20, color: 'blue', backgroundColor: 'white', borderColor: 'blue', borderWidth: 2, borderRadius: 5, paddingHorizontal:20, paddingVertical:4 }}>Next</Text>
            </TouchableOpacity>
            {isVisible && <View style={{position: 'absolute',width: '90%', height: '70%',marginHorizontal: '5%', borderRadius: 10, borderColor: 'green',backgroundColor: 'black' }}><FlatList 
                        keyExtractor={(item)=>(item.key)}
                        data ={data}
                        renderItem={({item,index})=>(
                            <TouchableHighlight onPress={()=>{listHandler(item.countryAbr.slice(0,item.countryAbr.length-1).toLowerCase(), item.countryName, item.countryAbr)}} underlayColor={'grey'} style={{ flex: 1, padding:7}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <CountryFlag isoCode={item.countryAbr.slice(0,item.countryAbr.length-1).toLowerCase()} size={20} style={{borderRadius: 50}} />
                                        </View>
                                        <View>
                                            <Text style={{paddingLeft: 10, color: 'white',fontSize:13}}>{item.countryName}</Text>
                                        </View>
                                        <View>
                                            <Text style={{paddingLeft:5, color: 'white'}}>({item.countryAbr})</Text>
                                        </View>
                                    </View>
                            </TouchableHighlight>
                        )}
                    /></View>}
        </Pressable>
    )
}