import axios from 'axios';

const headers = {};

const instance = axios.create({
    baseURL: `https://api.axie.technology`,
    headers,
});

export default instance;
