import { Fragment } from 'react';
import BackButton from './BackButton';
import ResultsSection from './ResultsSection';

const ListSearchResults = props => {
    if(!props.filterType) {
        return (
            <Fragment>
                {/* Recipe results */}
                <ResultsSection results={props.recipeResults} resultType='recipe' {...props} />
                {/* Ingredient results */}
                <ResultsSection results={props.ingredientResults} resultType='ingredient' {...props} />
                {/* Category results */}
                <ResultsSection results={props.categoryResults} resultType='category' {...props} />
                {/* Cuisine results */}
                <ResultsSection results={props.cuisineResults} resultType='cuisine' {...props} />
            </Fragment>
        );
    } else {
        return ( 
            <Fragment>
                <BackButton clearFilter={props.clearFilter} />
                {/* Filtered recipe results */}
                <ResultsSection results={props.filteredRecipes} resultType='recipe' {...props} />
            </Fragment>
        )
    }
}

export default ListSearchResults;