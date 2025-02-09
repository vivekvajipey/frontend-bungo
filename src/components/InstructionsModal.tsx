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
              w-full max-w-lg z-50 ${tomorrow.className}`}
          >
            {/* Outer frame with diagonal cuts */}
            <div className="absolute -inset-3 bg-gradient-to-r from-red-500/20 via-red-800/20 to-red-500/20 
              [clip-path:polygon(0_10px,10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px))]">
              <div className="absolute inset-0 animate-pulse opacity-50"></div>
            </div>

            {/* Main content container */}
            <div className="relative bg-black/95 
              [clip-path:polygon(0_10px,10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px))]
              shadow-[0_0_30px_rgba(220,38,38,0.15),inset_0_0_30px_rgba(220,38,38,0.15)] 
              overflow-hidden">
              
              {/* Diagonal header section */}
              <div className="relative h-24 bg-gradient-to-r from-red-900/40 to-red-800/40
                [clip-path:polygon(0_0,100%_0,100%_70%,0_100%)]">
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-px w-full bg-red-500 absolute"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: 0,
                        opacity: Math.random(),
                        animation: `glitch ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
                
                <h2 className="relative text-3xl font-bold text-red-500 pt-6 px-8
                  tracking-wider animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.3)]
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px
                  after:bg-gradient-to-r after:from-red-500/0 after:via-red-500/50 after:to-red-500/0">
                  Bungo&apos;s Bungorium How-To
                </h2>
              </div>

              {/* Close button with enhanced glow */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-red-500 hover:text-red-400
                  transition-all duration-200 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]
                  rounded-full p-1 z-10 hover:rotate-90 hover:scale-110"
              >
                <X size={24} className="hover:animate-pulse" />
              </button>

              {/* Content section */}
              <div className="px-8 py-6 space-y-6">
                <div className="space-y-4 text-red-400/90">
                  {[
                    "Every hour, a new Bungo competition session begins.",
                    "For $0.1 USDC, you can attempt to teach Bungo something new, surprise him, or demonstrate something about humanity he... might not expect.",
                    "Per attempt, you get 5 messages to shock Bungo.",
                    "At the end of the session, the conversations with the best score share the pot."
                  ].map((text, i) => (
                    <div key={i} 
                      className="flex items-start gap-4 group p-3 rounded 
                        hover:bg-gradient-to-r hover:from-red-500/5 hover:to-transparent
                        transition-all duration-300 transform hover:translate-x-2"
                    >
                      <span className="flex items-center justify-center w-8 h-8 text-red-500 font-bold text-xl
                        border border-red-800/30 rounded group-hover:bg-red-500/10 group-hover:border-red-500/50
                        transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                        {i + 1}
                      </span>
                      <p className="pt-1 group-hover:text-red-300 transition-colors duration-300">{text}</p>
                    </div>
                  ))}
                </div>

                {/* Enhanced button */}
                <button
                  onClick={onClose}
                  className="relative w-full flex justify-center py-3 px-4 mt-8
                    bg-gradient-to-r from-red-900/30 to-red-800/30
                    hover:from-red-800/40 hover:to-red-700/40
                    border border-red-800/50 
                    [clip-path:polygon(0_5px,5px_0,calc(100%-5px)_0,100%_5px,100%_calc(100%-5px),calc(100%-5px)_100%,5px_100%,0_calc(100%-5px))]
                    text-base font-medium text-red-100 hover:text-red-50
                    transition-all duration-300 
                    hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]
                    group overflow-hidden"
                >
                  {/* Button highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent
                    translate-x-[-200%] group-hover:translate-x-[200%]
                    transition-transform duration-[1.5s]" />
                  
                  <span className="relative z-10 group-hover:scale-105 transition-transform duration-300
                    tracking-wider">
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