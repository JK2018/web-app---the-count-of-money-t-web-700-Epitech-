import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid";
import Chart from "chart.js";
import moment from "moment";
import parse from "html-react-parser";
import { renderNews, getRSSFeed } from '../utils/articles';
import "../assets/css/crypto-detail.css";

// API
import cryptoApi from "../api/crypto";

// Img
import upArrow from "../assets/img/up-arrow.svg"; 
import downArrow from "../assets/img/down-arrow.svg";


const CryptoDetail = () => {

    const params = useParams();
    const coinId = params.id;
    const [data, setData] = useState([]);
    const [news, setNews] = useState([]);

    function formatPrice(price) {
        return parseFloat(price).toLocaleString('en');
    }

    function trendPercentage(period) {
        var percent = parseFloat(data[`${period+'Evolution'}`]).toFixed(2);
        var icon = (percent > 0) ? upArrow : downArrow;
        return <div className="trend">
            <label>{period} evolution</label>
            <span><img src={icon} alt={icon}/>{parseFloat(data[`${period+'Evolution'}`]).toFixed(2)}%</span>
        </div>
    }
 
    useEffect(() => {

        function createMainChart() {
            var ctx = document.getElementById('main-chart');
            if (ctx) {
                ctx.getContext('2d');
                cryptoApi.getHistoricData(coinId).then((response) => {
                    var prices = response.data.prices.map(item => {
                        var timestamp = item[0];
                        var price = Number.parseFloat(item[1]).toFixed(2);
                        return {"t": parseInt(timestamp), "y": price};
                    })
                    new Chart(ctx, {
                        data: {
                            datasets: [{
                                label: 'Price',
                                backgroundColor: '#36a2eb',
                                borderColor: '#36a2eb',
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
        cryptoApi.get(coinId).then((result) => {
            setData(result.data);
            createMainChart();
            getRSSFeed([result.data.fullName]).then((posts) => setNews(posts));;
        })

    }, [coinId]);

    if (Object.keys(data).length === 0) {
        return <div></div>;
    } else {
        return (
            <div className="crypto-detail">
                <Grid container>
                    <Grid className="logo" lg={4} md={6} sm={6} xs={6} item>
                        <div>
                            <img src={data.imgUrl} alt="currency-logo"/>
                            <h1>{data.name}</h1>
                        </div>
                    </Grid>
                    <Grid className="infos" lg={4} md={6} sm={6} xs={6} item>
                        <ul>
                            <li><label>Rank</label>{data.rank}</li>
                            <li><label>Current price</label>{ formatPrice(data.currentPrice) } €</li>
                            <li><label>Total volume</label>{ formatPrice(data.volume) } €</li>
                            <li><label>Market cap</label>{ formatPrice(data.marketCap) } €</li>
                        </ul>
                    </Grid>
                    <Grid lg={4} md={12} sm={12} xs={12} item>
                        <Grid className="evol-chart">
                            {trendPercentage('day')}
                        </Grid>
                        <Grid className="evol-chart">
                            {trendPercentage('week')}
                        </Grid>
                        <Grid className="evol-chart">
                            {trendPercentage('month')}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={12} xs={12}>
                        <div className="chart-container">
                            <canvas id="main-chart"></canvas>
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={12} xs={12}>
                        <div className="description">
                            <p>{ parse(data.description) }</p>
                        </div>
                    </Grid>
                </Grid>
                <Grid container className="news">
                    <h2>Related news</h2>
                    <Grid container>
                        {renderNews(news)}
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default CryptoDetail;