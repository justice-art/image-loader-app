import React, {useCallback, useState} from 'react'
import Loader from 'react-loader-spinner'
import {PUBLIC_URL} from '../../constants/settings'
import defaultImage from '../../images/default_image.jpg'
import './ImageLoader.css'

function ImageLoader() {
  const [image, setImage] = useState(defaultImage);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getImage = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(PUBLIC_URL);
      const data = await response.json();
      setImage(data.message);
    } catch(err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    }
    setLoading(false);
  });

  function getErrorMessage(err) {
    return err.message ? err.message : "Check your Internet connection!";
  }

  return (
    <div className="image-container">
      <button onClick={getImage}> Get New! </button>
      <div className="image-container__image">
        <img src={image} alt={"A dog"} />
      </div>
      { error && 
        <div className="image-container__err">
          {error}
        </div>
      }
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