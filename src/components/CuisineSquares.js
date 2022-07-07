import CuisineSquare from "./CuisineSquare";

const CuisineSquares = ({ cuisines }) => {
    return cuisines.map(({ strArea }) => <CuisineSquare key={strArea} cuisineName={strArea} />)
}

export default CuisineSquares;