import axios from 'axios';
import { useState } from 'react';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import ImgPlaceholder from '../ImgPlaceholder';
import './SearchResult.scss'; 

const apiCodeLetters = {
    'ingredient': 'i',
    'category': 'c',
    'cuisine': 'a'
}

const renderButton = (list, listId, resultId, resultType, setList) => {
    console.log(list);
    if (resultType === 'recipe') {
        if (list.recipes.includes(resultId)) {
            return <DeleteButton recipeId={resultId} listId={listId} setList={setList} />
        }
            return <AddButton recipeId={resultId} listId={listId} setList={setList} />
    }
}

const renderImg = (imgError, setImgError, resultImg, resultName) => {
    if(resultImg && !imgError) {
        return <img className="search-result__img" onError={() => setImgError(true)} src={resultImg} alt={resultName}/>
    } else {
        return <ImgPlaceholder letter={resultName.slice(0, 1)} className={'search-result__img-placeholder'}/>
    }
}

const SearchResult = ({ list, listId, setList, resultId, resultImg, resultName, resultType, setFilteredRecipes, setFilteredBy, setFilterType }) => {
    const [imgError, setImgError] = useState(false);

    const getFilteredRecipes = async (name) => {
        if(resultType !== 'recipe') {
            const slugName = name.toLowerCase().replace(/ /g, '_');
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${apiCodeLetters[resultType]}=${slugName}`);
            setFilteredRecipes(data.meals);
            setFilteredBy(name);
            setFilterType(resultType);
        }
    }

    return (
        <div onClick={() => getFilteredRecipes(resultName)} className="search-result" key={resultId}>
            <div className="search-result__wrapper">
                {renderImg (imgError, setImgError, resultImg, resultName)}
                <div>
                    <h3 className="search-result__name">{resultName}</h3>
                    <p className="search-result__type">{resultType}</p>
                </div>
            </div>
            {renderButton (list, listId, resultId, resultType, setList)}
        </div>
    )
}

export default SearchResult;