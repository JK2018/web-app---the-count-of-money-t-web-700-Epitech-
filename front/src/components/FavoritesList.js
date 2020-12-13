import React, { useState, useEffect } from 'react';
import BaseContext from '../contexts/base';
import CryptoList from './CryptoList';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCoins } from "@fortawesome/free-solid-svg-icons";

// API
import cryptoApi from "../api/crypto";
import userApi from "../api/user";

// ROUTE : /favorites
// DESC : will render only cryptos selected as favorites by user that has signed in.
const FavoritesList = (props) => {
 
    const cookies = new Cookies();
    const getCooks = cookies.getAll();
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

        // DESC : fetch cryptos general data
        const fetchData = async () => {        
            
            cryptoApi.getAllPublic().then((result) => {

                if (result.data && result.data.length > 0) {
                    var allPublicCrypto = result.data;
                    
                    userApi.get().then((result) => {
        
                        if (result.cryptos && result.cryptos.length > 0) {
                            
                            // Filter only favorite cryptos
                            var favoriteCryptos = allPublicCrypto.filter(crypto => result.cryptos.find(favorite => favorite.id === crypto.id));
                            setData(favoriteCryptos);
                
                            // DESC : fetch historical data for each chart and set it as an object attribute
                            for (let i = 0; i < favoriteCryptos.length; i++) {
                                cryptoApi.getHistoricData(favoriteCryptos[i].cmid, "daily").then((response) => {
                                    const chartPricesRaw = response.data.prices;
                                    const chartPricesFinal = chartPricesRaw.map(elem => ({ 'val': elem[1], 'rank': favoriteCryptos[i].rank }));
                                    theChartDataObj['chartDataRank' + favoriteCryptos[i].rank] = chartPricesFinal;
                                })
                            }
                
                            // DESC : set the mini chart data obj to context
                            theChartDataObj['data2'] = data;
                            setContextValue(
                                theChartDataObj
                            )
                        }     
                    })
                }
            });
        }
        fetchData();

        // DESC : refresh 30s interval
        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        return () => {
            clearInterval(interval)
        }
    }, []);

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
                                <th>Price ({props.defaultCurrency.toUpperCase()})</th>
                                <th>24h %</th>
                                <th>24h<FontAwesomeIcon icon={faMoneyBill} className="sub-icon"/></th>
                                <th>Market Cap</th>
                                <th>30d Chart Evolution</th>
                            </tr>
                        </thead>
                        <CryptoList data={data} defaultStarCol={'lightgrey'} logged={props.logged}></CryptoList>
                    </table>
                </BaseContext.Provider>
            </div>
        </section>
    )
}
export default FavoritesList;
