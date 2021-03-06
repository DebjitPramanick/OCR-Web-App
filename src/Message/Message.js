import React from 'react'
import "./Message.css"
import CancelIcon from '@material-ui/icons/Cancel';

const Message = ({error, message, setPopup}) => {
    return (
        <div className="box-container">
            <div className={`message-box ${error ? 'error' : ''}`}>
                {error && (
                    <CancelIcon className="icon" onClick={() => setPopup(false)}/>
                )}
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
