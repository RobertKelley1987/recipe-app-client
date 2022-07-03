import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImgPlaceholder from './ImgPlaceholder';
import './ListSquare.scss';

const ListSquare = ({ list }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [imgAlt, setImgAlt] = useState('');

    useEffect(() => {
        const getImg = async recipeId => {
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
            if(data.meals) {
                setImgSrc(data.meals[0].strMealThumb);
                setImgAlt(data.meals[0].strMeal);
            }
        }

        getImg(list.recipes[0]);
    }, [list]);

    return (
        <div className="list-square">
            <Link className="list-square__link" to={`/lists/${list._id}`}>
                {imgSrc ? <img className="list-square__img" src={imgSrc} alt={imgAlt}/> : <ImgPlaceholder letter='l' />}
                <h2 className="list-square__name">{list.name}</h2>
                <p className="list-square__meta-data">{list.recipes.length} Recipes</p>
            </Link>
        </div>
    )
}

export default ListSquare;