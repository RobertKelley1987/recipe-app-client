import { Fragment } from 'react'; 
import { hasResults } from '../../util/has-results';
import CategorySquares from '../../components/CategorySquares';
import CuisineSquares from '../../components/CuisineSquares';
import IngredientSquares from '../../components/IngredientSquares';
import ListSquares from '../../components/ListSquares';
import RecipeSquares from '../../components/RecipeSquares';
import SearchPageSection from './SearchPageSection';
import './SearchPageResults.scss';

const SearchPageResults = props => {
    const { categoryResults, cuisineResults, ingredientResults, listResults, recipeResults, resultTypeVisible } = props;

    return (
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
}

export default SearchPageResults;