import EmptyMessage from "./EmptyMessage";

const LoadingWrapper = ({ children, isLoading, textOnly }) => {
    // If textOnly option is set to true, return load message as string.
    // Otherwise use styled EmptyMessage element.
    let loadingMessage = textOnly ? 'Loading...' : <EmptyMessage message='Loading...' />;
    // If loading state is true, return loading message.
    // Otherwise return child elements.
    return isLoading ? loadingMessage : children;
}

export default LoadingWrapper;