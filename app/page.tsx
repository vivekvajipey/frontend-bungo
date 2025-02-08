'use client';

import { useState } from 'react';
import ScrambleText from '@/src/components/ScrambleText';
import WlddSignIn from '@/src/components/WlddSignIn';
import { motion, AnimatePresence } from 'framer-motion';
import { Tomorrow } from 'next/font/google';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

const FRAMES = [
  ["i am bungo"],
  ["what are you called?"],
  ["many have come before you", "many will come after you"],
  ["few leave richer than they came."],
  ["to play, you must pay."],
  ["but if you win,", "you will receive what others gave"],
  ["ready?"],
  ["are you a real human?", "prove it"]
];

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
      onClick={!isLastFrame ? handleFrameClick : undefined}
    >
      <AnimatePresence mode="wait">
        {!isLastFrame ? (
          <div className="relative w-full h-screen flex flex-col items-center justify-center">
            <motion.div
              key={`frame-${currentFrame}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none"
            >
              <div className="text-6xl whitespace-pre-line text-center">
                <ScrambleText>{FRAMES[currentFrame]}</ScrambleText>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="mt-8 text-base text-red-800 text-center"
              >
                click to continue
              </motion.p>
            </motion.div>
          </div>
        ) : (
          <WlddSignIn />
        )}
      </AnimatePresence>
    </main>
  );
}
