import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddToList from './AddToList';
import IngredientsSection from './IngredientsSection';
import PrepSection from './PrepSection';
import HeartSVG from './../SVGs/HeartSVG';
import PlusSVG from './../SVGs/PlusSVG';
import Modal from '../Modal';
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

const RecipePage = ({ favorites, updateFavorites, userId }) => {
    const [recipe, setRecipe] = useState(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    console.log(favorites);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch recipe data on initial load
    useEffect(() => {
        const getRecipe = async id => {
            if(!id) { return }
            const slug = id === 'random' ? 'random.php' : `lookup.php?i=${id}`; 
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/${slug}`);
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

    const renderModal = (isVisible, recipeId, recipeName, userId) => {
        if (isVisible) {
            return (
                <Modal onDismiss={() => setModalIsVisible(false)}>
                    <AddToList recipeId={recipeId} recipeName={recipeName} userId={userId} setModalIsVisible={setModalIsVisible} setSuccessMessage={setSuccessMessage} />
                </Modal>
            );
        }
    }

    return recipe && (
        <Fragment>
            {renderModal(modalIsVisible, recipe.idMeal, recipe.strMeal, userId)}
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
                        <p className="recipe-page__meta-data"><span className="bold-text">Category</span> - {recipe.strCategory}</p>
                        <p className="recipe-page__meta-data"><span className="bold-text">Cuisine</span> - {recipe.strArea}</p>
                        {renderTags(recipe)}
                    </div>
                </header>
                <IngredientsSection recipe={recipe}/>
                <PrepSection recipe={recipe} />
            </main>
        </Fragment>
    )
}

export default RecipePage;