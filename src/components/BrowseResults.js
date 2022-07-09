import { Link } from 'react-router-dom';
import { getResultId, getResultName } from './util/parse-api-results';
import { PLURAL_TYPES } from './util/plural-types';

const BrowseResults = ({ filterType, firstLetter, items }) => {
    if(items.length > 0) {
        return (
            <div className="browse-by-page__links">
                {items.map(item => {
                    let name = getResultName(item, filterType), id = getResultId(item, filterType);
                    return <Link key={id} to={`/${PLURAL_TYPES[filterType]}/${name}`} className="browse-by-page__link">{name}</Link>
                })}
            </div>
        );
    } else if (firstLetter) {
        return <div className="browse-by-page__empty-message">Sorry, no {PLURAL_TYPES[filterType]} starting with {firstLetter}.</div>
    }
}

export default BrowseResults;