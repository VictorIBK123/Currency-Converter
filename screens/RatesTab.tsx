import React, {useState, useEffect, useContext, memo} from "react";
import { View, Text, FlatList, TouchableOpacity ,useWindowDimensions} from "react-native";
import {FontAwesome5 } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";
import { countriesDetails } from "../data/countryDetails";
import { styles } from "../myStyles";
import { RatesContext } from "../myContext";
const Rates =()=>{
    const [baseCurrency, setBaseCurrency] = useState({country:'United States Dollar', countryAbbr: 'USD'})
    const [data, setData] =useState(null)
    const {rates} = useContext(RatesContext)
    const [disabled, setDisabled] = useState(true)
    useEffect(()=>{
        let keys = Object.keys(countriesDetails)
        let values = Object.values(countriesDetails)
        let rateList = Object.values(rates)
        setData(keys.map((element, index)=>{
            return({countryAbr: element, countryName: values[index],rate:rateList[index], key: values[index]})
        }))
    } ,[rates])
    const baseCurrencySelectedHandler =(countryName: any, countryAbbr: any)=>{
        setBaseCurrency({country: countryName, countryAbbr: countryAbbr})
    }
    return(
        <View style={{flex:1, paddingHorizontal:4, backgroundColor: '#0000ff22'}}>
            <View style={{flex:1/10, justifyContent: 'center', alignItems:'center'}}><Text style={{color: 'blue', fontWeight: 'bold', fontSize: 20,textDecorationLine:'underline'}}>Exchange Rates</Text></View>
            <View style={styles.baseCurrencyView}>
                <Text style={{color: 'black'}}>Base Currency: </Text>
                <View   style={{flexDirection: 'row',  alignItems: 'center', paddingLeft:5,  borderRadius:3, padding:3 }}>
                    <Text style={{color: 'black'}}>1 {baseCurrency.country} ({baseCurrency.countryAbbr}) </Text>
                </View>
            </View>
            <View style={styles.ratesView}>
                <View style={styles.rateTextView}><Text style={styles.rateText}>Latest Rates </Text>
                <Text style={{fontSize:12, color:'#555555'}}>Click on any currency to make as base</Text></View>
                <View style={styles.allRatesView}>
                    <FlatList 
                        keyExtractor={(item)=>(item.key)}
                        data ={data}
                        renderItem={({item,index})=>{if(item.countryAbr!=baseCurrency.countryAbbr) 
                            {return(
                            <TouchableOpacity onPress={()=>{baseCurrencySelectedHandler(item.countryName,item.countryAbr,  )}} style={(()=>{
                                if (index%2==0){
                                    return ({backgroundColor: '#ffffff77',flex:1, padding:7, })
                                }
                                else {
                                    return ( { flex:1,  padding:7})
                                }
                            })()}>
                                <View  style={{flexDirection: 'row', marginVertical:5, flex:1,alignItems: 'center' }}>
                                    <View style={{flexDirection: 'row', flex:0.75}}>
                                        <View>
                                            <CountryFlag isoCode={item.countryAbr.slice(0,item.countryAbr.length-1).toLowerCase()} size={20} style={{borderRadius: 50}} />
                                        </View>
                                        <View>
                                            <Text style={{ paddingLeft: 10, color: 'black',fontSize:13,}}>{item.countryName}</Text>
                                        </View>
                                        <View>
                                            <Text style={{paddingLeft:5, color: 'black', }}>({item.countryAbr})</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:0.25}}>
                                        {disabled && <Text style={(()=>{
                                if (index%2==0){
                                    return ({color: 'green'})
                                }
                                else {
                                    return ( {color: 'blue'})
                                }
                            })()}>{(1/rates[baseCurrency.countryAbbr])*item.rate}</Text>}
                            {!disabled && 
                            <View style={{paddingLeft:10}}>
                                {<FontAwesome5 name="square" size={20} color='white' />}
                            </View>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}}}
                    />
                </View>
            </View>
        </View>
    )
}
export default memo(Rates)