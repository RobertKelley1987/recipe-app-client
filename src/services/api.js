import axios from  'axios';

const devURL = 'http://localhost:3000';
const productionURL = 'https://pacific-anchorage-32368.herokuapp.com';

export const api = axios.create({
    baseURL: productionURL,
    withCredentials: true
});