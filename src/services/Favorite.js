import { api } from './api';

const Favorite = {
    // Get all favorites from app server
    getAll: async userId => {
        const { data } = await api.get(`/users/${userId}/favorites`);
        return data;
    },
    toggle: async (recipe, userId) => {
        const { data } = await api.post(`/users/${userId}/favorites`, recipe);
        return data;
    }
}

export default Favorite;