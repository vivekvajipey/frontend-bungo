'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/src/components/ui/input';

type Props = {
    onSubmit: (name: string) => void;
  };
  
  const NameInput: React.FC<Props> = ({ onSubmit }) => {
    const [name, setName] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim()) {
        onSubmit(name.trim());
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto mt-8"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-2 border-red-500/20 text-red-500 text-lg py-3 px-4 rounded-lg 
                     placeholder:text-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500
                     transition-all duration-300"
            placeholder="Enter your name"
            autoFocus
          />
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-500/10 text-red-500 border-2 border-red-500/20 hover:bg-red-500/20 
                     hover:border-red-500/40 rounded-lg py-3 text-lg font-bold tracking-widest
                     transition-all duration-300"
          >
            CONTINUE
          </motion.button>
        </form>
      </motion.div>
    );
  };
  
  export default NameInput;