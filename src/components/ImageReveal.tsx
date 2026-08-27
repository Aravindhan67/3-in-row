import React from 'react';

import img1 from '../assets/images/image 1.jpeg';
import img2 from '../assets/images/image 2.jpeg';
import img3 from '../assets/images/image 3.png';
import img4 from '../assets/images/image 4.jpeg';
import logo from '../assets/images/logo.png';

// Using standard image array as requested
const images = [
  img1,
  img2,
  img3,
  img4,
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
        width: '100%',
        height: '100%',
        zIndex: 10,
        background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.12) 0%, transparent 70%)',
      }}
    >
      <img src={logo} alt="Logo" className="top-logo" />
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
        <img 
          src={images[3]} 
          alt="" 
          className="ceremonial-image"
        />
      </div>

      <div className="footer-container">
        <div className="footer-date">29 AUGUST 2026</div>
        <div className="footer-divider">
          <span className="dot"></span>
          <span className="left-line"></span>
          <span className="diamond"></span>
          <span className="right-line"></span>
          <span className="dot"></span>
        </div>
        <div className="footer-title">FOUNDATION STONE LAYING CEREMONY</div>
        <div className="footer-subtitle-bar">
          <div className="footer-subtitle">
            <span className="dot"></span>
            <span>Inaugurated by Shri C.P. Radhakrishnan &nbsp;&nbsp;&middot;&nbsp;&nbsp; Hon'ble Vice President of India</span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageReveal;
