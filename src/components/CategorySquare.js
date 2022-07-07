import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategorySquare.scss';

const CategorySquare = ({ categoryName }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async categoryName => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
            setRecipe(data.meals[1]);
        }

        getRecipe(categoryName)
    }, []);

    return recipe && (
        <div className="category-square">
            <Link className="category-square__link" to={`/categories/${categoryName}`}>
                <img className="category-square__img" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <h2 className="category-square__name">{categoryName}</h2>
            </Link>
        </div>
    )
}

export default CategorySquare;