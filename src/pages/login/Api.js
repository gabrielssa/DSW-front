import axios from 'axios';

const Api = axios.create({
    baseURL: "https://dsw-backend.herokuapp.com"
});

export default Api;