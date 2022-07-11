import './EmptyMessage.scss';

const configClassNames = morePadding => {
    return morePadding ? 'empty-message empty-message--more-padding' : 'empty-message';
}

const EmptyMessage = ({ message, morePadding }) => {
    return <div className={configClassNames(morePadding)}>{message}</div>
}

export default EmptyMessage;