import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './MetaData.scss';

const MetaData = ({ category, cuisine, listLength, resultType }) => {

    // If parent component is displaying a list, return list length
    if (resultType === 'list') {
        return <p className="meta-data">{listLength} Recipes</p>;
    } 
    
    // if parent component is displaying a recipe, return category and cuisine type
    if (resultType === 'recipe' || resultType === 'favorite') {
        return (
            <Fragment>
                <Link className="meta-data" to={`/categories/${category}`}>
                    <span className="meta-data--bold">Category</span> - {category}
                </Link>
                <Link className="meta-data" to={`/cuisines/${cuisine}`}>
                    <span className="meta-data--bold">Cuisine</span> - {cuisine}
                </Link>
            </Fragment>
        );
    }
}

export default MetaData;