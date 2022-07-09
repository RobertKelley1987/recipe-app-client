import { PLURAL_TYPES } from './util/plural-types';
import './PageResults.scss';

const PageResults = props => {
    const ListComponent = props.listComponent;
    const { filterTerm, firstLetter, resultType, items } = props;
    console.log("INSIDE PAGE RESULTS: " + resultType);
    if(items.length > 0) {
        return <ListComponent {...props} resultType={resultType} />;
    } else if (firstLetter) {
        return <div className="page-results__empty-message">Sorry, no {PLURAL_TYPES[resultType]} starting with {firstLetter}.</div>
    } else if (filterTerm) {
        return <div className="page-results__empty-message">We did not find any matches for that search term.</div>
    }
}

export default PageResults;