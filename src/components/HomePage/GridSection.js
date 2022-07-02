import { Link } from 'react-router-dom';
import './GridSection.scss';

const GridSection = ({ slug, title, children }) => {
    return (
        <section className="grid-section">
            <Link to={`/${slug}`}>
                <h2 className="grid-section__heading">{title}</h2>
            </Link>
            <div className="grid-section__grid">
                {children}
            </div>
            <Link className="grid-section__link" to={`/${slug}`}>view all</Link>
        </section>
    )
}

export default GridSection;