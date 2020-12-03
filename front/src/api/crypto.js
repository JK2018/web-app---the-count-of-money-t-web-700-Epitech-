import axios from "axios"

const crypto = {

    get: (coinId) => {
        return new Promise((resolve, reject) => {
            const getCoinUrl = "https://api.coingecko.com/api/v3/coins/"+coinId;
            axios(getCoinUrl)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getDetailed: (currency, coinId) => {
        return new Promise((resolve, reject) => {
            const coinFilter = coinId ? "&ids="+coinId : "";
            const getCoinUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+currency+coinFilter+"&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d";
            axios(getCoinUrl)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getHistoricData: (coinId, currency = "usd", days = 30, interval = "days") => {
        return new Promise((resolve, reject) => {
            const getHistoryUrl = "https://api.coingecko.com/api/v3/coins/"+coinId+"/market_chart?vs_currency="+currency+"&days="+days+"&interval="+interval;
            axios(getHistoryUrl)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
};

export default crypto;