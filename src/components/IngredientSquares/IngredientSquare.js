import { Link } from 'react-router-dom';
import Img from '../Img';
import './IngredientSquare.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const IngredientSquare = props => {
    const { title } = props;

    return (
        <div className="ingredient-square">
            <Link className="ingredient-square__link" to={`/ingredients/${title}`}>
                <Img 
                    className="ingredient-square__img ingredient-square__img--ingredient" 
                    imgAlt={title} 
                    imgSrc={`https://www.themealdb.com/images/ingredients/${title}.png`}  
                />
                <h2 className="ingredient-square__name">{title}</h2>
            </Link>
        </div>
    );
}

export default IngredientSquare;