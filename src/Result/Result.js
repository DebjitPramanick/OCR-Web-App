import React from 'react'
import "./Result.css"

const Result = ({sample}) => {
    return (
        <div className="result-field">
            <div className="cropped-image">
                <img src={sample} />
            </div>

            <div className="text">

            </div>
        </div>
    )
}

export default Result
