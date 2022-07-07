import axios from 'axios';
import { useEffect, useState } from 'react';
import CategorySquares from '../CategorySquares';
import GridSection from './GridSection';
import ListSquares from '../ListSquares';
import RecipeSquares from '../RecipeSquares';
import WelcomeSection from './WelcomeSection';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = ({ favorites, lists, setFavorites, setLists, userId }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getUserData = async userId => {
            if(userId) {
                const { data } = await axios.get(`/users/${userId}`);
                setFavorites(data.favorites);
                setLists(data.lists);

            }
        }

        const getCategories = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            setCategories(data.categories);
        }

        getUserData(userId);
        getCategories();
    }, [userId]);

    return (
        <main className="home-page">
            <WelcomeSection />
            <GridSection slug='favorites' title='your favorites'>
                {favorites && <RecipeSquares recipes={favorites.slice(0, 4)} />}
            </GridSection>
            <GridSection slug='lists' title='your lists'>
                {lists && <ListSquares lists={lists.slice(0, 4)} />}
            </GridSection>
            <GridSection slug='categories' title='browse by category'>
                {categories && <CategorySquares categories={categories.slice(0, 4)} />}
            </GridSection>
        </main>
    )
}

export default HomePage;