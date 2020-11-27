import React , {useState, useEffect, useContext} from 'react'
import { Fragment } from 'react';
import Crypto from './Crypto';
import BaseContext from '../contexts/base';
import "../assets/css/crypto-list.css"

// PARENT : Landing, Favorites
// CHILD : Crypto
// DESC : List containing each Crypto
const CryptoList = (props) => {

    const [cryptoListState, setCryptoListState] = useState(props);
    const contextValue = useContext(BaseContext);

    function formatFloat(float, digit = 2) {
        console.log(digit)
        return parseFloat(float).toLocaleString('en', {minimumFractionDigits: digit, maximumFractionDigits: digit})
    }

    useEffect(() => {
        setCryptoListState(props);
        if(typeof contextValue.allcoinsChartDataFinal2 !== "undefined"){
            console.log("cryptolist test: OK");
            }
    }, [props]);

    return (
        <tbody>
            {cryptoListState.data.map(item => (
                <Crypto key={item.market_cap_rank}
                    img={item.image}
                    id={item.id}
                    coin={item.name} 
                    tag={item.symbol} 
                    defaultStarCol={cryptoListState.defaultStarCol}
                    price={formatFloat(item.current_price).toLocaleString('en')} 
                    rank={item.market_cap_rank} 
                    oneday={formatFloat(item.price_change_percentage_24h)} 
                    onedaycurr={formatFloat(item.price_change_24h)} 
                    dayvol={formatFloat(item.total_volume/1000)} 
                    mcap={formatFloat(item.market_cap/1000000, 0)}>
                </Crypto>
            ))}
        </tbody>
    )
}
export default CryptoList;
