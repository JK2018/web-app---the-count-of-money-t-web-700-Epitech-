import axios from "axios"
import urlApi from "./config";

const userApi = {
    signin: (credentials) => {
        return axios.post(`${urlApi}/users/login`, credentials)
    },

    singup: (credentials) => {
    }
};

export default userApi;
