import { Link, useLocation } from 'react-router-dom';
import ConditionalLink from './ConditionalLink';
import HeartSVG from './SVGs/HeartSVG';
import PlusSVG from './SVGs/PlusSVG'; 
import './RecipeCardXL.scss';

// If element is being used as a header, wrap in header tags
const ConditionalHeader = ({ children, className, isHeader }) => {
    return isHeader ? <header className={className}>{children}</header> : <div className={className}>{children}</div>
}

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

const RecipeCardXL = props => {
    const { isHeader, recipe } = props;
    const location = useLocation();

    return recipe && (
        <ConditionalHeader className={isHeader ? "recipe-card-xl recipe-card-xl--header" : "recipe-card-xl"} isHeader={isHeader}>
            <img alt={recipe.strMeal} className="recipe-card-xl__img" src={recipe.strMealThumb}></img>
            <div className="recipe-card-xl__header-wrapper">
                <ConditionalLink url={!isHeader && `/recipes/${recipe.idMeal}`}>
                    <h1 className={isHeader ? "recipe-card-xl__name recipe-card-xl__name--header" : "recipe-card-xl__name"}>{recipe.strMeal}</h1>
                </ConditionalLink>
                <div className="recipe-card-xl__svg-wrapper">
                    <HeartSVG {...props} className="recipe-card-xl__svg" recipe={recipe} />
                    <Link to={`/recipes/${recipe.idMeal}/add`} state={{ backgroundLocation: location }}>
                        <PlusSVG className="recipe-card-xl__svg" />
                    </Link>
                </div>
                <Link className="recipe-card-xl__meta-data" to={`/categories/${recipe.strCategory}`}>
                    <span className="recipe-card-xl__meta-data--bold">Category</span> - {recipe.strCategory}
                </Link>
                <Link className="recipe-card-xl__meta-data" to={`/cuisines/${recipe.strArea}`}>
                    <span className="recipe-card-xl__meta-data--bold">Cuisine</span> - {recipe.strArea}
                </Link>
                {renderTags(recipe)}
            </div>
        </ConditionalHeader>
    );
}

export default RecipeCardXL;