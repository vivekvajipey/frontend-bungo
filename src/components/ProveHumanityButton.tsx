'use client';

import { motion } from 'framer-motion';
import { translations } from '@/src/translations';

type Props = {
  onClick: () => void;
  language: string;
};

const ProveHumanityButton: React.FC<Props> = ({ onClick, language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-10 py-4 bg-red-950/40 border-2 border-red-800/70 text-red-400 rounded-md
          overflow-hidden transition-all duration-300 font-bold tracking-[0.2em] text-base hover:bg-red-900/40
          hover:border-red-700 hover:text-red-300 hover:scale-[1.02] transform"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/30 to-red-950/0
          translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        
        {/* Border glow effect */}
        <div className="absolute inset-0 border-2 border-red-800/50 rounded-md opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          animate-pulse" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/80 to-transparent" />
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-red-500/80 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-red-500/80 to-transparent" />
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-red-500/80 to-transparent" />
        </div>
        
        <span className="relative z-10">{translations[language].proveHumanity}</span>
      </motion.button>
    </motion.div>
  );
};

export default ProveHumanityButton; 