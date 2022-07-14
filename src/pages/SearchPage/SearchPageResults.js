import { Fragment } from 'react';
import GridWithHeading from '../../components/GridWithHeading';
import CategorySquares from '../../components/CategorySquares';
import CuisineSquares from '../../components/CuisineSquares';
import IngredientSquares from '../../components/IngredientSquares';
import RecipeSquares from '../../components/RecipeSquares';
import './SearchPageResults.scss';


const SearchPageSection = ({ children, showResults, title }) => {
    return showResults && <GridWithHeading title={title}>{children}</GridWithHeading>;
}

const SearchPageResults = props => {
    const { categoryResults, cuisineResults, ingredientResults, recipeResults } = props;

    return (
        <Fragment>
            <SearchPageSection showResults={recipeResults && recipeResults.length > 0} title="recipes">
                <RecipeSquares {...props} items={recipeResults} />
            </SearchPageSection>
            <SearchPageSection showResults={ingredientResults.length > 0} title="ingredients">
                <IngredientSquares ingredients={ingredientResults} resultType='ingredient' />
            </SearchPageSection>
            <SearchPageSection showResults={categoryResults.length > 0} title="categories">
                <CategorySquares categories={categoryResults} resultType='category' />
            </SearchPageSection>
            <SearchPageSection showResults={cuisineResults.length > 0} title="cuisines">
                <CuisineSquares cuisines={cuisineResults} resultType='cuisine' />
            </SearchPageSection>
        </Fragment>
    );
}

export default SearchPageResults;