import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteLink from './DeleteLink';
import MetaData from './MetaData';
import './Square.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ImgPlaceholder from '../ImgPlaceholder';

const Square = ({ listLength, linkURL, searchURL, resultType, title }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async searchURL => {
            if(searchURL) {
                const { data } = await axios.get(searchURL);
                setRecipe(data.meals[0]);
            } 
        }

       
        getRecipe(searchURL);
    }, [searchURL]);

    return (
        <div className="square">
            <DeleteLink recipeId={recipe && recipe.idMeal} />
            <Link className="square__link" to={linkURL}>
                {searchURL ? <LazyLoadImage 
                    alt={recipe && recipe.strMeal} 
                    className="square__img" 
                    effect="opacity"
                    src={recipe && recipe.strMealThumb}
                /> : <ImgPlaceholder letter={resultType.slice(0, 1)}/>}
                <h2 className="square__name">{title ? title : recipe && recipe.strMeal}</h2>
            </Link>
            <MetaData 
                category={recipe && recipe.strCategory} 
                cuisine={recipe && recipe.strArea} 
                listLength={listLength} 
                resultType={resultType}
            />
        </div>
    );
}

export default Square;