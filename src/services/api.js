import axios from  'axios';

export const api = axios.create({
    baseURL: 'https://pacific-anchorage-32368.herokuapp.com',
    withCredentials: true
});