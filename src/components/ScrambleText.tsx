"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";
const MEAN_INTERVAL = 2000; // Mean time between glitches
const INTERVAL_STDDEV = 1000; // Standard deviation for the interval
const MIN_INTERVAL = 500; // Minimum time between glitches
const GLITCH_DURATION = 100; // How long each glitch lasts
const MAX_GLITCH_CHARS = 3; // Maximum number of characters to glitch at once

type Props = {
  children: string;
};

const ScrambleText: React.FC<Props> = ({ children }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const TARGET_TEXT = children;
  const [text, setText] = useState(TARGET_TEXT);

  // Split text into lines and process each line separately
  const lines = TARGET_TEXT.split('\n');
  const processedLines = lines.map(line => {
    // Add zero-width spaces between characters to help maintain spacing
    return line.split('').join('\u200B');
  });
  const PROCESSED_TARGET = processedLines.join('\n');

  // Box-Muller transform for normal distribution
  const getNormalRandom = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return normal;
  };

  // Get next interval time using normal distribution
  const getNextInterval = () => {
    const interval = MEAN_INTERVAL + (getNormalRandom() * INTERVAL_STDDEV);
    // Ensure we don't go below minimum interval
    return Math.max(MIN_INTERVAL, interval);
  };

  // Full left-to-right scramble animation
  const fullScramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = PROCESSED_TARGET.split('')
        .map((char, index) => {
          // Preserve newlines and zero-width spaces
          if (char === '\n' || char === '\u200B') return char;
          
          if (pos / CYCLES_PER_LETTER > index) {
            return TARGET_TEXT[Math.floor(index / 2)]; // Account for zero-width spaces
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  // Schedule next glitch with random interval
  const scheduleNextGlitch = () => {
    const nextInterval = getNextInterval();
    glitchTimeoutRef.current = setTimeout(() => {
      glitchScramble();
      scheduleNextGlitch();
    }, nextInterval);
  };

  // Quick random character glitch
  const glitchScramble = () => {
    const textArray = PROCESSED_TARGET.split('');
    const numCharsToGlitch = Math.floor(Math.random() * MAX_GLITCH_CHARS) + 1;
    const positions = new Set<number>();

    // Select random positions to glitch (skipping newlines and zero-width spaces)
    while (positions.size < numCharsToGlitch) {
      const pos = Math.floor(Math.random() * textArray.length);
      if (textArray[pos] !== '\n' && textArray[pos] !== '\u200B') {
        positions.add(pos);
      }
    }

    // First glitch
    const glitched = textArray.map((char, index) => {
      if (positions.has(index)) {
        const randomCharIndex = Math.floor(Math.random() * CHARS.length);
        return CHARS[randomCharIndex];
      }
      return char;
    }).join('');
    setText(glitched);

    // Revert back after a short duration
    setTimeout(() => {
      setText(PROCESSED_TARGET);
    }, GLITCH_DURATION);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(PROCESSED_TARGET);
  };

  useEffect(() => {
    setText(PROCESSED_TARGET);
    fullScramble();
    scheduleNextGlitch();

    // Cleanup
    return () => {
      stopScramble();
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="relative overflow-hidden"
    >
      <div className="relative z-10 flex items-center gap-2">
        <span className="whitespace-pre-wrap">{text}</span>
      </div>
    </motion.div>
  );
};

export default ScrambleText; 