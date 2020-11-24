import axios from "axios"

const crypto = {

    get: (coinId) => {
        const getCoinUrl = "https://api.coingecko.com/api/v3/coins/"+coinId;
        return axios(getCoinUrl).then((response) => (response));
    },

    getDetailed: (currency, coinId) => {
        const getCoinUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+currency+"&ids="+coinId+"&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d";
        return axios(getCoinUrl).then((response) => (response));
    },

    getHistoricData: (coinId, currency = "usd", days = 30, interval = "days") => {
        const getHistoryUrl = "https://api.coingecko.com/api/v3/coins/"+coinId+"/market_chart?vs_currency="+currency+"&days="+days+"&interval="+interval;
        return axios(getHistoryUrl).then((response) => (response));
    }
};

export default crypto;