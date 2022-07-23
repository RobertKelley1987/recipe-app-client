import useSectionIsVisible from '../../hooks/useSectionIsVisible';
import EmptyMessage from '../../components/EmptyMessage';
import GridWithHeading from '../../components/GridWithHeading';

const renderNoResults = (resultType, resultTypeVisible, searchTerm) => {
    // Test if results are filtered to display a single type of result
    if(resultTypeVisible) {
        // Return empty message
        return <EmptyMessage message={`There are no ${resultType} results for this search term.`} moreMargin={true} />;
    } 
    // If results are not being filtered, return nothing
}
 
const renderSection = (isVisible, props) => {
    const { children, hasResults, resultType, resultTypeVisible, title } = props;

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
    const { resultType, resultTypeVisible } = props;
    const { sectionIsVisible } = useSectionIsVisible(resultType, resultTypeVisible);

    return renderSection(sectionIsVisible, props);
}

export default SearchPageSection;