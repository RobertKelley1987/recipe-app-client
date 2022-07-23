import { Route, Routes, useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import useCategories from './hooks/useCategories';
import useCuisines from './hooks/useCuisines';
import useList from './hooks/useList';
import useLists from './hooks/useLists';
import useSuccessMessage from './hooks/useSuccessMessage';
import useUserId from './hooks/useUserId';
import useIngredients from './hooks/useIngredients';
import useFavorites from './hooks/useFavorites';
import AddToList from './components/AddToList';
import AuthPage from './pages/AuthPage';
import DeleteList from './components/DeleteList';
import DeleteRecipe from './components/DeleteRecipe';
import ErrorMessage from './components/ErrorMessage';
import EditListPage from './pages/EditListPage';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ListSquares from './components/ListSquares';
import LinksList from './components/LinksList';
import NewListLink from './components/NewListLink';
import PageWithFilter from './pages/PageWithFilter';
import PrivateRoute from './components/PrivateRoute';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import RecipeSquares from './components/RecipeSquares';
import SearchPage from './pages/SearchPage';
import User from './services/User';
import './App.scss';
import Recipe from './services/Recipe';
import LoadingWrapper from './components/LoadingWrapper';

const App = () => {  
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useUserId(setIsLoading);
  const { categories } = useCategories();
  const { ingredients } = useIngredients();
  const { cuisines } = useCuisines();
  const [favorites, setFavorites] = useFavorites(userId);
  const [list, getList, setList] = useList(userId);
  const [lists, setLists] = useLists(userId);
  const [errorMessage, setErrorMessage] = useState('');
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useSuccessMessage();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const updateFavorites = useCallback(newFavorites => setFavorites(newFavorites), [setFavorites]);
  const updateLists = useCallback(newLists => setLists(newLists), [setLists]);
  const updateErrorMessage = useCallback(message => setErrorMessage(message), []);

  useEffect(() => {
    setIsLoading(false);
  }, [userId]);

  return (
    <Fragment>

      <div className={!menuIsVisible ? "app" : "app app--fixed"}>

        <Header userId={userId} menuIsVisible={menuIsVisible} setMenuIsVisible={setMenuIsVisible} setUserId={setUserId} setErrorMessage={setErrorMessage} />

        <div className="app__content">
        
          <Routes location = { backgroundLocation || location }>
            <Route path='/' element={
              <LoadingWrapper isLoading={isLoading}>
                <PrivateRoute userId={userId}>
                  <HomePage 
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
                  />
                </PrivateRoute>
              </LoadingWrapper>
            } />
            <Route path='/signup' element={<AuthPage title='sign up' authFn={User.signUp} setUserId={setUserId} />} />
            <Route path='/login' element={<AuthPage title='log in' authFn={User.logIn} setUserId={setUserId} />} />
            <Route path='/favorites' element={
              <PrivateRoute userId={userId}>
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
              </PrivateRoute>
            } />
            <Route path='/search' element={
              <PrivateRoute userId={userId}>
                <SearchPage 
                  allCategories={categories} 
                  allCuisines={cuisines} 
                  allIngredients={ingredients} 
                  allLists={lists} 
                  favorites={favorites}
                  setErrorMessage={setErrorMessage} 
                  setSuccessMessage={setSuccessMessage}
                  updateFavorites={updateFavorites}
                  updateLists={updateLists} 
                  userId={userId} 
                />
              </PrivateRoute>
            } />
            <Route path='/recipes/:recipeId' element={
              <PrivateRoute userId={userId}>
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
              </PrivateRoute>
            } />
            <Route path='/lists/:listId' element={
              <PrivateRoute userId={userId}>
                <EditListPage 
                  allCategories={categories} 
                  allCuisines={cuisines} 
                  allIngredients={ingredients}
                  allLists={lists} 
                  favorites={favorites}
                  getList={getList}
                  list={list}
                  setList={setList}
                  setSuccessMessage={setSuccessMessage}
                  updateErrorMessage={updateErrorMessage}
                  updateFavorites={updateFavorites} 
                  userId={userId} 
                />
              </PrivateRoute>
            } />
            <Route path='/lists' element={
              <PrivateRoute userId={userId}>
                <PageWithFilter 
                  allItems={lists} 
                  filterType='list' 
                  resultType='list' 
                  userId={userId} 
                  listComponent={ListSquares} 
                  newListLink={NewListLink} 
                />
              </PrivateRoute>
            } />
            <Route path='/categories' element={
              <PrivateRoute userId={userId}>
                <PageWithFilter allItems={categories} filterType='category' resultType='category' listComponent={LinksList} />
              </PrivateRoute>
            } />
            <Route path='/categories/:name' element={
              <PrivateRoute userId={userId}>
                <RecipesPage 
                  favorites={favorites}
                  fetchFn={Recipe.getAllFilteredByCategory} 
                  filterType='category'
                  setErrorMessage={setErrorMessage} 
                  setSuccessMessage={setSuccessMessage}
                  updateFavorites={updateFavorites} 
                  userId={userId} 
                />
              </PrivateRoute> 
            } />
            <Route path='/cuisines/:name' element={
              <PrivateRoute userId={userId}>
                <RecipesPage 
                  favorites={favorites} 
                  fetchFn={Recipe.getAllFilteredByCuisine}
                  filterType='cuisine'
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                  updateFavorites={updateFavorites} 
                  userId={userId} 
                />
              </PrivateRoute>
            } />
            <Route path='/cuisines' element={
              <PrivateRoute userId={userId}>
                <PageWithFilter allItems={cuisines} filterType='cuisine' resultType='cuisine' listComponent={LinksList} />
              </PrivateRoute>
            } />
            <Route path='/ingredients/:name' element={
              <PrivateRoute userId={userId}>
                <RecipesPage 
                  favorites={favorites}
                  fetchFn={Recipe.getAllFilteredByIngredient} 
                  filterType='ingredient' 
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                  updateFavorites={updateFavorites} 
                  userId={userId} 
                />
              </PrivateRoute>
            } />
            <Route path='/ingredients' element={
              <PrivateRoute userId={userId}>
                <PageWithFilter allItems={ingredients} filterType='ingredient' resultType='ingredient' listComponent={LinksList} />
              </PrivateRoute>
            } />
          </Routes>

          {/* MODAL ROUTES */}
          {backgroundLocation && <Routes>
                <Route path='/recipes/:recipeId/add' element={
                  <PrivateRoute userId={userId}>
                    <AddToList setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} updateLists={updateLists} userId={userId} />
                  </PrivateRoute>
                } />
                <Route path='/lists/:listId' element={
                  <PrivateRoute userId={userId}>
                    <DeleteList setLists={setLists} userId={userId} />
                  </PrivateRoute>
                } />
                <Route path='/lists/:listId/recipes/:recipeId' element={
                  <PrivateRoute userId={userId}>
                    <DeleteRecipe getList={getList} userId={userId} />
                  </PrivateRoute>
                } />
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
