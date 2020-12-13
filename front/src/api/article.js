import axios from "axios"
import urlApi from "./config";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const article = {

    getArticles: (logged = false) => {
        return new Promise((resolve, reject) => {
            var config = {};
            if (logged) {
                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.get("accessToken")
                    }
                };
            }
            axios.get(urlApi + "/api/articles", config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getFeeds: () => {
        return new Promise((resolve, reject) => {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get("accessToken")
                }
            };
            axios(urlApi + "/api/articles/press/list", config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
};

export default article;