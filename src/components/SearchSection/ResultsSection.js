import { Fragment } from 'react';
import SearchResult from './SearchResult';
import BackButton from './BackButton';
import './ResultsSection.scss';

// Config object to access data based on result type,
// because each type of search result has unique prop names
const resultTypes = {
    'recipe': {
        idProp: 'idMeal',
        nameProp: 'strMeal',
        plural: 'recipes'
    },
    'category': {
        idProp: 'idCategory',
        nameProp: 'strCategory',
        plural: 'categories'
    },
    'ingredient': {
        idProp: 'idIngredient',
        nameProp: 'strIngredient',
        plural: 'ingredients'
    },
    // using name prop as id prop -- no id exists in api for areas / cuisines
    'cuisine': {
        idProp: 'strArea', 
        nameProp: 'strArea',
        plural: 'cuisines'
    }
}

const getImgSrc = (result, resultType) => {
    switch (resultType) {
        case 'recipe':
            return `${result.strMealThumb}/preview`;
        case 'ingredient':
            return `https://www.themealdb.com/images/ingredients/${result.strIngredient}-Small.png`
        default:
            return '';
    }
}

const renderFilteredHeading = (filterType, filteredBy) => {
    switch (filterType) {
        case 'category':
            return <h2>Recipes in the <span className="results-section__green-text">{filteredBy}</span> category</h2>;
        case 'cuisine':
            return <h2>Recipes in <span className="results-section__green-text">{filteredBy}</span> cuisine</h2>;
        case 'ingredient':
            return <h2>Recipes with <span className="results-section__green-text">{filteredBy}</span> as an ingredient</h2>
        default:
            return '';
    }
}

const ResultsSection = props => {
    const { filteredBy, filterType, results, resultType } = props

    if (results && results.length) {
        return (
            <Fragment>
                {filterType && <BackButton {...props} />}
                {filterType ? renderFilteredHeading(filterType, filteredBy) : <h2>{resultTypes[resultType].plural}</h2>}
                {results.map(result => {
                    return <SearchResult 
                                key={result[resultTypes[resultType].idProp]} 
                                resultId={result[resultTypes[resultType].idProp]} 
                                resultImg={getImgSrc(result, resultType)}
                                resultName={result[resultTypes[resultType].nameProp]}
                                {...props}
                            />
                })}
            </Fragment>
        );
    }
}

export default ResultsSection;