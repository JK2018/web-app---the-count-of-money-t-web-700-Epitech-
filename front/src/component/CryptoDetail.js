import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Chart from 'chart.js';
import moment from 'moment';

const CryptoDetail = () => {

    const params = useParams();
    const coinId = params.id;
    const [data, setData] = useState([]);

    function formatPrice(price) {
        return parseFloat(price).toLocaleString('en');
    }
 
    useEffect(() => {

        const getCoinUrl = "https://api.coingecko.com/api/v3/coins/"+coinId;
        const getHistoryUrl = "https://api.coingecko.com/api/v3/coins/"+coinId+"/market_chart?vs_currency=usd&days=15";

        function createChart() {
            var ctx = document.getElementById('main-chart');
            if (ctx) {
                ctx.getContext('2d');
                axios(getHistoryUrl).then((response) => {
                    var prices = response.data.prices.map(item => {
                        var timestamp = item[0];
                        var price = Number.parseFloat(item[1]).toFixed(2);
                        return {"t": parseInt(timestamp), "y": price};
                    })
                    new Chart(ctx, {
                        data: {
                            datasets: [{
                                label: 'Price',
                                backgroundColor: '#ff6384',
                                borderColor: '#ff6384',
                                data: prices,
                                type: 'line',
                                pointRadius: 0,
                                fill: false,
                                lineTension: 0,
                                borderWidth: 2
                            }],
                        },
                        options: {
                            animation: {
                                duration: 0
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    distribution: 'series',
                                    offset: true,
                                    ticks: {
                                        major: {
                                            enabled: true,
                                            fontStyle: 'bold'
                                        },
                                        source: 'data',
                                        autoSkip: true,
                                        autoSkipPadding: 75,
                                        maxRotation: 0,
                                        sampleSize: 100
                                    },
                                    afterBuildTicks: function(scale, ticks) {
                                        console.log(scale)
                                        console.log(ticks)
                                        var majorUnit = scale._majorUnit;
                                        var firstTick = ticks[0];
                                        var i, ilen, val, tick, currMajor, lastMajor;
                    
                                        val = moment(ticks[0].value);
                                        if ((majorUnit === 'minute' && val.second() === 0)
                                                || (majorUnit === 'hour' && val.minute() === 0)
                                                || (majorUnit === 'day' && val.hour() === 9)
                                                || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                                                || (majorUnit === 'year' && val.month() === 0)) {
                                            firstTick.major = true;
                                        } else {
                                            firstTick.major = false;
                                        }
                                        lastMajor = val.get(majorUnit);
                    
                                        for (i = 1, ilen = ticks.length; i < ilen; i++) {
                                            tick = ticks[i];
                                            val = moment(tick.value);
                                            currMajor = val.get(majorUnit);
                                            tick.major = currMajor !== lastMajor;
                                            lastMajor = currMajor;
                                        }
                                        return ticks;
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        drawBorder: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Closing price ($)'
                                    }
                                }]
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            tooltips: {
                                intersect: false,
                                mode: 'index',
                                callbacks: {
                                    label: function(tooltipItem, myData) {
                                        var label = myData.datasets[tooltipItem.datasetIndex].label + ' ' || '';
                                        label += parseFloat(tooltipItem.value).toFixed(2) + '$';
                                        return label;
                                    }
                                }
                            }
                        }
                    });
                })
            }
        }

        // Load currency data, then create chart
        axios(getCoinUrl).then((result) => {
            setData(result.data);
            createChart();
        })

    }, [coinId]);

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
                            <li><label>Rank</label>{ data.market_cap_rank}</li>
                            <li><label>Website</label><a href={data.links.homepage[0]} target="_blank">{data.links.homepage[0]}</a></li>
                            <li><label>Current price</label>{ formatPrice(data.market_data.current_price.eur) } €</li>
                            <li><label>Total volume</label>{ formatPrice(data.market_data.total_volume.eur) } €</li>
                            <li><label>Market cap</label>{ formatPrice(data.market_data.market_cap.eur) } €</li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={12} xs={12}>
                        <div className="chart-container">
                            <canvas id="main-chart"></canvas>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default CryptoDetail;