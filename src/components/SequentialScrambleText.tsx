'use client';

import React, { useState, useEffect } from 'react';
import ScrambleText from './ScrambleText';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  lines: string[];
};

const SequentialScrambleText: React.FC<Props> = ({ lines }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([0]); // Start with first line visible

  // When a line finishes unscrambling
  const handleLineComplete = (lineIndex: number) => {
    if (lineIndex < lines.length - 1) {
      // Make next line visible
      setVisibleLines(prev => [...prev, lineIndex + 1]);
      setCurrentLineIndex(lineIndex + 1);
    }
  };

  // Reset state when lines prop changes
  useEffect(() => {
    setCurrentLineIndex(0);
    setVisibleLines([0]); // Only first line visible initially
  }, [lines]);

  return (
    <div className="space-y-2 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {lines.map((line, index) => (
          visibleLines.includes(index) && (
            <motion.div
              key={`line-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-4xl min-h-[4rem] flex items-center justify-center"
            >
              <ScrambleText
                skipInitialScramble={index !== currentLineIndex}
                onComplete={() => handleLineComplete(index)}
              >
                {line}
              </ScrambleText>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SequentialScrambleText; 