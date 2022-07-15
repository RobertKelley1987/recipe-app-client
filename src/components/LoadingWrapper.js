const LoadingWrapper = ({ children, isLoading }) => {
    return !isLoading ? children :'Loading...';
}

export default LoadingWrapper;