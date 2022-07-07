import CategorySquare from "./CategorySquare";

const CategorySquares = ({ categories }) => {
    return categories.map(category => <CategorySquare key={category.idCategory} categoryName={category.strCategory} />)
}

export default CategorySquares;