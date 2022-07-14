import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteLink from './DeleteLink';
import HeartSVG from './../SVGs/HeartSVG';
import Img from './../Img';
import Options from './../Options';
import './RecipeSquare.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const RecipeSquare = props => {
    const [recipe, setRecipe] = useState(null);
    const { searchURL } = props;

    // On initial render, get recipe using url provided and save to component state
    useEffect(() => {
        const getRecipe = async searchURL => {
            if(searchURL) {
                const { data } = await axios.get(searchURL);
                data.meals && setRecipe(data.meals[0]);
            } 
        }

        getRecipe(searchURL);
    }, [searchURL]);

    return recipe && (
        <div className="recipe-square">
            <DeleteLink recipeId={recipe.idMeal} />
            <Link className="recipe-square__link" to={`/recipes/${recipe.idMeal}`}>
                <Img {...props} className="recipe-square__img" imgAlt={recipe.strMeal} imgSrc={recipe.strMealThumb} />
                <h2 className="recipe-square__name">{recipe.strMeal}</h2>
            </Link>
            <Link className="recipe-square__meta-data" to={`/categories/${recipe.strCategory}`}>
                <span className="recipe-square__meta-data--bold">Category</span> - {recipe.strCategory}
            </Link>
            <Link className="recipe-square__meta-data" to={`/cuisines/${recipe.strArea}`}>
                <span className="recipe-square__meta-data--bold">Cuisine</span> - {recipe.strArea}
            </Link>
            <Options {...props}>
                <HeartSVG {...props} className="recipe-square__svg" recipe={recipe} />
            </Options>
        </div>
    );
}

export default RecipeSquare;