import axios from 'axios';

const Favorite = {
    // Get all favorites from app server
    getAll: async userId => {
        const { data } = await axios.get(`/users/${userId}/favorites`);
        return data;
    },
    toggle: async (recipe, userId) => {
        const { data } = await axios.post(`/users/${userId}/favorites`, recipe);
        return data;
    }
}

export default Favorite;