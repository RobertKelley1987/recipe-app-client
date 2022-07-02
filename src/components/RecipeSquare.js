import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecipeSquare.scss';

const RecipeSquare = ({ recipeId }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async () => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
            setRecipe(data.meals[0]);
        }

        getRecipe();
    }, [recipeId]);

    return recipe && (
        <div>
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