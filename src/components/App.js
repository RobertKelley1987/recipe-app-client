import axios from 'axios';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import AuthPage from './AuthPage/AuthPage';
import PageWithSearch from './PageWithSearch';
import DeleteRecipe from './EditListPage/DeleteRecipe';
import EditListPage from './EditListPage/EditListPage';
import FavoritesPage from './FavoritesPage';
import Footer from './Footer';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import LinksList from './LinksList';
import ListsPage from './ListsPage';
import RecipePage from './RecipePage/RecipePage';
import Squares from './Squares';
import SearchPage from './SearchPage';
import './App.scss';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [lists, setLists] = useState([]);
  const [list, setList] = useState(null);
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const updateList = useCallback(newList => setList(newList), [setList]);
  const updateFavorites = useCallback(newFavorites => setFavorites(newFavorites), []);
  const updateLists = useCallback(newLists => setLists(newLists), []);

  useEffect(() => {
    // On initial load, make request to server with cookie to check if user is logged in
    const getSession = async () => {
      const { data: { userId } } = await axios.get('/sessions');
      setUserId(userId);
      // once data is returned from server, set loading status to false
      setIsLoading(false);
    }

    getSession();
  }, []);

  // Do not show any content until server returns session confirmation.
  const renderHomePage = () => {
    if (isLoading) {
      return 'Loading...';
    // If server returns a user id, show user's home page, otherwise redirect to sign in page.
    } else if (userId) {
      return <HomePage 
                favorites={favorites} 
                lists={lists} 
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
            <Route path='/recipes/search' element={<SearchPage list={list} allLists={lists} updateList={updateList} updateLists={updateLists} />} />
            <Route path='/recipes/:id' element={<RecipePage userId={userId} favorites={favorites} updateFavorites={updateFavorites} />} />
            <Route path='/lists/:listId' element={<EditListPage list={list} updateList={updateList} userId={userId} setLists={setLists} />} />
            <Route path='/lists' element={<ListsPage userId={userId} lists={lists} />} />
            <Route path='/categories' element={<PageWithSearch filterType='category' resultType='category' listComponent={LinksList} />} />
            <Route path='/categories/:name' element={<PageWithSearch filterType='category' resultType='recipe' listComponent={Squares} />} />
            <Route path='/cuisines' element={<PageWithSearch filterType='cuisine' resultType='cuisine' listComponent={LinksList} />} />
            <Route path='/cuisines/:name' element={<PageWithSearch filterType='cuisine' resultType='recipe' listComponent={Squares} />} />
            <Route path='/ingredients' element={<PageWithSearch filterType='ingredient' resultType='ingredient' listComponent={LinksList} />} />
            <Route path='/ingredients/:name' element={<PageWithSearch filterType='ingredient' resultType='recipe' listComponent={Squares} />} />
            <Route path='/favorites' element={<FavoritesPage favorites={favorites} />} />
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
