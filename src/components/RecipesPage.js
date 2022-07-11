import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWithFilter from './PageWithFilter';
import Squares from './Squares/Squares';
import { URL_CODE_LETTERS } from './util/url-code-letters';

const RecipesPage = props => {
    const [recipes, setRecipes] = useState([]);
    const { name } = useParams();
    const { filterType } = props;

    // Get recipes from api based on url provided on initial render
    useEffect(() => {
        const getRecipes = async () => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${URL_CODE_LETTERS[filterType]}=${name}`);
            setRecipes(data.meals);
        }

        getRecipes();
    }, [filterType, name]);

    // Pass recipes to display page with filter feature
    return <PageWithFilter {...props} allItems={recipes} listComponent={Squares} resultType='recipe' />
}

export default RecipesPage;