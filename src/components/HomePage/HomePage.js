import GridSection from './GridSection';
import WelcomeSection from './WelcomeSection';
import RecipeSquares from '../RecipeSquares';
import ListSquares from '../ListSquares';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = ({ favorites, lists }) => {
    return (
        <main className="home-page">
            <WelcomeSection />
            <GridSection slug='favorites' title='your favorites'>
                {favorites && <RecipeSquares recipes={favorites.slice(0, 4)} />}
            </GridSection>
            <GridSection slug='lists' title='your lists'>
                {lists && <ListSquares lists={lists && lists.slice(0, 4)} />}
            </GridSection>
        </main>
    )
}

export default HomePage;