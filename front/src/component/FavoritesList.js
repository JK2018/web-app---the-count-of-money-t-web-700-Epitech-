import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CryptoList from './CryptoList';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


// ROUTE : /favorites
// DESC : will render only cryptos selected as favorites by user that has signed in.
const FavoritesList = () => {

    const [currencies] = useState([
        { label: "USD", value: "usd"},
        { label: "EUR", value: "eur"},
        { label: "GBP", value: "gbp"},
        { label: "CAD", value: "cad"},
        { label: "CHF", value: "chf"},
        { label: "JPY", value: "jpy"}
    ]);
    const cookies = new Cookies();
    var c = cookies.get('currency')
    const getFavs = cookies.getAll();
    const [currencyValue, setCurrencyValue] = useState(c);
    var coinUrlString = "";


    // adds the favorite cryptos to the string url
    const buildUrlString = () => {
        for (const [value] of Object.entries(getFavs)) {
            coinUrlString+=value+'%2C%20';
          }
        coinUrlString = coinUrlString.slice(0, -6);
    }
    buildUrlString();

    
    const [apiUrl, setApiUrl] = useState("https://api.coingecko.com/api/v3/coins/markets?vs_currency="+c+"&ids="+coinUrlString+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d");
    const [data, setData] = useState([]);
    
    // fetches data from api, and updates data every 30s
    useEffect(() => {
        const fetchData = async () => {
            if(coinUrlString){
                var c = cookies.get('currency')
                setApiUrl("https://api.coingecko.com/api/v3/coins/markets?vs_currency="+c+"&ids="+coinUrlString+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d")
                const result = await axios(apiUrl,);
                setData(result.data);
            } 
        }
        
        const interval=setInterval(()=>{
            fetchData();
           },30000);
           fetchData();

        return()=>{
        clearInterval(interval)}
    }, [apiUrl, coinUrlString]);

    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/' });
        window.location.reload(false);
    }
    
    return (
        <section className="landing">
            <div className="mainCompDiv"> 

            <div className="lidiv hder">
                        <p className="pml"><FontAwesomeIcon icon={faStar}/></p>
                        <p className="pml">Rank</p>
                        <p className="iconimg"> </p>
                        <p className="pxl coinName">Coin</p>
                        <p className="pml">Tag</p>
                        <p className="pml4">Price 
                        <select value={currencyValue} onChange={e => onSelectChange(e)}>
                            {currencies.map(({label, value})=>(
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select></p> 
                        
                        <p className="pml">24h %</p>
                        <p className="pxl daycash">24h curr</p>
                        <p className="pxl">Total Volume</p>
                        <p className="pxl-4">Market Cap</p>
                    </div>
                <CryptoList data={data} defaultStarCol={'#ebc934'}></CryptoList>
            </div>
        </section>
    )
}
export default FavoritesList;
