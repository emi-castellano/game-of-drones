import React from 'react';
import PropTypes from 'prop-types';

const ToastMessage = (props) => {
    return (
        <div className={`toast-message ${props.class}`}>
            <span>{props.message}</span>
        </div>
    )
}

ToastMessage.propTypes = {
    message: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired
}

export default ToastMessage; 