'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { VerifyBlock } from '@/src/components/VerifyBlock';
import { MiniKit } from '@worldcoin/minikit-js';
import ScrambleText from '@/src/components/ScrambleText';
import NameInput from '@/src/components/NameInput';
import ProveHumanityButton from '@/src/components/ProveHumanityButton';
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
  const [showVerification, setShowVerification] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleEnter = () => {
    if (!MiniKit.isInstalled()) {
      window.open('https://worldcoin.org/download');
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationSuccess = async () => {
    try {
      const session = await apiService.getCurrentSession();
      if (session) {
        router.push('/game');
      }
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const handleFrameClick = () => {
    if (currentFrame < FRAMES.length - 1) {
      setCurrentFrame(prev => prev + 1);
    }
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    console.log(userName);
    handleFrameClick();
  };

  const getPostScrambleContent = (frameIndex: number) => {
    if (frameIndex === 1) {
      return <NameInput onSubmit={handleNameSubmit} />;
    }
    if (frameIndex === 7) {
      const content = Array(FRAMES[frameIndex].length).fill(null);
      content[content.length - 1] = <ProveHumanityButton onClick={handleEnter} />;
      return content;
    }
    return null;
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center bg-black text-red-600 ${tomorrow.className}`}>
      <AnimatePresence mode="wait">
        {!showVerification ? (
          <div className="relative w-full h-screen flex flex-col items-center justify-center">
            <motion.div
              key={`frame-${currentFrame}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={currentFrame === 1 || currentFrame === 7 ? "" : "pointer-events-none"}
              onClick={currentFrame !== 1 && currentFrame !== 7 ? handleFrameClick : undefined}
            >
              <div className="text-6xl whitespace-pre-line text-center">
                <ScrambleText 
                  postScrambleContent={
                    currentFrame === 7 
                      ? FRAMES[currentFrame].map((_, i) => 
                          i === FRAMES[currentFrame].length - 1 ? <ProveHumanityButton key={i} onClick={handleEnter} /> : null
                        )
                      : FRAMES[currentFrame].map((_, i) => {
                          const content = getPostScrambleContent(currentFrame);
                          return content ? <div key={i}>{content}</div> : null;
                        })
                  }
                >
                  {FRAMES[currentFrame]}
                </ScrambleText>
              </div>
              {currentFrame !== 1 && currentFrame !== 7 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="mt-8 text-base text-red-800 text-center"
                >
                  click to continue
                </motion.p>
              )}
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="verification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md px-4"
          >
            <div className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm">
              <VerifyBlock 
                onVerificationSuccess={handleVerificationSuccess}
                show={showVerification}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
