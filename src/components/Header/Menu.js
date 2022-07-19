import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = ({ setMenuIsVisible }) => {
    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/favorites">your favorites</Link>
                </li>
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/lists">your lists</Link>
                </li>
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/categories">browse by category</Link>
                </li>
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/cuisines">browse by cuisine</Link>
                </li>
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/ingredients">browse by ingredient</Link>
                </li>
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/search">search</Link>
                </li>
                <li className="menu__list-item">
                    <Link className="menu__link" onClick={() => setMenuIsVisible(false)} to="/recipes/random">random recipe</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;