import SearchResult from './SearchResult';
import BackButton from './BackButton';
import { getResultId, getResultName, getResultImg } from '../util/parse-api-results';
import { PLURAL_TYPES } from '../util/plural-types';
import './ResultsSection.scss';

const renderHeading = (filterType, filteredBy, resultType) => {
    switch (filterType) {
        case 'category':
            return <h2 className="results-section__heading">recipes in the <span className="results-section__green-text">{filteredBy}</span> category</h2>;
        case 'cuisine':
            return <h2 className="results-section__heading">recipes in <span className="results-section__green-text">{filteredBy}</span> cuisine</h2>;
        case 'ingredient':
            return <h2 className="results-section__heading">recipes with <span className="results-section__green-text">{filteredBy}</span> as an ingredient</h2>
        default:
            return <h2 className="results-section__heading">{PLURAL_TYPES[resultType]}</h2>;
    }
}

const ResultsSection = props => {
    const { filteredBy, filterType, results, resultType } = props;

    if (filterType === 'ingredient' && results === null) {
        return (
            <div className="results-section">
                <BackButton {...props} />
                <div className="results-section__apology">Sorry, we do not currently have any recipes using this ingredient.</div>
            </div>
        );
    }

    if (results && results.length) {
        return (
            <div className="results-section">
                {filterType && <BackButton {...props} />}
                {renderHeading(filterType, filteredBy, resultType)}
                {results.map(result => {
                    return <SearchResult 
                                key={getResultId(result, resultType)} 
                                resultId={getResultId(result, resultType)} 
                                resultImg={getResultImg(result, resultType)}
                                resultName={getResultName(result, resultType)}
                                {...props}
                            />
                })}
            </div>
        );
    }
}

export default ResultsSection;