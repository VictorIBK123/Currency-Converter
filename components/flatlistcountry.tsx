import React, {useEffect, useState, useContext, memo, useRef, RefObject} from "react";
import { FlatList, View, Text, TouchableHighlight, TextInput } from "react-native";
import CountryFlag from "react-native-country-flag";
import { countriesDetails } from "../data/countryDetails";
import { CurrencySelectedContext, ListVisible1Context, ListVisible2Context } from "../myContext";
interface FlatListCountryProps {
    prop: any; // Replace 'any' with the specific type if known
}

const FlatListCountry = memo(({ prop }: FlatListCountryProps) => {
    const currencySelectedContext = useContext(CurrencySelectedContext);
    const listVisible1Context = useContext(ListVisible1Context);
    const listVisible2Context = useContext(ListVisible2Context);
    const currencySelected  = currencySelectedContext.currencySelected;
    const setListVisible1  = listVisible1Context.setListVisible1;
    const setListVisible2 = listVisible2Context.setListVisible2;
    const [data, setData] =useState(null)
    const [renderedData, setRenderedData] = useState(data)
    const [searchValue, setSearchValue] = useState<string>('')
    const textInputRef = useRef<TextInput>()
    useEffect(()=>{
        let keys = Object.keys(countriesDetails)
        let values = Object.values(countriesDetails)
        setData(keys.map((element, index)=>{
            return({countryAbr: element, countryName: values[index], key: values[index]})
        }))
    } ,[])
    useEffect(()=>{
        setRenderedData(data)
    },[data])
    
    return (
        <View style={{flex:1, }}>
            <ListHeaderComp setRenderedData={setRenderedData} setSearchValue={setSearchValue} searchValue={searchValue} data={data} />
            <FlatList 
                style={{flex:9/10}}
                ListEmptyComponent={()=><View>
                    <Text>No matched currency</Text>
                </View>}
                keyExtractor={(item)=>(item.key)}
                data ={renderedData}
                renderItem={({item})=>(
                    <RenderItem item={item} textInputRef={textInputRef} currencySelected={currencySelected} setListVisible1={setListVisible1} setListVisible2={setListVisible2} prop={prop}/>
                )
                    }
                />
        </View>
            
    )})
const ListHeaderComp:React.FC<any> =memo(({setRenderedData,setSearchValue, searchValue, data})=>{
            
    const searchFunc =(text: string)=>{
        setSearchValue(text)
        setRenderedData(data.filter((e: { countryName: string ; countryAbr: string ; })=>e.countryName.toLowerCase().includes(text.toLowerCase())||e.countryAbr.toLowerCase().includes(text.toLowerCase())))
    }
    return(
    <View style={{borderWidth:1, borderColor:'blue', borderRadius:20, flex:1/10, paddingHorizontal:10 }}>
        <TextInput  placeholder="Search e.g. NGN" value={searchValue}  onChangeText={searchFunc} style={{borderRadius:5,borderColor:'#ffffff', paddingVertical:2, flex:1}} inputMode='search' />
    </View>)
})
interface RenderItemProps {
    item: {
        countryAbr: string;
        countryName: string;
        key: string;
    };
    currencySelected: (prop: any, isoCode: string, countryAbr: string) => void;
    setListVisible1: React.Dispatch<React.SetStateAction<boolean>>;
    setListVisible2: React.Dispatch<React.SetStateAction<boolean>>;
    prop: any; // Replace 'any' with the specific type if known,
    textInputRef: RefObject<TextInput>
}

const RenderItem: React.FC<RenderItemProps> = memo(({textInputRef, item, currencySelected, setListVisible1, setListVisible2, prop }) => {
    return (
        <TouchableHighlight
            onPress={() => {
                
                currencySelected(prop, item.countryAbr.slice(0, item.countryAbr.length - 1).toLowerCase(), item.countryAbr);
                setListVisible1(false);
                setListVisible2(false);
            }}
            underlayColor="#0088ff"
        >
            <View style={{ flexDirection: 'row', marginVertical: '3%' }}>
                <View>
                    <CountryFlag isoCode={item.countryAbr.slice(0, item.countryAbr.length - 1).toLowerCase()} size={20} style={{ borderRadius: 50 }} />
                </View>
                <View>
                    <Text style={{ paddingLeft: 15, color: 'black' }}>{item.countryName}</Text>
                </View>
                <View>
                    <Text style={{ paddingLeft: 5, color: 'blue' }}>({item.countryAbr})</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
});
export default FlatListCountry