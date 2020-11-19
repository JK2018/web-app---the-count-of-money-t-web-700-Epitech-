import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CryptoList from './CryptoList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill, faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';

// ROUTE : /
// DESC : will render all cryptos.
const Landing = () => {
    
    
    const [currencies] = useState([
        { label: "USD", value: "usd"},
        { label: "EUR", value: "eur"},
        { label: "GBP", value: "gbp"},
        { label: "CAD", value: "cad"},
        { label: "CHF", value: "chf"},
        { label: "JPY", value: "jpy"}
    ]);
    const cookies = new Cookies();
    const [c,setC] = useState(cookies.get('currency'));
    const [currencyValue, setCurrencyValue] = useState(c);
    const [apiUrl, setApiUrl] = useState("https://api.coingecko.com/api/v3/coins/markets?vs_currency="+c+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d");
    const [data, setData] = useState([]);
    const [allcoinsChartDataFinal, setAllcoinsChartDataFinal] = useState([]);
 

    // fetches data from api, and updates data every 30s
    useEffect(() => {
        const fetchData = async () => {
            setApiUrl("https://api.coingecko.com/api/v3/coins/markets?vs_currency="+c+"&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d");
            const result = await axios(apiUrl,);
            setData(result.data);
            const chartData = (result.data).filter(data => data.market_cap_rank < 11);
            var allcoinsChartData = [];

            for (let i = 0; i < chartData.length-1; i++) {
                var url ="https://api.coingecko.com/api/v3/coins/"+chartData[i].id+"/market_chart?vs_currency=usd&days=30&interval=daily"
                const result22 = await axios(url,);
                const chartPricesRaw = result22.data.prices;
                const chartPricesFinal = chartPricesRaw.map(elem => ({ 'val': elem[1]})); 
                allcoinsChartData.push(chartPricesFinal);   
            }
            setAllcoinsChartDataFinal(allcoinsChartData);
        }
        
        const interval=setInterval(()=>{
            fetchData(); 
           },30000);
           fetchData();  

        return()=>{
        clearInterval(interval)}
    }, c);
 


    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/' });
        window.location.reload(false);
       
    } 
//value={currValue} onChange={e=>setCurrValue(e.currentTarget.value)}
    return (
        <section className="landing">
            <div className="mainCompDiv">
            
            <div className="lidiv hder">
                        <p className="pml"><FontAwesomeIcon style={{color: 'white'}} icon={faStar}/></p>
                        <p className="pml">Rank</p>
                        <p className="iconimg"> </p>
                        <p className="pxl coinName">Coin <FontAwesomeIcon icon={faCoins}/></p>
                        <p className="pml">Tag</p>
                        <p className="pml4">Price 
                        <select className="currencySelect" value={currencyValue} onChange={e => onSelectChange(e)}>
                            {currencies.map(({label, value})=>(
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select></p> 
                        
                        <p className="pml">24h %</p>
                        <p className="pxl daycash">24h <FontAwesomeIcon icon={faMoneyBill}/></p>
                        <p className="pxl-4">Market Cap</p>
                        <p className="pxl">7d Chart</p>
                    </div>
                
                <CryptoList allcoinsChartDataFinal={allcoinsChartDataFinal} data={data} defaultStarCol={'lightgrey'} ></CryptoList>
            </div>
        </section>
    )
}
export default Landing;
