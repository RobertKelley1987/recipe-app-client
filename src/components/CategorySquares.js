import Square from './Square';
import './CategorySquares.scss';
import Recipe from '../services/Recipe';

const CategorySquares = props => {
    const { categories } = props;

    return (
        <div className="category-squares">
            {categories.map(category => {
                return <Square 
                            {...props} 
                            key={category.idCategory}
                            linkURL={`/categories/${category.strCategory}`}
                            fetchFn={Recipe.getAllFilteredByCategory}
                            title={category.strCategory} 
                        />
            })}
        </div>
    );
}

export default CategorySquares;