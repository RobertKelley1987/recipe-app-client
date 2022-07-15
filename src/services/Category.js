import axios from 'axios';

const Category = {
    // Get all categories from meal db api
    getAll: async () => {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        return data;
    }
}

export default Category;