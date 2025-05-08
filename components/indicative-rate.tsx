import { View, Text } from "react-native"
import { styles } from "../myStyles"
import React, { memo, useEffect, useState } from "react"

interface Props{
    amount: string,
    countryAmount: string,
    convertedAmount: string,
    countryConvertedAmount: string
}
const IndicativeExchangeRate: React.FC<Props> =({amount, countryAmount,convertedAmount, countryConvertedAmount})=>{
    const [indicativeExchangeRateCA, setIndicativeExchangeRateCA] = useState<string>('0')
    const [indicativeExchangeRateCCA, setIndicativeExchangeRateCCA] = useState<string>('0')
    useEffect(()=>{
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
                setIndicativeExchangeRateCA (display.concat('.', afterDecimal,' '))
            }
            else{
                setIndicativeExchangeRateCA(display.concat(' '))
            }
            }
    ,[amount])

    useEffect(()=>{
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
                setIndicativeExchangeRateCCA(display.concat('.', afterDecimal,' '))
            }
            else{
                setIndicativeExchangeRateCCA(display.concat(' '))
            }
            }
    ,[convertedAmount])
    return (
        <View style={styles.otherViews}>
            <View>
            <Text>Indicative Exchange Rate</Text>
            </View>
            <View>
            <Text>
                {indicativeExchangeRateCA} 
                {countryAmount} = {indicativeExchangeRateCCA}  {countryConvertedAmount}
            </Text>
            </View>
        </View>
    )
}

export default IndicativeExchangeRate