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
            <div class="crypto-detail">
                <Grid container>
                    <Grid lg={6} xs={6} item>
                        <div>
                            <img src={data.image.large} alt="currency-logo"/>
                        </div>
                    </Grid>
                    <Grid lg={6} xs={6} item>
                        <ul>
                            <li>Nom {data.name}</li>
                            <li>Rank {data.market_cap_rank}</li>
                            <li>Website {data.links.homepage[0]}</li>
                            <li>Current price {data.market_data.current_price.eur} €</li>
                            <li>Total volume {data.market_data.total_volume.eur} €</li>
                            <li>Market cap {data.market_data.market_cap.eur} €</li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default CryptoDetail;