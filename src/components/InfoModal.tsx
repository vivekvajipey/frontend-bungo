'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Tomorrow } from 'next/font/google';
import { translations } from '@/src/translations';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export function InfoModal({ isOpen, onClose, language }: InfoModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[100]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`relative w-full max-w-md z-10 ${tomorrow.className}`}
          >
            <div className="relative bg-[var(--background)] border border-red-900/50 rounded-lg shadow-2xl
              overflow-hidden">
              {/* Animated border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/20 to-red-950/0
                translate-x-[-200%] animate-[shimmer_2s_infinite] pointer-events-none" />
              
              {/* Header with diagonal accent */}
              <div className="relative px-8 pt-8 pb-6">
                <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-red-500/50 to-transparent" />
                
                <h2 className="text-xl font-bold text-red-500 tracking-wide">
                  {translations[language].info.title}
                </h2>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-1.5 text-red-500/70 hover:text-red-500
                    transition-all duration-200 hover:rotate-90 rounded-full
                    hover:bg-red-500/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                <div className="space-y-4 text-[var(--foreground)]">
                  {translations[language].info.rules.map((rule, i) => (
                    <div key={i} className="flex gap-3 group">
                      <span className="flex-shrink-0 text-red-500 font-bold text-lg">
                        {i + 1}.
                      </span>
                      <p className="text-sm leading-relaxed opacity-90 group-hover:opacity-100
                        transition-opacity duration-300">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="relative px-8 py-6">
                <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-red-500/50 to-transparent" />
                <div className="absolute bottom-0 right-0 w-1 h-16 bg-gradient-to-t from-red-500/50 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 