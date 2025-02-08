'use client';

import { useState } from 'react';
import IntroSequence, { FRAMES } from '@/src/components/IntroSequence';
import WlddSignIn from '@/src/components/WlddSignIn';
import { AnimatePresence } from 'framer-motion';
import { Tomorrow } from 'next/font/google';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const isLastFrame = currentFrame === FRAMES.length;

  const handleFrameClick = () => {
    if (currentFrame < FRAMES.length) {
      setCurrentFrame(prev => prev + 1);
    }
  };

  return (
    <main 
      className={`min-h-screen flex flex-col items-center justify-center bg-black text-red-600 ${tomorrow.className}`}
    >
      <AnimatePresence mode="wait">
        {!isLastFrame ? (
          <IntroSequence 
            currentFrame={currentFrame}
            onFrameClick={handleFrameClick}
          />
        ) : (
          <WlddSignIn />
        )}
      </AnimatePresence>
    </main>
  );
}
