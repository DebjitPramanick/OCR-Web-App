import React, { useState } from 'react'
import "./Cropper.css"
import Cropper from 'react-easy-crop'
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn } from '@material-ui/icons';
import { Slider } from '@material-ui/core';


const CropperComponent = ({ image, loading, error, setSample }) => {

    const [pic, setPic] = useState(null); //For setting crop image

    const [croppedArea, setCroppedArea] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 }); //Fro setting crop value 
    const [zoom, setZoom] = useState(1)
    const [preview, setPreview] = useState(''); //For showing the preview to users
    // const [imageFile, setImageFile] = useState({}); //For setting the imagefile after upload

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    }


    function getCroppedImg(e) {



        e.preventDefault();
        const canvas = document.createElement('canvas');
        const scaleX = pic.naturalWidth / pic.width;
        const scaleY = pic.naturalHeight / pic.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            pic,
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
        setPreview(base64Image);
        setSample(base64Image)
    }

    const cropComplete = (percentage, pixels) => {
        console.log(pixels)
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
                       onChange={(e,zoom) => setZoom(zoom)}/> 
                    </div>
                    <div className="easy-cropper">
                        <Cropper crossorigin="anonymous" image={image} crop={crop} aspect={1}
                        zoom={zoom}
                        onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={cropComplete} />
                    </div>
                </div>

            ) : (
                <p>Error occured. Enter correct URL.</p>
            )}


        </div>

    )
}

export default CropperComponent
