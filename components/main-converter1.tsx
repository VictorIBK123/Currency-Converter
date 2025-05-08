import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import React, { Dispatch, memo, SetStateAction } from "react";
import { styles } from '/home/victor-ibk/Programming/ReactNativeProjects/Currency-Converter/myStyles.js'
import { AntDesign } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";
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
    amount: string, 
}
const MainConverterComponent1: React.FC<Props> =({setListVisible1, setListVisible2, setIsVisible, isoCodeAmount, countryAmount, listVisible1, listVisible2, amountInputClicked, clicked, amount})=>{
    return (
        <View style={styles.mainConverterComponent1}>
            {/* The view below is the container for the component title "Amount" */}
            <View style={styles.amountAndConvertedAmount}>
                <Text style={styles.amountAndConvertedAmountText}>Amount</Text>
            </View>
            {/* The view below contains two other views which are the one that contains the currency details like flag, abbr, and currency */}
            <View style={styles.currencyDetailsAndTextInput}>
                {/* This view contains the flag view, abbr view and currency view */}
                <TouchableOpacity onPress={()=>{setListVisible1(true);setListVisible2(false);setIsVisible(false)}} style={styles.currencyAbbrFlag}>
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
                onPress={()=>{amountInputClicked('countryAmount')}} 
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
    )
}
export default memo(MainConverterComponent1)