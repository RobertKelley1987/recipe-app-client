import { Fragment } from 'react';
import GridWithHeading from '../GridWithHeading';
import Squares from '../Squares/Squares';
import './SearchPageResults.scss';


const SearchPageSection = ({ children, showResults, title }) => {
    return showResults && <GridWithHeading title={title}>{children}</GridWithHeading>;
}

const SearchPageResults = props => {
    const { categoryResults, cuisineResults, ingredientResults, recipeResults } = props;

    return (
        <Fragment>
            <SearchPageSection showResults={recipeResults && recipeResults.length > 0} title="recipes">
                <Squares items={recipeResults} />
            </SearchPageSection>
            <SearchPageSection showResults={ingredientResults.length > 0} title="ingredients">
                <Squares items={ingredientResults} />
            </SearchPageSection>
            <SearchPageSection showResults={categoryResults.length > 0} title="categories">
                <Squares items={categoryResults} />
            </SearchPageSection>
            <SearchPageSection showResults={cuisineResults.length > 0} title="cuisines">
                <Squares items={cuisineResults} />
            </SearchPageSection>
        </Fragment>
    );
}

export default SearchPageResults;