import ArrowRightSVG from "./SVGs/ArrowRightSVG";
import './IngredientResult.scss';

const IngredientResult = ({ ingredient }) => {
    return (
        <div className="ingredient-result" key={ingredient.idIngredient}>
            <div className="ingredient-result__wrapper">
                <img src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`} />
                <div>
                    <h3 className="ingredient-result__name">{ingredient.strIngredient}</h3>
                    <p className="ingredient-result__type">Recipe</p>
                </div>
            </div>
            <ArrowRightSVG className="ingredient-result__svg" />
        </div>
    );
}

export default IngredientResult;