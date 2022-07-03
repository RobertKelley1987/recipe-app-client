import './ImgPlaceholder.scss';

const ImgPlaceholder = ({ letter, className }) => {
    return (
        <div className={`img-placeholder ${className}`}>
            <div className="img-placeholder__letter">{letter}</div>
        </div>
    )
}

export default ImgPlaceholder;