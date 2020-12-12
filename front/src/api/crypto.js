import axios from "axios"
import urlApi from "./config";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const crypto = {

    get: (coinId) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("accessToken")
            }
        };
        return new Promise((resolve, reject) => {
            axios(urlApi+"/api/cryptos/public/"+coinId, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getAll: () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("accessToken")
            }
        };
        return new Promise((resolve, reject) => {
            axios.get(urlApi+"/api/cryptos", config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getAllPublic: () => {
        return new Promise((resolve, reject) => {
            axios.get(urlApi+"/api/cryptos/public")
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

    getHistoricData: (coinId, interval = "daily") => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("accessToken")
            }
        };
        return new Promise((resolve, reject) => {
            const getHistoryUrl = urlApi + "/api/cryptos/public/"+coinId +"/history/"+interval;
            axios(getHistoryUrl, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    create: (request) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("accessToken")
            }
        };
        return new Promise((resolve, reject) => {
            axios.post(urlApi+"/api/cryptos/", request, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    update: (cryptoId, request) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("accessToken")
            }
        };
        return new Promise((resolve, reject) => {
            axios.put(urlApi+"/api/cryptos/"+cryptoId, request, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    deleteOne: (cryptoId) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("accessToken")
            }
        };
        return new Promise((resolve, reject) => {
            axios.delete(urlApi+"/api/cryptos/"+cryptoId, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
};

export default crypto;