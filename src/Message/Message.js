import React from 'react'
import "./Message.css"

const Message = ({error, message}) => {
    return (
        <div className="box-container">
            <div className={`message-box ${error ? 'error' : ''}`}>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
