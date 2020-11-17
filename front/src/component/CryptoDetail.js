import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Chart from 'chart.js';

const CryptoDetail = () => {

    const params = useParams();
    const coinId = params.id;
    const getCoinUrl = "https://api.coingecko.com/api/v3/coins/"+coinId;
    const getHistoryUrl = "";
    const [data, setData] = useState([]);

    function createChart() {
        console.log(data);
        var ctx = document.getElementById('first-chart');
        if (ctx) {
            axios(getCoinUrl).then((result) => {
                setData(result.data);
                ctx.getContext('2d');
                var firstChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: '# of Votes',
                            backgroundColor: '#ff6384',
                            borderColor: '#ff6384',
                            data: [12, 19, 3, 5, 2, 3],
                            fill: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            },
                            y: {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                }
                            }
                        }
                    }
                });
            })
        }
    }
 
    useEffect(() => {
        axios(getCoinUrl).then((result) => {
            setData(result.data);
            createChart();
        })
    }, coinId);

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
                <Grid container>
                    <Grid item lg={12} xs={12}>
                        <div class="chart-container">
                            <canvas id="first-chart"></canvas>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default CryptoDetail;