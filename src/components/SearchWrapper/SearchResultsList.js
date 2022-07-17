import { Fragment } from 'react';
import Recipe from '../../services/Recipe';
import EmptyMessage from '../EmptyMessage';
import BackButton from './BackButton';
import RecipeResultsSection from './RecipeResultsSection';
import ResultsSection from './ResultsSection';

const renderEmptyMessage = (searchTerm, categoryResults, cuisineResults, ingredientResults, recipeResults) => {
    // Function to test if an array is empty
    const isEmpty = arr => !arr || arr.length < 1;
    // Store boolean defining if all search results are empty for a search term
    let zeroResults = searchTerm && isEmpty(categoryResults) && isEmpty(cuisineResults) && isEmpty(ingredientResults) && isEmpty(recipeResults);   
    // If zero results, return empty message
    if(zeroResults) {
        return <EmptyMessage message="No results for that search term." />
    }
}

const SearchResultsList = props => {
    const { categoryResults, cuisineResults, filteredRecipes, filterType, ingredientResults, recipeResults, searchTerm } = props;
    return (
        <Fragment>
            {/* Display empty message if all results are empty */}
            {renderEmptyMessage(searchTerm, categoryResults, cuisineResults, ingredientResults, recipeResults)}
            {/* Dsplay back button if filtered results are displayed */}
            {filterType && <BackButton clearFilter={props.clearFilter} />}
            {/* Recipe results */}
            <RecipeResultsSection {...props} results={filterType ? filteredRecipes : recipeResults} />
            {/* Ingredient results */}
            <ResultsSection {...props} fetchRecipesFn={Recipe.getAllFilteredByIngredient} results={ingredientResults} resultType='ingredient' />
            {/* Category results */}
            <ResultsSection {...props} fetchRecipesFn={Recipe.getAllFilteredByCategory} results={categoryResults} resultType='category' />
            {/* Cuisine results */}
            <ResultsSection {...props} fetchRecipesFn={Recipe.getAllFilteredByCuisine} results={cuisineResults} resultType='cuisine' />
        </Fragment>
    );
}

export default SearchResultsList;