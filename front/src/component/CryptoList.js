import React, { useState, useEffect } from 'react'
import { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Crypto from './Crypto';
import axios from 'axios';


const CryptoList = () => {
    //const elements = {};
    //const state = { count: 0 };
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d";

    const [data, setData] = useState([]);
 
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(apiUrl,);
            setData(result.data);
        }
        fetchData();
    }, []);
console.log(data);

    return (
        <div>
            
            <ul>
                <li>
                    <div className="lidiv">
                        <p className="pml"><FontAwesomeIcon icon={faStar}/></p>
                        <p className="pml">Rank</p>
                        <p className="iconimg"> </p>
                        <p className="pxl coinName">Coin</p>
                        <p className="pml">Tag</p>
                        <p className="pxl">Price</p>
                        <p className="pml">24h %</p>
                        <p className="pml4">24h $</p>
                        <p className="pxl">Total Volume</p>
                        <p className="pxl-4">Market Cap</p>
                    </div>
                </li>
                {data.map(item => (
                <Fragment key={item.market_cap_rank}>
                    <Crypto img={item.image} 
                    coin={item.name} 
                    tag={item.symbol} 
                    price={item.current_price} 
                    rank={parseInt(item.market_cap_rank)} 
                    oneday={item.price_change_percentage_24h.toString().slice(0, -3)} 
                    onedaycurr={parseInt(item.price_change_24h).toFixed(2)} 
                    dayvol={(parseInt(item.total_volume)/1000).toFixed(2)} 
                    mcap={(parseInt(item.market_cap)/1000000).toFixed(2)}>
                    
                    </Crypto>
                </Fragment>
            ))}
            </ul>
        </div>
    )
}
export default CryptoList;
