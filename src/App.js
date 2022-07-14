import axios from 'axios';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { sortIngredients } from './util/sort-functions';
import AuthPage from './pages/AuthPage';
import DeleteRecipe from './pages/EditListPage/DeleteRecipe';
import ErrorMessage from './components/ErrorMessage';
import EditListPage from './pages/EditListPage';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ListSquares from './components/ListSquares';
import LinksList from './components/LinksList';
import NewListLink from './components/NewListLink';
import PageWithFilter from './pages/PageWithFilter';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import RecipeSquares from './components/RecipeSquares';
import SearchPage from './pages/SearchPage';
import './App.scss';

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

  useEffect(() => {
    // Make request to app server with cookie data to check if user is logged in
    const getSession = async () => {
      const { data: { userId } } = await axios.get('/sessions');
      setUserId(userId);
      // Once data is returned from server, set loading status to false
      setIsLoading(false);
    }

    getSession();
  }, []);

  // Fetch all categories, cuisine types, ingredients, user favorites and user lists on initial render
  useEffect(() => {
    // Fetch all categories from api
    const getCategories = async () => {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategories(data.categories);
    }

    // Fetch all cuisines from api
    const getCuisines = async () => {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setCuisines(data.meals);
    }

    // Fetch all favorites from app server
    const getFavorites = async userId => {      
      const { data } = await axios.get(`/users/${userId}/favorites`);
      setFavorites(data.favorites);
    }

    // Fetch all ingredients from api
    const getIngredients = async () => {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      // Sort ingredients alphabetically by name
      data.meals.sort((a, b) => sortIngredients(a, b));
      setIngredients(data.meals);
    }

    // Fetch all lists from app server
    const getLists = async userId => {
      const { data } = await axios.get(`/users/${userId}/lists`);
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
                lists={lists}
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

        <Header userId={userId} setUserId={setUserId} />

        <div className="app__content">
        
          <Routes location = { backgroundLocation || location }>
            <Route path='/' element={renderHomePage()} />
            <Route path='/signup' element={<AuthPage title='sign up' slug='/signup' setUserId={setUserId} />} />
            <Route path='/login' element={<AuthPage title='log in' slug='/login' setUserId={setUserId} />} />
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
            <Route path='/recipes/:id' element={
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
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
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
              <Route path='lists/:listId/recipes/:recipeId' element={<DeleteRecipe setList={setList}/>} />
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
