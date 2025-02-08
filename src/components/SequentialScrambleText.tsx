'use client';

import React, { useState, useEffect } from 'react';
import ScrambleText from './ScrambleText';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  lines: string[];
};

const SequentialScrambleText: React.FC<Props> = ({ lines }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([0]);

  const handleLineComplete = (lineIndex: number) => {
    if (lineIndex < lines.length - 1) {
      setVisibleLines(prev => [...prev, lineIndex + 1]);
      setCurrentLineIndex(lineIndex + 1);
    }
  };

  useEffect(() => {
    setCurrentLineIndex(0);
    setVisibleLines([0]);
  }, [lines]);

  return (
    <div className="text-4xl whitespace-pre-line">
      <AnimatePresence mode="wait">
        {lines.map((line, index) => (
          visibleLines.includes(index) && (
            <motion.div
              key={`line-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[4rem] flex items-center justify-center"
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