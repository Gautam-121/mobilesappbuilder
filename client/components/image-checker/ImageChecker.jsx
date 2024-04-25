import React, { useState } from 'react';
import styled from 'styled-components';
import image_placeholder from "../../assets/images/image_placeholder.png";

const ImageContainer = styled.div`
  text-align: center;
`;

const StyledImage = styled.img`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`;

const ImageChecker = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <ImageContainer>
      <img
        src={props?.url}
        alt={props.alt || 'Check Image'}
        onLoad={handleImageLoaded}
        style={{ display: 'none' }}
      />
      {imageLoaded ? (
        <StyledImage
          src={props?.url}
          alt={props.alt || 'theme image'}
          width={props.width}
          height={props.height}
        />
      ) : (
        <StyledImage
          src={image_placeholder}
          alt="image not available"
          width={props.width}
          height={props.height}
        />
      )}
    </ImageContainer>
  );
};

export default ImageChecker;
