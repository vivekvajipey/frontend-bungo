'use client';

import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';

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

type Props = {
  currentFrame: number;
  onFrameClick: () => void;
};

export default function IntroSequence({ currentFrame, onFrameClick }: Props) {
  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center"
      onClick={onFrameClick}
    >
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
  );
}

// Export FRAMES for use in other components if needed
export { FRAMES }; 