import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import React, { Dispatch, memo, SetStateAction } from "react";
import { styles } from "../myStyles";
import { AntDesign } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";
import MainConverterComponent1 from './main-converter1'
import MainConverterComponent2 from './main-converter2'
import BorderLine  from "./border-line";
interface Props{
    setListVisible1: Dispatch<SetStateAction<boolean>>,
    setListVisible2: Dispatch<SetStateAction<boolean>>, 
    setIsVisible: Dispatch<SetStateAction<boolean>>, 
    isoCodeAmount: string, 
    countryAmount: string|number, 
    listVisible1: boolean, 
    listVisible2: boolean, 
    amountInputClicked: (arg0: string)=>void, 
    clicked: string, 
    isoCodeConvertedAmount: string, 
    amount: string, 
    countryConvertedAmount:string|number,
    convertedAmount:string
}
const ConvertComponentContainer: React.FC<Props> =({setListVisible1, setListVisible2, setIsVisible, isoCodeAmount, countryAmount, listVisible1, listVisible2, amountInputClicked, clicked, isoCodeConvertedAmount, amount, countryConvertedAmount,convertedAmount})=>{
    return (
        <View style={styles.mainConverterComponent}>
            <MainConverterComponent1 setListVisible1={setListVisible1} setListVisible2={setListVisible2} setIsVisible={setIsVisible} isoCodeAmount={isoCodeAmount} countryAmount={countryAmount} listVisible1={listVisible1} listVisible2={listVisible2} amountInputClicked={amountInputClicked} clicked={clicked} amount={amount} />
            <BorderLine />
            <MainConverterComponent2 setListVisible1={setListVisible1} setListVisible2={setListVisible2} setIsVisible={setIsVisible} listVisible1={listVisible1} listVisible2={listVisible2} amountInputClicked={amountInputClicked} clicked={clicked} isoCodeConvertedAmount={isoCodeConvertedAmount} countryConvertedAmount={countryConvertedAmount} convertedAmount={convertedAmount} />
        </View>
    )
}
export default memo(ConvertComponentContainer)