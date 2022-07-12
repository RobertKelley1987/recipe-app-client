import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddToList from './AddToList';
import IngredientsSection from './IngredientsSection';
import PrepSection from './PrepSection';
import HeartSVG from './../SVGs/HeartSVG';
import PlusSVG from './../SVGs/PlusSVG';
import './RecipePage.scss';

const renderTags = ({ strTags }) => {
    if(strTags) {
        return (
            <p className="recipe-page__meta-data recipe-page__meta-data--tags">
                {/* Add a space after commas in the list of tags provided */}
                <span className="bold-text">Tags</span> - {strTags.replace(/,/g, ', ')}
            </p>
        )
    }
}

const RecipePage = ({ favorites, lists, updateFavorites, updateLists, userId }) => {
    const [recipe, setRecipe] = useState(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch recipe data on initial load
    useEffect(() => {
        const getRecipe = async id => {
            if(!id) { return }

            // If user navigated to the random recipe page, use random recipe url.
            // Otherwise get specific recipe using recipe id provided.
            const slug = id === 'random' ? 'random.php' : `lookup.php?i=${id}`; 
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/${slug}`);
            
            // If user selected a random recipe, navigate to correct page using id from api,
            // so they can return to the same recipe using the back button
            if(id === 'random') {
                navigate( `/recipes/${data.meals[0].idMeal}`, { replace: true });
            }

            setRecipe(data.meals[0]);
        }

        getRecipe(id);
    }, [id]); 

    // Fetch favorites data on initial load
    useEffect(() => {
        const getFavorites = async userId => {
            const { data } = await axios(`/users/${userId}/favorites`);
            updateFavorites(data.favorites);
        }

        getFavorites(userId);
    }, [userId, updateFavorites])

    // Hide success message from adding recipe to a list after three seconds
    useEffect(() => {
        let timeoutId;

        if(successMessage) {
            timeoutId = setTimeout(() => setSuccessMessage(''), 3000);
        }

        return () => clearTimeout(timeoutId); 
    }, [successMessage]);

    const addToFavorites = async (recipeId, recipeName) => {
        const { data } = await axios.post(`/users/${userId}/favorites`, { recipe: { apiId: recipeId, name: recipeName } });
        updateFavorites(data.favorites); 
    }

    const configHeartClasses = (favorites, recipeId) => {
        let classes = "recipe-page__svg";
        if(favorites.findIndex(fav => fav.apiId === recipeId) !== -1) {
            classes += " recipe-page__svg--fav";
        }
        return classes;
    }

    return recipe && (
        <Fragment>
            <AddToList 
                lists={lists}
                modalIsVisible={modalIsVisible}
                recipeId={recipe.idMeal} 
                recipeName={recipe.strMeal} 
                setModalIsVisible={setModalIsVisible} 
                setSuccessMessage={setSuccessMessage} 
                updateLists={updateLists}
                userId={userId} 
            />
            <main className="recipe-page">
                {successMessage && <p className="recipe-page__success-message">{successMessage}</p>}
                <header className="recipe-page__header">
                    <img alt="completed recipe" className="recipe-page__img" src={recipe.strMealThumb}></img>
                    <div className="recipe-page__header-wrapper">
                        <h1 className="recipe-page__name">{recipe.strMeal}</h1>
                        <div className="recipe-page__svg-wrapper">
                            <HeartSVG 
                                handleClick={() => addToFavorites(recipe.idMeal, recipe.strMeal)} 
                                className={configHeartClasses(favorites, recipe.idMeal)} 
                            />
                            <PlusSVG 
                                handleClick={() => setModalIsVisible(true)}
                                className="recipe-page__svg" 
                            />
                        </div>
                        <Link className="recipe-page__meta-data" to={`/categories/${recipe.strCategory}`}>
                            <span className="recipe-page__meta-data--bold">Category</span> - {recipe.strCategory}
                        </Link>
                        <Link className="recipe-page__meta-data" to={`/cuisines/${recipe.strArea}`}>
                            <span className="recipe-page__meta-data--bold">Cuisine</span> - {recipe.strArea}
                        </Link>
                        {renderTags(recipe)}
                    </div>
                </header>
                <IngredientsSection recipe={recipe} />
                <PrepSection recipe={recipe} />
            </main>
        </Fragment>
    )
}

export default RecipePage;