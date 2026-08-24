import React from 'react';

import img1 from '../assets/images/image4.jpeg';
import img2 from '../assets/images/image4.jpeg';
import img3 from '../assets/images/image4.jpeg';

// Using standard image array as requested
const images = [
  img1,
  img2,
  img3,
];

interface ImageRevealProps {
  isComplete: boolean;
}

const ImageReveal: React.FC<ImageRevealProps> = () => {
  // Use CSS styles for responsive layout avoiding scroll
  return (
    <div 
      className="image-reveal-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
      }}
    >
      <div className="image-reveal-row">
        <img 
          src={images[0]} 
          alt="" 
          className="ceremonial-image"
        />
        <img 
          src={images[1]} 
          alt="" 
          className="ceremonial-image"
        />
        <img 
          src={images[2]} 
          alt="" 
          className="ceremonial-image"
        />
      </div>
    </div>
  );
};

export default ImageReveal;
