import { Link } from 'react-router-dom';

const RecipeLink = ({ children, className, url }) => {
    return url ? <Link className={className} to={url}>{children}</Link> : <div className={className}>{children}</div>
}

export default RecipeLink;