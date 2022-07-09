import { useEffect, useState } from 'react';
import RecipeSquares from './RecipeSquares';
import Searchbar from './Searchbar';
import './FilteredPage.scss';


const renderRecipes = recipes => {
    return recipes.length < 1 ? <div>Loading...</div> : <RecipeSquares recipes={recipes} />;
}

const FilteredPage = ({ filterName, filterType, recipes }) => {
    const [filterTerm, setFilterTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        let nameProp = filterType === 'favorites' ? 'name' : 'strMeal';
        let timeoutId = setTimeout(() => {
            let filteredRecipes = recipes.filter(recipe => recipe[nameProp].toLowerCase().includes(filterTerm.toLowerCase()));
            setFilteredRecipes(filteredRecipes);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [filterTerm, recipes]);

    // If user has typed a filter term in the search bar, show filtered results
    let displayRecipes = filterTerm ? filteredRecipes : recipes;

    if(recipes) {
        return (
            <main className="filtered-page">
                <h1 className="filtered-page__heading">
                    {filterType} 
                    {filterName && ' - '}
                    {filterName && <span className="filtered-page__green-text">{filterName}</span>}
                </h1>
                <Searchbar 
                    searchVisible={searchVisible} 
                    filterTerm={filterTerm} 
                    filterType={filterType} 
                    setFilterTerm={setFilterTerm}
                    setSearchVisible={setSearchVisible}  
                />
                {renderRecipes(displayRecipes)}
            </main>
        )
    } else {
        return <div className="filtered-page__loading">Loading...</div>
    } 
}

export default FilteredPage;