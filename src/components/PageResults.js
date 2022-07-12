import { PLURAL_TYPES } from './util/plural-types';
import EmptyMessage from './EmptyMessage';
import './PageResults.scss';

const configEmptyMessage = (filterTerm, firstLetter, resultType) => {
    if (firstLetter) {
        return <EmptyMessage message={`Sorry, there are no ${PLURAL_TYPES[resultType]} starting with ${firstLetter}.`} />
    } else if (filterTerm) {
        return <EmptyMessage message={`We did not find any matches for that search term.`} />
    } else if (resultType === 'favorite') {
        return <EmptyMessage message={`You have not yet saved any favorites.`} />
    } else if (resultType === 'list') {
        return <EmptyMessage message={`You have not yet created any lists.`} />
    }
}

const PageResults = props => {
    const ListComponent = props.listComponent;
    const { filterTerm, firstLetter, resultType, items } = props;
    if(items.length > 0) {
        return <ListComponent {...props} resultType={resultType} />;
    } else {
        return configEmptyMessage(filterTerm, firstLetter, resultType);
    }
}

export default PageResults;