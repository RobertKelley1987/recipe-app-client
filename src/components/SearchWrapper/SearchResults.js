import { getResultId, getResultName, getResultImgSmall } from '../util/parse-result-props';
import SearchResult from './SearchResult';

const SearchResults = props => {
    const { results, resultType } = props;
    
    return results.map(result => {
        return <SearchResult 
                    key={getResultId(result, resultType)} 
                    resultId={getResultId(result, resultType)} 
                    resultImg={getResultImgSmall(result, resultType)}
                    resultName={getResultName(result, resultType)}
                    {...props}
                />
    })
}

export default SearchResults;