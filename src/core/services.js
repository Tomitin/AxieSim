import axios from './axios.instance';

// /invalidateaxie/axie_id without cache
export const getAxieDetails = (axieId) => axios.get(`/getgenes/${axieId}/all`);
