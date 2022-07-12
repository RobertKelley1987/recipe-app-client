import { Fragment } from 'react';
import EmptyMessage from '../EmptyMessage';
import BackButton from './BackButton';
import ResultsSection from './ResultsSection';

const isEmpty = arr => !arr || arr.length < 1;

const SearchResultsList = props => {
    if (props.searchTerm && isEmpty(props.categoryResults) && isEmpty(props.cuisineResults) && isEmpty(props.ingredientResults) && isEmpty(props.recipeResults)) {
        return <EmptyMessage message="There are no results for your search term." />
    }

    if (!props.filterType) {
        return (
            <Fragment>
                {/* Recipe results */}
                <ResultsSection results={props.recipeResults} {...props} resultType='recipe' />
                {/* Ingredient results */}
                <ResultsSection results={props.ingredientResults} {...props} resultType='ingredient' />
                {/* Category results */}
                <ResultsSection results={props.categoryResults} {...props} resultType='category' />
                {/* Cuisine results */}
                <ResultsSection results={props.cuisineResults} {...props} resultType='cuisine' />
            </Fragment>
        );
    } else {
        return ( 
            <Fragment>
                <BackButton clearFilter={props.clearFilter} />
                {/* Filtered recipe results */}
                <ResultsSection results={props.filteredRecipes} {...props} resultType='recipe' />
            </Fragment>
        )
    }
}

export default SearchResultsList;