import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteLink from './DeleteLink';
import ImgPlaceholder from '../ImgPlaceholder';
import MetaData from './MetaData';
import Options from './Options';
import './Square.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Square = props => {
    const [recipe, setRecipe] = useState(null);
    const { listLength, linkURL, searchURL, resultType, title } = props;

    useEffect(() => {
        const getRecipe = async searchURL => {
            if(searchURL) {
                const { data } = await axios.get(searchURL);
                data.meals && setRecipe(data.meals[0]);
            } 
        }

        getRecipe(searchURL);
    }, [searchURL]);

    const imgSrc = (recipe, resultType, title) => {
        if(resultType === 'ingredient') {
            return `https://www.themealdb.com/images/ingredients/${title}.png`
        } else {
            return recipe && recipe.strMealThumb;
        }
    }

    return recipe && (
        <div className="square">
            <DeleteLink recipeId={recipe && recipe.idMeal} />
            <Link className="square__link" to={linkURL}>
                {searchURL ? <LazyLoadImage 
                    alt={recipe && recipe.strMeal} 
                    className={resultType === 'ingredient' ? 'square__img square__img--ingredient' : 'square__img'} 
                    effect="opacity"
                    src={imgSrc(recipe, resultType, title)}
                /> : <ImgPlaceholder />}
                <h2 className="square__name">{title ? title : recipe && recipe.strMeal}</h2>
            </Link>
            <MetaData 
                category={recipe && recipe.strCategory} 
                cuisine={recipe && recipe.strArea} 
                listLength={listLength} 
                resultType={resultType}
            />
            <Options {...props} recipe={recipe} />
        </div>
    );
}

export default Square;