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
        className="px-8 py-3 bg-red-900/20 border-2 border-red-800 text-red-500 rounded-md
          hover:bg-red-900/30 transition-colors duration-200 font-bold tracking-wider
          shadow-lg shadow-red-900/20"
      >
        PROVE HUMANITY
      </motion.button>
    </motion.div>
  );
};

export default ProveHumanityButton; 