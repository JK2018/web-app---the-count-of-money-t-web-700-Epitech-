import axios from "axios"
import urlApi from "./config";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const user = {
    signin: (credentials) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios.post(urlApi+'/api/users/login', credentials, config)
                .then((response) => {
                    if (response.data && response.status === 201) {
                        // Save access token in Local Storage
                        cookies.set("accessToken", response.data.access_token, { path: '/' });
                        resolve(response.data);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
            });
    },

    create: (request) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios.post(urlApi+'/api/users/register', request, config)
                .then((response) => {
                    if (response.data && response.status === 201) {
                        request = JSON.parse(request);
                        var credentials = {'email': request.email, 'password': request.password};
                        user.signin(credentials).then((response) => {
                            resolve(response);
                        })
                    }
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