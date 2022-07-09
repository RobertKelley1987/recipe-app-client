import axios from 'axios';
import { useEffect, useState } from 'react';
import EmptyMessage from './EmptyMessage';
import GridWithHeading from '../GridWithHeading';
import Squares from '../Squares';
import WelcomeSection from './WelcomeSection';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = ({ favorites, lists, updateFavorites, updateLists, userId }) => {
    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    // scroll to top of page on initial render
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    // fetch categories, cuisine types, user favorites and user lists on initial render
    useEffect(() => {
        // fetch categories from api
        const getCategories = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            setCategories(data.categories);
        }

        // fetch cuisines from api
        const getCuisines = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            setCuisines(data.meals);
        }

        // fetch favorites from app server
        const getFavorites = async userId => {
            if(userId) {
                const { data } = await axios.get(`/users/${userId}/favorites`);
                updateFavorites(data.favorites);
            }
        }

        // fetch lists from app server
        const getLists = async userId => {
            if(userId) {
                const { data } = await axios.get(`/users/${userId}/lists`);
                updateLists(data.lists);
            }
        }

        getCategories();
        getCuisines();
        getFavorites(userId);
        getLists(userId);
    }, [updateFavorites, updateLists, userId]);
   
    return (
        <main className="home-page">
            <WelcomeSection />
            <GridWithHeading showLink={favorites.length > 0} slug='favorites' title='your favorites'>
                {/* If user has no favorites, display empty message. Otherwise display favorites. */}
                {favorites.length < 1 ? <EmptyMessage resultType='favorite'/> : <Squares items={favorites.slice(0, 4)} resultType='recipe' />}
            </GridWithHeading>
            <GridWithHeading showLink={lists.length > 0} slug='lists' title='your lists'>
                {/* If user has no lists, display empty message. Otherwise display favorites. */}
                {lists.length < 1 ? <EmptyMessage resultType='list'/> : <Squares items={lists.slice(0, 4)} resultType='list' />}
            </GridWithHeading>
            <GridWithHeading slug='categories' title='browse by category'>
                {categories && <Squares items={categories.slice(0, 4)} resultType='category' />}
            </GridWithHeading>
            <GridWithHeading slug='cuisines' title='browse by cuisine'>
                {cuisines && <Squares items={cuisines.slice(0, 4)} resultType='cuisine' />}
            </GridWithHeading>
        </main>
    )
}

export default HomePage;