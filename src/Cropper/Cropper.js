import React, { useState } from 'react'
import "./Cropper.css"
import CancelIcon from '@material-ui/icons/Cancel';

import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import Message from '../Message/Message';


const CropperComponent = ({ pic, loading, error, setSample, setPopup }) => {

    const [image, setImage] = useState(null); //For setting crop image
    const [crop, setCrop] = useState({}); //Fro setting crop value

    function getCroppedImg(e) {
        e.preventDefault();
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        setSample(base64Image)
        setPopup(false)
    }

    const cancel = () => {
        setSample('')
        setPopup(false)
    }



    return (
        <div className="field">
            {error ? (
                <Message error={true} message="Error occured. Enter correct URL." setPopup={setPopup} />
            ) : (
                <>
                    <div className="field-header">
                        <button onClick={getCroppedImg}>Crop</button>
                        <CancelIcon className="icon" onClick={cancel} />
                    </div>
                    {
                        loading ? (
                            <div className="loader">
                                <CircularProgress size="80px" />
                            </div>
                        ) : (
                            <div className="img-container">
                                <ReactCrop src={pic} onImageLoaded={setImage}
                                    crop={crop} onChange={setCrop} crossorigin="anonymous" />
                            </div>

                        )
                    }</>
            )}
        </div>

    )
}

export default CropperComponent
