import { PLURAL_TYPES } from '../../util/plural-types';
import './ResultsSectionHeading.scss'

const ResultsSectionHeading = ({ filterType, filteredBy, resultType }) => {
    switch (filterType) {
        case 'category':
            return <h2 className="results-section-heading">recipes in the <span className="results-section-heading__green-text">{filteredBy}</span> category</h2>;
        case 'cuisine':
            return <h2 className="results-section-heading">recipes in <span className="results-section-heading__green-text">{filteredBy}</span> cuisine</h2>;
        case 'ingredient':
            return <h2 className="results-section-heading">recipes with <span className="results-section-heading__green-text">{filteredBy}</span> as an ingredient</h2>;
        default:
            return <h2 className="results-section-heading">{PLURAL_TYPES[resultType]}</h2>;
    }
}

export default ResultsSectionHeading;