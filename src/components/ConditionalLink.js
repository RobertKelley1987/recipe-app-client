import { Link } from 'react-router-dom';

const ConditionalLink = ({ url, children }) => {
    return url ? <Link to={url}>{children}</Link> : children;
}

export default ConditionalLink;