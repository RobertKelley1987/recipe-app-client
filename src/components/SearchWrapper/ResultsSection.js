import { PLURAL_TYPES } from '../util/plural-types';
import SearchResults from './SearchResults';
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

    // Display error / apology message if there are no recipes listed for an ingredient
    if (filterType === 'ingredient' && results === null) {
        return (
            <div className="results-section">
                <div className="results-section__apology">Sorry, we do not currently have any recipes using this ingredient.</div>
            </div>
        );
    }

    if (results && results.length) {
        return (
            <div className="results-section">
                {renderHeading(filterType, filteredBy, resultType)}
                <SearchResults results={results} resultType={resultType} {...props} />
            </div>
        );
    }
}

export default ResultsSection;