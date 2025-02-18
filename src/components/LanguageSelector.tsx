import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' }
];

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-1 gap-4">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            className="group relative px-8 py-3 bg-red-950/30 border border-red-800/50 text-red-500 rounded
              overflow-hidden transition-all duration-300 font-bold tracking-[0.2em] text-sm hover:bg-red-900/30
              min-w-[200px] text-center"
            onClick={() => onLanguageSelect(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/20 to-red-950/0
              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            {/* Border glow effect */}
            <div className="absolute inset-0 border border-red-800/50 rounded opacity-0
              group-hover:opacity-100 transition-opacity duration-300
              animate-pulse" />
            
            <span className="relative z-10">{lang.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
} 