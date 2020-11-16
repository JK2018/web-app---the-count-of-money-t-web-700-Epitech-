import React from 'react'
import { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Crypto from './Crypto';




const CryptoList = (props) => {





    // const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d";
    // const [data, setData] = useState([]);
 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(apiUrl,);
    //         setData(result.data);
    //     }
        
    //     const interval=setInterval(()=>{
    //         fetchData();
    //        },30000);
    //        fetchData();

    //     return()=>{
    //     clearInterval(interval)}
    // }, []);
    // console.log(data);

   

    return (
        <div>

            <ul>
                {/* <li>
                    <div className="lidiv hder">
                        <p className="pml"><FontAwesomeIcon icon={faStar}/></p>
                        <p className="pml">Rank</p>
                        <p className="iconimg"> </p>
                        <p className="pxl coinName">Coin</p>
                        <p className="pml">Tag</p>
                        <p className="pml4">Price</p>
                        <p className="pml">24h %</p>
                        <p className="pxl daycash">24h $</p>
                        <p className="pxl">Total Volume</p>
                        <p className="pxl-4">Market Cap</p>
                    </div>
                </li> */}
                {props.data.map(item => (
                <Fragment key={item.market_cap_rank}>
                    <Crypto img={item.image}
                    id={item.id}
                    coin={item.name} 
                    tag={item.symbol} 
                    defaultStarCol={props.defaultStarCol}
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
