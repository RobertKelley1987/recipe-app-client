import { useEffect, useState } from 'react';
import RecipeSquare from './RecipeSquare';
import './FilteredPage.scss';

const FilteredPage = ({ filterName, filterType, recipes }) => {
    const [filterTerm, setFilterTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            let filteredRecipes = recipes.filter(recipe => recipe.strMeal.toLowerCase().includes(filterTerm.toLowerCase()));
            setFilteredRecipes(filteredRecipes);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [filterTerm]);

    let displayedRecipes = filterTerm ? filteredRecipes : recipes;

    return (
        <main className="filtered-page">
            <h1 className="filtered-page__heading">
                {filterType} - <span className="filtered-page__green-text">{filterName}</span>
            </h1>
            <input onChange={e => setFilterTerm(e.target.value)} type="text" value={filterTerm}/>
            <div className="filtered-page__grid">
                {displayedRecipes && displayedRecipes.map(recipe => <RecipeSquare recipeId={recipe.idMeal} editPage={false}/>)}
            </div>
        </main>
    )
}

export default FilteredPage;