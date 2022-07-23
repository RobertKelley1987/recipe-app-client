import { configClassNames } from '../util/config-classnames';
import './EmptyMessage.scss'; 

const EmptyMessage = ({ message, moreMargin }) => {
    return <div className={configClassNames('empty-message', moreMargin, 'more-margin')}>{message}</div>
}

export default EmptyMessage;