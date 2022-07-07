import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredPage from './FilteredPage';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async category => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            setRecipes(data.meals);
        }

        getRecipes(categoryName);
    }, [])

    return <FilteredPage filterName={categoryName} filterType={'category'} recipes={recipes} />;
}

export default CategoryPage;