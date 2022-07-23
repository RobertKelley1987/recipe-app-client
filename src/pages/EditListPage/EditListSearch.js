import { useRef, useState } from 'react';
import useTypingSearchAll from '../../hooks/useTypingSearchAll';
import LoadingWrapper from '../../components/LoadingWrapper';
import Searchbar from '../../components/Searchbar';
import SearchResults from './SearchResults';
import './EditListSearch.scss';

const EditListSearch = props => {
    const { allCategories, allCuisines, allIngredients, allLists, list, setSearchIsVisible, updateList } = props;
    // Track whether component is waiting for api results
    const [isLoading, setIsLoading] = useState(false);
    // Track whether recipe results are being filtered by ingredient, category or cuisine
    const [filterType, setFilterType] = useState('');
    // Track which item recipes are being filtered by, ex: chili powder
    const [filteredBy, setFilteredBy] = useState('');
    // Recipes filtered by another result type, ex: American recipes, recipes with 
    // lettuce as an ingredient
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    // Search term entered by user
    const [searchTerm, setSearchTerm] = useState('');
    // Ref to search bar element as a point to scroll back to after a filter is applied
    const searchEl = useRef(null);
    // Search results by type
    const { categoryResults, 
            cuisineResults, 
            ingredientResults, 
            listResults, 
            recipeResults 
    } = useTypingSearchAll(allCategories, allCuisines, allIngredients, allLists, searchTerm, setIsLoading);

    const setFilter = (filteredBy, filteredRecipes, filterType) => {
        setFilteredBy(filteredBy);
        setFilteredRecipes(filteredRecipes);
        setFilterType(filterType);
    }
    
    return (
        <div ref={searchEl} className="edit-list-search">
            <Searchbar 
                placeholder="search for recipes" 
                searchIsVisible={true} 
                setSearchIsVisible={setSearchIsVisible} 
                setSearchTerm={setSearchTerm} 
            />
            <div className="edit-list-search__results"> 
                <LoadingWrapper isLoading={isLoading}>
                    <SearchResults 
                        {...props}
                        categoryResults={categoryResults}
                        cuisineResults={cuisineResults}                    
                        filterType={filterType}
                        filteredBy={filteredBy} 
                        filteredRecipes={filteredRecipes}
                        ingredientResults={ingredientResults}
                        isLoading={isLoading}
                        list={list}
                        listResults={listResults}
                        recipeResults={recipeResults}
                        searchEl={searchEl} 
                        setFilter={setFilter} 
                        searchTerm={searchTerm} 
                        updateList={updateList}
                    />
                </LoadingWrapper>
            </div>
        </div>
    )
}

export default EditListSearch;