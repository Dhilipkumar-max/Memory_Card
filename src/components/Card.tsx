import React from 'react';
import { motion } from 'motion/react';
import { CardItem, CardTheme } from '../types';
import { CardIllustration } from './CardIllustrations';

interface CardProps {
  card: CardItem;
  theme: CardTheme;
  onClick: () => void;
  reducedMotion?: boolean;
  highContrast?: boolean;
  slowMotion?: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  theme,
  onClick,
  reducedMotion = false,
  highContrast = false,
  slowMotion = false,
}) => {
  const isFlipped = card.isFlipped || card.isMatched;

  // Slow motion scaling factor
  const durationMultiplier = slowMotion ? 2.5 : 1;

  // Custom border color/shading based on item matching status
  const getBorderColor = () => {
    if (highContrast) {
      if (card.isMatched) return 'border-black bg-emerald-100 border-4';
      if (card.isFlipped) return 'border-black bg-white border-4';
      return 'border-black bg-slate-200 border-4';
    }

    if (card.isMatched) {
      return 'border-emerald-300 bg-emerald-50/60 shadow-inner';
    }
    if (card.isFlipped) {
      return 'border-sky-300 bg-white shadow-md';
    }
    return 'border-indigo-100 bg-gradient-to-br from-white to-sky-50 shadow-sm';
  };

  // Card flip variants
  const flipTransition = reducedMotion
    ? { duration: 0.1 }
    : {
        type: 'spring',
        stiffness: 150 / durationMultiplier,
        damping: 18 * durationMultiplier,
      };

  const flipVariants = {
    back: {
      rotateY: 0,
    },
    front: {
      rotateY: 180,
    },
  };

  // Custom back pattern: clouds & stars
  const renderCardBack = () => {
    if (highContrast) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-white border-2 border-black">
          {/* Playful question mark */}
          <span className="text-4xl font-extrabold text-black" aria-hidden="true">?</span>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-100 overflow-hidden">
        {/* Sky Theme Pattern */}
        <div className="absolute top-2 left-2 opacity-20 text-sky-400">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M19.36 15.4A5.5 5.5 0 0 0 14 10a5.5 5.5 0 0 0-5.36 4A4.5 4.5 0 1 0 9 23h10a4.5 4.5 0 0 0 .36-7.6z" />
          </svg>
        </div>
        <div className="absolute bottom-2 right-2 opacity-20 text-indigo-300">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Large Friendly Center Graphic */}
        <div className="w-14 h-14 rounded-full bg-white/75 flex items-center justify-center border-2 border-indigo-200/40 text-indigo-400 shadow-xs">
          <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16a4 4 0 0 0-4-4M16 12a4 4 0 0 0-4-4" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-28 h-32 md:w-32 md:h-36 perspective-800 cursor-pointer select-none"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${card.isMatched ? 'Matched' : ''} Card ${card.isFlipped ? card.value : 'Face Down'}`}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div
        className={`w-full h-full relative preserve-3d rounded-2xl border-2 ${getBorderColor()} transition-colors duration-300`}
        animate={isFlipped ? 'front' : 'back'}
        variants={flipVariants}
        transition={flipTransition}
      >
        {/* FACE DOWN (BACK) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl">
          {renderCardBack()}
        </div>

        {/* FACE UP (FRONT) */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl flex flex-col items-center justify-between p-2 rotateY-180 bg-white"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Star match badge */}
          {card.isMatched && (
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs shadow-xs animate-bounce text-white font-bold">
              ⭐
            </div>
          )}

          {/* Cute illustration drawing */}
          <div className="flex-1 flex items-center justify-center w-full">
            <CardIllustration value={card.value} theme={theme} highContrast={highContrast} />
          </div>

          {/* Label under illustration for vocabulary matching */}
          <div className="w-full text-center mt-1">
            <span
              className={`block font-semibold tracking-wide text-xs md:text-sm truncate capitalize leading-none ${
                highContrast ? 'text-black font-extrabold text-base' : 'text-slate-600'
              }`}
            >
              {card.value}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
