import './EmptyMessage.scss'; 

const configClassNames = moreMargin => {
    return moreMargin ? 'empty-message empty-message--more-margin' : 'empty-message';
}

const EmptyMessage = ({ message, moreMargin }) => {
    return <div className={configClassNames(moreMargin)}>{message}</div>
}

export default EmptyMessage;