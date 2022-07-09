import { Link } from 'react-router-dom';
import './GridWithHeading.scss';

const HeadingLink = ({ slug, children }) => {
    return slug ? <Link to={`/${slug}`}>{children}</Link> : children;
}

const GridWithHeading = ({ children, showLink, slug, title }) => {
    return (
        <section className="grid-with-heading">
            <HeadingLink slug={slug}>
                <h2 className="grid-with-heading__heading">{title}</h2>
            </HeadingLink>
            {children}
            {showLink && <Link className="grid-with-heading__link" to={`/${slug}`}>view all</Link>}
        </section>
    )
}

export default GridWithHeading;