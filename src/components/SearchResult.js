import axios from 'axios';
import './SearchResult.scss'; 

const SearchResult = ({ listId, recipe, list, setList }) => {
    const addToList = async recipeId => {
        const { data } = await axios.post(`/lists/${listId}/recipes`, { recipeId: recipeId });
        setList(data.list);
    }

    return (
        <div className="search-result" key={recipe.idMeal}>
            <div className="search-result__wrapper">
                <img className="search-result__img" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <div>
                    <h2 className="search-result__name">{recipe.strMeal}</h2>
                    <p className="search-result__type">Recipe</p>
                </div>
            </div>
            <button className="search-result__button" onClick={() => addToList(recipe.idMeal)}>Add</button>
        </div>
    )
}

export default SearchResult;