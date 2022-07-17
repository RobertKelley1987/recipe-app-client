import axios from 'axios';
import { SERVER_URL } from './server-url';

const Favorite = {
    // Get all favorites from app server
    getAll: async userId => {
        const { data } = await axios.get(`${SERVER_URL}/users/${userId}/favorites`);
        return data;
    },
    toggle: async (recipe, userId) => {
        const { data } = await axios.post(`${SERVER_URL}/users/${userId}/favorites`, recipe);
        return data;
    }
}

export default Favorite;