import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import IngredientsSection from './IngredientsSection';
import PrepSection from './PrepSection';
import HeartSVG from '../../components/SVGs/HeartSVG';
import PlusSVG from '../../components/SVGs/PlusSVG';
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

const RecipePage = props => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

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

    return recipe && (
        <main className="recipe-page">
            <header className="recipe-page__header">
                <img alt="completed recipe" className="recipe-page__img" src={recipe.strMealThumb}></img>
                <div className="recipe-page__header-wrapper">
                    <h1 className="recipe-page__name">{recipe.strMeal}</h1>
                    <div className="recipe-page__svg-wrapper">
                        <HeartSVG {...props} className="recipe-page__svg" recipe={recipe} />
                        <Link to={`/recipes/${recipe.idMeal}/add`} state={{ backgroundLocation: location }}>
                            <PlusSVG className="recipe-page__svg" />
                        </Link>
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
    )
}

export default RecipePage;