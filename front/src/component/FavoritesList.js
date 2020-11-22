import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CryptoList from './CryptoList';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faStar, faCoins } from "@fortawesome/free-solid-svg-icons";


// ROUTE : /favorites
// DESC : will render only cryptos selected as favorites by user that has signed in.
const FavoritesList = () => {

    // DESC : selectable currencies
    const [currencies] = useState([
        { label: "EUR", value: "eur"},
        { label: "USD", value: "usd"},
        { label: "GBP", value: "gbp"},
        { label: "CAD", value: "cad"},
        { label: "CHF", value: "chf"},
        { label: "JPY", value: "jpy"}
    ]);

 
    var coinUrlString = "";
    const cookies = new Cookies();
    const getCooks = cookies.getAll();
    const [c,setC] = useState(cookies.get('currency'));
    const [currencyValue, setCurrencyValue] = useState(c);
    const [allcoinsChartDataFinal, setAllcoinsChartDataFinal] = useState([]);
    

    // DESC : adds the favorite cryptos to the string url
    const buildUrlString = () => {
        const favs = getCooks;
        delete favs.coinId;
        delete favs.currency;
        for (const [value] of Object.entries(favs)) {
            coinUrlString+=value+'%2C%20';
          }
        coinUrlString = coinUrlString.slice(0, -6);
    }
    buildUrlString();
    

    const [apiUrl, setApiUrl] = useState("https://api.coingecko.com/api/v3/coins/markets?vs_currency="+c+"&ids="+coinUrlString+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d");
    const [data, setData] = useState([]);
    

    // DESC : fetches data from api, and updates data every 30s
    useEffect(() => {
        const fetchData = async () => {
            if(coinUrlString){

                // DESC : fetch cryptos general data
                setApiUrl("https://api.coingecko.com/api/v3/coins/markets?vs_currency="+c+"&ids="+coinUrlString+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d")
                const result = await axios(apiUrl,);
                setData(result.data);
                var allcoinsChartData = [];

                // DESC : fetch historical data for each chart
                for (let i = 0; i < result.data.length; i++) {
                    var url ="https://api.coingecko.com/api/v3/coins/"+result.data[i].id+"/market_chart?vs_currency=usd&days=30&interval=daily"
                    const result22 = await axios(url,);
                    const chartPricesRaw = result22.data.prices;
                    const chartPricesFinal = chartPricesRaw.map(elem => ({ 'val': elem[1], 'rank': result.data[i].market_cap_rank})); 
                    allcoinsChartData.push(chartPricesFinal);   
                }
                setAllcoinsChartDataFinal(allcoinsChartData);
                
            } 

            
        }
        fetchData();
        // DESC : refresh 30s interval
        const interval=setInterval(()=>{
            fetchData();
           },30000);
           fetchData();

        return()=>{
        clearInterval(interval)}
    }, [c]);


    // ACTION : when user selects currency via select menu
    // DESC : action when user selects another currency
    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/favorites' });
        window.location.reload(false);
    } 
    
    return (
        <section className="landing">
            <div className="mainCompDiv"> 
                <div className="lidiv hder">
                    <p className="pml"><FontAwesomeIcon style={{color: 'white'}} icon={faStar}/></p>
                    <p className="pml">Rank</p>
                    <p className="iconimg"> </p>
                    <p className="pxl coinName">Coin <FontAwesomeIcon icon={faCoins}/></p>
                    <p className="pml">Tag</p>
                    <p className="pml4">Price 
                    <select className="currencySelect" value={currencyValue} onChange={e => onSelectChange(e)}>
                        {currencies.map(({label, value})=>(
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select></p> 
                    <p className="pml">24h %</p>
                    <p className="pxl daycash">24h <FontAwesomeIcon icon={faMoneyBill}/></p>
                    <p className="pxl-4">Market Cap</p>
                    <p className="pxl">7d Chart</p>
                </div>
                <CryptoList allcoinsChartDataFinal={allcoinsChartDataFinal} data={data} defaultStarCol={'#ebc934'}></CryptoList>
            </div>
        </section>
    )
}
export default FavoritesList;
