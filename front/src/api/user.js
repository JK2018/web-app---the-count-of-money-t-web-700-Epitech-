import axios from "axios"
import urlApi from "./config";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const user = {

    get: () => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get("accessToken")
                }
            };
            axios.get(urlApi+'/api/users/profile', config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
            });
    },

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
                        // Save access token in Cookie
                        cookies.set("accessToken", response.data.access_token, { path: '/' });
                    }
                    resolve(response.data);
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

    update: (userId, request) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get("accessToken")
                }
            }
            axios.put(urlApi+'/api/users/'+userId, request, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    addFavoriteCrypto: (cryptoId) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get("accessToken")
                }
            }
            axios.put(urlApi+'/api/users/cryptos/'+cryptoId, {}, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    removeFavoriteCrypto: (cryptoId) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get("accessToken")
                }
            }
            axios.delete(urlApi+'/api/users/cryptos/'+cryptoId, config)
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