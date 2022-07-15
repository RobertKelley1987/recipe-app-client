import axios from 'axios';
import { sortIngredients } from '../util/sort-functions';

const Ingredient = {
    // Fetch all ingredients from meal db api
    getAll: async () => {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        // Sort ingredients alphabetically by name
        data.meals.sort((a, b) => sortIngredients(a, b));
        return data;
    }
}

export default Ingredient;