import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      marginTop: 30,
      marginHorizontal: 15,
    },
    mainHeaderComponent: {
      flex: 0.2,
    },
    mainConverterComponent:{
      flex: 0.4,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 5,
    },
    otherViews:{
      flex: 0.4,
    },
    currencyConverterTitle: {
      flex: 0.4,
      alignItems: 'center',
    },
    currencyConverterDetails:{
      flex:0.6,
      alignItems: 'center',
    },
    currencyConverterTitleText:{
      fontSize: 25,
      color: 'blue',
      fontWeight: 'bold'
    },
    currencyConverterDetailsText:{
      fontSize:15,
      color: 'grey',
      textAlign: 'center',
    },
    mainConverterComponent1:{
      flex: 0.5,
    },
    mainConverterComponent2:{
      flex: 0,
      borderWidth: 1,
      borderColor: '#0000ff22',
    },
    mainConverterComponent3:{
      flex: 0.5
    },
    amountAndConvertedAmount:{
      flex: 0.2,
      paddingLeft: 20
    },
    amountAndConvertedAmountText:{
      fontWeight: '600',
      color: 'grey',
    },
    currencyDetailsAndTextInput:{
      flex: 0.8,
      flexDirection: 'row',
    },
    currencyAbbrFlag:{
      flexDirection: 'row',
      alignItems: 'center',
      flex: 0.5,
      justifyContent: 'space-evenly',
    },
    textInput:{
      height: 30,
      flex:0.5,
      width: 100,
      backgroundColor: '#0000ff22',
      borderRadius: 10,
      justifyContent: 'center',
    },
    textInputContainer:{
      flex:0.5,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    addNumber:{
      flex: 0.4,
      marginTop:10,
    },
    row:{
      flexDirection: 'row',
      flex: 1/3,
    },
    col:{
      flex: 1/4,
      borderRadius: 3,
      backgroundColor: 'white',
      margin: 1,
      justifyContent:'center',
      alignItems: 'center',
    },
    buttonText:{
      fontSize: 20,
      fontWeight: '600',
    },
    textInputStyle:{
      fontSize:16,
      color: 'black',
      padding: 10,
      width:100,
      fontWeight: '500'
    },
    country:{
      flex: 1,
    },
    currencies:{
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderRadius:10,
      marginHorizontal:5,
      padding:10,
      elevation:10
    },
    baseCurrencyView:{
      flexDirection: 'row', 
      alignItems: 'center', 
      flex: 1/10
    },
    ratesView:{
      backgroundColor: '',
      flex:8/10,
      borderRadius: 7,
      borderColor: 'blue',
    },
    allRatesView:{ 
      flex:0.9,
      
    },
    rateTextView:{
      flex:0.1, 
    },
    rateText:{
      color: 'black',
    }
  })