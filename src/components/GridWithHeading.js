import { Link } from 'react-router-dom';
import ConditionalLink from './ConditionalLink';
import './GridWithHeading.scss';

const GridWithHeading = ({ children, footerURL, headingURL, linkText, showLink, title }) => {
    return (
        <section className="grid-with-heading">
            <ConditionalLink url={headingURL}>
                <h2 className="grid-with-heading__heading">{title}</h2>
            </ConditionalLink>
            {children}
            {showLink && <Link className="grid-with-heading__link" to={footerURL}>{linkText ? linkText : 'View All'}</Link>}
        </section>
    )
}

export default GridWithHeading;