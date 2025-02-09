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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`relative w-full max-w-md z-10 ${tomorrow.className}`}
          >
            <div className="bg-[var(--background)] border border-red-900/50 rounded-lg shadow-2xl">
              {/* Header */}
              <div className="px-8 py-6">
                <h2 className="text-xl font-bold text-red-500">
                  Bungo&apos;s Bungorium How-To
                </h2>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-1 text-red-500/70 hover:text-red-500
                    transition-colors duration-200"
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
                    <div key={i} className="flex gap-3">
                      <span className="text-red-500 font-bold">{i + 1}.</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-red-950 hover:bg-red-900
                    border border-red-900/50 rounded text-sm font-medium text-red-100
                    transition-colors duration-200"
                >
                  Let&apos;s Begin
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 