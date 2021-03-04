import React, {useState} from 'react'
import "./Result.css"
import Tesseract from 'tesseract.js';


const Result = ({ sample }) => {

    const [res, setRes] = useState('')

    Tesseract.recognize(
        sample,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        setRes(text)
    })

    return (
        <div className="result-field">
            <div className="cropped-image">
                <img src={sample} />
                {/* <div className="navbar">
                    <button>
                        Extract Text
                    </button>
                    <button>
                        Clear
                    </button>
                </div> */}
            </div>

            <div className="text">
                <p>{res}</p>
            </div>
        </div>
    )
}

export default Result
