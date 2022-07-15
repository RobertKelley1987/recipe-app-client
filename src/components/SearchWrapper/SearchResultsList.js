import { Fragment } from 'react';
import EmptyMessage from '../EmptyMessage';
import BackButton from './BackButton';
import RecipeResultsSection from './RecipeResultsSection';
import ResultsSection from './ResultsSection';

const isEmpty = arr => !arr || arr.length < 1;

const SearchResultsList = props => {
    const { categoryResults, cuisineResults, filteredRecipes, filterType, ingredientResults, recipeResults, searchTerm } = props;

    // Display message to user if there are no results for all result types
    if (searchTerm && isEmpty(categoryResults) && isEmpty(cuisineResults) && isEmpty(ingredientResults) && isEmpty(recipeResults)) {
        return <EmptyMessage message="There are no results for your search term." />
    }

    return (
        <Fragment>
            {filterType && <BackButton clearFilter={props.clearFilter} />}
            {/* Recipe results */}
            <RecipeResultsSection {...props} results={filterType ? filteredRecipes : recipeResults} />
            {/* Ingredient results */}
            <ResultsSection {...props} results={ingredientResults} resultType='ingredient' />
            {/* Category results */}
            <ResultsSection {...props} results={categoryResults} resultType='category' />
            {/* Cuisine results */}
            <ResultsSection {...props} results={cuisineResults} resultType='cuisine' />
        </Fragment>
    );
}

export default SearchResultsList;