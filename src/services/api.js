import axios from  'axios';

const devURL = 'http://localhost:3001';
const productionURL = 'https://pacific-anchorage-32368.herokuapp.com';

export const api = axios.create({
    baseURL: devURL,
    withCredentials: true
});