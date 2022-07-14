import { PLURAL_TYPES } from '../../util/plural-types';
import EmptyMessage from '../../components/EmptyMessage';
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
    console.log(props.listComponent);
    const ListComponent = props.listComponent;
    const { filterTerm, firstLetter, filteredResults, resultType } = props;

    console.log(filteredResults);
    if(filteredResults && filteredResults.length > 0) {
        return <ListComponent {...props} items={filteredResults} />;
    } else {
        return configEmptyMessage(filterTerm, firstLetter, resultType);
    }
}

export default PageResults;