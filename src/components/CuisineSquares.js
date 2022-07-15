import Recipe from '../services/Recipe';
import Square from './Square';
import './CuisineSquares.scss';

const CuisineSquares = props => {
    const { cuisines } = props;

    return (
        <div className="cuisine-squares">
            {cuisines.map(cuisine => {
                return <Square 
                            {...props} 
                            key={cuisine.strArea}
                            linkURL={`/cuisines/${cuisine.strArea}`}
                            fetchFn={Recipe.getAllFilteredByCuisine}
                            title={cuisine.strArea} 
                        />
            })}
        </div>
    );
}

export default CuisineSquares;