import React, { useState, useEffect } from 'react';
import BaseContext from '../contexts/base';
import CryptoList from './CryptoList';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faStar, faCoins } from "@fortawesome/free-solid-svg-icons";

// API
import cryptoApi from "../api/crypto";

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
    const [c, setC] = useState(cookies.get('currency') ? cookies.get('currency') : "usd");
    const [currencyValue, setCurrencyValue] = useState(c);
    const [contextValue, setContextValue] = useState({});
    const theChartDataObj = {};

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

    const [data, setData] = useState([]);
    
    // DESC : fetches data from api, and updates data every 30s
    useEffect(() => {
        const fetchData = async () => {
            if(coinUrlString){
                cryptoApi.getDetailed(c, coinUrlString).then((result) => {

                    setData(result.data);

                    // DESC : fetch historical data for each chart and set it as an object attribute
                    for (let i = 0; i < result.data.length; i++) {
                        cryptoApi.getHistoricData(result.data[i].id, "usd", 30, "daily").then((response) => {
                            const chartPricesRaw = response.data.prices;
                            const chartPricesFinal = chartPricesRaw.map(elem => ({ 'val': elem[1], 'rank': result.data[i].market_cap_rank})); 
                            theChartDataObj['chartDataRank'+result.data[i].market_cap_rank]= chartPricesFinal;
                        }) 
                    }

                    // DESC : set the mini chart data obj to context
                    theChartDataObj['data2']= data;
                    setContextValue(theChartDataObj);
                })
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
            <BaseContext.Provider value={contextValue}>
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
                    <p className="pxl">30d Chart</p>
                </div>
                <CryptoList data={data} defaultStarCol={'lightgrey'} ></CryptoList>
            </div>
            </BaseContext.Provider>
        </section>
    )
}
export default FavoritesList;
