import React, {useState} from 'react'
import "./Result.css"
import Tesseract from 'tesseract.js';
import DeleteIcon from '@material-ui/icons/Delete';
import TransformIcon from '@material-ui/icons/Transform';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Message from "../Message/Message"

const Result = ({ sample, setSample }) => {

    const [res, setRes] = useState('')

    const extract = () =>{
        Tesseract.recognize(
            sample,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            setRes(text)
        })
    }

    const copy = () =>{
        navigator.clipboard.writeText(res) 
    }

    return (
        <div className="result-field">
            <div className="cropped-image">
                {sample ? (
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
                    <button onClick={copy} disabled={res ? false : true}>
                        <FileCopyIcon className="icon" />
                    </button>
                    <button onClick={() => setRes('')}>
                        <DeleteIcon className="icon" />
                    </button>
                </div>
                {res ? (
                    <p>{res}</p>
                ) : (
                    <Message error={false} message="Your result will be shown here." />
                )}
            </div>
        </div>
    )
}

export default Result
