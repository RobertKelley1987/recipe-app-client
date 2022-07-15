import axios from 'axios';

const Recipe = {
    getOne: async recipeId => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        return data;
    },
    getAllFilteredByCategory: async category => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        return data;
    },
    getAllFilteredByCuisine: async cuisine => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
        return data;
    },
    getAllFilteredByIngredient: async ingredient => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        return data;
    },
    getRandom: async () => {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        return data;
    },
    findAll: async searchTerm => {
        const { data } = await axios.get(`https:///www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        return data;
    }
}

export default Recipe;