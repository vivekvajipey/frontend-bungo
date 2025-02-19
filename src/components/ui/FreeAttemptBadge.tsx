import React from 'react';
import { translations } from '@/src/translations';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface FreeAttemptBadgeProps {
  className?: string;
  language: string;
}

export const FreeAttemptBadge: React.FC<FreeAttemptBadgeProps> = ({ className = '', language }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      <Sparkles className="w-4 h-4 text-purple-400" />
      <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {translations[language].freeAttempt.badge}
      </span>
    </motion.div>
  );
};
