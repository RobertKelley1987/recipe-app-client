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

const renderButton = (list, listId, resultId, resultName, resultType, updateList) => {
    if (resultType === 'recipe') {
        
        if (list.recipes.findIndex(recipe => recipe.apiId === resultId) !== -1) {
            return <DeleteButton recipeId={resultId} listId={listId} updateList={updateList} />
        } else {
            return <AddButton recipeId={resultId} recipeName={resultName} listId={listId} updateList={updateList} />
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

const SearchResult = ({ list, listId, updateList, resultId, resultImg, resultName, resultType, setFilteredRecipes, setFilteredBy, setFilterType }) => {
    const [imgError, setImgError] = useState(false);

    const getFilteredRecipes = async (name) => {
        if(resultType !== 'recipe') {
            const slugName = name.toLowerCase().replace(/ /g, '_');
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${API_CODE_LETTERS[resultType]}=${slugName}`);
            setFilteredRecipes(data.meals);
            setFilteredBy(name);
            setFilterType(resultType);
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
            {renderButton (list, listId, resultId, resultName, resultType, updateList)}
        </div>
    )
}

export default SearchResult;