import React , {useState, useEffect} from 'react'
import Crypto from './Crypto';
import "../assets/css/crypto-list.css"

// API
import userApi from "../api/user";

// PARENT : Landing, Favorites
// CHILD : Crypto
// DESC : List containing each Crypto
const CryptoList = (props) => {

    const [cryptos, setCryptos] = useState(props);
    const [favoriteCryptos, setFavorites] = useState([]);

    function formatFloat(float, digit = 2) {
        return parseFloat(float).toLocaleString('en', {minimumFractionDigits: digit, maximumFractionDigits: digit})
    }

    useEffect(() => {
        // Set public cryptos
        setCryptos(props);

        // Set favorites cryptos for this user
        if (props.logged) {
            userApi.get().then((response) => {
                if (response.cryptos && response.cryptos.length > 0) {
                    setFavorites(response.cryptos);
                }
            });
        }

    }, [props]);

    return (
        <tbody>
            {cryptos.data.map(item => (
                <Crypto key={item.id}
                    logged={props.logged}
                    img={item.imgUrl}
                    id={item.id}
                    cmid={item.cmid}
                    coin={item.fullName} 
                    tag={item.symbol}
                    price={formatFloat(item.currentPrice).toLocaleString('en')} 
                    rank={item.market_cap_rank} 
                    oneday={formatFloat(item.price_change_percentage_24h)} 
                    onedaycurr={formatFloat(item.price_change_24h)} 
                    dayvol={formatFloat(item.total_volume/1000)} 
                    mcap={formatFloat(item.market_cap/1000000, 0)}
                    isfavorite={favoriteCryptos.find(favorite => favorite.id === item.id) ? true : false}>
                </Crypto>
            ))}
        </tbody>
    )
}
export default CryptoList;
