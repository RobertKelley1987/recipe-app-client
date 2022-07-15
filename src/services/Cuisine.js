import axios from 'axios';

const Cuisine = {
    // Get all cuisines from meal db api
    getAll: async () => {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        return data;
    }
}

export default Cuisine;