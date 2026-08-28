import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CelebrationEffectsProps {
  isActive: boolean;
}

const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const createParticles = () => {
      const particleContainer = document.createElement('div');
      particleContainer.style.position = 'absolute';
      particleContainer.style.top = '-10%'; // Start above screen
      particleContainer.style.left = '0';
      particleContainer.style.width = '100%';
      particleContainer.style.height = '10px';
      particleContainer.style.pointerEvents = 'none';
      containerRef.current?.appendChild(particleContainer);
      
      const numParticles = 200; // Further reduced quantity for an even more subtle cascade
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        
        // Two types of particles: large gold leaf flakes, and tiny dust
        const isFlake = Math.random() > 0.6;
        
        // Scale down particle size for mobile screens
        const screenScale = Math.min(1, window.innerWidth / 1024);
        const baseSize = isFlake ? 8 + Math.random() * 12 : 2 + Math.random() * 4;
        const size = baseSize * screenScale;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${isFlake ? size * (0.5 + Math.random()) : size}px`;
        
        // Irregular shapes for flakes, circles for dust
        if (isFlake) {
          particle.style.clipPath = `polygon(
            ${Math.random() * 20}% 0%, 
            ${80 + Math.random() * 20}% ${Math.random() * 20}%, 
            100% ${80 + Math.random() * 20}%, 
            ${Math.random() * 20}% 100%
          )`;
        } else {
          particle.style.borderRadius = '50%';
          particle.style.boxShadow = `0 0 ${size * 3}px rgba(255, 215, 0, 0.8)`; // Glow for dust
        }

        particle.style.position = 'absolute';
        particle.style.left = `${Math.random() * 100}%`; // Spread across the whole top
        
        // Premium gold colors
        const colors = ['#D4AF37', '#FFD700', '#F8E8A6', '#AA6C39'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
        
        // Physics: Gentle, majestic falling with wind sway
        const duration = 4 + Math.random() * 4; // Slow, elegant fall
        
        // Spread the spawn times continuously over the exact 8.5 seconds that the curtain is opening
        const delay = Math.random() * 7.5; 
        
        // 1. Fall downwards
        gsap.to(particle, {
          y: window.innerHeight * 1.2, // Fall past the bottom of the screen
          duration: duration,
          delay: delay,
          ease: 'power1.in',
          onComplete: () => particle.remove()
        });

        // 2. Horizontal sway (wind)
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200, // Drift left or right
          duration: duration,
          delay: delay,
          ease: 'sine.inOut',
        });

        // 3. 3D Tumbling for flakes
        if (isFlake) {
          gsap.to(particle, {
            rotationX: Math.random() * 720 - 360,
            rotationY: Math.random() * 720 - 360,
            rotationZ: Math.random() * 360,
            duration: duration,
            delay: delay,
            ease: 'none'
          });
        }
        
        // 4. Fade in and out
        gsap.fromTo(particle, 
          { opacity: 0 },
          { 
            opacity: isFlake ? 0.8 : 1, 
            duration: 0.5, 
            delay: delay 
          }
        );
        gsap.to(particle, {
          opacity: 0,
          duration: 1,
          delay: delay + duration - 1, // Fade out right before removing
          ease: 'power1.in'
        });
      }
    };
    
    createParticles();
    
    const container = containerRef.current;
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isActive]);
  
  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 20, // Render behind the curtains (which are zIndex 30) but above the images
      }}
    />
  );
};

export default CelebrationEffects;
