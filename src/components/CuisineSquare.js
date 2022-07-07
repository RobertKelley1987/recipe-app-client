import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CuisineSquare.scss';

const CuisineSquare = ({ cuisineName }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async cuisine => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
            setRecipe(data.meals[1]);
        }

        getRecipe(cuisineName)
    }, []);

    return recipe && (
        <div className="cuisine-square">
            <Link className="cuisine-square__link" to={`/cuisines/${cuisineName}`}>
                <img className="cuisine-square__img" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <h2 className="cuisine-square__name">{cuisineName}</h2>
            </Link>
        </div>
    )
}

export default CuisineSquare;