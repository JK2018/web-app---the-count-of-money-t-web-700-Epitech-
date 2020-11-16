import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CryptoList from './CryptoList';


// ROUTE : /
// DESC : will render all cryptos.
const Landing = () => {

    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d";
    const [data, setData] = useState([]);
    

    // fetches data from api, and updates data every 30s
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(apiUrl,);
            setData(result.data);
        }
        
        const interval=setInterval(()=>{
            fetchData();
           },30000);
           fetchData();

        return()=>{
        clearInterval(interval)}
    }, []);
 

    return (
        <section className="landing">
            <div className="mainCompDiv">
                <CryptoList data={data} defaultStarCol={'lightgrey'}></CryptoList>
            </div>
        </section>
    )
}
export default Landing;
