"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 1;
const SHUFFLE_TIME = 30;
const CHARS = "!@#$%^&*():{};|,.<>/?";
const MEAN_INTERVAL = 2000;
const INTERVAL_STDDEV = 1000;
const MIN_INTERVAL = 600;
const GLITCH_DURATION = 100;
const MAX_GLITCH_CHARS = 3;

const getNormalRandom = () => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return normal;
};

const getNextInterval = () => {
  const interval = MEAN_INTERVAL + (getNormalRandom() * INTERVAL_STDDEV);
  return Math.max(MIN_INTERVAL, interval);
};

type SingleLineProps = {
  children: string;
  onComplete?: () => void;
  skipInitialScramble?: boolean;
  postScrambleContent?: React.ReactNode;
};

const SingleLineScramble: React.FC<SingleLineProps> = ({ 
  children, 
  onComplete,
  skipInitialScramble = false,
  postScrambleContent
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const TARGET_TEXT = children;
  const [text, setText] = useState(TARGET_TEXT);
  const [isScrambleComplete, setIsScrambleComplete] = useState(false);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
    setIsScrambleComplete(true);
  }, [TARGET_TEXT]);

  const glitchScramble = useCallback(() => {
    const textArray = TARGET_TEXT.split("");
    const numCharsToGlitch = Math.floor(Math.random() * MAX_GLITCH_CHARS) + 1;
    const positions = new Set<number>();

    while (positions.size < numCharsToGlitch) {
      const pos = Math.floor(Math.random() * TARGET_TEXT.length);
      positions.add(pos);
    }

    const glitched = textArray.map((char, index) => {
      if (positions.has(index)) {
        const randomCharIndex = Math.floor(Math.random() * CHARS.length);
        return CHARS[randomCharIndex];
      }
      return char;
    }).join("");
    setText(glitched);

    setTimeout(() => {
      setText(TARGET_TEXT);
    }, GLITCH_DURATION);
  }, [TARGET_TEXT]);

  const scheduleNextGlitch = useCallback(() => {
    const nextInterval = getNextInterval();
    glitchTimeoutRef.current = setTimeout(() => {
      glitchScramble();
      scheduleNextGlitch();
    }, nextInterval);
  }, [glitchScramble]);

  const fullScramble = useCallback(() => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
        onComplete?.();
      }
    }, SHUFFLE_TIME);
  }, [TARGET_TEXT, onComplete, stopScramble]);

  useEffect(() => {
    if (!skipInitialScramble) {
      fullScramble();
    } else {
      onComplete?.();
    }

    scheduleNextGlitch();

    return () => {
      stopScramble();
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [skipInitialScramble, fullScramble, onComplete, scheduleNextGlitch, stopScramble]);

  return (
    <div className="flex flex-col items-center">
      <motion.div className="relative overflow-hidden mb-4">
        <div className="relative z-10 flex items-center justify-center">
          <span className="text-6xl text-center">{text}</span>
        </div>
      </motion.div>
      {isScrambleComplete && postScrambleContent && (
        <div className="mt-4 w-full">
          {postScrambleContent}
        </div>
      )}
    </div>
  );
};

type MultiLineProps = {
  children: string[];
  postScrambleContent?: React.ReactNode[];
};

const ScrambleText: React.FC<MultiLineProps> = ({ children, postScrambleContent }) => {
  const [currentLine, setCurrentLine] = useState(0);

  const handleLineComplete = () => {
    if (currentLine < children.length - 1) {
      setCurrentLine(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {children.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index <= currentLine ? 1 : 0 }}
          className="min-h-[1.2em]"
        >
          <div className="max-w-4xl mx-auto px-4">
            <SingleLineScramble
              onComplete={index < children.length - 1 ? handleLineComplete : undefined}
              skipInitialScramble={index !== currentLine}
              postScrambleContent={postScrambleContent?.[index]}
            >
              {line}
            </SingleLineScramble>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ScrambleText; 