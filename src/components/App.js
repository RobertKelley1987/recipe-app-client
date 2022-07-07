import axios from 'axios';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import AuthPage from './AuthPage/AuthPage';
import CategoryPage from './CategoryPage';
import CategoriesPage from './CategoriesPage';
import DeleteRecipe from './EditListPage/DeleteRecipe';
import EditListPage from './EditListPage/EditListPage';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import ListsPage from './ListsPage';
import RecipePage from './RecipePage/RecipePage';
import './App.scss';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [lists, setLists] = useState([]);
  const [list, setList] = useState(null);
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

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
      return <HomePage favorites={favorites} setFavorites={setFavorites} lists={lists} setLists={setLists} userId={userId} />;
    } else {
      return <Navigate to='/signup' />;
    }
  }

  return (
    <Fragment>
      <Header userId={userId} setUserId={setUserId} />
      <div className="app">
        <Routes location = { backgroundLocation || location }>
          <Route path='/' element={renderHomePage()} />
          <Route path='/signup' element={<AuthPage title='sign up' slug='/signup' setUserId={setUserId} />} />
          <Route path='/login' element={<AuthPage title='log in' slug='/login' setUserId={setUserId} />} />
          <Route path='/recipes/:id' element={<RecipePage userId={userId} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path='/lists/:listId' element={<EditListPage list={list} setList={setList} userId={userId} setLists={setLists} />} />
          <Route path='/lists' element={<ListsPage userId={userId} lists={lists} />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='categories/:categoryName' element={<CategoryPage />} />
        </Routes>

        {backgroundLocation && <Routes>
            <Route path='lists/:listId/recipes/:recipeId' element={<DeleteRecipe setList={setList}/>} />
        </Routes>}
      </div>
    </Fragment>
  );
}

export default App;
