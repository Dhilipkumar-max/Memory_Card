import React from 'react';

interface IllustrationProps {
  value: string;
  theme: string;
  highContrast?: boolean;
}

export const CardIllustration: React.FC<IllustrationProps> = ({ value, theme, highContrast = false }) => {
  const strokeColor = highContrast ? '#000000' : '#4A5568';
  const strokeWidth = highContrast ? '3.5' : '2.5';

  // Common cute face for animations
  const renderCuteFace = (cx: number, cy: number, eyeSpacing = 16, mouthY = 6) => {
    if (highContrast) {
      return (
        <g>
          {/* High Contrast Eyes */}
          <circle cx={cx - eyeSpacing / 2} cy={cy} r="3" fill="#000" stroke="#FFF" strokeWidth="1" />
          <circle cx={cx + eyeSpacing / 2} cy={cy} r="3" fill="#000" stroke="#FFF" strokeWidth="1" />
          {/* Mouth */}
          <path d={`M ${cx - 5} ${cy + mouthY} Q ${cx} ${cy + mouthY + 4} ${cx + 5} ${cy + mouthY}`} fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
    }

    return (
      <g id="cute-face">
        {/* Soft Pink Blushing Cheeks */}
        <circle cx={cx - eyeSpacing / 2 - 6} cy={cy + 2} r="4" fill="#FFB7B2" opacity="0.6" />
        <circle cx={cx + eyeSpacing / 2 + 6} cy={cy + 2} r="4" fill="#FFB7B2" opacity="0.6" />
        {/* Safe, happy eyes */}
        <circle cx={cx - eyeSpacing / 2} cy={cy} r="3" fill="#2D3748" />
        <circle cx={cx + eyeSpacing / 2} cy={cy} r="3" fill="#2D3748" />
        {/* White shine in eyes */}
        <circle cx={cx - eyeSpacing / 2 - 1} cy={cy - 1} r="1" fill="#FFFFFF" />
        <circle cx={cx + eyeSpacing / 2 - 1} cy={cy - 1} r="1" fill="#FFFFFF" />
        {/* Soft, happy little smile */}
        <path
          d={`M ${cx - 5} ${cy + mouthY} Q ${cx} ${cy + mouthY + 4} ${cx + 5} ${cy + mouthY}`}
          fill="none"
          stroke="#2D3748"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    );
  };

  switch (theme) {
    case 'fruits':
      switch (value) {
        case 'Apple':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Leaf */}
              <path d="M 50 25 Q 58 10 52 5 Q 42 12 50 25" fill="#C1E1C1" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Apple Body */}
              <path d="M 50 28 C 30 25 20 40 20 60 C 20 80 40 85 50 80 C 60 85 80 80 80 60 C 80 40 70 25 50 28 Z" fill="#FF9AA2" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Banana':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Stem & Banana Body */}
              <path d="M 30 15 C 55 12 85 30 80 75 C 78 82 72 80 70 75 C 75 45 55 28 35 25 Z" fill="#FFDAC1" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(62, 42, 12, 5)}
            </svg>
          );
        case 'Orange':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Leaf */}
              <path d="M 50 20 Q 58 10 52 5 Q 42 12 50 20" fill="#C1E1C1" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Orange Body */}
              <circle cx="50" cy="55" r="30" fill="#FFD1B3" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Grapes':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Leaf & Stem */}
              <path d="M 50 15 L 50 5 M 50 15 C 40 10 35 25 50 25" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Grape Bunches */}
              <circle cx="38" cy="35" r="11" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="62" cy="35" r="11" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="50" cy="45" r="11" fill="#D6A2E8" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="38" cy="55" r="11" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="62" cy="55" r="11" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="50" cy="65" r="11" fill="#D6A2E8" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="50" cy="80" r="10" fill="#B983D6" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 45, 10, 4)}
            </svg>
          );
        case 'Mango':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <path d="M 50 15 Q 55 5 52 2 Q 45 8 50 15" fill="#C1E1C1" stroke={strokeColor} strokeWidth={strokeWidth} />
              <path d="M 50 20 C 30 20 25 45 30 65 C 35 85 60 85 70 70 C 80 55 75 20 50 20 Z" fill="#FFE599" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 48)}
            </svg>
          );
        case 'Watermelon':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Outer Rind */}
              <path d="M 15 45 C 15 80 85 80 85 45 Z" fill="#B2F2BB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Inner Red */}
              <path d="M 22 45 C 22 72 78 72 78 45 Z" fill="#FFCCD5" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52, 12, 4)}
            </svg>
          );
        case 'Pineapple':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Crown Leaves */}
              <path d="M 35 30 Q 50 5 50 30 Q 65 5 50 30" fill="#B2F2BB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Body */}
              <rect x="30" y="30" width="40" height="50" rx="20" fill="#FFE066" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Scales / Lines */}
              <path d="M 35 45 L 65 45 M 32 60 L 68 60 M 35 70 L 65 70" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />
              {renderCuteFace(50, 48)}
            </svg>
          );
        case 'Strawberry':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Stem/Leaves */}
              <path d="M 35 25 Q 50 35 65 25 Q 50 15 35 25" fill="#B2F2BB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Body */}
              <path d="M 50 25 C 25 25 20 60 45 85 C 48 88 52 88 55 85 C 80 60 75 25 50 25 Z" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Seeds */}
              <circle cx="35" cy="45" r="1.5" fill="#FFF" />
              <circle cx="65" cy="45" r="1.5" fill="#FFF" />
              <circle cx="42" cy="65" r="1.5" fill="#FFF" />
              <circle cx="58" cy="65" r="1.5" fill="#FFF" />
              {renderCuteFace(50, 48)}
            </svg>
          );
        default:
          return null;
      }

    case 'animals':
      switch (value) {
        case 'Dog':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Dog ears */}
              <ellipse cx="22" cy="45" rx="8" ry="20" fill="#DDBEAA" stroke={strokeColor} strokeWidth={strokeWidth} />
              <ellipse cx="78" cy="45" rx="8" ry="20" fill="#DDBEAA" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <circle cx="50" cy="50" r="28" fill="#F4EAE1" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Nose/Snout */}
              <ellipse cx="50" cy="60" rx="10" ry="7" fill="#EADBC8" />
              <polygon points="46,57 54,57 50,62" fill="#4A5568" />
              {renderCuteFace(50, 46, 18, 14)}
            </svg>
          );
        case 'Cat':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Cat Ears */}
              <polygon points="20,40 30,15 45,30" fill="#FFC9C9" stroke={strokeColor} strokeWidth={strokeWidth} />
              <polygon points="80,40 70,15 55,30" fill="#FFC9C9" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Cat Face */}
              <circle cx="50" cy="50" r="28" fill="#FFF0F0" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Nose */}
              <polygon points="48,56 52,56 50,59" fill="#FFA8A8" />
              {/* Whiskers */}
              <line x1="20" y1="52" x2="35" y2="52" stroke={strokeColor} strokeWidth="1.5" />
              <line x1="22" y1="60" x2="35" y2="57" stroke={strokeColor} strokeWidth="1.5" />
              <line x1="80" y1="52" x2="65" y2="52" stroke={strokeColor} strokeWidth="1.5" />
              <line x1="78" y1="60" x2="65" y2="57" stroke={strokeColor} strokeWidth="1.5" />
              {renderCuteFace(50, 48, 18, 12)}
            </svg>
          );
        case 'Lion':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Mane */}
              <circle cx="50" cy="50" r="38" fill="#FFC078" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <circle cx="50" cy="50" r="26" fill="#FFE8CC" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Nose */}
              <polygon points="46,55 54,55 50,60" fill="#E8590C" />
              {renderCuteFace(50, 44, 16, 12)}
            </svg>
          );
        case 'Elephant':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Big ears */}
              <ellipse cx="20" cy="50" rx="16" ry="22" fill="#D0EBFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <ellipse cx="80" cy="50" rx="16" ry="22" fill="#D0EBFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <circle cx="50" cy="52" r="24" fill="#A5D8FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Trunk */}
              <path d="M 50 58 Q 50 78 62 76" fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              {renderCuteFace(50, 45, 16, 8)}
            </svg>
          );
        case 'Monkey':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Ears */}
              <circle cx="22" cy="50" r="11" fill="#DDBEAA" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="78" cy="50" r="11" fill="#DDBEAA" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Outer Head */}
              <circle cx="50" cy="50" r="26" fill="#B48A78" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Inner Face Shape */}
              <ellipse cx="50" cy="53" rx="20" ry="17" fill="#F4EAE1" />
              {renderCuteFace(50, 46, 14, 8)}
            </svg>
          );
        case 'Cow':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Horns */}
              <path d="M 32 30 Q 25 15 22 25 Z" fill="#E9ECEF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <path d="M 68 30 Q 75 15 78 25 Z" fill="#E9ECEF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <rect x="25" y="30" width="50" height="46" rx="20" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Cow Spot */}
              <path d="M 28 35 Q 38 38 35 48 Q 26 42 28 35" fill="#495057" />
              {/* Pink Snout */}
              <ellipse cx="50" cy="62" rx="20" ry="11" fill="#FFDEEB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 45, 16, 12)}
            </svg>
          );
        case 'Rabbit':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Long Ears */}
              <ellipse cx="38" cy="22" rx="7" ry="20" fill="#FFE3EC" stroke={strokeColor} strokeWidth={strokeWidth} />
              <ellipse cx="62" cy="22" rx="7" ry="20" fill="#FFE3EC" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <circle cx="50" cy="55" r="24" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52, 14, 6)}
            </svg>
          );
        case 'Bird':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Wings */}
              <path d="M 25 50 Q 10 38 22 35 Z" fill="#D3F9D8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Body */}
              <circle cx="50" cy="46" r="26" fill="#E8F9FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Yellow Beak */}
              <polygon points="50,46 64,46 50,54" fill="#FFD43B" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(44, 40, 10, 8)}
            </svg>
          );
        default:
          return null;
      }

    case 'shapes':
      switch (value) {
        case 'Circle':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <circle cx="50" cy="50" r="32" fill="#FFADAD" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        case 'Triangle':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <polygon points="50,18 16,80 84,80" fill="#FFD6A5" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 56)}
            </svg>
          );
        case 'Square':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <rect x="20" y="20" width="60" height="60" rx="10" fill="#FDFFB6" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        case 'Rectangle':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <rect x="15" y="25" width="70" height="50" rx="10" fill="#CAFFBF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        case 'Star':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <polygon points="50,12 63,38 92,42 71,63 76,92 50,78 24,92 29,63 8,42 37,38" fill="#9BF6FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 50)}
            </svg>
          );
        case 'Heart':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <path d="M 50 32 C 35 15 15 30 15 50 C 15 72 45 88 50 90 C 55 88 85 72 85 50 C 85 30 65 15 50 32 Z" fill="#FFC6FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 44)}
            </svg>
          );
        case 'Diamond':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <polygon points="50,15 82,50 50,85 18,50" fill="#BDB2FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        case 'Oval':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <ellipse cx="50" cy="50" rx="35" ry="24" fill="#A8DADC" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        default:
          return null;
      }

    case 'vehicles':
      switch (value) {
        case 'Car':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Car top */}
              <path d="M 30 50 Q 50 25 70 50 Z" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Car body */}
              <rect x="20" y="48" width="60" height="20" rx="6" fill="#D6A2E8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Wheels */}
              <circle cx="34" cy="68" r="10" fill="#4A5568" stroke={strokeColor} strokeWidth="2" />
              <circle cx="66" cy="68" r="10" fill="#4A5568" stroke={strokeColor} strokeWidth="2" />
              {renderCuteFace(50, 44, 12, 4)}
            </svg>
          );
        case 'Train':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Cabin */}
              <rect x="25" y="28" width="35" height="35" fill="#CAFFBF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x="60" y="42" width="22" height="21" fill="#98DBA6" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Chimney */}
              <rect x="68" y="28" width="8" height="14" fill="#FFADAD" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Wheels */}
              <circle cx="35" cy="68" r="10" fill="#4D4D4D" />
              <circle cx="55" cy="68" r="10" fill="#4D4D4D" />
              <circle cx="72" cy="68" r="10" fill="#4D4D4D" />
              {renderCuteFace(42, 42, 12, 4)}
            </svg>
          );
        case 'Airplane':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Wings */}
              <path d="M 50 20 L 50 80 L 45 50 Z" fill="#9BF6FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Fuselage */}
              <rect x="20" y="40" width="60" height="15" rx="8" fill="#E8F9FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(55, 46, 12, 3)}
            </svg>
          );
        case 'Rocket':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Fins */}
              <path d="M 25 65 L 15 80 L 35 75 Z" fill="#FFADAD" />
              <path d="M 75 65 L 85 80 L 65 75 Z" fill="#FFADAD" />
              {/* Body */}
              <rect x="32" y="25" width="36" height="50" rx="18" fill="#F0F3F4" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Nose cone */}
              <path d="M 32 38 Q 50 10 68 38 Z" fill="#FF8B94" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Fire */}
              <path d="M 40 75 Q 50 95 60 75 Z" fill="#FFD066" />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Boat':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Mast & Sail */}
              <line x1="50" y1="15" x2="50" y2="55" stroke={strokeColor} strokeWidth={strokeWidth} />
              <polygon points="50,15 80,38 50,38" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Hull */}
              <path d="M 18 52 L 82 52 L 70 74 L 30 74 Z" fill="#FFDAC1" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 60, 14, 4)}
            </svg>
          );
        case 'Bicycle':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Wheels */}
              <circle cx="28" cy="60" r="16" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="72" cy="60" r="16" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Frame */}
              <polygon points="28,60 50,60 62,38 42,38" fill="none" stroke={strokeColor} strokeWidth="3" />
              {/* Seat & Handles */}
              <line x1="42" y1="38" x2="38" y2="34" stroke={strokeColor} strokeWidth="3" />
              <line x1="62" y1="38" x2="68" y2="30" stroke={strokeColor} strokeWidth="3" />
              {renderCuteFace(50, 48, 10, 3)}
            </svg>
          );
        case 'Helicopter':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Rotor */}
              <line x1="20" y1="20" x2="80" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} />
              <line x1="50" y1="20" x2="50" y2="32" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Body */}
              <rect x="30" y="32" width="40" height="28" rx="14" fill="#BFFCC6" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Tail */}
              <rect x="14" y="40" width="20" height="8" rx="4" fill="#BFFCC6" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x="12" y="34" width="6" height="20" fill="#FFC6FF" />
              {renderCuteFace(54, 42, 12, 4)}
            </svg>
          );
        case 'Fire Truck':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Body */}
              <rect x="15" y="32" width="70" height="32" rx="4" fill="#FF8B94" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Ladder */}
              <rect x="25" y="24" width="45" height="8" fill="#E9ECEF" stroke={strokeColor} strokeWidth="2" />
              {/* Wheels */}
              <circle cx="32" cy="64" r="10" fill="#4A5568" />
              <circle cx="68" cy="64" r="10" fill="#4A5568" />
              {renderCuteFace(50, 44, 16, 5)}
            </svg>
          );
        default:
          return null;
      }

    case 'colors':
      // Styled as adorable colorful splash paint with faces
      const splashPaths: Record<string, string> = {
        Red: 'M 50 18 Q 72 15 78 35 Q 85 65 65 78 Q 35 85 22 68 Q 15 42 32 25 Q 40 38 50 18',
        Blue: 'M 48 15 Q 75 12 82 32 Q 90 60 70 75 Q 42 88 25 72 Q 10 48 25 28 Q 38 38 48 15',
        Green: 'M 52 16 Q 78 18 80 40 Q 82 68 58 80 Q 28 85 20 62 Q 15 35 35 25 Q 44 35 52 16',
        Yellow: 'M 50 20 Q 68 15 76 32 Q 85 58 68 76 Q 38 85 25 68 Q 18 45 32 28 Q 42 38 50 20',
        Orange: 'M 46 16 Q 72 12 80 32 Q 88 62 68 78 Q 35 85 22 65 Q 12 38 28 25 Q 38 38 46 16',
        Purple: 'M 52 18 Q 74 15 80 35 Q 85 65 64 78 Q 34 85 22 65 Q 14 38 30 25 Q 40 38 52 18',
        Pink: 'M 48 14 Q 75 10 82 30 Q 90 60 70 78 Q 40 85 24 68 Q 12 42 28 24 Q 38 36 48 14',
        Brown: 'M 50 18 Q 70 12 78 32 Q 86 60 66 76 Q 36 82 22 65 Q 12 38 28 25 Q 38 36 50 18'
      };
      const fillColors: Record<string, string> = {
        Red: '#FFA8A8',
        Blue: '#A5D8FF',
        Green: '#B2F2BB',
        Yellow: '#FFF3BF',
        Orange: '#FFD8A8',
        Purple: '#E8AEFF',
        Pink: '#FFDEEB',
        Brown: '#E6C2A4'
      };
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
          <path d={splashPaths[value] || splashPaths['Red']} fill={fillColors[value] || '#FFF'} stroke={strokeColor} strokeWidth={strokeWidth} />
          {renderCuteFace(50, 48)}
        </svg>
      );

    case 'numbers':
      // Adorable bubbly animated digits
      const numberColors: Record<string, string> = {
        '1': '#FFA8A8', '2': '#FFD8A8', '3': '#FFF3BF', '4': '#B2F2BB',
        '5': '#A5D8FF', '6': '#D6A2E8', '7': '#FFDEEB', '8': '#E6C2A4'
      };
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
          <text x="50" y="70" textAnchor="middle" fontSize="62" fontWeight="900" fill={numberColors[value] || '#999'} stroke={strokeColor} strokeWidth="2.5" fontFamily="sans-serif">
            {value}
          </text>
          {renderCuteFace(50, 34, 12, 4)}
        </svg>
      );

    case 'alphabet':
      // Adorable bubbly animated letters
      const letterColors: Record<string, string> = {
        'A': '#FFA8A8', 'B': '#FFD8A8', 'C': '#FFF3BF', 'D': '#B2F2BB',
        'E': '#A5D8FF', 'F': '#D6A2E8', 'G': '#FFDEEB', 'H': '#E6C2A4'
      };
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
          <text x="50" y="72" textAnchor="middle" fontSize="62" fontWeight="900" fill={letterColors[value] || '#999'} stroke={strokeColor} strokeWidth="2.5" fontFamily="sans-serif">
            {value}
          </text>
          {renderCuteFace(50, 36, 12, 4)}
        </svg>
      );

    case 'ocean':
      switch (value) {
        case 'Fish':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Back Fin */}
              <polygon points="15,35 15,65 35,50" fill="#FFC9C9" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Fish Body */}
              <ellipse cx="54" cy="50" rx="28" ry="20" fill="#E8F9FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(62, 46, 10, 4)}
            </svg>
          );
        case 'Octopus':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Tentacles */}
              <path d="M 25 65 Q 15 85 22 88 Q 30 85 30 65 M 40 65 Q 40 88 46 88 Q 52 88 52 65 M 62 65 Q 64 88 70 88 Q 76 85 68 65 M 72 60 Q 85 75 80 82 Q 72 75 66 60" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
              {/* Head */}
              <rect x="25" y="24" width="50" height="42" rx="24" fill="#FFC6FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 42)}
            </svg>
          );
        case 'Crab':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Claws */}
              <circle cx="24" cy="30" r="10" fill="#FF8B94" stroke={strokeColor} strokeWidth={strokeWidth} />
              <path d="M 24 38 L 36 50 M 76 38 L 64 50" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="76" cy="30" r="10" fill="#FF8B94" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Body */}
              <ellipse cx="50" cy="54" rx="28" ry="18" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Whale':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Tail */}
              <path d="M 30 50 Q 15 35 15 60 Z" fill="#A5D8FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Spout */}
              <path d="M 60 25 Q 60 12 55 15 M 62 25 Q 68 12 70 18" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
              {/* Body */}
              <path d="M 25 50 C 25 32 75 28 85 50 C 85 65 40 68 25 50 Z" fill="#D0EBFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(64, 44, 12, 4)}
            </svg>
          );
        case 'Starfish':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <polygon points="50,15 62,40 88,44 68,64 74,90 50,76 26,90 32,64 12,44 38,40" fill="#FFE3EC" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Seahorse':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Snout */}
              <rect x="58" y="32" width="16" height="6" rx="3" fill="#FFE599" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Head & Body */}
              <path d="M 50 20 C 35 20 40 50 42 65 C 44 80 25 78 30 85 C 45 88 54 75 52 50 Z" fill="#FFE599" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(48, 30, 8, 4)}
            </svg>
          );
        case 'Turtle':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Legs */}
              <circle cx="30" cy="62" r="8" fill="#B2F2BB" />
              <circle cx="70" cy="62" r="8" fill="#B2F2BB" />
              {/* Shell */}
              <path d="M 20 52 C 20 22 80 22 80 52 Z" fill="#C1E1C1" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Head */}
              <circle cx="84" cy="46" r="10" fill="#B2F2BB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 42, 14, 5)}
            </svg>
          );
        case 'Jellyfish':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Tentacles */}
              <path d="M 30 48 Q 28 80 34 82 Q 40 80 38 48 M 50 48 Q 48 82 52 82 Q 56 80 50 48 M 70 48 Q 66 80 72 82 Q 78 80 66 48" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
              {/* Cap */}
              <path d="M 24 48 C 24 18 76 18 76 48 Z" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 36)}
            </svg>
          );
        default:
          return null;
      }

    case 'space':
      switch (value) {
        case 'Sun':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Rays */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#FFE066" strokeWidth="6" strokeDasharray="6,8" />
              <circle cx="50" cy="50" r="28" fill="#FFE066" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        case 'Moon':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <path d="M 35 25 C 60 25 75 45 70 70 C 50 72 30 55 35 25 Z" fill="#E9ECEF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(48, 44, 10, 4)}
            </svg>
          );
        case 'Planet':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Ring */}
              <ellipse cx="50" cy="52" rx="38" ry="10" fill="none" stroke="#FFD8A8" strokeWidth="6" />
              <circle cx="50" cy="50" r="24" fill="#A5D8FF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 46)}
            </svg>
          );
        case 'Star':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <polygon points="50,15 62,40 88,44 68,64 74,90 50,76 26,90 32,64 12,44 38,40" fill="#FFF3BF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Rocket':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <path d="M 25 65 L 15 80 L 35 75 Z" fill="#FFADAD" />
              <path d="M 75 65 L 85 80 L 65 75 Z" fill="#FFADAD" />
              <rect x="32" y="25" width="36" height="50" rx="18" fill="#F0F3F4" stroke={strokeColor} strokeWidth={strokeWidth} />
              <path d="M 32 38 Q 50 10 68 38 Z" fill="#FF8B94" stroke={strokeColor} strokeWidth={strokeWidth} />
              <path d="M 40 75 Q 50 95 60 75 Z" fill="#FFD066" />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Astronaut':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <circle cx="50" cy="50" r="32" fill="#E9ECEF" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x="28" y="32" width="44" height="28" rx="8" fill="#333" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 42, 14, 5)}
            </svg>
          );
        case 'Alien':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <ellipse cx="50" cy="54" rx="28" ry="20" fill="#B2F2BB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Antenna */}
              <line x1="50" y1="34" x2="50" y2="22" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx="50" cy="20" r="6" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 52)}
            </svg>
          );
        case 'Comet':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Tail */}
              <polygon points="12,24 50,46 42,54 10,32" fill="#FFDEEB" />
              <circle cx="60" cy="60" r="22" fill="#E8AEFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(60, 56)}
            </svg>
          );
        default:
          return null;
      }

    case 'farm':
      switch (value) {
        case 'Pig':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Ears */}
              <polygon points="22,35 15,15 35,25" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              <polygon points="78,35 85,15 65,25" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <circle cx="50" cy="50" r="28" fill="#FFDEEB" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Snout */}
              <ellipse cx="50" cy="60" rx="11" ry="7" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 45, 14, 12)}
            </svg>
          );
        case 'Sheep':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Fluffy wool */}
              <circle cx="34" cy="38" r="14" fill="#FFF" />
              <circle cx="66" cy="38" r="14" fill="#FFF" />
              <circle cx="50" cy="32" r="16" fill="#FFF" />
              <circle cx="34" cy="62" r="14" fill="#FFF" />
              <circle cx="66" cy="62" r="14" fill="#FFF" />
              <circle cx="50" cy="66" r="16" fill="#FFF" />
              {/* Face */}
              <ellipse cx="50" cy="50" rx="20" ry="16" fill="#FFF0F0" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 48)}
            </svg>
          );
        case 'Chicken':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Comb */}
              <path d="M 40 24 Q 50 10 50 24 Q 60 10 60 24" fill="#FF8B94" />
              {/* Body */}
              <circle cx="50" cy="50" r="26" fill="#FFF3BF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Beak */}
              <polygon points="50,50 62,50 50,56" fill="#FFD43B" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(44, 44, 10, 8)}
            </svg>
          );
        case 'Horse':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Ears */}
              <polygon points="32,25 28,10 38,20" fill="#E6C2A4" stroke={strokeColor} strokeWidth={strokeWidth} />
              <polygon points="68,25 72,10 62,20" fill="#E6C2A4" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <path d="M 32 25 L 68 25 L 62 75 L 38 75 Z" fill="#E6C2A4" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 42, 14, 12)}
            </svg>
          );
        case 'Duck':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <circle cx="50" cy="46" r="26" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Beak */}
              <polygon points="50,46 68,46 50,56" fill="#FFA8A8" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(42, 40, 10, 8)}
            </svg>
          );
        case 'Goat':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Horns */}
              <path d="M 38 28 Q 30 12 34 24" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
              <path d="M 62 28 Q 70 12 66 24" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
              {/* Face */}
              <rect x="30" y="28" width="40" height="46" rx="14" fill="#F1F3F5" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Beard */}
              <polygon points="45,74 55,74 50,86" fill="#FFF" stroke={strokeColor} strokeWidth="2" />
              {renderCuteFace(50, 45, 14, 10)}
            </svg>
          );
        case 'Rooster':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              <path d="M 40 24 Q 50 8 50 24 Q 60 8 60 24" fill="#E8590C" />
              <circle cx="50" cy="50" r="26" fill="#FFE8CC" stroke={strokeColor} strokeWidth={strokeWidth} />
              <polygon points="50,50 64,50 50,58" fill="#FD7E14" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(44, 44, 10, 8)}
            </svg>
          );
        case 'Donkey':
          return (
            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
              {/* Long Ears */}
              <ellipse cx="32" cy="18" rx="6" ry="16" fill="#CED4DA" stroke={strokeColor} strokeWidth={strokeWidth} />
              <ellipse cx="68" cy="18" rx="6" ry="16" fill="#CED4DA" stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Face */}
              <rect x="28" y="28" width="44" height="46" rx="16" fill="#ADB5BD" stroke={strokeColor} strokeWidth={strokeWidth} />
              {renderCuteFace(50, 44, 14, 10)}
            </svg>
          );
        default:
          return null;
      }

    default:
      return null;
  }
};
