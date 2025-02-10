import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
}

export const TypewriterText = ({ text }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const randomDelay = Math.random() * 30 + 20; // Random delay between 20-50ms
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, randomDelay);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <div className="relative">
      <p className="text-red-400">
        {displayedText}
        {currentIndex < text.length && (
          <span className="ml-1 animate-pulse">|</span>
        )}
      </p>
      {currentIndex < text.length && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-scan" />
      )}
    </div>
  );
};