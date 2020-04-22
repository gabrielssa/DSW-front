import axios from 'axios';

const Api = axios.create({
    baseURL: "http://dsw-backend.herokuapp.com"
});

export default Api;