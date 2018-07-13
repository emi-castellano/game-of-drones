import React from 'react';

const ToastMessage = (props) => {
    return (
        <div className={`toast-message ${props.class}`}>
            <span>{props.message}</span>
        </div>
    )
}

export default ToastMessage; 