import './ImgPlaceholder.scss';

const addClassNames = className => className ? `img-placeholder ${className}` : 'img-placeholder';

const ImgPlaceholder = ({ className }) => {
    return (
        <div className={addClassNames(className)}>
            <div className="img-placeholder__letters">rf</div>
        </div>
    )
}

export default ImgPlaceholder;