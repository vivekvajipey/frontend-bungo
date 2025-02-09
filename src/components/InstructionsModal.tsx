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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[min(calc(100%-2rem),480px)] z-50 ${tomorrow.className}`}
          >
            <div className="relative bg-zinc-950 border border-red-900/50 rounded-lg 
              shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-red-900/20">
                <h2 className="text-2xl font-bold text-red-500">
                  Bungo&apos;s Bungorium How-To
                </h2>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-red-500/70 hover:text-red-500
                    transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-4">
                <div className="space-y-4 text-red-300/90">
                  {[
                    "Every hour, a new Bungo competition session begins.",
                    "For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.",
                    "Per attempt, you get 5 messages to shock Bungo.",
                    "At the end of the session, the conversations with the best score share the pot."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3 items-baseline">
                      <span className="text-red-500/90 font-bold text-sm">{i + 1}.</span>
                      <p className="text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-zinc-950/50 border-t border-red-900/20">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-red-950/30 hover:bg-red-950/50
                    border border-red-900/50 rounded-md text-sm font-medium text-red-100
                    transition-colors duration-200"
                >
                  Let&apos;s Begin
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 