import { useEffect, useState } from 'react';
import RecipeSquare from './RecipeSquare';
import './FilteredPage.scss';
import SearchSVG from './SVGs/SearchSVG';
import CloseSVG from './SVGs/CloseSVG';

const renderRecipes = recipes => {
    if (!recipes) {
        return <div>Loading...</div>
    } else {
        return recipes.map(({ idMeal }) => <RecipeSquare key={idMeal} recipeId={idMeal} editPage={false}/>);
    }
}

const renderSearchbar = (filterOn, filterTerm, filterType, setFilterOn, setFilterTerm) => {
    const searchSVG = <SearchSVG className="filtered-page__svg filtered-page__svg--search" handleClick={() => setFilterOn(true)}/>;

    if (filterOn) {
        return (
            <div className="filtered-page__searchbar-wrapper">
                <div className="filtered-page__searchbar">
                    {searchSVG}
                    <input className="filtered-page__input" onChange={e => setFilterTerm(e.target.value)} placeholder={`Search in ${filterType}`} type="text" value={filterTerm}/>
                </div>
                <CloseSVG className="filtered-page__svg filtered-page__svg--close" handleClick={() => setFilterOn(false)}/>
            </div>
        )
    } else {
        return searchSVG;
    }
}

const FilteredPage = ({ filterName, filterType, recipes }) => {
    const [filterTerm, setFilterTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filterOn, setFilterOn] = useState(false);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            let filteredRecipes = recipes.filter(recipe => recipe.strMeal.toLowerCase().includes(filterTerm.toLowerCase()));
            setFilteredRecipes(filteredRecipes);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [filterTerm]);

    let displayRecipes = filterTerm ? filteredRecipes : recipes;

    return (
        <main className="filtered-page">
            <h1 className="filtered-page__heading">
                {filterType} - <span className="filtered-page__green-text">{filterName}</span>
            </h1>
            {renderSearchbar(filterOn, filterTerm, filterType, setFilterOn, setFilterTerm)}
            <div className="filtered-page__grid">
                {renderRecipes(displayRecipes)}
            </div>
        </main>
    )
}

export default FilteredPage;