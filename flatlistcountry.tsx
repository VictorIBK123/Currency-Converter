import React, {useEffect, useState, useContext} from "react";
import { FlatList, View, Text, TouchableHighlight, TextInput } from "react-native";
import CountryFlag from "react-native-country-flag";
import { myContext } from "./myContext";
import { countriesDetails } from "./countryDetails";
export function FlatListCountry({prop}){
    const {clickedN, setClickedN,countryConvertedAmount, setCountryConvertedAmount,isoCodeConvertedAmount, setisoCodeConvertedAmount,countryAmount, setCountryAmount,isoCodeAmount, setIsocodeAmount,currencySelected,listVisible1, setListVisible1,listVisible2,setListVisible2,convertingCurrency, setConvertingCurrency,setRates, rates} = useContext(myContext)
    const [data, setData] =useState(null)
    useEffect(()=>{
        let keys = Object.keys(countriesDetails)
        let values = Object.values(countriesDetails)
        setData(keys.map((element, index)=>{
            return({countryAbr: element, countryName: values[index], key: values[index]})
        }))
    } ,[])
    return (
            <FlatList 
            ListHeaderComponent={()=>(
                <View style={{ }}>
                    <TextInput style={{paddingBottom:8,borderRadius:5,borderColor:'#ffffff', paddingVertical:10}} inputMode='search' />
                </View>
            )}
            keyExtractor={(item)=>(item.key)}
            data ={data}
            renderItem={({item})=>(
                <TouchableHighlight onPress={()=>{
                    currencySelected(prop, item.countryAbr.slice(0,item.countryAbr.length-1).toLowerCase(), item.countryAbr)
                    setListVisible1(false)
                    setListVisible2(false)
                 }} underlayColor='#0088ff'>
                    <View style={{flexDirection: 'row', marginVertical: '3%'}}>
                        <View>
                            <CountryFlag isoCode={item.countryAbr.slice(0,item.countryAbr.length-1).toLowerCase()} size={20} style={{borderRadius: 50}} />
                        </View>
                        <View>
                            <Text style={{paddingLeft: 15, color: 'black', }}>{item.countryName}</Text>
                        </View>
                        <View>
                            <Text style={{paddingLeft:5, color: 'blue'}}>({item.countryAbr})</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )}
            />
    )
}