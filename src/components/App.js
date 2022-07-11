import axios from 'axios';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { sortIngredients } from './util/sort-functions';
import AuthPage from './AuthPage/AuthPage';
import PageWithFilter from './PageWithFilter';
import DeleteRecipe from './EditListPage/DeleteRecipe';
import EditListPage from './EditListPage/EditListPage';
import Footer from './Footer';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import LinksList from './LinksList';
import ListsPage from './ListsPage';
import RecipePage from './RecipePage/RecipePage';
import RecipesPage from './RecipesPage';
import Squares from './Squares/Squares';
import SearchPage from './SearchPage';
import './App.scss';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [list, setList] = useState(null);
  const [lists, setLists] = useState([]);
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
            <Route path='/favorites' element={<PageWithFilter allItems={favorites} filterType='favorite' resultType='favorite' url={`/users/${userId}/favorites`} listComponent={Squares} />} />
            <Route path='/search' element={<SearchPage allCategories={categories} allCuisines={cuisines} allIngredients={ingredients} allLists={lists} list={list} updateList={updateList} updateLists={updateLists} />} />
            <Route path='/recipes/:id' element={<RecipePage userId={userId} favorites={favorites} updateFavorites={updateFavorites} />} />
            <Route path='/lists/:listId' element={<EditListPage allCategories={categories} allCuisines={cuisines} allIngredients={ingredients} list={list} updateList={updateList} userId={userId} setLists={setLists} />} />
            <Route path='/lists' element={<ListsPage userId={userId} lists={lists} />} />
            <Route path='/categories' element={<PageWithFilter allItems={categories} filterType='category' resultType='category' listComponent={LinksList} />} />
            <Route path='/categories/:name' element={<RecipesPage filterType='category' />} />
            <Route path='/cuisines' element={<PageWithFilter allItems={cuisines} filterType='cuisine' resultType='cuisine' listComponent={LinksList} />} />
            <Route path='/cuisines/:name' element={<RecipesPage filterType='cuisine' />} />
            <Route path='/ingredients' element={<PageWithFilter allItems={ingredients} filterType='ingredient' resultType='ingredient' listComponent={LinksList} />} />
            <Route path='/ingredients/:name' element={<RecipesPage filterType='ingredient' />} />
          </Routes>

          {backgroundLocation && <Routes>
              <Route path='lists/:listId/recipes/:recipeId' element={<DeleteRecipe setList={setList}/>} />
          </Routes>}

        </div>

        <Footer />

      </div>

    </Fragment>
  );
}

export default App;
