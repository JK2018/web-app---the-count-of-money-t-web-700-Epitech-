import axios from "axios"
import urlApi from "./config";

const user = {
    signin: (credentials) => {
        return axios.post(`${urlApi}/users/login`, credentials)
    },

    singup: (credentials) => {
    },

    create: (request) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios.put(urlApi+'/api/users', request, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    update: (request) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post(urlApi+'/api/users', request, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
};

export default user;