import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteLink from './DeleteLink';
import MetaData from './MetaData';
import './Square.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Square = ({ listLength, linkURL, searchURL, squareType, title }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async searchURL => {
            const { data } = await axios.get(searchURL);
            setRecipe(data.meals[0]);
        }

       
        getRecipe(searchURL);
    }, [searchURL]);

    return recipe && (
        <div className="square">
            <DeleteLink recipeId={recipe.idMeal} />
            <Link className="square__link" to={linkURL}>
                <LazyLoadImage 
                    alt={recipe.strMeal}
                    className="square__img"
                    effect="opacity"
                    src={recipe.strMealThumb}
                />
                <div className="square__placeholder"></div>
                <h2 className="square__name">{title ? title : recipe.strMeal}</h2>
                <MetaData 
                    category={squareType === 'recipe' && recipe.strCategory} 
                    cuisine={squareType === 'recipe' && recipe.strArea} 
                    listLength={listLength} 
                />
            </Link>
        </div>
    );
}

export default Square;