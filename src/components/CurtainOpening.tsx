import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import GoldenRope from './GoldenRope';
import CelebrationEffects from './CelebrationEffects';

interface CurtainOpeningProps {
  isOpening: boolean;
  onComplete: () => void;
  onStart: () => void;
}

const CurtainOpening: React.FC<CurtainOpeningProps> = ({ isOpening, onComplete, onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const ropeLeftRef = useRef<HTMLDivElement>(null);
  const ropeRightRef = useRef<HTMLDivElement>(null);
  
  const [showEffects, setShowEffects] = useState(false);

  // Handle keyboard interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isOpening) {
        e.preventDefault();
        onStart();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpening, onStart]);

  useEffect(() => {
    if (isOpening) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
          }
          onComplete();
        }
      });

      if (prefersReducedMotion) {
        tl.to([ropeLeftRef.current, ropeRightRef.current], { opacity: 0, duration: 0.1 })
          .to(curtainLeftRef.current, { x: '-100%', duration: 0.1 }, 0.1)
          .to(curtainRightRef.current, { x: '100%', duration: 0.1 }, 0.1)
          .call(() => setShowEffects(true), [], 0.1);
      } else {
        // Set transform origins for ropes
        gsap.set([ropeLeftRef.current, ropeRightRef.current], { transformOrigin: 'top center' });

        // Ropes are pulled down slightly
        tl.to([ropeLeftRef.current, ropeRightRef.current], {
          y: '+=20',
          duration: 0.2,
          ease: 'power1.inOut'
        }, 0)
        const qLeft = gsap.utils.selector(ropeLeftRef);
        const qRight = gsap.utils.selector(ropeRightRef);

        // 1. Initial Yank: The rope is pulled outwards, and the kinematic chain bends deeply
        tl.to(ropeLeftRef.current, { x: -40, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(qLeft('.rope-seg-1'), { rotation: 25, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(qLeft('.rope-seg-2'), { rotation: 10, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(qLeft('.rope-seg-3'), { rotation: 5, duration: 0.5, ease: 'power2.out' }, 0.2)
        
        .to(ropeRightRef.current, { x: 40, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(qRight('.rope-seg-1'), { rotation: -25, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(qRight('.rope-seg-2'), { rotation: -10, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(qRight('.rope-seg-3'), { rotation: -5, duration: 0.5, ease: 'power2.out' }, 0.2)
        
        // 2. Pendulum Swing: Ropes swing back and forth while the curtain is opening
        .to(qLeft('.rope-seg-1'), { rotation: 10, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.7)
        .to(qLeft('.rope-seg-2'), { rotation: 5, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.7)
        .to(qLeft('.rope-seg-3'), { rotation: 2, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.7)

        .to(qRight('.rope-seg-1'), { rotation: -10, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.7)
        .to(qRight('.rope-seg-2'), { rotation: -5, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.7)
        .to(qRight('.rope-seg-3'), { rotation: -2, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.7)
        
        // 3. Overall rope container returns to rest position relative to the moving curtain
        .to(ropeLeftRef.current, { x: 0, duration: 8.5, ease: 'power2.inOut' }, 0.7)
        .to(ropeRightRef.current, { x: 0, duration: 8.5, ease: 'power2.inOut' }, 0.7);

        // Curtains start moving AFTER the ropes pull, and move much slower
        // The skew makes the top (where the rope is attached) lead the movement, while the heavy bottom drags behind!
        tl.to(curtainLeftRef.current, {
          x: '-105%',
          skewX: -12, // Negative skew leans left: Top leads left, bottom lags right
          scaleX: 0.95,
          duration: 8.5, 
          ease: 'power2.inOut'
        }, 0.5)
        .to(curtainRightRef.current, {
          x: '105%',
          skewX: 12, // Positive skew leans right: Top leads right, bottom lags left
          scaleX: 0.95,
          duration: 8.5, 
          ease: 'power2.inOut'
        }, 0.5);

        // Curtains settle softly at the end as the bottom catches up to the top
        tl.to([curtainLeftRef.current, curtainRightRef.current], {
          skewX: 0,
          scaleX: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.4)' // A gentle cloth-like bounce as momentum settles
        }, 9.0);

        // Trigger celebration effects exactly when curtains start opening
        tl.call(() => {
          setShowEffects(true);
        }, [], 0.5); 
      }
    }
  }, [isOpening, onComplete]);

  // Base CSS for silk curtain halves
  const curtainStyleBase: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '50vw',
    height: '100vh',
    background: `
      repeating-linear-gradient(to right, 
        rgba(0,0,0,0.7) 0%, 
        rgba(255,255,255,0.15) 3vw, 
        rgba(0,0,0,0.3) 6vw, 
        rgba(255,255,255,0.05) 9vw,
        rgba(0,0,0,0.7) 12vw
      ),
      var(--curtain-mid)
    `,
    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
    zIndex: 30,
    willChange: 'transform',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: `
      linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 10%, transparent 75%, rgba(0,0,0,0.85) 100%),
      radial-gradient(circle at center 40%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.4) 100%)
    `,
    pointerEvents: 'none'
  };

  return (
    <div 
      ref={containerRef}
      onClick={onStart}
      onTouchStart={onStart}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 40,
        cursor: isOpening ? 'default' : 'pointer',
        overflow: 'hidden'
      }}
      role="button"
      tabIndex={0}
      aria-label="Open the ceremonial curtain"
    >
      {/* Left Curtain */}
      <div 
        ref={curtainLeftRef}
        className="floating-silk"
        style={{
          ...curtainStyleBase,
          left: 0,
          borderRight: '15px solid rgba(0,0,0,0.6)', // Center split seam
          transformOrigin: 'top left',
        }}
      >
        <div className="fabric-texture" />
        <div style={overlayStyle} />
        {/* Rope attached to the inner edge of the left curtain */}
        <GoldenRope ropeRef={ropeLeftRef} style={{ right: '5px' }} />
      </div>

      {/* Right Curtain */}
      <div 
        ref={curtainRightRef}
        className="floating-silk"
        style={{
          ...curtainStyleBase,
          right: 0,
          borderLeft: '15px solid rgba(0,0,0,0.6)', // Center split seam
          transformOrigin: 'top right',
        }}
      >
        <div className="fabric-texture" />
        <div style={overlayStyle} />
        {/* Rope attached to the inner edge of the right curtain */}
        <GoldenRope ropeRef={ropeRightRef} style={{ left: '5px' }} />
      </div>
      
      <CelebrationEffects isActive={showEffects} />
    </div>
  );
};

export default CurtainOpening;
