import axios from './axios.instance';

export const getAxieDetails = (axieId) => axios.get(`/getaxies/${axieId}`);

export const getNonCachedAxieDetails = (axieId) => axios.get(`/invalidateaxie/${axieId}`);
