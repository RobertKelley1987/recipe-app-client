import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EditSVG from './../SVGs/EditSVG';
import Img from './../Img';
import ListDropdown from './ListDropdown';
import Options from './../Options';
import Recipe from '../../services/Recipe';
import './ListSquare.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const hasRecipes = list => {
    return list && list.recipes && list.recipes.length > 0;
}

const ListSquare = props => {
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const { searchURL, list } = props;
    const location = useLocation();

    // On initial render, get recipe using url provided and save to component state
    useEffect(() => {
        const getRecipe = async list => {
            if(hasRecipes(list)) {
                const { data } = await Recipe.getOne(list.recipes[0].apiId)
                data.meals && setRecipe(data.meals[0]);
            } 
        }

        getRecipe(searchURL);
    }, [searchURL]);

    // After clicking a link to a modal, hide dropdown menu
    useEffect(() => {
        if(location.state && location.state.backgroundLocation) {
            setDropdownIsVisible(false);
        }
    }, [location]);

    return (
        <div className="list-square">
            <Link className="list-square__link" to={`/lists/${list._id}`}>
                <Img className="list-square__img" imgAlt={recipe && recipe.strMeal} imgSrc={recipe&& recipe.strMealThumb} />
                <h2 className="list-square__name list-square__name--list">{list.name}</h2>
            </Link>
            <p className="list-square__meta-data">{hasRecipes(list) && list.recipes.length} Recipes</p>            
            <Options {...props} dropdown={ListDropdown} dropdownIsVisible={dropdownIsVisible} listId={list._id} setDropdownIsVisible={setDropdownIsVisible}>
                <Link to={`/lists/${list._id}`}>
                    <EditSVG className="list-square__svg" />
                </Link>
            </Options>
        </div>
    );
}

export default ListSquare;