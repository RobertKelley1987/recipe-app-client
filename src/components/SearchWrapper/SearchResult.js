import axios from 'axios';
import { useState } from 'react';
import AddButton from './AddButton';
import ArrowRightSVG from '../SVGs/ArrowRightSVG';
import DeleteButton from './DeleteButton';
import ImgPlaceholder from '../ImgPlaceholder';
import RecipeLink from './RecipeLink';
import './SearchResult.scss'; 

const API_CODE_LETTERS = {
    'ingredient': 'i',
    'category': 'c',
    'cuisine': 'a'
}

const renderButton = (list, resultId, resultName, resultType, updateList) => {
    if (resultType === 'recipe') {
        let recipeIsOnList = list.recipes.findIndex(recipe => recipe.apiId === resultId) !== -1;
        if (recipeIsOnList) {
            return <DeleteButton recipeId={resultId} listId={list._id} updateList={updateList} />
        } else {
            return <AddButton recipeId={resultId} recipeName={resultName} listId={list._id} updateList={updateList} />
        }
    } else {
        return <ArrowRightSVG className="search-result__svg"/>
    }
}

const renderImg = (imgError, setImgError, resultImg, resultName) => {
    if(resultImg && !imgError) {
        return <img className="search-result__img" onError={() => setImgError(true)} src={resultImg} alt={resultName}/>
    } else {
        return <ImgPlaceholder letter={resultName.slice(0, 1)} className={'search-result__img-placeholder'}/>
    }
}

const SearchResult = ({ list, updateList, resultId, resultImg, resultName, resultType, setFilter, searchEl }) => {
    // track whether the img for this result could not be found
    const [imgError, setImgError] = useState(false);

    const getFilteredRecipes = async (name) => {
        if(resultType !== 'recipe') {
            const urlSlug = name.toLowerCase().replace(/ /g, '_');
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${API_CODE_LETTERS[resultType]}=${urlSlug}`);
            setFilter(name, data.meals, resultType);
            // scroll to top of search results after selecting an ingredient / cuisine to filter by
            searchEl.current.scrollIntoView();
        }
    }

    return (
        <div onClick={() => getFilteredRecipes(resultName)} className="search-result" key={resultId}>
            <RecipeLink className="search-result__wrapper" resultType={resultType} url={`/recipes/${resultId}`}>
                {renderImg (imgError, setImgError, resultImg, resultName)}
                <div>
                    <h3 className="search-result__name">{resultName}</h3>
                    <p className="search-result__type">{resultType}</p>
                </div>
            </RecipeLink>
            {renderButton (list, resultId, resultName, resultType, updateList)}
        </div>
    )
}

export default SearchResult;