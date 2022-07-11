import { Link, useLocation, useParams } from 'react-router-dom';
import CloseSVG from '../SVGs/CloseSVG';
import './DeleteLink.scss';


const DeleteLink = ({ recipeId }) => {
    const { listId } = useParams();
    const location = useLocation();

    // only show delete link if user is on the edit list page
    return listId && (
        <Link to={`/lists/${listId}/recipes/${recipeId}`} state={{ backgroundLocation: location }}>
            <CloseSVG className="delete-link"/>
        </Link>
    )
}

export default DeleteLink;