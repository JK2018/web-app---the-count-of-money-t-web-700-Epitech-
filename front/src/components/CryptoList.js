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

    useEffect(() => {
        setCryptoListState(props);
        if(typeof contextValue.allcoinsChartDataFinal2 !== "undefined"){
            console.log("cryptolist test: OK");
            }
    }, [props]);

    return (
        <div>
            <ul>
                {cryptoListState.data.map(item => (
                    <Fragment key={item.market_cap_rank}>
                        <Crypto img={item.image}
                            id={item.id}
                            coin={item.name} 
                            tag={item.symbol} 
                            defaultStarCol={cryptoListState.defaultStarCol}
                            price={item.current_price} 
                            rank={parseInt(item.market_cap_rank)} 
                            oneday={String(item.price_change_percentage_24h).slice(0, -3)} 
                            onedaycurr={String(item.price_change_24h).slice(0, -2)} 
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
