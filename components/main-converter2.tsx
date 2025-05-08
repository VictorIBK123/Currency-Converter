import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { styles } from "../myStyles";
import { AntDesign } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";
interface Props{
    setListVisible1: Dispatch<SetStateAction<boolean>>,
    setListVisible2: Dispatch<SetStateAction<boolean>>, 
    setIsVisible: Dispatch<SetStateAction<boolean>>, 
    listVisible1: boolean, 
    listVisible2: boolean, 
    amountInputClicked: (arg0: string)=>void, 
    clicked: string, 
    isoCodeConvertedAmount: string, 
    countryConvertedAmount:string|number,
    convertedAmount:string
}
const MainConverterComponent2:React.FC<Props> =({setListVisible1, setListVisible2, setIsVisible,listVisible1, listVisible2, amountInputClicked, clicked, isoCodeConvertedAmount,countryConvertedAmount,convertedAmount})=>{
    return (
        <View style={styles.mainConverterComponent3}>
            <View style={styles.amountAndConvertedAmount}>
                <Text style={styles.amountAndConvertedAmountText}>Converted Amount</Text>
            </View>
            {/* The view below contains two other views which are the one that contains the currency details like flag, abbr, and currency */}
            <View style={styles.currencyDetailsAndTextInput}>
                {/* This view contains the flag view, abbr view and currency view */}
                <TouchableOpacity onPress={()=>{setListVisible1(false);setListVisible2(true);setIsVisible(false)}}  style={styles.currencyAbbrFlag}>
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
                <Pressable disabled={listVisible1 || listVisible2} onPress={()=>{amountInputClicked('countryConvertedAmount')}} 
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
    )
}
export default React.memo(MainConverterComponent2)