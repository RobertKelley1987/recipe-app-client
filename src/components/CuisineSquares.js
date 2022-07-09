import Square from './Square/Square';
import './Squares.scss';

const CuisineSquares = ({ cuisines }) => {
    return (
        <div className="squares">
            {cuisines.map(({ strArea }) => {
                return <Square 
                            key={strArea} 
                            linkURL={`/cuisines/${strArea}`}
                            searchURL={`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`}
                            title={strArea}
                        />
            })}
        </div>
    );
}

export default CuisineSquares;