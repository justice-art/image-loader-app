import React, {useCallback, useState} from 'react';
import defaultImage from '../../images/dog_default_image.jpg'
import './ImageLoader.css'

function ImageLoader() {
  const [image, setImage] = useState(defaultImage);
  const [error, setError] = useState('');
  const getImage = useCallback(async () => {
    setError(false);
    try {
      const url = 'https://dog.ceo/api/breeds/image/random';
      const response = await fetch(url);
      const data = await response.json()
      setImage(data.message)
    } catch(err) {
      console.log(err)
      setError(true);
    }
  });
  return (
    <div className="image-loader-container">
      <button onClick={getImage}> Get New! </button>
      <div className="image-loader-container__image">
        <img src={image} alt={"A dog"} />
        { error && <div style={{color: `red`}}>some error occurred, while fetching image</div> }
      </div>
    </div>
  )
}

export default ImageLoader;