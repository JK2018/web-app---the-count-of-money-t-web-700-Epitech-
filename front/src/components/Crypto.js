import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MiniChart from './MiniChart';

// API
import userApi from "../api/user";

const Crypto = (props) => {

    const [crypto, setCrypto] = useState(props);
 
    // ACTION : when user click star icon
    // DESC : toggle color, re-render, remove or add to cookies
    const handleFavToggle = (e) => {
        var oldCrypto = {...crypto};
        if (oldCrypto.isfavorite) {
            userApi.removeFavoriteCrypto(crypto.id)
                .then(() => {
                    oldCrypto.isfavorite = !oldCrypto.isfavorite;
                    setCrypto(oldCrypto);
                });
        } else {
            userApi.addFavoriteCrypto(crypto.id)
                .then(() => {
                    oldCrypto.isfavorite = !oldCrypto.isfavorite;
                    setCrypto(oldCrypto);
                });
        }
    }

    const isLoggedStars = ()=> {
        var logStatus = props.logged;
        if (!logStatus) {
            return <td><FontAwesomeIcon style={{ color: 'white' }} className="star" icon={faStar} /></td>
        } else {
            if(crypto.isfavorite){
                return <td><span className="step1"><FontAwesomeIcon style={{ color: '#ebc934' }} onClick={handleFavToggle} className="star" icon={faStar} /></span></td>
            }else{
                return <td><span className="step1"><FontAwesomeIcon style={{ color: 'lightgrey' }} onClick={handleFavToggle} className="star" icon={faStar} /></span></td>
            }     
        }
    }

    return (
        <tr>
            {isLoggedStars()}
            <td>{crypto.rank}</td>
            <td className="td-center"><img className="iconimg" src={crypto.img} alt="" /></td>
            <td className="coinName"><Link to={{ pathname: "/crypto/" + props.cmid }} style={{ display: 'block' }}>{props.coin}</Link></td>
            <td className="uppercase">{crypto.tag}</td>
            <td>{crypto.price}</td>
            <td style={{ color: (crypto.oneday).charAt(0) === '-' ? 'red' : 'green' }}>{crypto.oneday}%</td>
            <td className="daycash" style={{ color: (crypto.oneday).charAt(0) === '-' ? 'red' : 'green' }}>{crypto.onedaycurr} </td>
            <td>{crypto.mcap} M</td>
            <td><MiniChart id={crypto.id} rank={crypto.rank}></MiniChart></td>
        </tr>
    )
}
export default Crypto;
