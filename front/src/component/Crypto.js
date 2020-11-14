import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Crypto = (props) => {
    return (
        <div>
            <li>
                    <div className="lidiv">
                        <p className="pml"><FontAwesomeIcon icon={faStar}/></p>
                        <p className="pxl">{props.coin}</p>
                        <p className="pml">{props.tag}</p>
                        <p className="pxl">{props.price}</p>
                        <p className="pml">{props.onehour}</p>
                        <p className="pml">{props.oneday}</p>
                        <p className="pml">{props.oneweek}</p>
                        <p className="pxl">{props.dayvol}</p>
                        <p className="pxl">{props.mcap}</p>
                    </div>
                </li>
        </div>
    )
}
export default Crypto;
