import axios from 'axios';
import { SERVER_URL } from './server-url';

const server = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

const List = {
    // Add recipe to a list
    addRecipe: async (listId, recipe, userId) => {
        const { data } = await server.post(`/users/${userId}/lists/${listId}/recipes`, recipe);
        return data;
    },
    // Create new list
    create: async (listName, userId) => {
        const { data } = await server.post(`/users/${userId}/lists`, { name: listName });
        return data;
    },
    // Delete an entire list
    deleteOne: async (listId, userId) => {
        const { data } = await server.delete(`/users/${userId}/lists/${listId}`);
        return data;
    },
    // Delete recipe from a list
    deleteRecipe: async (listId, recipeId, userId) => {
        const { data } = await server.delete(`/users/${userId}/lists/${listId}/recipes/${recipeId}`);
        return data;
    },
    // Edit the name of a list
    editName: async (listId, newName, userId) => {
        const { data } = await server.put(`/users/${userId}/lists/${listId}`, { name: newName });
        return data;
    },
    // Get all lists for a user
    getAll: async userId => {
        const { data } = await server.get(`/users/${userId}/lists`);
        return data;
    },
    // Get data for one list
    getOne: async (listId, userId) => {
        const { data } = await server.get(`/users/${userId}/lists/${listId}`);
        return data;
    }
}

export default List;