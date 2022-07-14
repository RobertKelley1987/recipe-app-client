import { Link } from 'react-router-dom';
import Img from './Img';
import RecipeButton from './RecipeButton';
import './SearchResult.scss'; 

const RecipeResult = ({ list, updateList, recipe }) => {
    return (
        <div className="search-result">
            <Link className="search-result__wrapper" to={`/recipes/${recipe.idMeal}`}>
                <Img resultImg={recipe.strMealThumb} resultName={recipe.strMeal} />
                <div>
                    <h3 className="search-result__name">{recipe.strMeal}</h3>
                    <p className="search-result__type">Recipe</p>
                </div>
            </Link>
            <RecipeButton list={list} recipe={recipe} updateList={updateList} />
        </div>
    )
}

export default RecipeResult;