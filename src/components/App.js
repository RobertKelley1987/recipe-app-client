import axios from 'axios';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthPage from './AuthPage';
import Header from './Header';
import './App.scss';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      return 'Home Page';
    } else {
      return <Navigate to='/signup' />;
    }
  }

  return (
    <BrowserRouter>
      <Header userId={userId} />
      <Routes>
        <Route path='/' element={renderHomePage()} />
        <Route path='/signup' element={<AuthPage title='sign up' slug='/signup' setUserId={setUserId} />} />
        <Route path='/login' element={<AuthPage title='log in' slug='/login' setUserId={setUserId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
