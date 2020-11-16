import React, { useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';





const Crypto = (props) => {

    const location = useLocation();
    const [starColor, setStarColor] = useState(props.defaultStarCol);
    const cookies = new Cookies();
    const getFavs = cookies.getAll();
   

    // toggle color, re-render, remove or add to cookies
    const handleFavToggle = (e) => {
        if(starColor === '#ebc934'){
            setStarColor('lightgrey');
            cookies.remove(props.id, props.id, { path: '/' });
            if(location.pathname === '/favorites'){
                function refreshPage() {
                    window.location.reload(false);
                  }
                refreshPage();
            }  
        } else {
            setStarColor('#ebc934');
            cookies.set(props.id, props.id, { path: '/' });
            //console.log(cookies.getAll());
        }
    }


        return (
            <div>
                <li>
                    <div className="lidiv">
                        {props.id in getFavs? //ADD IF LOGGED IN !
                         <p className="pml"><FontAwesomeIcon style={{color:'#ebc934'}} onClick={handleFavToggle} className="star" icon={faStar}/></p>
                         : <p className="pml"><FontAwesomeIcon style={{color:'lightgrey'}} onClick={handleFavToggle} className="star" icon={faStar}/></p>}
                        
                        <p className="pml">{props.rank}</p>
                        <img className="iconimg" src={props.img} alt=""/>
                        <p className="pxl coinName"><Link to="/crypto" style={{display: 'block'}}>{props.coin}</Link></p>
                        <p className="pml">{props.tag}</p>
                        <p className="pml4">{props.price}</p>
                        <p className="pml" style={{color: (props.oneday).charAt(0)==='-' ? 'red': 'green'}}>{props.oneday}%</p>
                        <p className="pxl daycash" style={{color: (props.oneday).charAt(0)==='-' ? 'red': 'green'}}>{props.onedaycurr} </p>
                        <p className="pxl">{props.dayvol}K</p>
                        <p className="pxl-4">{props.mcap}M</p>  
                    </div>
                </li>
            </div>
        )
}
export default Crypto;
