import React , {useState, useEffect} from 'react'
import { Fragment } from 'react';
import Crypto from './Crypto';




const CryptoList = (props) => {


    const [cryptoListState, setCryptoListState] = useState(props);
    useEffect(() => {
        setCryptoListState(props);
        
      }, [props]);
   
      

    return (
        <div>

            <ul>
                {cryptoListState.data.map(item => (
                <Fragment key={item.market_cap_rank}>
                    <Crypto img={item.image}
                    allcoinsChartDataFinal = {cryptoListState.allcoinsChartDataFinal}
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
