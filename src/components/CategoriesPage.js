import { useEffect, useState } from 'react'; 
import axios from 'axios';
import BrowseByPage from './BrowseByPage';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
            setCategories(data.meals);
        }
        
        getCategories();
    }, [])

    return <BrowseByPage filterType='category' items={categories} />
}

export default CategoriesPage;