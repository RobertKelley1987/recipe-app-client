import Square from "./Square/Square";

const CategorySquares = ({ categories }) => {
    return categories.map(category => {
        return <Square 
                    key={category.idCategory}  
                    linkURL={`/categories/${category.strCategory}`}
                    searchURL={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`}
                    squareType={'category'}
                    title={category.strCategory}
                />
    });
}

export default CategorySquares;