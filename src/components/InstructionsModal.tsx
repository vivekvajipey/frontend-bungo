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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-full max-w-lg p-6 z-50 ${tomorrow.className}`}
          >
            <div className="relative bg-black/90 border border-red-800 rounded-lg p-6
              shadow-[0_0_15px_rgba(220,38,38,0.2)] backdrop-blur-sm">
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400
                  transition-colors duration-200"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  Bungo&apos;s Bungorium How-To
                </h2>
                
                <div className="space-y-4 text-red-400">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">1.</span>
                    <p>Every hour, a new Bungo competition session begins.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">2.</span>
                    <p>For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">3.</span>
                    <p>Per attempt, you get 5 messages to shock Bungo.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">4.</span>
                    <p>At the end of the session, the conversations with the best score share the pot.</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-red-800 
                    rounded-md shadow-sm text-sm font-medium text-red-100 bg-red-900/30 
                    hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-red-500 transition-colors duration-200"
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