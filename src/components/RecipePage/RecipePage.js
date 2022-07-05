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

const RecipePage = ({ userId, favorites, setFavorites }) => {
    const [recipe, setRecipe] = useState(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const getRecipe = async () => {
            if(!id) { return }
            const slug = id === 'random' ? 'random.php' : `lookup.php?i=${id}`; 
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/${slug}`);
            setRecipe(data.meals[0]);
        }

        getRecipe();
    }, [id]); 

    const addToFavorites = async recipeId => {
        const { data } = await axios.post(`/users/${userId}/favorites`, { recipeId: recipeId });
        setFavorites(data.favorites); 
    }

    const configHeartClasses = (favorites, recipeId) => {
        let classes = "recipe-page__svg";
        if(favorites.includes(recipeId)) {
            classes += " recipe-page__svg--fav";
        }
        return classes;
    }

    const renderModal = (isVisible, recipeId, userId) => {
        if (isVisible) {
            return (
                <Modal onDismiss={() => setModalIsVisible(false)}>
                    <AddToList recipeId={recipeId} userId={userId} setModalIsVisible={setModalIsVisible} setSuccessMessage={setSuccessMessage} />
                </Modal>
            );
        }
    }

    return recipe && (
        <Fragment>
            {renderModal(modalIsVisible, recipe.idMeal, userId)}
            <main className="recipe-page">
                <p className="recipe-page__success-message">{successMessage}</p>
                {console.log("ID MEAL TEST: " + recipe.idMeal)}
                <header className="recipe-page__header">
                    <img alt="completed recipe" className="recipe-page__img" src={recipe.strMealThumb}></img>
                    <div className="recipe-page__header-wrapper">
                        <h1 className="recipe-page__name">{recipe.strMeal}</h1>
                        <div className="recipe-page__svg-wrapper">
                            <HeartSVG 
                                handleClick={() => addToFavorites(recipe.idMeal)} 
                                className={configHeartClasses(favorites, recipe.idMeal)} 
                            />
                            <PlusSVG 
                                handleClick={() => { console.log('click'); setModalIsVisible(true); }}
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