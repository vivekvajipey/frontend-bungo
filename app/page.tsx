'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tomorrow } from 'next/font/google';
import ScrambleText from '@/src/components/ScrambleText';
import NameInput from '@/src/components/NameInput';
import ProveHumanityButton from '@/src/components/ProveHumanityButton';
import { VerifyBlock } from '@/src/components/VerifyBlock';
import { LanguageSelector } from '@/src/components/LanguageSelector';
import { translations } from '@/src/translations';
import { MiniKit } from '@worldcoin/minikit-js';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const router = useRouter();
  const [showVerification, setShowVerification] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
    // Check if user is already verified
    const credentials = localStorage.getItem('worldid_credentials');
    if (credentials) {
      // If verified, redirect to game page
      router.replace('/game');
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      setCurrentFrame(1); // Skip language selection if already set
    }
  }, [router]);

  const handleEnter = () => {
    if (!MiniKit.isInstalled()) {
      window.open('https://worldcoin.org/download');
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationSuccess = () => {
    console.log("Verification successful");
  };

  const handleFrameClick = () => {
    if (currentFrame < translations[selectedLanguage].frames.length - 1) {
      setCurrentFrame(prev => prev + 1);
    }
  };

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('user_name', name);
    handleFrameClick();
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('language', language);
    setCurrentFrame(1);
  };

  const getPostScrambleContent = (frameIndex: number) => {
    if (frameIndex === 0) {
      return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
    }
    if (frameIndex === 2) {
      return <NameInput onSubmit={handleNameSubmit} language={selectedLanguage} />;
    }
    if (frameIndex === 3) {
      const content = Array(translations[selectedLanguage].frames[frameIndex].length).fill(null);
      content[content.length - 1] = <ProveHumanityButton onClick={handleEnter} language={selectedLanguage} />;
      return content;
    }
    return null;
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center bg-black text-red-600 ${tomorrow.className}`}>
      {!showVerification ? (
        <div 
          className="relative w-full h-screen flex flex-col items-center justify-center"
          onClick={currentFrame !== 0 && currentFrame !== 2 && currentFrame !== 8 ? handleFrameClick : undefined}
        >
          <motion.div
            key={`frame-${currentFrame}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={currentFrame === 0 || currentFrame === 2 || currentFrame === 8 ? "" : "pointer-events-none"}
          >
            <div className="text-4xl whitespace-pre-line text-center">
              <ScrambleText 
                postScrambleContent={
                  currentFrame === 8 
                    ? translations[selectedLanguage].frames[currentFrame].map((_, i) => 
                        i === translations[selectedLanguage].frames[currentFrame].length - 1 
                          ? <ProveHumanityButton key={i} onClick={handleEnter} language={selectedLanguage} /> 
                          : null
                      )
                    : translations[selectedLanguage].frames[currentFrame].map((_, i) => {
                        const content = getPostScrambleContent(currentFrame);
                        return content ? <div key={i}>{content}</div> : null;
                      })
                }
              >
                {translations[selectedLanguage].frames[currentFrame]}
              </ScrambleText>
            </div>
            {currentFrame !== 0 && currentFrame !== 2 && currentFrame !== 8 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="mt-8 text-base text-red-800 text-center"
              >
                {translations[selectedLanguage].clickToContinue}
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
              language={selectedLanguage}
            />
          </div>
        </motion.div>
      )}
    </main>
  );
}
