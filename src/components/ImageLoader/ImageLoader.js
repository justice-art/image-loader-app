import React, {useCallback, useState} from 'react'
import Loader from 'react-loader-spinner'
import {PUBLIC_URL} from '../../constants/settings'
import defaultImage from '../../images/default_image.jpg'
import './ImageLoader.css'

function ImageLoader() {
  const [image, setImage] = useState(defaultImage);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const getImage = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(PUBLIC_URL);
      const data = await response.json();
      setImage(data.message);
      setLoading(false);
    } catch(err) {
      console.log(err)
      setError(true);
      setLoading(false);
    }
  });

  return (
    <div className="image-container">
      <button onClick={getImage}> Get New! </button>
      <div className="image-container__image">
        <img src={image} alt={"A dog"} />
        { error && <div style={{color: `red`}}>some error occurred, while fetching image</div> }
      </div>
      { loading &&
        <div className="image-container__loading">
          <Loader 
            type="Rings"
            color="#00BFFF"
            height="100"	
            width="100"
          />
        </div>
      } 
    </div>
  )
}

export default ImageLoader;