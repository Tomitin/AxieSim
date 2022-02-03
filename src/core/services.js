import { axieApi } from './axios.instance';

export const getAxieDetails = (axieId) => axieApi.get(`/getaxies/${axieId}`);

export const getNonCachedAxieDetails = (axieId) => axieApi.get(`/invalidateaxie/${axieId}`);
