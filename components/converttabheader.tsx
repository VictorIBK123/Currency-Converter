import React, { memo } from "react"
import { View, Text } from "react-native"
import { styles } from "../myStyles"
const Header: React.FC =()=>{
    return (
        <View style={styles.mainHeaderComponent}>
            <View style={styles.currencyConverterTitle}>
            <Text style={styles.currencyConverterTitleText}>Currency Converter</Text>
            </View>
            <View style={styles.currencyConverterDetails}>
            <Text style={styles.currencyConverterDetailsText}>Check live rates, set rate alerts, receive notifications and more</Text>
            </View>
        </View>
    )
}
export default memo(Header)