import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

const CryptoDetail = () => {

    const params = useParams();
    const apiUrl = "https://api.coingecko.com/api/v3/coins/"+params.id;
    const [data, setData] = useState([]);
 
    useEffect(() => {
        axios(apiUrl).then((result) => {
            console.log(result.data)
            setData(result.data);
        })
    });

    if (Object.keys(data).length === 0) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div className="crypto-detail">
                <Grid container>
                    <Grid className="logo" lg={5} xs={5} item>
                        <div>
                            <img src={data.image.large} alt="currency-logo"/>
                            <h1>{data.name}</h1>
                        </div>
                    </Grid>
                    <Grid lg={7} xs={7} item>
                        <ul>
                            <li><label>Rank</label>{data.market_cap_rank}</li>
                            <li><label>Website</label>{data.links.homepage[0]}</li>
                            <li><label>Current price</label>{data.market_data.current_price.eur} €</li>
                            <li><label>Total volume</label>{data.market_data.total_volume.eur} €</li>
                            <li><label>Market cap</label>{data.market_data.market_cap.eur} €</li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default CryptoDetail;