import { View,TouchableHighlight,Text } from "react-native"
import { styles } from "../myStyles"
import { FontAwesome } from '@expo/vector-icons';
import React, { memo } from "react";
interface Props{
    addNumber: (arg0:string)=>void
}
const CalculateButtons:React.FC<Props> =({addNumber})=>{
    return (
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
    )
}

export default memo(CalculateButtons)