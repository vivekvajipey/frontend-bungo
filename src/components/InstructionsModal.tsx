import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Tomorrow } from 'next/font/google';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
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
                  Bungo&apos;s Bungorium How-To
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
                  {[
                    "Every hour, a new Bungo competition session begins.",
                    "For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.",
                    "Per attempt, you get 5 messages to shock Bungo.",
                    "At the end of the session, the conversations with the best score share the pot."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 group items-start">
                      <span className="text-red-500 font-bold text-lg">
                        {i + 1}.
                      </span>
                      <p className="text-sm leading-relaxed opacity-90 group-hover:opacity-100
                        transition-opacity duration-300">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="relative px-8 py-6">
                <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-red-500/50 to-transparent" />
                <div className="absolute bottom-0 right-0 w-1 h-16 bg-gradient-to-t from-red-500/50 to-transparent" />
                
                <button
                  onClick={onClose}
                  className="group relative w-full py-3 bg-red-950/50 
                    border-2 border-red-800/70 rounded-md text-base font-bold text-red-100
                    overflow-hidden transition-all duration-300
                    hover:bg-red-900/50 hover:border-red-700"
                >
                  {/* Button highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent
                    translate-x-[-200%] group-hover:translate-x-[200%]
                    transition-transform duration-1000" />
                  
                  <span className="relative z-10 tracking-wider uppercase">
                    Let&apos;s Begin
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 