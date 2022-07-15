import { Link, useLocation } from 'react-router-dom';
import './ListDropdown.scss';

// Options list that appears if user clicks on 'more options' svg in square's options menu
const ListDropdown = ({ className, listId }) => {
    const location = useLocation();

    return (
        <div className="list-dropdown">
            <Link className={className} to={`/lists/${listId}`} state={{ backgroundLocation: location }}>Delete List</Link>
        </div>
    );
}
export default ListDropdown;