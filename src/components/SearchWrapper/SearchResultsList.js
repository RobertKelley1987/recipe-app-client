import { Fragment } from 'react';
import EmptyMessage from '../EmptyMessage';
import BackButton from './BackButton';
import RecipeResultsSection from './RecipeResultsSection';
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
                <RecipeResultsSection {...props} results={props.recipeResults} />
                {/* Ingredient results */}
                <ResultsSection {...props} results={props.ingredientResults} resultType='ingredient' />
                {/* Category results */}
                <ResultsSection {...props} results={props.categoryResults} resultType='category' />
                {/* Cuisine results */}
                <ResultsSection {...props} results={props.cuisineResults} resultType='cuisine' />
            </Fragment>
        );
    } else {
        return ( 
            <Fragment>
                <BackButton clearFilter={props.clearFilter} />
                {/* Filtered recipe results */}
                <RecipeResultsSection {...props} results={props.filteredRecipes} resultType='recipe' />
            </Fragment>
        )
    }
}

export default SearchResultsList;