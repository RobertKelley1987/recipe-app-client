import { useEffect, useState } from 'react';

const useFilteredRecipes = (name, fetchFn, setLoadingStatus) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Get recipes from api based on url provided on initial render
        const getRecipes = async (name, fetchFn, setLoadingStatus) => {
            setLoadingStatus(true);
            // Fetch recipes using fetch function passed as prop
            const data = await fetchFn(name);
            setRecipes(data.meals);
            setLoadingStatus(false);
        }

        getRecipes(name, fetchFn, setLoadingStatus);
    }, [fetchFn, name]);

    return { recipes }
}

export default useFilteredRecipes;