import { api } from './api';

const List = {
    // Add recipe to a list
    addRecipe: async (listId, recipe, userId) => {
        const { data } = await api.post(`/users/${userId}/lists/${listId}/recipes`, recipe);
        return data;
    },
    // Create new list
    create: async (listName, userId) => {
        const { data } = await api.post(`/users/${userId}/lists`, { name: listName });
        return data;
    },
    // Delete an entire list
    deleteOne: async (listId, userId) => {
        const { data } = await api.delete(`/users/${userId}/lists/${listId}`);
        return data;
    },
    // Delete recipe from a list
    deleteRecipe: async (listId, recipeId, userId) => {
        const { data } = await api.delete(`/users/${userId}/lists/${listId}/recipes/${recipeId}`);
        return data;
    },
    // Edit the name of a list
    editName: async (listId, newName, userId) => {
        const { data } = await api.put(`/users/${userId}/lists/${listId}`, { name: newName });
        return data;
    },
    // Get all lists for a user
    getAll: async userId => {
        const { data } = await api.get(`/users/${userId}/lists`);
        return data;
    },
    // Get data for one list
    getOne: async (listId, userId) => {
        const { data } = await api.get(`/users/${userId}/lists/${listId}`);
        return data;
    }
}

export default List;