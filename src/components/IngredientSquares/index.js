import IngredientSquare from './IngredientSquare';
import './IngredientSquares.scss';

const IngredientSquares = props => {
    const { ingredients } = props;

    return (
        <div className="ingredient-squares">
            {ingredients.map(ingredient => {
                return <IngredientSquare 
                            {...props} 
                            key={ingredient.idIngredient}
                            title={ingredient.strIngredient} 
                        />
            })}
        </div>
    );
}

export default IngredientSquares;