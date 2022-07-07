// Each type of api result (category, cuisine, recipe) uses 
// unique prop names. This object provides a lookup to access
// the name and id for each type of result.
export const PROP_NAMES = {
    'recipe': {
        idProp: 'idMeal',
        nameProp: 'strMeal',
    },
    'category': {
        idProp: 'idCategory',
        nameProp: 'strCategory',
    },
    'ingredient': {
        idProp: 'idIngredient',
        nameProp: 'strIngredient',
    },
    // using name prop as id prop -- no id exists in api for areas / cuisines
    'cuisine': {
        idProp: 'strArea', 
        nameProp: 'strArea',
    }
}

export const getResultId = (result, resultType) => {
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
