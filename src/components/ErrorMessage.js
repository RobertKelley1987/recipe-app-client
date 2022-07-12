import CloseSVG from './SVGs/CloseSVG';
import './ErrorMessage.scss';

const ErrorMessage = ({ errorMessage, setErrorMessage }) => {
    if(errorMessage) {
        return (
            <div className="error-message" onClick={() => setErrorMessage('')}>
                <CloseSVG className="error-message__svg" />
                <p className="error-message__text">{errorMessage}</p>
            </div>
        )
    }    
}

export default ErrorMessage;