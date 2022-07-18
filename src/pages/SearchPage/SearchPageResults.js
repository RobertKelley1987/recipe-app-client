import { Fragment, useEffect, useState } from 'react'; 
import { hasResults } from '../../util/has-results';
import CategorySquares from '../../components/CategorySquares';
import CuisineSquares from '../../components/CuisineSquares';
import IngredientSquares from '../../components/IngredientSquares';
import ListSquares from '../../components/ListSquares';
import RecipeSquares from '../../components/RecipeSquares';
import SearchPageSection from './SearchPageSection';
import './SearchPageResults.scss';
import EmptyMessage from '../../components/EmptyMessage';

const renderResults = (searchResults, searchTerm, zeroResults) => {
    // Test if there are zero results and user has typed a search term
    if(zeroResults && searchTerm) {
        // Display message to user that there are no results
        return <EmptyMessage message="There are no results for that search term." />
    } else {
        // Display results
        return searchResults;
    }
};

const SearchPageResults = props => {
    // Track whether page will display no results
    const [zeroResults, setZeroResults] = useState(false);
    // Import each set of results and any result type filter from props
    const { categoryResults, cuisineResults, ingredientResults, listResults, recipeResults, resultTypeVisible, searchTerm } = props;

    console.log(searchTerm);

    // Update state of zero results as each set of results changes
    useEffect(() => {
        if(!hasResults(categoryResults) 
        && !hasResults(cuisineResults) 
        && !hasResults(ingredientResults) 
        && !hasResults(listResults) 
        && !hasResults(recipeResults)) {
            setZeroResults(true);
        }
    }, [categoryResults, cuisineResults, ingredientResults, listResults, recipeResults]);

    const searchResults = (
        <Fragment>
            <SearchPageSection hasResults={hasResults(listResults)} resultType='list' resultTypeVisible={resultTypeVisible} title="lists">
                <ListSquares {...props} items={listResults} />
            </SearchPageSection>
            <SearchPageSection hasResults={hasResults(recipeResults)} resultType='recipe' resultTypeVisible={resultTypeVisible} title="recipes">
                <RecipeSquares {...props} items={recipeResults} />
            </SearchPageSection>
            <SearchPageSection hasResults={hasResults(ingredientResults)} resultType='ingredient' resultTypeVisible={resultTypeVisible} title="ingredients">
                <IngredientSquares ingredients={ingredientResults} resultType='ingredient' />
            </SearchPageSection>
            <SearchPageSection hasResults={hasResults(categoryResults)} resultType='category' resultTypeVisible={resultTypeVisible} title='categories'>
                <CategorySquares categories={categoryResults} resultType='category' />
            </SearchPageSection>
            <SearchPageSection hasResults={hasResults(cuisineResults)} resultType='cuisine' resultTypeVisible={resultTypeVisible} title="cuisines">
                <CuisineSquares cuisines={cuisineResults} resultType='cuisine' />
            </SearchPageSection>
        </Fragment>
    );

    return renderResults(searchResults, searchTerm, zeroResults);
}

export default SearchPageResults;