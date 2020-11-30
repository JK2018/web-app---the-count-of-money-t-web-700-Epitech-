import React, { useState, useEffect } from 'react';
import BaseContext from '../contexts/base';
import CryptoList from './CryptoList';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCoins } from "@fortawesome/free-solid-svg-icons";

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
 
    const cookies = new Cookies();
    const getCooks = cookies.getAll();
    const [defaultCurrency, setDefaultCurrency] = useState(cookies.get('currency') ? cookies.get('currency') : "usd");
    const [currencyValue, setCurrencyValue] = useState(defaultCurrency);
    const [contextValue, setContextValue] = useState({});
    const [data, setData] = useState([]);
    const theChartDataObj = {};    
    var coinUrlString = "";

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
    

    // DESC : fetches data from api, and updates data every 30s
    useEffect(() => {

        const fetchData = async () => {
            if(coinUrlString){
                cryptoApi.getDetailed(defaultCurrency, coinUrlString).then((result) => {

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

    }, [defaultCurrency]);

    // ACTION : when user selects currency via select menu
    // DESC : action when user selects another currency
    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/favorites' });
        window.location.reload(false);
    } 
    
    return (
        <section className="landing">
            <div className="main-comp">
                <BaseContext.Provider value={contextValue}>
                    <table className="crypto-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Rank</th>
                                <th></th>
                                <th>Coin<FontAwesomeIcon icon={faCoins} className="sub-icon"/></th>
                                <th>Tag</th>
                                <th>Price
                                    <select className="currencySelect sub-icon" value={currencyValue} onChange={e => onSelectChange(e)}>
                                        {currencies.map(({ label, value }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>24h %</th>
                                <th>24h<FontAwesomeIcon icon={faMoneyBill} className="sub-icon"/></th>
                                <th>Market Cap</th>
                                <th>30d Chart Evolution</th>
                            </tr>
                        </thead>
                        <CryptoList data={data} defaultStarCol={'lightgrey'} ></CryptoList>
                    </table>
                </BaseContext.Provider>
            </div>
        </section>
    )
}
export default FavoritesList;
