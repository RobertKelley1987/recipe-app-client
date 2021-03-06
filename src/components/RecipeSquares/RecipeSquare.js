import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useRecipe from '../../hooks/useRecipe';
import HeartSVG from './../SVGs/HeartSVG';
import Img from './../Img';
import Options from './../Options';
import RecipeDropdown from './RecipeDropdown';
import './RecipeSquare.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const RecipeSquare = props => {
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
    const { recipeId } = props;
    const { recipe } = useRecipe(recipeId);
    const location = useLocation();

    // After clicking a link to a modal, hide dropdown menu
    useEffect(() => {
        if(location.state && location.state.backgroundLocation) {
            setDropdownIsVisible(false);
        }
    }, [location]);

    return recipe && (
        <div className="recipe-square">
            {/* Image of recipe and title surrounded by Link */}
            <Link className="recipe-square__link" to={`/recipes/${recipe.idMeal}`}>
                <Img {...props} className="recipe-square__img" imgAlt={recipe.strMeal} imgSrc={recipe.strMealThumb} />
                <h2 className="recipe-square__name">{recipe.strMeal}</h2>
            </Link>
            {/* Meta data -- links to category and cuisine type of the recipe */}
            <Link className="recipe-square__meta-data" to={`/categories/${recipe.strCategory}`}>
                <span className="recipe-square__meta-data--bold">Category</span> - {recipe.strCategory}
            </Link>
            <Link className="recipe-square__meta-data" to={`/cuisines/${recipe.strArea}`}>
                <span className="recipe-square__meta-data--bold">Cuisine</span> - {recipe.strArea}
            </Link>
            {/* Options menu represented by row of SVGs */}
            <Options {...props} dropdown={RecipeDropdown} dropdownIsVisible={dropdownIsVisible} recipeId={recipe.idMeal} setDropdownIsVisible={setDropdownIsVisible} >
                <HeartSVG {...props} className="recipe-square__svg" recipe={recipe} />
            </Options>
        </div>
    );
}

export default RecipeSquare;