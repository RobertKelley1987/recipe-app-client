import axios from 'axios';
import { useEffect } from 'react';
import EmptyMessage from '../EmptyMessage';
import GridWithHeading from '../GridWithHeading';
import Squares from '../Squares/Squares';
import WelcomeSection from './WelcomeSection';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = ({ categories, cuisines, favorites, lists, updateLists, userId }) => {
    // Scroll to top of page on initial render
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    // When home page renders, update lists in app state to reflect any list name changes made
    // by user
    useEffect(() => {
        const getLists = async userId => {
            const { data } = await axios.get(`/users/${userId}/lists`);
            updateLists(data.lists);
        }

        getLists(userId);
    }, []);
   
    return (
        <main className="home-page">
            <WelcomeSection />
            <GridWithHeading showLink={favorites.length > 0} slug='favorites' title='your favorites'>
                {/* If user has no favorites, display empty message. Otherwise display favorites. */}
                {favorites.length < 1 ? <EmptyMessage message='You have not saved any favorites.' /> : <Squares items={favorites.slice(0, 4)} resultType='recipe' />}
            </GridWithHeading>
            <GridWithHeading showLink={lists.length > 0} slug='lists' title='your lists'>
                {/* If user has no lists, display empty message. Otherwise display favorites. */}
                {lists.length < 1 ? <EmptyMessage message='You have not created any recipe lists.' /> : <Squares items={lists.slice(0, 4)} resultType='list' />}
            </GridWithHeading>
            <GridWithHeading slug='categories' title='browse by category'>
                {categories && <Squares items={categories.slice(0, 4)} resultType='category' />}
            </GridWithHeading>
            <GridWithHeading slug='cuisines' title='browse by cuisine'>
                {cuisines && <Squares items={cuisines.slice(0, 4)} resultType='cuisine' />}
            </GridWithHeading>
        </main>
    );
}

export default HomePage;