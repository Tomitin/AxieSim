import axios from './axios.instance';

export const getAxieDetails = (axieId) => axios.get(`/getgenes/${axieId}/all`);

export const getNonCachedAxieDetails = (axieId) => axios.get(`/invalidateaxie/${axieId}`);
