import { URL_CODE_LETTERS } from "./url-code-letters";

// Each type of api result (category, cuisine, recipe) uses 
// unique prop names. This object provides a lookup to access
// the name and id for each type of result.
export const PROP_NAMES = {
    'recipe': {
        idProp: 'idMeal',
        nameProp: 'strMeal',
    },
    // using name prop as id prop -- no id is returned from api for list of all categories
    'category': {
        idProp: 'strCategory',
        nameProp: 'strCategory',
    },
    'ingredient': {
        idProp: 'idIngredient',
        nameProp: 'strIngredient',
    },
    // using name prop as id prop -- no id is returned from api for list of all cuisines
    'cuisine': {
        idProp: 'strArea', 
        nameProp: 'strArea',
    },
    'list': {
        idProp: '_id',
        nameProp: 'name'
    }
}

export const getResultId = (result, resultType) => {
    // test if recipe result has prop "apiId" from app server
    if(resultType === 'recipe' && result.apiId) {
        // return that id
        return result.apiId
    }
    // ...otherwise access id by api's prop name and return
    return result[PROP_NAMES[resultType].idProp]; 
}

export const getResultName = (result, resultType) => {
    return result[PROP_NAMES[resultType].nameProp]; 
}

export const getResultImg = (result, resultType) => {
    switch (resultType) {
        case 'recipe':
            return `${result.strMealThumb}/preview`;
        case 'ingredient':
            return `https://www.themealdb.com/images/ingredients/${result.strIngredient}-Small.png`;
        default:
            return '';
    }
}

export const getApiURL = (result, resultType) => {
    if (resultType === 'recipe') {
        return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getResultId(result, resultType)}`;
    } else if (resultType === 'list') {
        return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${result.recipes[0].apiId}`;
    } else {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?${URL_CODE_LETTERS[resultType]}=${getResultId(result, resultType)}`;
    }
}