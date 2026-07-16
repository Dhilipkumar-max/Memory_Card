import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, RefreshCw } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface LuckyWheelProps {
  onRewardUnlocked: (stickerId: string, stickerName: string) => void;
  onClose: () => void;
  highContrast?: boolean;
}

const REWARDS = [
  { id: 'st_sprout', name: 'Fluffy Sprout Sticker', emoji: '☁️', color: '#E0F2FE' },
  { id: 'st_bear', name: 'Teddy Bear Sticker', emoji: '🧸', color: '#FFE3EC' },
  { id: 'st_unicorn', name: 'Rainbow Unicorn Sticker', emoji: '🦄', color: '#F3E8FF' },
  { id: 'st_dino', name: 'Happy Dinosaur Sticker', emoji: '🦕', color: '#D3F9D8' },
  { id: 'st_balloon', name: 'Shiny Balloon Sticker', emoji: '🎈', color: '#FFD8A8' },
  { id: 'st_star', name: 'Twinkling Star Sticker', emoji: '⭐', color: '#FFF3BF' },
  { id: 'st_cat', name: 'Playful Kitten Sticker', emoji: '🐱', color: '#FFF0F0' },
  { id: 'st_frog', name: 'Jumping Frog Sticker', emoji: '🐸', color: '#E6FCF5' },
];

export const LuckyWheel: React.FC<LuckyWheelProps> = ({ onRewardUnlocked, onClose, highContrast = false }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<typeof REWARDS[0] | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    audioSynth.playFlip();

    // Soft, slow, sensory-friendly rotation
    const baseSpins = 4; // 4 full rotations
    const randomIndex = Math.floor(Math.random() * REWARDS.length);
    const degreesPerSection = 360 / REWARDS.length;
    // Calculate degree to center on selected sector
    const sectorAngle = randomIndex * degreesPerSection;
    const targetRotation = rotation + (baseSpins * 360) + (360 - sectorAngle);

    setRotation(targetRotation);

    setTimeout(() => {
      setSpinning(false);
      const selectedReward = REWARDS[randomIndex];
      setWinner(selectedReward);
      audioSynth.playMatchSuccess();
      onRewardUnlocked(selectedReward.id, selectedReward.name);
    }, 4500); // Calm 4.5 seconds rotation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`w-full max-w-md p-6 rounded-3xl shadow-xl text-center relative overflow-hidden ${
          highContrast ? 'bg-white border-4 border-black text-black' : 'bg-gradient-to-b from-sky-50 to-white text-slate-800 border border-sky-100'
        }`}
      >
        <h2 className={`text-2xl md:text-3xl font-bold mb-1 ${highContrast ? 'text-black' : 'text-sky-600'}`}>
          Lucky Spin Wheel
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Spin Sprout's magical wheel to win a friendly sticker!
        </p>

        {/* The Wheel */}
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
          {/* Top Indicator Arrow */}
          <div className="absolute top-[-10px] z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-xs" />

          {/* Core Wheel Area */}
          <motion.div
            className={`w-full h-full rounded-full border-4 relative overflow-hidden transition-all duration-300 ${
              highContrast ? 'border-black' : 'border-sky-200/60 shadow-lg'
            }`}
            animate={{ rotate: rotation }}
            transition={{
              duration: 4.5,
              ease: [0.15, 0.85, 0.3, 1], // Custom smooth ease-out to feel satisfying and gentle
            }}
            style={{ transformOrigin: 'center center' }}
          >
            {/* Render segments */}
            {REWARDS.map((reward, idx) => {
              const rotationDeg = idx * (360 / REWARDS.length);
              return (
                <div
                  key={reward.id}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    transform: `rotate(${rotationDeg}deg)`,
                    clipPath: 'polygon(50% 50%, 42% 0, 58% 0)',
                    backgroundColor: highContrast ? (idx % 2 === 0 ? '#FFF' : '#000') : reward.color,
                  }}
                />
              );
            })}

            {/* Emojis spaced evenly on wheel */}
            {REWARDS.map((reward, idx) => {
              const rotationDeg = idx * (360 / REWARDS.length) + (360 / REWARDS.length / 2);
              return (
                <div
                  key={`emoji-${reward.id}`}
                  className="absolute top-8 left-1/2 -ml-4 w-8 h-8 flex items-center justify-center text-2xl select-none"
                  style={{
                    transform: `rotate(${rotationDeg}deg)`,
                    transformOrigin: '50% 96px',
                  }}
                >
                  <span className={highContrast ? 'invert' : ''}>{reward.emoji}</span>
                </div>
              );
            })}

            {/* Wheel Center Hub */}
            <div className={`absolute top-1/2 left-1/2 -mt-6 -ml-6 w-12 h-12 rounded-full z-10 flex items-center justify-center border-2 ${
              highContrast ? 'bg-white border-black' : 'bg-white border-sky-300 shadow-md'
            }`}>
              <Sparkles className={`w-5 h-5 ${highContrast ? 'text-black' : 'text-sky-400'}`} />
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {winner ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 inline-flex items-center gap-3 justify-center mb-2"
            >
              <span className="text-3xl">{winner.emoji}</span>
              <div className="text-left">
                <p className="font-extrabold text-sm leading-tight text-amber-800">You earned a Sticker!</p>
                <p className="text-xs text-amber-700">{winner.name}</p>
              </div>
            </motion.div>
          ) : null}

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSpin}
              disabled={spinning}
              id="spin-button"
              className={`px-8 py-3.5 rounded-2xl font-bold transition-all transform flex items-center gap-2 text-base shadow-md active:scale-95 ${
                spinning
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : highContrast
                  ? 'bg-black text-white hover:bg-black/80 border-2 border-black'
                  : 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-105 hover:shadow-lg'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
              {spinning ? 'Magical Spinning...' : 'Spin the Wheel!'}
            </button>

            <button
              onClick={onClose}
              disabled={spinning}
              id="close-wheel-button"
              className={`px-6 py-3.5 rounded-2xl font-bold border transition-all text-base ${
                highContrast
                  ? 'border-black text-black hover:bg-slate-100'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
