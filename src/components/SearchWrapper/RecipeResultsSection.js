import RecipeResult from './RecipeResult';
import ResultsSectionHeading from './ResultsSectionHeading';
import './RecipeResultsSection.scss';

const RecipeResultsSection = props => {
    const { filteredBy, filterType, results } = props;

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