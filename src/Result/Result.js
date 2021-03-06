import React, {useState} from 'react'
import "./Result.css"
import Tesseract from 'tesseract.js';
import DeleteIcon from '@material-ui/icons/Delete';
import TransformIcon from '@material-ui/icons/Transform';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Message from "../Message/Message"
import CircularProgress from '@material-ui/core/CircularProgress';

const Result = ({ sample, setSample, query }) => {

    const [res, setRes] = useState('')
    const [progress, setProgress] = useState(false)
    const [copied, setCopied] = useState(false)

    const extract = () =>{
        setProgress(true)
        Tesseract.recognize(
            sample,
            'eng',
        ).then(({ data: { text } }) => {
            setProgress(false)
            setRes(text)
        })
    }

    const copy = () =>{
        navigator.clipboard.writeText(res) 
        setCopied(true)
    }

    return (
        <div className="result-field">
            <div className="cropped-image">
                {(sample && query) ? (
                    <img src={sample} />
                ) : (
                        <Message error={false} message="No image selected."/>
                )}
                <div className="navbar">
                    <button onClick={extract} disabled={sample ? false : true}>
                        <TransformIcon className="icon" />
                    </button>
                    <button onClick={() => setSample('')}>
                        <DeleteIcon className="icon" />
                    </button>
                </div>
            </div>

            <div className="text">
                <div className="navbar">
                    <div className={`copied-message ${copied ? 'animate' : ''}`}>
                        Copied.
                    </div>
                    <button onClick={copy} disabled={res ? false : true}>
                        <FileCopyIcon className="icon" />
                    </button>
                    <button onClick={() => setRes('')}>
                        <DeleteIcon className="icon" />
                    </button>
                </div>
                {(res && !progress && sample && query) ? (
                    <p className="result">{res}</p>
                ) : progress ? (
                        <div className="loader">
                            <CircularProgress size="80px" />
                        </div>
                ) 
                : (
                    <Message error={false} message="Your result will be shown here." />
                )}
            </div>
        </div>
    )
}

export default Result
