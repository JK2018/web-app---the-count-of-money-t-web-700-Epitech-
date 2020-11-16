import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CryptoList from './CryptoList';
import Cookies from 'universal-cookie';

// ROUTE : /favorites
// DESC : will render only cryptos selected as favorites by user that has signed in.
const FavoritesList = () => {

    const cookies = new Cookies();
    const getFavs = cookies.getAll();
    var coinUrlString = "";


    // adds the favorite cryptos to the string url
    const buildUrlString = () => {
        for (const [value] of Object.entries(getFavs)) {
            coinUrlString+=value+'%2C%20';
          }
        coinUrlString = coinUrlString.slice(0, -6);
    }
    buildUrlString();


    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="+coinUrlString+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d";
    const [data, setData] = useState([]);
    
    // fetches data from api, and updates data every 30s
    useEffect(() => {
        const fetchData = async () => {
            if(coinUrlString){
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


    
    return (
        <section className="landing">
            <div className="mainCompDiv"> 
                <CryptoList data={data} defaultStarCol={'#ebc934'}></CryptoList>
            </div>
        </section>
    )
}
export default FavoritesList;
