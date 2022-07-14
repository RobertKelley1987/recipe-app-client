import { Link, useLocation, useParams } from 'react-router-dom';
import './RecipeDropdown.scss';

// Options list that appears if user clicks on 'more options' svg in square's options menu
const RecipeDropdown = ({ className, recipeId }) => {
    const location = useLocation();
    const { listId } = useParams();

    return (
        <div className="recipe-dropdown">
            {/* Use listId to test if user is on the edit list page. If so, display 'remove from list' option */}
            {listId && <Link className={className} to={`/lists/${listId}/recipes/${recipeId}`} state={{ backgroundLocation: location }}>Remove From List</Link>}
            <Link className={className} to={`/recipes/${recipeId}/add`} state={{ backgroundLocation: location }}>Add To List</Link>
        </div>
    );
}
export default RecipeDropdown;