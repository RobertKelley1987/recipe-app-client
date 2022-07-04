import { Link } from 'react-router-dom';

const RecipeLink = ({ children, className, resultType, url }) => {
    if(resultType === 'recipe') {
        return <Link className={className} to={url}>{children}</Link>
    } else {
        return <div className={className}>{children}</div>
    }
}

export default RecipeLink;