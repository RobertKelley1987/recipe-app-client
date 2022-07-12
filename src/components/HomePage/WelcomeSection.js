import { Link } from 'react-router-dom';
import spaghetti from './spaghetti.jpg';

const WelcomeSection = () => {
    return (
        <header className="welcome-section">
            <img className="welcome-section__img" src={spaghetti} alt="spaghetti in a bowl"/>
            <div className="welcome-section__wrapper">
                <h1 className="welcome-section__heading">
                    <span className="welcome-section__heading-word">welcome</span> 
                    <span className="welcome-section__heading-word">home.</span>
                </h1>
                <div className="welcome-section__button-wrapper">
                    <Link className="welcome-section__button" to="/recipes/random">Random Recipe</Link>
                    <Link className="welcome-section__button" to="/search">Search Recipes</Link>
                </div>
            </div>
        </header>
    )
}

export default WelcomeSection;