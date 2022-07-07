import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredPage from './FilteredPage';

const CuisinePage = () => {
    const { cuisineName } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async cuisine => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
            setRecipes(data.meals);
        }

        getRecipes(cuisineName);
    }, [cuisineName])

    return <FilteredPage filterName={cuisineName} filterType={'cuisine'} recipes={recipes} />;
}

export default CuisinePage;