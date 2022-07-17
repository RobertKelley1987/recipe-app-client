import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import AddToList from './components/AddToList';
import AuthPage from './pages/AuthPage';
import Category from './services/Category';
import Cuisine from './services/Cuisine';
import DeleteList from './components/DeleteList';
import DeleteRecipe from './components/DeleteRecipe';
import ErrorMessage from './components/ErrorMessage';
import EditListPage from './pages/EditListPage';
import Favorite from './services/Favorite';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import Ingredient from './services/Ingredient';
import List from './services/List';
import ListSquares from './components/ListSquares';
import LinksList from './components/LinksList';
import NewListLink from './components/NewListLink';
import PageWithFilter from './pages/PageWithFilter';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import RecipeSquares from './components/RecipeSquares';
import SearchPage from './pages/SearchPage';
import User from './services/User';
import './App.scss';
import Recipe from './services/Recipe';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState(null);
  const [lists, setLists] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const updateList = useCallback(newList => setList(newList), []);
  const updateFavorites = useCallback(newFavorites => setFavorites(newFavorites), []);
  const updateLists = useCallback(newLists => setLists(newLists), []);
  const updateErrorMessage = useCallback(message => setErrorMessage(message), []);

  useEffect(() => {
    // Make request to app server with cookie data to check if user is logged in
    const getSession = async () => {
      const data = await User.validateSession();
      setUserId(data.userId);
      // Once data is returned from server, set loading status to false
      setIsLoading(false);
    }

    getSession();
  }, []);

  // Fetch all categories, cuisine types, ingredients, user favorites and user lists on initial render
  useEffect(() => {
    // Fetch all categories from api
    const getCategories = async () => {
      const data = await Category.getAll();
      setCategories(data.categories);
    }

    // Fetch all cuisines from api
    const getCuisines = async () => {
      const data = await Cuisine.getAll();
      setCuisines(data.meals);
    }

    // Fetch all favorites from app server
    const getFavorites = async userId => {      
      const data = await Favorite.getAll(userId);
      setFavorites(data.favorites);
    }

    // Fetch all ingredients from api
    const getIngredients = async () => {
      const data = await Ingredient.getAll();
      setIngredients(data.meals);
    }

    // Fetch all user lists from app server
    const getLists = async userId => {
      const data = await List.getAll(userId);
      setLists(data.lists);
    }

    if(userId) {
      getCategories();
      getCuisines();
      getIngredients();
      getFavorites(userId);
      getLists(userId);
    }
  }, [userId]);

    // Hide success message from adding recipe to a list after three seconds
    useEffect(() => {
      let timeoutId;

      if(successMessage) {
          timeoutId = setTimeout(() => setSuccessMessage(''), 2000);
      }

      return () => clearTimeout(timeoutId); 
    }, [successMessage]);

  // Do not show any content until server returns session confirmation.
  const renderHomePage = () => {
    if (isLoading) {
      return 'Loading...';
    // If server returns a user id, show user's home page, otherwise redirect to sign in page.
    } else if (userId) {
      return <HomePage 
                categories={categories}
                cuisines={cuisines}
                favorites={favorites} 
                ingredients={ingredients}
                lists={lists}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                updateFavorites={updateFavorites}
                updateLists={updateLists}
                userId={userId} 
              />;
    } else {
      return <Navigate to='/signup' />;
    }
  }

  return (
    <Fragment>

      <div className="app">

        <Header userId={userId} setUserId={setUserId} setErrorMessage={setErrorMessage} />

        <div className="app__content">
        
          <Routes location = { backgroundLocation || location }>
            <Route path='/' element={renderHomePage()} />
            <Route path='/signup' element={<AuthPage title='sign up' authFn={User.signUp} setUserId={setUserId} />} />
            <Route path='/login' element={<AuthPage title='log in' authFn={User.logIn} setUserId={setUserId} />} />
            <Route path='/favorites' element={
              <PageWithFilter 
                allItems={favorites} 
                favorites={favorites} 
                filterType='favorite' 
                resultType='favorite'
                setErrorMessage={setErrorMessage} 
                setSuccessMessage={setSuccessMessage}
                updateFavorites={updateFavorites} 
                userId={userId} 
                url={`/users/${userId}/favorites`} 
                listComponent={RecipeSquares} 
              />
            } />
            <Route path='/search' element={
              <SearchPage 
                allCategories={categories} 
                allCuisines={cuisines} 
                allIngredients={ingredients} 
                allLists={lists} 
                favorites={favorites}
                list={list}
                setErrorMessage={setErrorMessage} 
                setSuccessMessage={setSuccessMessage}
                updateFavorites={updateFavorites}
                updateList={updateList} 
                updateLists={updateLists} 
                userId={userId} 
              />
            } />
            <Route path='/recipes/:recipeId' element={
              <RecipePage 
                favorites={favorites}
                lists={lists} 
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                successMessage={successMessage}
                updateFavorites={updateFavorites}  
                updateLists={updateLists}
                userId={userId}
              />
            } />
            <Route path='/lists/:listId' element={
              <EditListPage 
                allCategories={categories} 
                allCuisines={cuisines} 
                allIngredients={ingredients} 
                favorites={favorites} 
                list={list} 
                setSuccessMessage={setSuccessMessage}
                updateErrorMessage={updateErrorMessage}
                updateFavorites={updateFavorites} 
                updateList={updateList} 
                userId={userId} 
              />
            } />
            <Route path='/lists' element={
              <PageWithFilter 
                allItems={lists} 
                filterType='list' 
                resultType='list' 
                userId={userId} 
                listComponent={ListSquares} 
                newListLink={NewListLink} 
              />
            } />
            <Route path='/categories' element={
              <PageWithFilter 
                allItems={categories} 
                filterType='category' 
                resultType='category' 
                listComponent={LinksList} 
              />
            } />
            <Route path='/categories/:name' element={
              <RecipesPage 
                favorites={favorites}
                fetchFn={Recipe.getAllFilteredByCategory} 
                filterType='category'
                setErrorMessage={setErrorMessage} 
                setSuccessMessage={setSuccessMessage}
                updateFavorites={updateFavorites} 
                userId={userId} 
              /> 
            } />
            <Route path='/cuisines/:name' element={
              <RecipesPage 
                favorites={favorites} 
                fetchFn={Recipe.getAllFilteredByCuisine}
                filterType='cuisine'
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                updateFavorites={updateFavorites} 
                userId={userId} 
              />
            } />
            <Route path='/cuisines' element={
              <PageWithFilter 
                allItems={cuisines} 
                filterType='cuisine' 
                resultType='cuisine' 
                listComponent={LinksList} 
              />
            } />
            <Route path='/ingredients/:name' element={
              <RecipesPage 
                favorites={favorites}
                fetchFn={Recipe.getAllFilteredByIngredient} 
                filterType='ingredient' 
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                updateFavorites={updateFavorites} 
                userId={userId} 
              />
            } />
            <Route path='/ingredients' element={
              <PageWithFilter 
                allItems={ingredients} 
                filterType='ingredient' 
                resultType='ingredient' 
                listComponent={LinksList} 
              />
            } />
          </Routes>

          {backgroundLocation && <Routes>
              <Route path='/recipes/:recipeId/add' element={<AddToList setErrorMessage={setErrorMessage} lists={lists} setSuccessMessage={setSuccessMessage} updateLists={updateLists} userId={userId} />} />
              <Route path='/lists/:listId' element={<DeleteList setLists={setLists} userId={userId} />} />
              <Route path='/lists/:listId/recipes/:recipeId' element={<DeleteRecipe setList={setList} userId={userId} />} />
          </Routes>}

        </div>

        {/* Display message on significant state updates, ex: recipe successfully added to list */}
        {successMessage && <p className="app__success-message">{successMessage}</p>}
        
        {/* Display error message on state update failure, ex: failed to toggle favorite status */}
        {<ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}

        <Footer />

      </div>

    </Fragment>
  );
}

export default App;
