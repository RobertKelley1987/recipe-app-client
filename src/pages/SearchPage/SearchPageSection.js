import { useEffect, useState } from 'react';
import EmptyMessage from '../../components/EmptyMessage';
import GridWithHeading from '../../components/GridWithHeading';

const renderNoResults = (resultType, resultTypeVisible, searchTerm) => {
    // Test if results are filtered to display a single type of result
    if(resultTypeVisible) {
        // Return empty message
        return <EmptyMessage message={`There are no ${resultType} results for this search term.`} />;
    } 
    // If results are not being filtered, return nothing
}
 
const renderSection = (isVisible, props) => {
    const { children, hasResults, resultType, resultTypeVisible, searchTerm, title } = props;

    // Test if section is in visible state 
    if(isVisible) {
    // Test if this section will have zero results 
        if(!hasResults) {
            // Show empty message
            return renderNoResults(resultType, resultTypeVisible);
        } else {
            // Display section with results
            return <GridWithHeading title={title}>{children}</GridWithHeading>;
        }
    }

    // Otherwise return nothing
}

const SearchPageSection = props => {
    const [isVisible, setIsVisible] = useState(true);
    const { resultType, resultTypeVisible } = props;

    useEffect(() => {
        // Test if results are filtered for one result type, and if this section will display
        // that result type
        if(resultTypeVisible && (resultTypeVisible !== resultType)) {
            // Set visibility state to false
            setIsVisible(false);
        } else {
            // Set visibility state to true
            setIsVisible(true);
        }
    },[resultType, resultTypeVisible]);

    return renderSection(isVisible, props);
}

export default SearchPageSection;