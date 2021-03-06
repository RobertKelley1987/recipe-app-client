import { getResultImg, PROP_NAMES } from '../../util/parse-result-props';
import ResultsSectionHeading from './ResultsSectionHeading';
import SearchResult from './SearchResult';
import './ResultsSection.scss';

const ResultsSection = props => {
    const { filteredBy, filterType, results, resultType } = props;

    if (results && results.length && !filterType) {
        return (
            <div className="results-section">
                <ResultsSectionHeading filterType={filterType} filteredBy={filteredBy} resultType={resultType} />
                {results.map(result => {
                    return <SearchResult
                        {...props} 
                        key={result[PROP_NAMES[resultType].idProp]} 
                        resultId={result[PROP_NAMES[resultType].idProp]} 
                        resultImg={getResultImg(result, resultType)}
                        resultName={result[PROP_NAMES[resultType].nameProp]}
                    />
                })}
            </div>
        );
    }
}

export default ResultsSection;