import React, { useState, useEffect } from 'react'
import BaseContext from '../contexts/base';
import CryptoList from './CryptoList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
import Tour from 'reactour';
import '../assets/css/main.css';

// API
import cryptoApi from "../api/crypto";

// guided tour style var
const stepStyle = {
    borderRadius : '10px'
};

// Guided tour steps
const steps = [
    {
        selector: '',
        style: stepStyle,
        content: 'Welcome to The Count Of Money! Here is a quick tour to get you on track!',
    },
    {
        selector: '.step1',
        style: stepStyle,
        content: 'See these cool stars? They will let you add your favorite cryptos to your own private portfolio!',
    },
    {
        selector: '.step1',
        style: stepStyle,
        content: 'You can click on any crypto\'s star in order to add or remove it from your portfolio.',
    },
    {
        selector: '.step1',
        style: stepStyle,
        content: 'You will notice it\'s color changes weather you chose the crypto to be among your favorites, or not!',
    },
    {
        selector: '.step2',
        style: stepStyle,
        content: 'Once you\'re ready, you can check out all your fav\'s over here!',
    },
    {
        selector: '.step3',
        style: stepStyle,
        content: 'One last thing.. Don\'t forget to log out when you\'re done! Have fun!',
    }
  ];


// ROUTE : /
// DESC : will render all cryptos.
const Landing = () => {
    
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
    const [isTourOpen, setIsTourOpen] = useState(cookies.get('byPassTour') ? false : true);
    const [defaultCurrency, setDefaultCurrency] = useState(cookies.get('currency') ? cookies.get('currency') : "usd");
    const [currencyValue, setCurrencyValue] = useState(defaultCurrency);
    const [data, setData] = useState([]);
    const [contextValue, setContextValue] = useState({});
    const theChartDataObj = {};

    // DESC : fetches data from api, and updates data every 30s
    useEffect(() => {

        // DESC : fetch cryptos general data
        const fetchData = async () => {            
            cryptoApi.getDetailed(defaultCurrency).then((result) => {

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

    const closeTour = () => {
        cookies.set('byPassTour', true, { path: '/' });
        setIsTourOpen(false)
    }

    return (
        <section className="landing">
            <div className="main-comp">
                <Tour className="tour"
                    steps={steps}
                    isOpen={isTourOpen}
                    rounded={5}
                    onRequestClose={() => closeTour()}
                />
                <BaseContext.Provider value={contextValue}>
                    <table className="crypto-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Rank</th>
                                <th></th>
                                <th>Coin<FontAwesomeIcon icon={faCoins} className="sub-icon"/></th>
                                <th>Tag</th>
                                <th>Price
                                    <select className="currencySelect sub-icon" value={currencyValue} onChange={e => onSelectChange(e)}>
                                        {currencies.map(({ label, value }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>24h %</th>
                                <th>24h<FontAwesomeIcon icon={faMoneyBill} className="sub-icon"/></th>
                                <th>Market Cap</th>
                                <th>30d Chart Evolution</th>
                            </tr>
                        </thead>
                        <CryptoList className="tourStep1" data={data} defaultStarCol={'lightgrey'} ></CryptoList>
                    </table>
                </BaseContext.Provider>
            </div>
        </section>
    )
}
export default Landing;
