import { useState, useEffect } from 'react';
import CurtainOpening from './components/CurtainOpening';
import ImageReveal from './components/ImageReveal';

function App() {
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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
      audio.play().catch((err) => {
        console.warn("Browser blocked auto-play on load. A click is required.", err);
      });
    }
  }, []);

  // Global listener for the very first interaction to start the audio
  useEffect(() => {
    const startAudio = () => {
      const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
      if (audio) {
        audio.play().catch(() => {});
      }
      // Remove listeners once audio is started
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('keydown', startAudio);
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);
    document.addEventListener('keydown', startAudio);

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('keydown', startAudio);
    };
  }, []);

  const handleStartOpening = () => {
    if (!isOpening && !isComplete) {
      setIsOpening(true);
      const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
      if (audio) {
        audio.play().catch(() => {});
      }
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
