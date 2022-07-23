import { useCallback, useRef, useState } from 'react';
import useTypingSearchAll from '../../hooks/useTypingSearchAll';
import FilterOptions from './FilterOptions';
import LoadingWrapper from '../../components/LoadingWrapper';
import Searchbar from '../../components/Searchbar';
import SearchPageResults from './SearchPageResults';
import './SearchPage.scss';

const SearchPage = props => {
    // Track whether component is waiting for api results
    const [isLoading, setIsLoading] = useState(false);
    // Track whether one type of result is displayed, ex: only cuisines, only categories, only recipes
    const [resultTypeVisible, setResultTypeVisible] = useState('');
    // Search term entered by user
    const [searchTerm, setSearchTerm] = useState('');
    // Ref to search bar element as a point to scroll back to after a filter is applied
    const searchEl = useRef(null);
    const { allCategories, allCuisines, allIngredients, allLists, setSearchIsVisible } = props;
    const { categoryResults, 
            cuisineResults, 
            ingredientResults, 
            listResults, 
            recipeResults 
    } = useTypingSearchAll(allCategories, allCuisines, allIngredients, allLists, searchTerm, setIsLoading);

    const updateSearchTerm = useCallback(searchTerm => setSearchTerm(searchTerm), []);
    
    return (
        <main ref={searchEl} className="search-page">
            <Searchbar 
                placeholder="search for recipes" 
                searchIsVisible={true} 
                updateSearchTerm={updateSearchTerm} 
                setSearchTerm={setSearchTerm} 
            />
            <FilterOptions resultTypeVisible={resultTypeVisible} setResultTypeVisible={setResultTypeVisible} />
            <LoadingWrapper isLoading={isLoading}>
                <SearchPageResults 
                    {...props}
                    categoryResults={categoryResults}
                    cuisineResults={cuisineResults}                    
                    ingredientResults={ingredientResults}
                    isLoading={isLoading}
                    listResults={listResults}
                    recipeResults={recipeResults}
                    resultTypeVisible={resultTypeVisible}
                    searchTerm={searchTerm}
                />
            </LoadingWrapper>
        </main>
    )
}

export default SearchPage;