import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Crypto = (props) => {
    return (
        <div>
            <li>
                    <div className="lidiv">
                        <p className="pml"><FontAwesomeIcon icon={faStar}/></p>
                        <p className="pml">{props.rank}</p>
                        <img className="iconimg" src={props.img} alt=""/><p className="pxl coinName">{props.coin}</p>
                        <p className="pml">{props.tag}</p>
                        <p className="pxl">{props.price}</p>
                        <p className="pml">{props.oneday}%</p>
                        <p className="pml4">{props.onedaycurr} $</p>
                        <p className="pxl">{props.dayvol}K</p>
                        <p className="pxl-4">{props.mcap}M</p>
                    </div>
                </li>
        </div>
    )
}
export default Crypto;
