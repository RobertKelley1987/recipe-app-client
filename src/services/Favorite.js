import axios from 'axios';
import { SERVER_URL } from './server-url';

const server = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

const Favorite = {
    // Get all favorites from app server
    getAll: async userId => {
        const { data } = await server.get(`/users/${userId}/favorites`);
        return data;
    },
    toggle: async (recipe, userId) => {
        const { data } = await server.post(`/users/${userId}/favorites`, recipe);
        return data;
    }
}

export default Favorite;