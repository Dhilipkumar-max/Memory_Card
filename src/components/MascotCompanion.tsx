import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mascot } from './Mascot';

interface MascotCompanionProps {
  lastEvent?: 'match' | 'mismatch' | 'victory' | 'start' | 'idle' | null;
  highContrast?: boolean;
}

export const MascotCompanion: React.FC<MascotCompanionProps> = ({ lastEvent = 'idle', highContrast = false }) => {
  const [mascotState, setMascotState] = useState<'idle' | 'wave' | 'happy' | 'dance' | 'thinking'>('idle');
  const [speechBubble, setSpeechBubble] = useState<string>('Hello! Let\'s play a fun matching game!');

  useEffect(() => {
    if (!lastEvent) return;

    switch (lastEvent) {
      case 'start':
        setMascotState('wave');
        setSpeechBubble('Tap a card to see what is hidden behind it!');
        const startTimer = setTimeout(() => setMascotState('idle'), 3000);
        return () => clearTimeout(startTimer);

      case 'match':
        setMascotState('happy');
        const matchPhrases = [
          'Wow! You found a match!',
          'Fantastic matching!',
          'You are doing super well!',
          'Excellent! Keep it up!'
        ];
        setSpeechBubble(matchPhrases[Math.floor(Math.random() * matchPhrases.length)]);
        const matchTimer = setTimeout(() => {
          setMascotState('idle');
          setSpeechBubble('Keep looking! You got this!');
        }, 3000);
        return () => clearTimeout(matchTimer);

      case 'mismatch':
        setMascotState('thinking');
        setSpeechBubble('That is okay! Let\'s remember where they are.');
        const mismatchTimer = setTimeout(() => setMascotState('idle'), 3000);
        return () => clearTimeout(mismatchTimer);

      case 'victory':
        setMascotState('dance');
        setSpeechBubble('Amazing! We completed the board together! You are awesome!');
        break;

      default:
        setMascotState('idle');
        setSpeechBubble('Tap two cards to find matching pairs.');
    }
  }, [lastEvent]);

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs max-w-sm mx-auto select-none">
      <div className="flex items-center gap-4">
        {/* Animated Sprout Companion */}
        <Mascot state={mascotState} size="sm" highContrast={highContrast} />

        {/* Speech Bubble */}
        <div className="relative bg-white p-4 rounded-2xl shadow-xs border border-sky-100 max-w-[200px]">
          {/* Bubble Arrow */}
          <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-sky-100 rotate-45" />
          
          <AnimatePresence mode="wait">
            <motion.p
              key={speechBubble}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className={`text-slate-600 font-medium leading-relaxed ${
                highContrast ? 'text-black font-semibold' : 'text-slate-600'
              }`}
              style={{ fontSize: '13px' }}
            >
              {speechBubble}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
