import { Link } from 'react-router-dom';
import { getResultId, getResultName } from './util/parse-result-props';
import { PLURAL_TYPES } from './util/plural-types';
import './LinksList.scss';

const LinksList = ({ items, filterType }) => {
    console.log(items);
    return (
        <div className="links-list">
            {items.map(item => {
                console.log(filterType);
                let name = getResultName(item, filterType), id = getResultId(item, filterType);
                console.log(id);
                return <Link key={id} to={`/${PLURAL_TYPES[filterType]}/${name}`} className="links-list__link">{name}</Link>
            })}
        </div>
    )
}

export default LinksList;