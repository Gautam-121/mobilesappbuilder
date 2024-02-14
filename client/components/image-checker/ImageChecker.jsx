import React, { useState } from 'react';
import image_placeholder from "../../assets/images/image_placeholder.png";

import "../../pages/Home/Home.css";
import "../../pages/Home/SelectedTheme/SelectedTheme.css";

const ImageChecker = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  
  return (
    <div>
      <img
        src={props?.src?.images[0].url}
        alt="Check Image"
        onLoad={handleImageLoaded}
        style={{ display: 'none' }}
      />
      {imageLoaded ? (
          <img src={props?.src?.images[0].url} alt="theme image" className={props?.cardImageCss} />
          
      ) : (
          <img src={image_placeholder} alt="image not available" className={props?.cardImageCss} />
          
      )}
    </div>
  );
};

export default ImageChecker;
