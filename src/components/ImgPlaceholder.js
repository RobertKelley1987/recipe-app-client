import './ImgPlaceholder.scss';

const configClassNames = className => {
    let classNames = 'img-placeholder';
    if(className) {
        classNames += ` ${className}`
    }
    return classNames;
}

const ImgPlaceholder = ({ letter, className }) => {
    return (
        <div className={configClassNames(className)}>
            <div className="img-placeholder__letters">rf</div>
        </div>
    )
}

export default ImgPlaceholder;