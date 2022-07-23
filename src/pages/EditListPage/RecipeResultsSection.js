import RecipeResult from './RecipeResult';
import ResultsSectionHeading from './ResultsSectionHeading';
import './RecipeResultsSection.scss';

const RecipeResultsSection = props => {
    const { filteredBy, filterType, results } = props;

    // Display error / apology message if there are no recipes listed for an ingredient
    if (filterType === 'ingredient' && results === null) {
        return (
            <div className="results-section">
                <div className="results-section__apology">Sorry, we do not currently have any recipes using this ingredient.</div>
            </div>
        );
    }

    if (results && results.length) {
        return (
            <div className="recipe-results-section">
                <ResultsSectionHeading filterType={filterType} filteredBy={filteredBy} resultType='recipe' />
                {results.map(recipe => <RecipeResult {...props} key={recipe.idMeal} recipe={recipe} />)}
            </div>
        );
    }
}

export default RecipeResultsSection;