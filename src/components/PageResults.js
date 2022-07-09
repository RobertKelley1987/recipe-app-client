import { PLURAL_TYPES } from './util/plural-types';
import './PageResults.scss';

const PageResults = props => {
    const ListComponent = props.listComponent;
    const { filterType, filterTerm, firstLetter, resultType, items } = props;
    console.log("RESULT TYPE: " + resultType);
    if(items.length > 0) {
        return <ListComponent items={items} filterType={filterType} resultType={resultType} />;
    } else if (firstLetter) {
        return <div className="page-results__empty-message">Sorry, no {PLURAL_TYPES[filterType]} starting with {firstLetter}.</div>
    } else if (filterTerm) {
        return <div className="page-results__empty-message">We did not find any matches for that search term.</div>
    }
}

export default PageResults;