import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { PlayerProfile, CardTheme, ShopItem } from '../types';
import { audioSynth } from '../utils/audio';

interface StarShopProps {
  profile: PlayerProfile;
  onPurchaseComplete: (updatedProfile: PlayerProfile) => void;
  onClose: () => void;
  highContrast?: boolean;
}

export const StarShop: React.FC<StarShopProps> = ({ profile, onPurchaseComplete, onClose, highContrast = false }) => {
  // Let's configure shop items
  const SHOP_ITEMS: ShopItem[] = [
    // Avatars
    { id: 'av_bear', type: 'avatar', name: 'Teddy Bear Avatar', cost: 15, unlocked: profile.unlockedAvatars.includes('bear'), value: 'bear' },
    { id: 'av_fox', type: 'avatar', name: 'Clever Fox Avatar', cost: 25, unlocked: profile.unlockedAvatars.includes('fox'), value: 'fox' },
    { id: 'av_frog', type: 'avatar', name: 'Jumping Frog Avatar', cost: 20, unlocked: profile.unlockedAvatars.includes('frog'), value: 'frog' },
    // Themes
    { id: 'th_ocean', type: 'theme', name: 'Beautiful Ocean Theme', cost: 30, unlocked: profile.unlockedThemes.includes('ocean'), value: 'ocean' },
    { id: 'th_space', type: 'theme', name: 'Cosmic Space Theme', cost: 40, unlocked: profile.unlockedThemes.includes('space'), value: 'space' },
    { id: 'th_farm', type: 'theme', name: 'Cozy Farm Animals Theme', cost: 35, unlocked: profile.unlockedThemes.includes('farm'), value: 'farm' },
  ];

  const handleBuy = (item: ShopItem) => {
    if (item.unlocked) return;
    if (profile.stars < item.cost) {
      audioSynth.playClick();
      return;
    }

    audioSynth.playMatchSuccess();

    const updatedProfile: PlayerProfile = {
      ...profile,
      stars: profile.stars - item.cost,
      unlockedAvatars: item.type === 'avatar' ? [...profile.unlockedAvatars, item.value] : profile.unlockedAvatars,
      unlockedThemes: item.type === 'theme' ? [...profile.unlockedThemes, item.value as CardTheme] : profile.unlockedThemes,
    };

    onPurchaseComplete(updatedProfile);
  };

  const getEmojiForShopItem = (item: ShopItem) => {
    switch (item.value) {
      case 'bear': return '🧸';
      case 'fox': return '🦊';
      case 'frog': return '🐸';
      case 'ocean': return '🌊';
      case 'space': return '🚀';
      case 'farm': return '🐮';
      default: return '🎁';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-2xl p-6 rounded-3xl shadow-xl flex flex-col max-h-[90vh] ${
          highContrast ? 'bg-white border-4 border-black text-black' : 'bg-gradient-to-b from-sky-50 to-white text-slate-800 border border-sky-100'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className={`w-7 h-7 ${highContrast ? 'text-black' : 'text-sky-500'}`} />
            <div>
              <h2 className={`text-2xl font-bold leading-none ${highContrast ? 'text-black' : 'text-sky-600'}`}>
                Star Toy Shop
              </h2>
              <p className="text-slate-500 text-xs mt-1">Unlock adorable avatars and magical themes using your Stars!</p>
            </div>
          </div>

          {/* Player balance indicator */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-base shadow-xs ${
            highContrast ? 'border-2 border-black bg-yellow-100' : 'bg-amber-50 border border-amber-200 text-amber-700'
          }`}>
            <Star className="w-5 h-5 fill-amber-400 stroke-amber-500 animate-pulse" />
            <span>{profile.stars} Stars</span>
          </div>
        </div>

        {/* Shop Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHOP_ITEMS.map((item) => {
              const canAfford = profile.stars >= item.cost;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all duration-200 ${
                    item.unlocked
                      ? highContrast ? 'border-black bg-emerald-50' : 'border-emerald-200 bg-emerald-50/40'
                      : !canAfford
                      ? 'border-slate-100 bg-slate-50/50 opacity-75'
                      : highContrast ? 'border-black hover:bg-slate-50' : 'border-sky-100 bg-white hover:border-sky-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Item Avatar / Graphic representation */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-3xl shadow-xs border ${
                      highContrast ? 'border-black bg-white' : 'bg-sky-50/50 border-sky-100'
                    }`}>
                      <span className={highContrast && item.unlocked ? '' : ''}>
                        {getEmojiForShopItem(item)}
                      </span>
                    </div>

                    <div className="text-left">
                      <p className={`font-bold text-sm ${highContrast ? 'text-black' : 'text-slate-700'}`}>{item.name}</p>
                      <span className="text-slate-400 text-xs capitalize">{item.type}</span>
                    </div>
                  </div>

                  {/* Actions / Costs */}
                  <div>
                    {item.unlocked ? (
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        highContrast ? 'bg-black text-white' : 'bg-emerald-500 text-white shadow-xs'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-3" />
                        <span>Unlocked</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuy(item)}
                        disabled={!canAfford}
                        id={`buy-${item.id}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          !canAfford
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : highContrast
                            ? 'bg-black text-white hover:bg-black/90'
                            : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-xs hover:shadow-sm'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{item.cost}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            id="close-shop-button"
            className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm shadow-xs ${
              highContrast
                ? 'bg-black text-white hover:bg-black/80'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};
