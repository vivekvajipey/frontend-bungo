'use client';

import React, { useState, useEffect } from 'react';
import ScrambleText from './ScrambleText';

type Props = {
  lines: string[];
};

const SequentialScrambleText: React.FC<Props> = ({ lines }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  // When a line finishes unscrambling
  const handleLineComplete = (line: string) => {
    setCompletedLines(prev => [...prev, line]);
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  // Reset state when lines prop changes
  useEffect(() => {
    setCurrentLineIndex(0);
    setCompletedLines([]);
  }, [lines]);

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        if (index < currentLineIndex) {
          // Show completed lines as plain text
          return (
            <div key={index} className="text-4xl">
              {line}
            </div>
          );
        } else if (index === currentLineIndex) {
          // Show current line with scramble effect
          return (
            <div key={index} className="text-4xl">
              <ScrambleText onComplete={() => handleLineComplete(line)}>
                {line}
              </ScrambleText>
            </div>
          );
        }
        // Don't show future lines yet
        return null;
      })}
    </div>
  );
};

export default SequentialScrambleText; 