import axios from 'axios';

const headers = {};

export const axieApi = axios.create({
    baseURL: `https://api.axie.technology`,
    headers,
});

export const salesInstance = axios.create({
    baseURL: `http://104.197.95.0:3001`,
    headers,
});

export const personalApi = axios.create({
    baseURL: `https://192.168.0.30:3000`,
    headers,
});
