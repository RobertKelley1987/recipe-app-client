import './EmptyMessage.scss';

const emptyMessages = {
    favorite: 'You have not yet saved any favorites.',
    list: 'You have not yet created any recipe lists.'
}

const EmptyMessage = ({ resultType }) => {
    return <div className="empty-message">{emptyMessages[resultType]}</div>
}

export default EmptyMessage;