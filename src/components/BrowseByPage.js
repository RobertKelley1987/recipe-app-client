import { Link } from 'react-router-dom';
import { getResultId, getResultName } from './util/parse-api-results';
import './BrowseByPage.scss';

const BrowseByPage = ({ filterType, items }) => {
    return (
        <main className="browse-by-page">
            <h1 className="browse-by-page__heading">Browse by {filterType}</h1>
            <div className="browse-by-page__links">
                {items && items.map(item => {
                    let name = getResultName(item, filterType), id = getResultId(item, filterType);
                    return <Link id={id} to={`/categories/${name}`} className="browse-by-page__link">{name}</Link>
                })}           
            </div>
        </main>
    )
}

export default BrowseByPage;