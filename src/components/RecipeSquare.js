import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CloseSVG from './SVGs/CloseSVG';
import './RecipeSquare.scss';

const RecipeSquare = ({ editPage, recipeId }) => {
    const [recipe, setRecipe] = useState(null);
    const { listId } = useParams();
    const location = useLocation();

    useEffect(() => {
        const getRecipe = async recipeId => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
            setRecipe(data.meals[0]);
        }

        getRecipe(recipeId);
    }, [recipeId]);

    return recipe && (
        <div className="recipe-square">
            {editPage && (
                <Link to={`/lists/${listId}/recipes/${recipeId}`} state={{ backgroundLocation: location }}>
                    <CloseSVG className="recipe-square__delete-button"/>
                </Link>
            )}
            <Link className="recipe-square__link" to={`/recipes/${recipeId}`}>
                <img className="recipe-square__img" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <h2 className="recipe-square__name">{recipe.strMeal}</h2>
                <p className="recipe-square__meta-data">
                    <span className="recipe-square__meta-data--bold">Category</span> - {recipe.strCategory}
                </p>
                <p className="recipe-square__meta-data">
                    <span className="recipe-square__meta-data--bold">Cuisine</span> - {recipe.strArea}
                </p>
            </Link>
        </div>
    )
}

export default RecipeSquare;