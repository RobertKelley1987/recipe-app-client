import axios from 'axios';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthPage from './AuthPage/AuthPage';
import EditListPage from './EditListPage';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import ListsPage from './ListsPage';
import RecipePage from './RecipePage';
import './App.scss';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [lists, setLists] = useState([]);

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
    <BrowserRouter>
      <Header userId={userId} setUserId={setUserId} />
      <div className="app">
        <Routes>
          <Route path='/' element={renderHomePage()} />
          <Route path='/signup' element={<AuthPage title='sign up' slug='/signup' setUserId={setUserId} />} />
          <Route path='/login' element={<AuthPage title='log in' slug='/login' setUserId={setUserId} />} />
          <Route path='/recipes/:id' element={<RecipePage userId={userId} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path='/lists/:id' element={<EditListPage userId={userId} setLists={setLists} />} />
          <Route path='/lists' element={<ListsPage userId={userId} lists={lists} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
