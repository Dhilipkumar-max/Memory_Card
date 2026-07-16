import React from 'react';
import { motion } from 'motion/react';

interface MascotProps {
  state?: 'idle' | 'wave' | 'happy' | 'dance' | 'thinking';
  size?: 'sm' | 'md' | 'lg';
  highContrast?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({ state = 'idle', size = 'md', highContrast = false }) => {
  // Dimensions based on size
  const widthClass = size === 'sm' ? 'w-24 h-24' : size === 'md' ? 'w-48 h-48' : 'w-72 h-72';

  const strokeColor = highContrast ? '#000000' : '#475569';
  const strokeWidth = highContrast ? '4' : '2.5';

  // Animation variants
  const bodyVariants = {
    idle: {
      y: [0, -6, 0],
      scaleY: [1, 1.03, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    wave: {
      y: [0, -4, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    happy: {
      scale: [1, 1.08, 0.95, 1.05, 1],
      y: [0, -15, 0, -5, 0],
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
    dance: {
      rotate: [-8, 8, -8, 8, 0],
      y: [0, -12, 0, -12, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
    thinking: {
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const leftArmVariants = {
    idle: {
      rotate: [0, -8, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    wave: {
      rotate: [-20, -60, -20, -60, -20],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
    happy: {
      rotate: [-45, -15, -45],
      transition: { duration: 0.6, repeat: Infinity },
    },
    dance: {
      rotate: [-50, 10, -50],
      transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
    },
    thinking: {
      rotate: [0, -5, 0],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  const rightArmVariants = {
    idle: {
      rotate: [0, 8, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    wave: {
      rotate: [10, 20, 10],
      transition: { duration: 3, repeat: Infinity },
    },
    happy: {
      rotate: [45, 15, 45],
      transition: { duration: 0.6, repeat: Infinity },
    },
    dance: {
      rotate: [10, -50, 10],
      transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
    },
    thinking: {
      rotate: [20, 45, 20],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const eyesVariants = {
    idle: {
      scaleY: [1, 1, 0.1, 1, 1, 1, 1, 0.1, 1],
      transition: { duration: 5, repeat: Infinity },
    },
    wave: {
      scaleY: [1, 1, 0.1, 1, 1],
      transition: { duration: 4, repeat: Infinity },
    },
    happy: {
      scaleY: 1,
    },
    dance: {
      scaleY: 1,
    },
    thinking: {
      scaleY: [1, 1, 0.1, 1],
      transition: { duration: 6, repeat: Infinity },
    },
  };

  return (
    <div className={`relative flex items-center justify-center ${widthClass}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md overflow-visible"
        aria-label="Cute mascot Sprout"
      >
        {/* Shadow underneath */}
        <ellipse
          cx="100"
          cy="180"
          rx="50"
          ry="10"
          fill={highContrast ? 'none' : 'rgba(0, 0, 0, 0.08)'}
          stroke={highContrast ? '#000' : 'none'}
          strokeWidth={highContrast ? '1' : '0'}
        />

        {/* Mascot Body Group */}
        <motion.g
          variants={bodyVariants}
          animate={state}
          initial="idle"
          style={{ originX: '100px', originY: '170px' }}
        >
          {/* Left Wing / Arm */}
          <motion.path
            d="M 50 110 C 20 110 15 80 40 90 Z"
            fill={highContrast ? '#FFF' : '#A5F3FC'}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            variants={leftArmVariants}
            animate={state}
            style={{ originX: '45px', originY: '100px' }}
          />

          {/* Right Wing / Arm */}
          <motion.path
            d="M 150 110 C 180 110 185 80 160 90 Z"
            fill={highContrast ? '#FFF' : '#A5F3FC'}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            variants={rightArmVariants}
            animate={state}
            style={{ originX: '155px', originY: '100px' }}
          />

          {/* Little Feet */}
          <ellipse
            cx="75"
            cy="172"
            rx="12"
            ry="8"
            fill={highContrast ? '#FFF' : '#FFD6A5'}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <ellipse
            cx="125"
            cy="172"
            rx="12"
            ry="8"
            fill={highContrast ? '#FFF' : '#FFD6A5'}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />

          {/* Fluffy Fluff Round Body (Marshmallow/Cloud hybrid) */}
          <path
            d="M 100 40 
               C 60 40, 45 65, 45 95 
               C 45 130, 60 170, 100 170 
               C 140 170, 155 130, 155 95 
               C 155 65, 140 40, 100 40 Z"
            fill={highContrast ? '#FFF' : '#E0F2FE'}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />

          {/* Cute Soft Rosy Cheeks */}
          {!highContrast && (
            <g id="mascot-cheeks">
              <circle cx="70" cy="115" r="8" fill="#FCA5A5" opacity="0.6" />
              <circle cx="130" cy="115" r="8" fill="#FCA5A5" opacity="0.6" />
            </g>
          )}

          {/* Eyes with blink capability */}
          <motion.g
            variants={eyesVariants}
            animate={state}
            style={{ originX: '100px', originY: '100px' }}
          >
            {state === 'happy' || state === 'dance' ? (
              // Happy squinting arch eyes ^_^
              <g>
                <path d="M 72 104 Q 80 94 88 104" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 112 104 Q 120 94 128 104" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ) : state === 'thinking' ? (
              // Curious or looking up eyes
              <g>
                <circle cx="80" cy="100" r="7" fill={strokeColor} />
                <circle cx="120" cy="100" r="7" fill={strokeColor} />
                <circle cx="82" cy="97" r="2.5" fill="#FFF" />
                <circle cx="122" cy="97" r="2.5" fill="#FFF" />
              </g>
            ) : (
              // Regular beautiful round eyes
              <g>
                <circle cx="80" cy="102" r="7" fill={strokeColor} />
                <circle cx="120" cy="102" r="7" fill={strokeColor} />
                {/* Highlights */}
                <circle cx="78" cy="99" r="2.5" fill="#FFF" />
                <circle cx="118" cy="99" r="2.5" fill="#FFF" />
                <circle cx="82" cy="104" r="1" fill="#FFF" />
                <circle cx="122" cy="104" r="1" fill="#FFF" />
              </g>
            )}
          </motion.g>

          {/* Warm, safe, little open smiling mouth */}
          {state === 'happy' || state === 'dance' ? (
            <path
              d="M 94 122 Q 100 134 106 122 Z"
              fill={highContrast ? '#000' : '#FF8B94'}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
          ) : (
            <path
              d="M 95 124 Q 100 130 105 124"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Head Antenna/Leaf Accent */}
          <path
            d="M 100 40 Q 100 20 115 15"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M 115 15 C 122 15, 125 25, 110 30 C 108 25, 110 18, 115 15 Z"
            fill={highContrast ? '#FFF' : '#86EFAC'}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </motion.g>
      </svg>
    </div>
  );
};
