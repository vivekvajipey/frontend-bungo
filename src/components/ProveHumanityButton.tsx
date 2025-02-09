'use client';

import { motion } from 'framer-motion';

type Props = {
  onClick: () => void;
};

const ProveHumanityButton: React.FC<Props> = ({ onClick }) => {
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
        className="group relative px-8 py-3 bg-red-950/30 border border-red-800/50 text-red-500 rounded
          overflow-hidden transition-all duration-300"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/20 to-red-950/0
          translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        
        {/* Border glow effect */}
        <div className="absolute inset-0 border border-red-800/50 rounded opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          animate-pulse" />
        
        {/* Text with glow */}
        <div className="relative font-bold tracking-[0.2em] text-sm">
          <span className="relative z-10 text-red-500 group-hover:text-red-400
            transition-colors duration-300">
            PROVE HUMANITY
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default ProveHumanityButton; 