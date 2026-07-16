import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, Calendar, Download, RefreshCw, Home, ChevronRight } from 'lucide-react';
import { Mascot } from './Mascot';

interface CertificateProps {
  playerName: string;
  starsEarned: number;
  accuracy: number;
  timeSeconds: number;
  difficulty: string;
  theme: string;
  onNextLevel: () => void;
  onReplay: () => void;
  onHome: () => void;
  highContrast?: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({
  playerName,
  starsEarned,
  accuracy,
  timeSeconds,
  difficulty,
  theme,
  onNextLevel,
  onReplay,
  onHome,
  highContrast = false,
}) => {
  const formattedTime = () => {
    const m = Math.floor(timeSeconds / 60);
    const s = timeSeconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s} seconds`;
  };

  const currentDateString = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl flex flex-col items-center gap-6"
      >
        {/* Certificate Frame Container */}
        <div
          id="certificate-print-area"
          className={`w-full p-6 md:p-10 rounded-3xl border-8 shadow-xl text-center relative overflow-hidden bg-white print:shadow-none print:border-black ${
            highContrast
              ? 'border-black text-black'
              : 'border-amber-200 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/30'
          }`}
        >
          {/* Decorative Corner Ribbons */}
          {!highContrast && (
            <>
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-300 to-transparent opacity-20 transform -rotate-45 -translate-x-10 -translate-y-10" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-300 to-transparent opacity-20 transform rotate-45 translate-x-10 -translate-y-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-300 to-transparent opacity-20 transform rotate-45 -translate-x-10 translate-y-10" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-300 to-transparent opacity-20 transform -rotate-45 translate-x-10 translate-y-10" />
            </>
          )}

          {/* Rainbow Arc Accent */}
          {!highContrast && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 opacity-30 select-none pointer-events-none">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <path d="M 10 30 A 40 40 0 0 1 90 30" fill="none" stroke="#FFADAD" strokeWidth="3" />
                <path d="M 18 30 A 32 32 0 0 1 82 30" fill="none" stroke="#FFD6A5" strokeWidth="3" />
                <path d="M 26 30 A 24 24 0 0 1 74 30" fill="none" stroke="#FDFFB6" strokeWidth="3" />
                <path d="M 34 30 A 16 16 0 0 1 66 30" fill="none" stroke="#CAFFBF" strokeWidth="3" />
              </svg>
            </div>
          )}

          {/* Gold Certificate Seal / Header */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="relative"
            >
              <Award className={`w-16 h-16 ${highContrast ? 'text-black' : 'text-amber-400 stroke-amber-500'}`} />
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white flex items-center justify-center font-extrabold text-amber-500 text-xs">
                ⭐
              </div>
            </motion.div>
            <h1 className={`text-xl md:text-2xl font-black tracking-wider uppercase ${highContrast ? 'text-black' : 'text-amber-600'}`}>
              Certificate of Adventure
            </h1>
          </div>

          <p className="text-slate-400 text-xs tracking-widest uppercase mb-4">Special Memory Champion Award</p>

          <p className="text-slate-600 text-sm md:text-base italic mb-3">This certificate is proudly awarded to:</p>

          <h2 className={`text-2xl md:text-4xl font-extrabold tracking-wide mb-4 underline ${highContrast ? 'text-black' : 'text-indigo-600 font-serif'}`}>
            {playerName || 'Memory Explorer'}
          </h2>

          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
            For demonstrating incredible memory, beautiful focus, and completing the <strong className="text-slate-700 capitalize">{theme}</strong> matching game on <strong className="text-slate-700 capitalize">{difficulty}</strong> mode!
          </p>

          {/* Stats Badges in Certificate */}
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mb-6">
            <div className={`p-3 rounded-2xl border text-center ${highContrast ? 'border-black' : 'bg-amber-50/50 border-amber-100'}`}>
              <Star className="w-5 h-5 mx-auto mb-1 fill-amber-400 stroke-amber-500" />
              <span className="block font-black text-sm md:text-base">{starsEarned}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Stars</span>
            </div>

            <div className={`p-3 rounded-2xl border text-center ${highContrast ? 'border-black' : 'bg-emerald-50/50 border-emerald-100'}`}>
              <div className="text-lg font-bold mx-auto mb-1 leading-none text-emerald-500">🎯</div>
              <span className="block font-black text-sm md:text-base">{accuracy}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Accuracy</span>
            </div>

            <div className={`p-3 rounded-2xl border text-center ${highContrast ? 'border-black' : 'bg-sky-50/50 border-sky-100'}`}>
              <div className="text-lg font-bold mx-auto mb-1 leading-none text-sky-500">⏱️</div>
              <span className="block font-black text-xs md:text-sm truncate mt-1">{formattedTime()}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Time</span>
            </div>
          </div>

          {/* Mascot cheer & Signatures */}
          <div className="flex items-center justify-between mt-6 px-4 md:px-8">
            <div className="text-left flex flex-col justify-end">
              <span className={`block font-bold text-sm border-b pb-0.5 ${highContrast ? 'border-black' : 'border-slate-300'}`}>
                {currentDateString}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Completion Date</span>
            </div>

            {/* Micro mascot celebration */}
            <div className="relative -my-4">
              <Mascot state="dance" size="sm" highContrast={highContrast} />
            </div>

            <div className="text-right flex flex-col justify-end">
              <span className={`block font-bold text-sm italic border-b pb-0.5 ${highContrast ? 'border-black' : 'border-slate-300'}`}>
                Sprout Companion
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Mascot Guide</span>
            </div>
          </div>

          <div className={`mt-6 text-xl md:text-2xl font-black ${highContrast ? 'text-black' : 'text-emerald-500 font-serif'}`}>
            🎉 "You Did Amazing!" 🎉
          </div>
        </div>

        {/* Action Controls for End Screen certificate */}
        <div className="flex flex-wrap gap-3 justify-center w-full print:hidden">
          <button
            onClick={onNextLevel}
            id="cert-next-button"
            className={`px-6 py-3.5 rounded-2xl font-bold transition-all transform flex items-center gap-2 text-base shadow-md active:scale-95 ${
              highContrast
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white hover:brightness-105'
            }`}
          >
            <span>Next Level</span>
            <ChevronRight className="w-5 h-5 stroke-3" />
          </button>

          <button
            onClick={onReplay}
            id="cert-replay-button"
            className={`px-5 py-3.5 rounded-2xl font-bold border transition-all text-base flex items-center gap-2 ${
              highContrast
                ? 'border-black text-black bg-white hover:bg-slate-100'
                : 'border-sky-100 bg-white text-sky-600 hover:bg-sky-50'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            onClick={handlePrint}
            id="cert-print-button"
            className={`px-5 py-3.5 rounded-2xl font-bold border transition-all text-base flex items-center gap-2 ${
              highContrast
                ? 'border-black text-black bg-white hover:bg-slate-100'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Print Award</span>
          </button>

          <button
            onClick={onHome}
            id="cert-home-button"
            className={`px-5 py-3.5 rounded-2xl font-bold border transition-all text-base flex items-center gap-2 ${
              highContrast
                ? 'border-black text-black bg-white hover:bg-slate-100'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
