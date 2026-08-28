import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CelebrationEffects from './CelebrationEffects';

import img1 from '../assets/images/image1.jpeg';
import img2 from '../assets/images/image2.jpeg';
import img3 from '../assets/images/image3.jpeg';
import img4 from '../assets/images/image4.jpeg';
import logo from '../assets/images/logo.png';

// Using standard image array as requested
const images = [
  img1,
  img2,
  img3,
  img4,
];

interface ImageRevealProps {
  isOpening: boolean;
}

const ImageReveal: React.FC<ImageRevealProps> = ({ isOpening }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const imageRef = useRef<HTMLImageElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpening && currentIndex === -1) {
      setCurrentIndex(0);
    }
  }, [isOpening, currentIndex]);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < 4) {
      // Fade in the image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
        );
      }

      const timer = setTimeout(() => {
        // Fade out
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 1,
            ease: 'power2.in',
            onComplete: () => {
              setCurrentIndex((prev) => prev + 1);
            }
          });
        }
      }, 13000);
      return () => clearTimeout(timer);
    } else if (currentIndex === 4) {
      // Fade in all 4 images with a premium 3D entrance
      if (rowRef.current) {
        const children = rowRef.current.children;
        
        // 1. Grand 3D Reveal
        gsap.fromTo(
          children,
          { opacity: 0, y: 80, scale: 0.7, rotationX: 25, rotationY: -15 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotationX: 0, 
            rotationY: 0, 
            duration: 2.5, 
            stagger: 0.3, 
            ease: 'expo.out' 
          }
        );

        // 2. Continuous elegant floating effect
        gsap.to(children, {
          y: '-=12',
          duration: 3.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          stagger: 0.8,
          delay: 2.5 // wait for reveal to finish
        });
      }
    }
  }, [currentIndex]);

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

      {currentIndex >= 0 && currentIndex <= 4 && (
        <CelebrationEffects key={`cascade-${currentIndex}`} isActive={true} />
      )}

      <div className="image-reveal-row" ref={rowRef}>
        {currentIndex >= 0 && currentIndex < 4 && (
          <img 
            ref={imageRef}
            src={images[currentIndex]} 
            alt={`Image ${currentIndex + 1}`} 
            className="ceremonial-image single-view"
            style={{ opacity: 0 }}
          />
        )}
        {currentIndex === 4 && images.map((img, i) => (
          <img 
            key={`all-${i}`} 
            src={img} 
            alt={`Image ${i + 1}`} 
            className="ceremonial-image"
            style={{ opacity: 0 }}
          />
        ))}
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
