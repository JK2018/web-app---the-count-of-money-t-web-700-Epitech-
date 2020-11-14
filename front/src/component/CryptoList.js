import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Crypto from './Crypto';

const CryptoList = () => {






    return (
        <div className="test">
            <h1>test INSIDE LIST</h1>
            <ul>
                <li>
                    <div className="lidiv">
                        <p className="pml"><FontAwesomeIcon icon={faStar}/></p>
                        <p className="pxl">Coin</p>
                        <p className="pml">Tag</p>
                        <p className="pxl">Price</p>
                        <p className="pml">1h</p>
                        <p className="pml">24h</p>
                        <p className="pml">7d</p>
                        <p className="pxl">24h Volume</p>
                        <p className="pxl">Market Cap</p>
                    </div>
                </li>
                <Crypto coin="bitcoin" tag="BTC" price="13000" onehour="0.3%" oneday="0.45%" oneweek="-0.1%" dayvol="1243K" mcap="1231M"></Crypto>
                
            </ul>
        </div>
    )
}
export default CryptoList;
