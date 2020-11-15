import React, { useState, Fragment} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Crypto = (props) => {


    const [starColor, setStarColor] = useState('lightgrey');
    const handleChnageStarColor = (e) => {
        setStarColor(starColor === 'lightgrey' ? '#ebc934' : 'lightgrey');
    }
    

        
      

    return (
        <div>
            <li>
                <div className="lidiv">
                    <p className="pml"><FontAwesomeIcon style={{color:starColor}} onClick={handleChnageStarColor} className="star" icon={faStar}/></p>  
                    <p className="pml">{props.rank}</p>
                    <img className="iconimg" src={props.img} alt=""/>
                    <p className="pxl coinName"><Link to="/crypto" style={{display: 'block'}}>{props.coin}</Link></p>
                    <p className="pml">{props.tag}</p>
                    <p className="pml4">{props.price}</p>
                    <p className="pml" style={{color: (props.oneday).charAt(0)==='-' ? 'red': 'green'}}>{props.oneday}%</p>
                    <p className="pxl daycash" style={{color: (props.oneday).charAt(0)==='-' ? 'red': 'green'}}>{props.onedaycurr} $</p>
                    <p className="pxl">{props.dayvol}K</p>
                    <p className="pxl-4">{props.mcap}M</p>  
                </div>
            </li>
        </div>
    )
}
export default Crypto;
