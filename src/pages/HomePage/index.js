import { useEffect, useState } from 'react';
import EmptyMessage from '../../components/EmptyMessage';
import GridWithHeading from '../../components/GridWithHeading';
import CategorySquares from '../../components/CategorySquares';
import CuisineSquares from '../../components/CuisineSquares';
import List from '../../services/List';
import ListSquares from '../../components/ListSquares';
import Recipe from '../../services/Recipe';
import RecipeSquares from '../../components/RecipeSquares';
import WelcomeSection from './WelcomeSection';
import './HomePage.scss';
import './WelcomeSection.scss';
import RecipeCardXL from '../../components/RecipeCardXL';
import { hasResults } from '../../util/has-results';

const HomePage = props => {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const { categories, cuisines, favorites, lists, updateLists, userId } = props;

    // Scroll to top of page on initial render
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    // When home page renders, update lists in app state to reflect any list name changes made
    // by user
    useEffect(() => {
        const getLists = async userId => {
            const data = await List.getAll(userId);
            updateLists(data.lists);
        }

        getLists(userId);
    }, [updateLists, userId]);

    // When page renders, also get a random recipe from api to display
    useEffect(() => {
        const getRandomRecipe = async () => {
            const data = await Recipe.getRandom();
            setRandomRecipe(data.meals[0]);
        }

        getRandomRecipe();
    }, []);
   
    return (
        <main className="home-page">
            <WelcomeSection />
            <GridWithHeading headingURL='/favorites' footerURL='/favorites' showLink={hasResults(favorites)} title='your favorites'>
                {/* If user has no favorites, display empty message. Otherwise display favorites. */}
                {favorites.length < 1 ? <EmptyMessage message='You have not saved any favorites yet.' /> : <RecipeSquares {...props} items={favorites.slice(0, 4)} />}
            </GridWithHeading>
            <GridWithHeading headingURL='/lists' footerURL='/lists' showLink={hasResults(lists)} title='your lists'>
                {/* If user has no lists, display empty message. Otherwise display favorites. */}
                {lists.length < 1 ? <EmptyMessage message='You have not created any recipe lists yet.' /> : <ListSquares items={lists.slice(0, 4)} />}
            </GridWithHeading>
            <GridWithHeading headingURL='/categories' footerURL='/categories' showLink={hasResults(categories)} title='browse by category'>
                {categories && <CategorySquares categories={categories.slice(0, 4)} resultType='category' />}
            </GridWithHeading>
            <GridWithHeading headingURL='/cuisines' footerURL='/cuisines' showLink={hasResults(cuisines)} title='browse by cuisine'>
                {cuisines && <CuisineSquares cuisines={cuisines.slice(0, 4)} resultType='cuisine' />}
            </GridWithHeading>
            {randomRecipe && <GridWithHeading 
                headingURL='/recipes/random'
                footerURL={`/recipes/${randomRecipe && randomRecipe.idMeal}`} 
                linkText='View Full Recipe'
                showLink={true} 
                title='random recipe'
            >
                <RecipeCardXL {...props} recipe={randomRecipe} />
            </GridWithHeading>}
        </main>
    );
}

export default HomePage;