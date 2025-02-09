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
          {/* Backdrop with animated grain effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-[2px] z-50 
              before:content-[''] before:fixed before:inset-0 
              before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] 
              before:opacity-50 before:mix-blend-overlay"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-full max-w-lg p-6 z-50 ${tomorrow.className}`}
          >
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-800/20 rounded-lg animate-pulse" />
            
            <div className="relative bg-black/95 border border-red-800/50 rounded-lg p-6
              shadow-[0_0_30px_rgba(220,38,38,0.15),inset_0_0_30px_rgba(220,38,38,0.15)] 
              backdrop-blur-sm overflow-hidden
              before:content-[''] before:absolute before:inset-0 
              before:border before:border-red-500/20 before:rounded-lg before:animate-pulse">
              
              {/* Glitch line effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[2px] w-full bg-red-500 absolute"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: 0,
                        opacity: Math.random(),
                        animation: `glitch ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Close button with glow */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400
                  transition-colors duration-200 hover:shadow-[0_0_10px_rgba(220,38,38,0.5)]
                  rounded-full p-1"
              >
                <X size={24} className="hover:animate-pulse" />
              </button>

              {/* Content */}
              <div className="space-y-6 relative">
                <h2 className="text-3xl font-bold text-red-500 mb-4 tracking-wider
                  animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  Bungo&apos;s Bungorium How-To
                </h2>
                
                <div className="space-y-4 text-red-400/90">
                  {[
                    "Every hour, a new Bungo competition session begins.",
                    "For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.",
                    "Per attempt, you get 5 messages to shock Bungo.",
                    "At the end of the session, the conversations with the best score share the pot."
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3 group hover:bg-red-500/5 p-2 rounded-lg transition-colors duration-200">
                      <span className="text-red-500 font-bold text-xl group-hover:animate-pulse">{i + 1}.</span>
                      <p className="group-hover:text-red-300 transition-colors duration-200">{text}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full flex justify-center py-3 px-4 
                    bg-gradient-to-r from-red-900/30 to-red-800/30
                    hover:from-red-800/40 hover:to-red-700/40
                    border border-red-800/50 rounded-md shadow-sm text-base font-medium 
                    text-red-100 hover:text-red-50
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                    transition-all duration-200 relative overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-transparent before:via-red-500/10 before:to-transparent
                    before:translate-x-[-200%] hover:before:translate-x-[200%]
                    before:transition-transform before:duration-[1.5s]
                    hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]
                    group"
                >
                  <span className="relative z-10 group-hover:scale-105 transition-transform duration-200">
                    Let&apos;s Begin
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Add these keyframes to your globals.css
// @keyframes glitch {
//   0% { transform: translateX(0); }
//   20% { transform: translateX(-20px); }
//   40% { transform: translateX(20px); }
//   60% { transform: translateX(-15px); }
//   80% { transform: translateX(15px); }
//   100% { transform: translateX(0); }
// } 