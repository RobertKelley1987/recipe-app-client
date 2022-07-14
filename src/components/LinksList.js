import { Link } from 'react-router-dom';
// Lookup for api prop names -- prop names are unique to each result type
import { PROP_NAMES } from './../util/parse-result-props';
// Lookup for plural names of each result type, ex: returns 'categories' for 'category'
import { PLURAL_TYPES } from './../util/plural-types';
import './LinksList.scss';

const LinksList = ({ items, filterType }) => {
    console.log('links list');
    return (
        <div className="links-list">
            {items.map(item => {
                let name = item[PROP_NAMES[filterType].nameProp]; 
                let id = item[PROP_NAMES[filterType].idProp];
                return <Link key={id} to={`/${PLURAL_TYPES[filterType]}/${name}`} className="links-list__link">{name}</Link>
            })}
        </div>
    )
}

export default LinksList;