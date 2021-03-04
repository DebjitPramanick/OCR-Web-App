import React, { useState } from 'react'
import "./App.css"
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import CropperComponent from '../Cropper/Cropper';
import Result from '../Result/Result';

const App = () => {

    const API_KEY = "19d384e02b584b73b9bd5605bf78e7a1"



    const [query, setQuery] = useState('')
    const [img, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sample, setSample] = useState('')

    const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${query}&full_page="true"&fresh="true"&quality=100`

    const search = async(e) => {
        e.preventDefault();
        if(query){
            setLoading(true)
            const response = await fetch(URL);
            if (response.ok) {
                setLoading(false)
                setImage(response)
            }
            else {
                setLoading(false)
                setError(true)
            }
        }
        
    }

    return (
        <div className="app-container">
            <div className="header">
                <div className="input-field">
                    <label>Enter site URL: </label>

                    <div className="group">
                        <input value={query} onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter URL">
                        </input>
                        {query && (
                            <button onClick={() => setQuery('')}>
                                <ClearIcon className="icon"/>
                            </button>
                        )}
                        <button onClick={(e) => search(e)}>
                            
                            <SearchIcon className="icon" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <CropperComponent image={img.url} loading={loading}
                error={error} setSample={setSample}/>

                <Result sample={sample}/>
            </div>



        </div>
    )
}

export default App
