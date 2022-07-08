import { useEffect, useState } from 'react';
import CloseSVG from './SVGs/CloseSVG';
import RecipeSquares from './RecipeSquares';
import SearchSVG from './SVGs/SearchSVG';
import './FilteredPage.scss';


const renderRecipes = recipes => {
    if (recipes.length < 1) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="filtered-page__grid">
                <RecipeSquares recipes={recipes} />
            </div>
        );
    }
}

const renderSearchbar = (searchVisible, filterTerm, filterType, setSearchVisible, setFilterTerm) => {
    const searchSVG = <SearchSVG className="filtered-page__svg filtered-page__svg--search" handleClick={() => setSearchVisible(true)}/>;

    if (searchVisible) {
        return (
            <div className="filtered-page__searchbar-wrapper">
                <div className="filtered-page__searchbar">
                    {searchSVG}
                    <input className="filtered-page__input" onChange={e => setFilterTerm(e.target.value)} placeholder={`Search in ${filterType}`} type="text" value={filterTerm}/>
                </div>
                <CloseSVG className="filtered-page__svg filtered-page__svg--close" handleClick={() => setSearchVisible(false)}/>
            </div>
        )
    } else {
        return searchSVG;
    }
}

const FilteredPage = ({ filterName, filterType, recipes }) => {
    const [filterTerm, setFilterTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            let filteredRecipes = recipes.filter(recipe => recipe.strMeal.toLowerCase().includes(filterTerm.toLowerCase()));
            setFilteredRecipes(filteredRecipes);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [filterTerm, recipes]);

    // If user has typed a filter term in the search bar, show filtered results
    let displayRecipes = filterTerm ? filteredRecipes : recipes;

    return (
        <main className="filtered-page">
            <h1 className="filtered-page__heading">
                {filterType} - <span className="filtered-page__green-text">{filterName}</span>
            </h1>
            {renderSearchbar(searchVisible, filterTerm, filterType, setSearchVisible, setFilterTerm)}
            {renderRecipes(displayRecipes)}
        </main>
    )
}

export default FilteredPage;