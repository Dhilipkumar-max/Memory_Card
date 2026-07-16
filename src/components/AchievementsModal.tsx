import React from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Star, ShieldCheck, Clock, Check, X } from 'lucide-react';
import { Achievement, GameStatistics } from '../types';

interface AchievementsModalProps {
  achievements: Achievement[];
  stats: GameStatistics;
  onClose: () => void;
  highContrast?: boolean;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  stats,
  onClose,
  highContrast = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-2xl p-6 rounded-3xl shadow-xl flex flex-col max-h-[90vh] ${
          highContrast ? 'bg-white border-4 border-black text-black' : 'bg-gradient-to-b from-sky-50 to-white text-slate-800 border border-sky-100'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <Trophy className={`w-8 h-8 ${highContrast ? 'text-black' : 'text-amber-400 stroke-amber-500'}`} />
            <div>
              <h2 className={`text-2xl font-bold leading-none ${highContrast ? 'text-black' : 'text-sky-600'}`}>
                My Badges & Medals
              </h2>
              <p className="text-slate-500 text-xs mt-1">Check out all the positive badges you have unlocked!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-achievements-header"
            className={`p-1.5 rounded-full border transition-all ${
              highContrast ? 'border-black hover:bg-slate-100 text-black' : 'border-slate-200 text-slate-400 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`p-3 rounded-2xl border text-center ${highContrast ? 'border-black' : 'bg-sky-50/40 border-sky-100'}`}>
            <Award className="w-5 h-5 mx-auto mb-1 text-sky-500" />
            <span className="block font-black text-sm md:text-base">
              {achievements.filter((a) => a.isUnlocked).length} / {achievements.length}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Badges</span>
          </div>

          <div className={`p-3 rounded-2xl border text-center ${highContrast ? 'border-black' : 'bg-amber-50/40 border-amber-100'}`}>
            <Star className="w-5 h-5 mx-auto mb-1 fill-amber-400 stroke-amber-500" />
            <span className="block font-black text-sm md:text-base">{stats.starsCollected}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Collected</span>
          </div>

          <div className={`p-3 rounded-2xl border text-center ${highContrast ? 'border-black' : 'bg-emerald-50/40 border-emerald-100'}`}>
            <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
            <span className="block font-black text-sm md:text-base">{stats.gamesWon}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Wins</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl flex items-center gap-4 border-2 transition-all duration-200 ${
                  badge.isUnlocked
                    ? highContrast ? 'border-black bg-emerald-50' : 'border-emerald-100 bg-emerald-50/30'
                    : 'border-slate-100 bg-slate-50/40 opacity-60'
                }`}
              >
                {/* Medal Icon Bubble */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-xs border ${
                  badge.isUnlocked
                    ? highContrast ? 'border-black bg-white' : 'bg-white border-emerald-200'
                    : 'bg-slate-200 border-slate-300'
                }`}>
                  <span className={!badge.isUnlocked ? 'grayscale opacity-50' : ''}>
                    {badge.icon}
                  </span>
                </div>

                {/* Info */}
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-black text-sm truncate ${highContrast ? 'text-black' : 'text-slate-700'}`}>
                      {badge.title}
                    </p>
                    {badge.isUnlocked && (
                      <span className={`flex items-center justify-center w-4 h-4 rounded-full ${
                        highContrast ? 'bg-black text-white' : 'bg-emerald-500 text-white'
                      }`}>
                        <Check className="w-2.5 h-2.5 stroke-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                  {badge.isUnlocked && badge.unlockedAt && (
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            id="close-achievements-button"
            className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm shadow-xs ${
              highContrast
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
