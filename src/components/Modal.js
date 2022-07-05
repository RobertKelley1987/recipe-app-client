import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ onDismiss, children }) => {
    return ReactDOM.createPortal(
        <div className="modal" onClick={onDismiss}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>{children}</div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;