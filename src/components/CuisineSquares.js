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
                            searchURL={`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine.strArea}`}
                            title={cuisine.strArea} 
                        />
            })}
        </div>
    );
}

export default CuisineSquares;