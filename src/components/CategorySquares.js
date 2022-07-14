import Square from './Square';
import './CategorySquares.scss';

const CategorySquares = props => {
    const { categories } = props;

    return (
        <div className="category-squares">
            {categories.map(category => {
                return <Square 
                            {...props} 
                            key={category.idCategory}
                            linkURL={`/categories/${category.strCategory}`}
                            searchURL={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`}
                            title={category.strCategory} 
                        />
            })}
        </div>
    );
}

export default CategorySquares;