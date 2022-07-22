import { useEffect, useState } from "react";
import Category from '../services/Category';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch all categories from api
        const getCategories = async () => {
            const data = await Category.getAll();
            setCategories(data.categories);
        }

        getCategories();
    }, []);

    return { categories }
}

export default useCategories;