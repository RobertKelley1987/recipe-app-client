import axios from 'axios';
import { useEffect, useState } from 'react';
import CategorySquares from '../CategorySquares';
import CuisineSquares from '../CuisineSquares';
import GridSection from './GridSection';
import ListSquares from '../ListSquares';
import RecipeSquares from '../RecipeSquares';
import WelcomeSection from './WelcomeSection';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = ({ favorites, lists, updateFavorites, updateLists, userId }) => {
    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    useEffect(() => {
        const getFavorites = async userId => {
            if(userId) {
                const { data } = await axios.get(`/users/${userId}/favorites`);
                updateFavorites(data.favorites);
            }
        }

        const getLists = async userId => {
            if(userId) {
                const { data } = await axios.get(`/users/${userId}/lists`);
                updateLists(data.lists);
            }
        }

        const getCategories = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            setCategories(data.categories);
        }

        const getCuisines = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            setCuisines(data.meals);
        }

        getFavorites(userId);
        getLists(userId);
        getCategories();
        getCuisines();
    }, [updateFavorites, updateLists, userId]);

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
            <GridSection slug='cuisines' title='browse by cuisine'>
                {cuisines && <CuisineSquares cuisines={cuisines.slice(0, 4)} />}
            </GridSection>
        </main>
    )
}

export default HomePage;