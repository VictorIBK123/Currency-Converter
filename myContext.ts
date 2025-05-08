import { createContext } from "react";
export const ShowMainContext = createContext<{
    showMain: boolean,
    setShowMain: React.Dispatch<React.SetStateAction<boolean>>,
} | null>(null);

export const ClickedNContext = createContext<{
    clickedN: string,
    setClickedN: React.Dispatch<React.SetStateAction<string>>,
} | null>(null);

export const CountryConvertedAmountContext = createContext<{
    countryConvertedAmount: string,
    setCountryConvertedAmount: React.Dispatch<React.SetStateAction<string>>,
} | null>(null);

export const IsoCodeConvertedAmountContext = createContext<{
    isoCodeConvertedAmount: string,
    setisoCodeConvertedAmount: React.Dispatch<React.SetStateAction<string>>,
} | null>(null);

export const CountryAmountContext = createContext<{
    countryAmount: string,
    setCountryAmount: React.Dispatch<React.SetStateAction<string>>,
} | null>(null);

export const IsoCodeAmountContext = createContext<{
    isoCodeAmount: string;
    setIsocodeAmount: React.Dispatch<React.SetStateAction<string>>,
} | null>(null);

export const CurrencySelectedContext = createContext<{
    currencySelected: (amountOrConvertedAmount:string, isoCode:string, country:string)=>void,
} | null>(null);

export const ListVisible1Context = createContext<{
    listVisible1: boolean;
    setListVisible1: React.Dispatch<React.SetStateAction<boolean>>,
} | null>(null);

export const ListVisible2Context = createContext<{
    listVisible2: boolean,
    setListVisible2: React.Dispatch<React.SetStateAction<boolean>>,
} | null>(null);

export const ConvertingCurrencyContext = createContext<{
    convertingCurrency: string,
    setConvertingCurrency: React.Dispatch<React.SetStateAction<string>>,
} | null>(null);

export const RatesContext = createContext<{
    setRates: any,
    rates: any,
} | null>(null);