import axios from 'axios';
import { useEffect } from 'react';
import EmptyMessage from '../../components/EmptyMessage';
import GridWithHeading from '../../components/GridWithHeading';
import CategorySquares from '../../components/CategorySquares';
import CuisineSquares from '../../components/CuisineSquares';
import ListSquares from '../../components/ListSquares';
import RecipeSquares from '../../components/RecipeSquares';
import WelcomeSection from './WelcomeSection';
import './HomePage.scss';
import './WelcomeSection.scss';

const HomePage = props => {
    const { categories, cuisines, favorites, lists, updateLists, userId } = props;

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
            <GridWithHeading showLink={favorites && favorites.length > 0} slug='favorites' title='your favorites'>
                {/* If user has no favorites, display empty message. Otherwise display favorites. */}
                {favorites.length < 1 ? <EmptyMessage message='You have not saved any favorites yet.' /> : <RecipeSquares {...props} items={favorites.slice(0, 4)} />}
            </GridWithHeading>
            <GridWithHeading showLink={lists && lists.length > 0} slug='lists' title='your lists'>
                {/* If user has no lists, display empty message. Otherwise display favorites. */}
                {lists.length < 1 ? <EmptyMessage message='You have not created any recipe lists yet.' /> : <ListSquares lists={lists.slice(0, 4)} />}
            </GridWithHeading>
            <GridWithHeading showLink={true} slug='categories' title='browse by category'>
                {categories && <CategorySquares categories={categories.slice(0, 4)} resultType='category' />}
            </GridWithHeading>
            <GridWithHeading showLink={true} slug='cuisines' title='browse by cuisine'>
                {cuisines && <CuisineSquares cuisines={cuisines.slice(0, 4)} resultType='cuisine' />}
            </GridWithHeading>
        </main>
    );
}

export default HomePage;