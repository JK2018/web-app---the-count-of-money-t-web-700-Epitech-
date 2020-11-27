import React, { useState, useEffect } from 'react'
import BaseContext from '../contexts/base';
import CryptoList from './CryptoList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill, faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
import Tour from 'reactour';
import '../assets/css/main.css';

// API
import cryptoApi from "../api/crypto";



const steps = [
    {
        selector: '',
        content: 'Welcome to The Count Of Money! Here is a quick tour to get you on track!',
    },
    {
        waitSec: 5,
      selector: '.step1',
      content: 'See these cool stars? They will let you add your favorite cryptos to your own private portfolio!',
    },
    {
        selector: '.tourStep1',
        content: 'You can click on any crypto\'s star in order to add or remove it from your portfolio.',
    },
    {
        selector: '.tourStep1',
        content: 'You will notice it\'s color changes weather you chose the crypto to be among your favorites, or not!',
    },
    {
        selector: '.tourStep2',
        content: 'Once you\'re done, you can check out all your fav\'s over here! Have fun!',
    },
    // ...
  ];


// ROUTE : /
// DESC : will render all cryptos.
const Landing = () => {

    const [isTourOpen, setIsTourOpen] = useState(true);


    // DESC :  selectable currencies
    const [currencies] = useState([
        { label: "EUR", value: "eur" },
        { label: "USD", value: "usd" },
        { label: "GBP", value: "gbp" },
        { label: "CAD", value: "cad" },
        { label: "CHF", value: "chf" },
        { label: "JPY", value: "jpy" }
    ]);

    const cookies = new Cookies();
    const [c, setC] = useState(cookies.get('currency') ? cookies.get('currency') : "usd");
    const [currencyValue, setCurrencyValue] = useState(c);
    const [data, setData] = useState([]);
    const [contextValue, setContextValue] = useState({});
    const theChartDataObj = {};

    // DESC : fetches data from api, and updates data every 30s
    useEffect(() => {

        // DESC : fetch cryptos general data
        const fetchData = async () => {            
            cryptoApi.getDetailed(c).then((result) => {

                setData(result.data);
    
                // DESC : fetch historical data for each chart and set it as an object attribute
                for (let i = 0; i < result.data.length; i++) {
                    cryptoApi.getHistoricData(result.data[i].id, "usd", 30, "daily").then((response) => {
                        const chartPricesRaw = response.data.prices;
                        const chartPricesFinal = chartPricesRaw.map(elem => ({ 'val': elem[1], 'rank': result.data[i].market_cap_rank }));
                        theChartDataObj['chartDataRank' + result.data[i].market_cap_rank] = chartPricesFinal;
                    })
                }
    
                // DESC : set the mini chart data obj to context
                theChartDataObj['data2'] = data;
                setContextValue(
                    theChartDataObj
                )
            })
        }
        fetchData();

        // DESC : refresh 30s interval
        const interval = setInterval(() => {
            fetchData();
        }, 30000);
        fetchData();

        return () => {
            clearInterval(interval)
        }
    }, []);

    // ACTION : when user selects currency via select menu
    // DESC : action when user selects another currency
    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/' });
        window.location.reload(false);
    }

    return (

        <section className="landing">
            <div className="tourStep1" style={{width: '35px',
  height: '465px',
  position: 'absolute',
  top: '190px',
  left: '4.4%'}}></div>
            <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}/>
            <BaseContext.Provider value={contextValue}>
                <div className="mainCompDiv">

                    <div className="lidiv hder">
                        <p className="pml"><FontAwesomeIcon style={{ color: 'white' }} icon={faStar} /></p>
                        <p className="pml">Rank</p>
                        <p className="iconimg"> </p>
                        <p className="pxl coinName">Coin <FontAwesomeIcon icon={faCoins} /></p>
                        <p className="pml">Tag</p>
                        <p className="pml4">Price
                    <select className="currencySelect" value={currencyValue} onChange={e => onSelectChange(e)}>
                                {currencies.map(({ label, value }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select></p>
                        <p className="pml">24h %</p>
                        <p className="pxl daycash">24h <FontAwesomeIcon icon={faMoneyBill} /></p>
                        <p className="pxl-4">Market Cap</p>
                        <p className="pxl">30d Chart</p>
                    </div>
                    <CryptoList className="tourStep1" data={data} defaultStarCol={'lightgrey'} ></CryptoList>
                </div>
            </BaseContext.Provider>
        </section>
    )
}
export default Landing;
