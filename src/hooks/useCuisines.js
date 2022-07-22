import { useEffect, useState } from "react";
import Cuisine from '../services/Cuisine';

const useCuisines = () => {
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        // Fetch all cuisines from api
        const getCuisines = async () => {
            const data = await Cuisine.getAll();
            setCuisines(data.meals);
        }

        getCuisines();
    }, []);

    return { cuisines };
};

export default useCuisines;