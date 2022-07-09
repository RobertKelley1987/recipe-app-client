import { Fragment } from 'react';
import GridWithHeading from '../GridWithHeading';
import CategorySquares from '../CategorySquares';
import CuisineSquares from '../CuisineSquares';
// import IngredientSquares from '../IngredientSquares'; 
import RecipeSquares from '../RecipeSquares';
import './SearchPageResults.scss';


const SearchPageSection = ({ children, showResults, title }) => {
    return showResults && <GridWithHeading title={title}>{children}</GridWithHeading>;
}

const SearchPageResults = props => {
    const { categoryResults, cuisineResults, ingredientResults, recipeResults } = props;

    return (
        <Fragment>
            <SearchPageSection showResults={recipeResults && recipeResults.length > 0} title="recipes">
                <RecipeSquares recipes={recipeResults} />
            </SearchPageSection>
            {/* <SearchPageSection showResults={ingredientResults.length > 0} title="ingredients">
                <IngredientSquares ingredients={ingredientResults} />
            </SearchPageSection> */}
            <SearchPageSection showResults={categoryResults.length > 0} title="categories">
                <CategorySquares categories={categoryResults} />
            </SearchPageSection>
            <SearchPageSection showResults={cuisineResults.length > 0} title="cuisines">
                <CuisineSquares cuisines={cuisineResults} />
            </SearchPageSection>
        </Fragment>
    );
}

export default SearchPageResults;