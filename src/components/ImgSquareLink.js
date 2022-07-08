import { Link } from 'react-router-dom';
import DeleteLink from './DeleteLink';
import MetaData from './MetaData';
import './ImgSquareLink.scss';

const ImgSquareLink = props => {
    const { category, cuisine, imgAlt, imgSrc, listLength, recipeId, title, url } = props;

    return (
        <div className="img-square-link">
            <DeleteLink recipeId={recipeId} />
            <Link className="img-square-link__link" to={url}>
                <img className="img-square-link__img" src={imgSrc} alt={imgAlt}/>
                <h2 className="img-square-link__name">{title}</h2>
                <MetaData category={category} cuisine={cuisine} listLength={listLength} />
            </Link>
        </div>
    )
}

export default ImgSquareLink;