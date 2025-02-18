import React from 'react';
import { translations } from '@/src/translations';
import { motion } from 'framer-motion';

interface FreeAttemptBadgeProps {
  className?: string;
  language: string;
}

export const FreeAttemptBadge: React.FC<FreeAttemptBadgeProps> = ({ className = '', language }) => {

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative group ${className}`}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-75 blur-lg group-hover:opacity-100 transition-opacity" />
      
      {/* Badge content */}
      <div className="relative px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform">
        {translations[language].freeAttempt.badge}
        
        {/* Tooltip */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap mt-2">
            {translations[language].freeAttempt.tooltip}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
