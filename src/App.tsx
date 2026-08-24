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
