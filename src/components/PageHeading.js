import './PageHeading.scss';

const PageHeading = ({ filterType, filterName, resultType }) => {
    if(resultType !== 'recipe') {
        return <h1 className="page-heading">Browse by {filterType}</h1>
    } else {
        return (
            <h1 className="page-heading">
                {filterType} 
                {filterName && ' - '}
                {filterName && <span className="page-heading--green-text">{filterName.toLowerCase()}</span>}
            </h1>
        );
    }
}

export default PageHeading;