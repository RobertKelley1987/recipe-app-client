import { getResultId, getResultName, getResultImg } from '../util/parse-api-results';
import SearchResult from './SearchResult';

const SearchResults = props => {
    const { results, resultType } = props;
    
    return results.map(result => {
        return <SearchResult 
                    key={getResultId(result, resultType)} 
                    resultId={getResultId(result, resultType)} 
                    resultImg={getResultImg(result, resultType)}
                    resultName={getResultName(result, resultType)}
                    {...props}
                />
    })
}

export default SearchResults;