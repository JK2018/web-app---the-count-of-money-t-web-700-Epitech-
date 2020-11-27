import React, { useState, useEffect } from 'react'
import BaseContext from '../contexts/base';
import CryptoList from './CryptoList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill, faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';

// API
import cryptoApi from "../api/crypto";

// ROUTE : /
// DESC : will render all cryptos.
const Landing = () => {

    // DESC :  selectable currencies
    const [currencies] = useState([
        { label: "EUR", value: "eur" },
        { label: "USD", value: "usd" },
        { label: "GBP", value: "gbp" },
        { label: "CAD", value: "cad" },
        { label: "CHF", value: "chf" },
        { label: "JPY", value: "jpy" }
    ]);

    const cookies = new Cookies();
    const [c, setC] = useState(cookies.get('currency') ? cookies.get('currency') : "usd");
    const [currencyValue, setCurrencyValue] = useState(c);
    const [data, setData] = useState([]);
    const [contextValue, setContextValue] = useState({});
    const theChartDataObj = {};

    // DESC : fetches data from api, and updates data every 30s
    useEffect(() => {

        // DESC : fetch cryptos general data
        const fetchData = async () => {            
            cryptoApi.getDetailed(c).then((result) => {

                setData(result.data);
    
                // DESC : fetch historical data for each chart and set it as an object attribute
                for (let i = 0; i < result.data.length; i++) {
                    cryptoApi.getHistoricData(result.data[i].id, "usd", 30, "daily").then((response) => {
                        const chartPricesRaw = response.data.prices;
                        const chartPricesFinal = chartPricesRaw.map(elem => ({ 'val': elem[1], 'rank': result.data[i].market_cap_rank }));
                        theChartDataObj['chartDataRank' + result.data[i].market_cap_rank] = chartPricesFinal;
                    })
                }
    
                // DESC : set the mini chart data obj to context
                theChartDataObj['data2'] = data;
                setContextValue(
                    theChartDataObj
                )
            })
        }
        fetchData();

        // DESC : refresh 30s interval
        const interval = setInterval(() => {
            fetchData();
        }, 30000);
        fetchData();

        return () => {
            clearInterval(interval)
        }
    }, []);

    // ACTION : when user selects currency via select menu
    // DESC : action when user selects another currency
    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/' });
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
export default Landing;
