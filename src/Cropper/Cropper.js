import React, { useState } from 'react'
import "./Cropper.css"
import Cropper from 'react-easy-crop'
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-image-crop/dist/ReactCrop.css';

import { Slider } from '@material-ui/core';


const CropperComponent = ({ pic, loading, error, setSample }) => {

    const [croppedArea, setCroppedArea] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 }); //Fro setting crop value 
    const [zoom, setZoom] = useState(1)

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
    });



    const getCroppedImg = async () => {

        const image = await createImage(pic);

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedArea.width;
        canvas.height = croppedArea.height;
        const ctx = canvas.getContext('2d');
        console.log(image)

        ctx.drawImage(
            image,
            croppedArea.x * scaleX,
            croppedArea.y * scaleY,
            croppedArea.width * scaleX,
            croppedArea.height * scaleY,
            0,
            0,
            croppedArea.width,
            croppedArea.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        setSample(base64Image)
    }

    const cropComplete = (percentage, pixels) => {
        setCroppedArea(pixels)
    }


    return (
        <div className="field">
            <button onClick={getCroppedImg}>Crop</button>

            {(loading && !error) ? (
                <div className="loader">
                    <CircularProgress size="80px" />
                </div>
            ) : (!error) ? (

                <div className="controller">
                    <div className="slider">
                        <Slider min={1} max={10} step={0.1}
                            onChange={(e, zoom) => setZoom(zoom)} />
                    </div>
                    <div className="easy-cropper">
                        <Cropper
                            crossorigin="anonymous"
                            image={pic}
                            crop={crop}
                            aspect={1}
                            zoom={zoom}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={cropComplete} />
                    </div>
                </div>

            ) : (
                        <p>Error occured. Enter correct URL.</p>
                    )}


        </div>

    )
}

export default CropperComponent
