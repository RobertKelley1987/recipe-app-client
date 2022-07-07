import CategorySquare from "./CategorySquare";

const CategorySquares = ({ categories }) => {
    return categories.map(category => <CategorySquare categoryName={category.strCategory} />)
}

export default CategorySquares;