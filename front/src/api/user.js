import axios from "axios"
import urlApi from "./config";

const user = {
    signin: (credentials) => {
        return axios.post(`${urlApi}/users/login`, credentials)
    },

    singup: (credentials) => {
    }
};

export default user;