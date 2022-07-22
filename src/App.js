import { Route, Routes, useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import useCategories from './hooks/useCategories';
import useCuisines from './hooks/useCuisines';
import useLists from './hooks/useLists';
import useSuccessMessage from './hooks/useSuccessMessage';
import useUserId from './hooks/useUserId';
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
import useIngredients from './hooks/useIngredients';
import useFavorites from './hooks/useFavorites';

const App = () => {  
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useUserId(setIsLoading);
  const { categories } = useCategories();
  const { ingredients } = useIngredients();
  const { cuisines } = useCuisines();
  const [favorites, setFavorites] = useFavorites(userId);
  const [lists, setLists] = useLists(userId);

  const [errorMessage, setErrorMessage] = useState('');
  const [list, setList] = useState(null);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useSuccessMessage();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const updateList = useCallback(newList => setList(newList), []);
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
              <Route path='/recipes/:recipeId/add' element={<AddToList setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} updateLists={updateLists} userId={userId} />} />
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
