import React, { useEffect, useState, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MiniChart from './MiniChart';
import MyContext from '../context/MyContext';



// PARENT : CryptoList
// CHILD : MiniChart
// DESC : Element of CryptoList, displays basic data of a single cryptocoin
const Crypto = (props) => {

    const [cryptoState, setCryptoState] = useState(props);
    const location = useLocation();
    const [starColor, setStarColor] = useState(cryptoState.defaultStarCol);
    const cookies = new Cookies();
    const getFavs = cookies.getAll();
    const contextValue = useContext(MyContext);
   
    useEffect(() => {
        setCryptoState(props);
        if(typeof contextValue.allcoinsChartDataFinal2 !== "undefined"){
        console.log("crypto test: OK");
        }
      }, [props]);

      
    // ACTION : when user click star icon
    // DESC : toggle color, re-render, remove or add to cookies
    const handleFavToggle = (e) => {
        if(starColor === '#ebc934'){
            setStarColor('lightgrey');
            cookies.remove(cryptoState.id, cryptoState.id, { path: '/' });
            if(location.pathname === '/favorites'){
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
            <div>
                <li>
                    <div className="lidiv">
                        {cryptoState.id in getFavs? //ADD IF LOGGED IN !
                         <p className="pml"><FontAwesomeIcon style={{color:'#ebc934'}} onClick={handleFavToggle} className="star" icon={faStar}/></p>
                         : <p className="pml"><FontAwesomeIcon style={{color:'lightgrey'}} onClick={handleFavToggle} className="star" icon={faStar}/></p>}
                        
                        <p className="pml">{cryptoState.rank}</p>
                        <img className="iconimg" src={cryptoState.img} alt=""/>
                        <p className="pxl coinName"><Link to="/crypto" style={{display: 'block'}}>{cryptoState.coin}</Link></p>
                        <p className="pml">{cryptoState.tag}</p>
                        <p className="pml4">{cryptoState.price}</p>
                        <p className="pml" style={{color: (cryptoState.oneday).charAt(0)==='-' ? 'red': 'green'}}>{cryptoState.oneday}%</p>
                        <p className="pxl daycash" style={{color: (cryptoState.oneday).charAt(0)==='-' ? 'red': 'green'}}>{cryptoState.onedaycurr} </p>
                        <p className="pxl-4">{cryptoState.mcap}M</p>
                        <MiniChart className="pxl" id={cryptoState.id} rank={cryptoState.rank}></MiniChart>    
                    </div>
                </li>
            </div>
        )
}
export default Crypto;
