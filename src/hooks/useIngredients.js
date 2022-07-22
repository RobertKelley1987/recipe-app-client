import { useEffect, useState } from "react";
import Ingredient from '../services/Ingredient';

const useIngredients = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // Fetch all ingredients from api
        const getIngredients = async () => {
            const data = await Ingredient.getAll();
            setIngredients(data.meals);
        }

        getIngredients();
    }, []);

    return { ingredients }
}

export default useIngredients;