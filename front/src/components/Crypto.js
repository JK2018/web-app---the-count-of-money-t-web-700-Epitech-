import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MiniChart from './MiniChart';

const Crypto = (props) => {

    const [cryptoState, setCryptoState] = useState(props);
    const location = useLocation();
    const [starColor, setStarColor] = useState(cryptoState.defaultStarCol);
    const cookies = new Cookies();
    const getFavs = cookies.getAll();
    useEffect(() => {
        setCryptoState(props);
    }, [props]);

    // ACTION : when user click star icon
    // DESC : toggle color, re-render, remove or add to cookies
    const handleFavToggle = (e) => {
        if (starColor === '#ebc934') {
            setStarColor('lightgrey');
            cookies.remove(cryptoState.id, cryptoState.id, { path: '/' });
            if (location.pathname === '/favorites') {
                function refreshPage() {
                    window.location.reload(false);
                }
                refreshPage();
            }
        } else {
            setStarColor('#ebc934');
            cookies.set(cryptoState.id, cryptoState.id, { path: '/' })
        }
    }

    return (
        <tr>
            {cryptoState.id in getFavs ? //ADD IF LOGGED IN !
                <td><FontAwesomeIcon style={{ color: '#ebc934' }} onClick={handleFavToggle} className="star" icon={faStar} /></td>
                : <td><FontAwesomeIcon style={{ color: 'lightgrey' }} onClick={handleFavToggle} className="star" icon={faStar} /></td>}
            <td>{cryptoState.rank}</td>
            <td><img className="iconimg" src={cryptoState.img} alt="" /></td>
            <td className="coinName"><Link to={{ pathname: "/crypto/" + props.id }} style={{ display: 'block' }}>{props.coin}</Link></td>
            <td className="uppercase">{cryptoState.tag}</td>
            <td>{cryptoState.price}</td>
            <td style={{ color: (cryptoState.oneday).charAt(0) === '-' ? 'red' : 'green' }}>{cryptoState.oneday}%</td>
            <td className="daycash" style={{ color: (cryptoState.oneday).charAt(0) === '-' ? 'red' : 'green' }}>{cryptoState.onedaycurr} </td>
            <td>{cryptoState.mcap} M</td>
            <td><MiniChart id={cryptoState.id} rank={cryptoState.rank}></MiniChart></td>
        </tr>
    )
}
export default Crypto;
