import { useState, useEffect } from 'react';
import CurtainOpening from './components/CurtainOpening';
import ImageReveal from './components/ImageReveal';

function App() {
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Prevent any default touch actions just to be perfectly safe against scrolling
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    document.body.addEventListener('touchmove', preventScroll, { passive: false });
    
    return () => {
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  // Force audio to play exactly when the website opens (on load)
  useEffect(() => {
    const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
    if (audio) {
      audio.play().then(() => {
        // If auto-play actually succeeds (rare), we can skip the interceptor
        setHasInteracted(true);
      }).catch(() => {
        // Silently catch browser autoplay restrictions
      });
    }
  }, []);

  const handleFirstInteraction = () => {
    setHasInteracted(true);
    const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
    if (audio) {
      audio.play().catch(() => {});
    }
  };

  const handleStartOpening = () => {
    if (!isOpening && !isComplete) {
      setIsOpening(true);
    }
  };

  const handleOpeningComplete = () => {
    setIsComplete(true);
  };

  return (
    <main 
      style={{ width: '100vw', height: '100dvh', overflow: 'hidden', position: 'relative' }}
    >
      <audio id="bg-audio" autoPlay loop preload="auto" src="/kec.mp3.mpeg" />

      {/* Invisible overlay to capture the very first click and start the audio */}
      {!hasInteracted && (
        <div 
          onClick={handleFirstInteraction}
          onTouchStart={handleFirstInteraction}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 9999,
            cursor: 'pointer'
          }}
          title="Click to start"
        />
      )}

      <ImageReveal isComplete={isComplete} />
      
      {/* Curtain is always in the DOM but animates out of view, we don't unmount it so the animation is smooth */}
      <CurtainOpening 
        isOpening={isOpening} 
        onComplete={handleOpeningComplete} 
        onStart={handleStartOpening}
      />
    </main>
  );
}

export default App;
