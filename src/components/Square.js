import axios from 'axios';
import { useEffect, useState } from 'react';
import ImgSquareLink from './ImgSquareLink';

const Square = ({ listLength, linkURL, searchURL, squareType, title }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async searchURL => {
            const { data } = await axios.get(searchURL, { headers: { 'Content-type': 'application/json' } });
            setRecipe(data.meals[0]);
        }

        if(searchURL) {
            getRecipe(searchURL);
        }
    }, [searchURL]);

    return recipe && <ImgSquareLink 
                        category={squareType === 'recipe' && recipe.strCategory}
                        cuisine={squareType === 'recipe' && recipe.strCategory}
                        imgAlt={recipe.strMeal}
                        imgSrc={recipe.strMealThumb}
                        listLength={listLength} // for lists only
                        recipeId={recipe.idMeal} // for recipes only -- required for delete button
                        title={title ? title : recipe.strMeal} 
                        url={linkURL}
                    />
}

export default Square;