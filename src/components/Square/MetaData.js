import { Fragment } from 'react';
import './MetaData.scss';

const MetaData = ({ category, cuisine, listLength }) => {
    const listData = <p className="meta-data">{listLength} Recipes</p>;

    const recipeData = (
        <Fragment>
            <p className="meta-data">
                <span className="meta-data--bold">Category</span> - {category}
            </p>
            <p className="meta-data">
                <span className="meta-data--bold">Cuisine</span> - {cuisine}
            </p>
        </Fragment> 
    );

    if (listLength) {
        return listData;
    } else if (category && cuisine) {
        return recipeData;
    }
}

export default MetaData;