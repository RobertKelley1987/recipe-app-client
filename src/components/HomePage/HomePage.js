import axios from 'axios';
import { useEffect } from 'react';
import GridSection from './GridSection';
import WelcomeSection from './WelcomeSection';
import RecipeSquares from '../RecipeSquares';
import ListSquares from '../ListSquares';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = ({ favorites, lists, setFavorites, setLists, userId }) => {
    useEffect(() => {
        const getUserData = async userId => {
            if(userId) {
                const { data } = await axios.get(`/users/${userId}`);
                setFavorites(data.favorites);
                setLists(data.lists);
            }
        }

        getUserData(userId);
    }, [userId]);

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