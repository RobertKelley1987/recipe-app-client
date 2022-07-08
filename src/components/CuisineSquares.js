import Square from './Square';

const CuisineSquares = ({ cuisines }) => {
    return cuisines.map(({ strArea }) => {
        return <Square 
                    key={strArea} 
                    linkURL={`/cuisines/${strArea}`}
                    searchURL={`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`}
                    title={strArea}
                />
    });
}

export default CuisineSquares;