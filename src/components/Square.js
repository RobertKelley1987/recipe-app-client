import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from './Img';
import './Square.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const DefaultSquare = props => {
    const [recipe, setRecipe] = useState(null);
    const { linkURL, searchURL, title } = props;

    // On initial render, get recipe using url provided and save to component state
    useEffect(() => {
        const getRecipe = async searchURL => {
            if(searchURL) {
                const { data } = await axios.get(searchURL);
                data.meals && setRecipe(data.meals[0]);
            } 
        }

        getRecipe(searchURL);
    }, [searchURL]);

    return (
        <div className="square">
            <Link className="square__link" to={linkURL}>
                <Img className="square__img" imgAlt={recipe && recipe.strMeal} imgSrc={recipe && recipe.strMealThumb} />
                <h2 className="square__name">{title}</h2>
            </Link>
        </div>
    );
}

export default DefaultSquare;