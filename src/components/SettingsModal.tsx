import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Eye, Moon, Sun, ShieldAlert, Sparkles, Languages, Check, X, Sliders } from 'lucide-react';
import { GameSettings } from '../types';
import { audioSynth } from '../utils/audio';

interface SettingsModalProps {
  settings: GameSettings;
  onSettingsChange: (updatedSettings: GameSettings) => void;
  onResetProgress: () => void;
  onClose: () => void;
  highContrast?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSettingsChange,
  onResetProgress,
  onClose,
  highContrast = false,
}) => {
  const toggleSetting = (key: keyof GameSettings) => {
    audioSynth.playClick();
    const updated = { ...settings, [key]: !settings[key] };
    onSettingsChange(updated);
  };

  const handleLanguageChange = (lang: 'en' | 'es' | 'hi' | 'fr' | 'ta') => {
    audioSynth.playClick();
    onSettingsChange({ ...settings, language: lang });
  };

  const handleSpeedChange = (speed: 'normal' | 'slow') => {
    audioSynth.playClick();
    onSettingsChange({ ...settings, animationSpeed: speed });
  };

  // Translations dictionary for settings
  const t = {
    en: {
      title: 'Game Settings',
      sub: 'Customize your memory adventure workspace',
      music: 'Calming Music',
      sound: 'Gentle Sounds',
      dark: 'Cozy Dark Mode',
      contrast: 'High Contrast Mode',
      largeText: 'Large Text Fonts',
      motion: 'Reduced Motion',
      speed: 'Animation Speed',
      voice: 'Voice Guide / TTS',
      lang: 'Language Selection',
      reset: 'Reset All Progress',
      resetWarn: 'This will reset all stars and stickers.',
      done: 'Save & Close',
    },
    es: {
      title: 'Configuración',
      sub: 'Personaliza tu espacio de aventura',
      music: 'Música Relajante',
      sound: 'Sonidos Suaves',
      dark: 'Modo Oscuro',
      contrast: 'Alto Contraste',
      largeText: 'Letras Grandes',
      motion: 'Movimiento Reducido',
      speed: 'Velocidad de Animación',
      voice: 'Guía de Voz',
      lang: 'Idioma',
      reset: 'Reiniciar Todo',
      resetWarn: 'Esto borrará todas tus estrellas.',
      done: 'Guardar y Cerrar',
    },
    hi: {
      title: 'खेल सेटिंग्स',
      sub: 'अपने साहसिक खेल को मनपसंद बनाएं',
      music: 'शांत संगीत',
      sound: 'मधुर ध्वनियां',
      dark: 'डार्क मोड',
      contrast: 'उच्च कंट्रास्ट',
      largeText: 'बड़े अक्षर',
      motion: 'धीमी हलचल (मोशन)',
      speed: 'एनिमेशन गति',
      voice: 'बोलने वाली गाइड',
      lang: 'भाषा चुनें',
      reset: 'प्रगति रीसेट करें',
      resetWarn: 'यह आपके सभी सितारों को हटा देगा।',
      done: 'सुरक्षित करें',
    },
    fr: {
      title: 'Paramètres',
      sub: 'Personnalisez votre aventure de mémoire',
      music: 'Musique Calme',
      sound: 'Sons Doux',
      dark: 'Mode Sombre',
      contrast: 'Contraste Élevé',
      largeText: 'Grands Caractères',
      motion: 'Mouvement Réduit',
      speed: 'Vitesse d\'Animation',
      voice: 'Instructions Vocales',
      lang: 'Langue',
      reset: 'Réinitialiser le Progrès',
      resetWarn: 'Cela réinitialisera toutes vos étoiles.',
      done: 'Enregistrer',
    },
    ta: {
      title: 'விளையாட்டு அமைப்புகள்',
      sub: 'உங்கள் நினைவக விளையாட்டு உலகத்தை தனிப்பயனாக்குங்கள்',
      music: 'அமைதியான இசை',
      sound: 'மென்மையான ஒலிகள்',
      dark: 'அமைதியான இரவு முறை',
      contrast: 'அதிக மாறுபட்ட நிறங்கள்',
      largeText: 'பெரிய எழுத்துக்கள்',
      motion: 'குறைக்கப்பட்ட அசைவுகள்',
      speed: 'அசைவு வேகம்',
      voice: 'குரல் வழிகாட்டி / பேச்சு',
      lang: 'மொழி தேர்வு',
      reset: 'முன்னேற்றத்தை மீட்டமைக்க',
      resetWarn: 'இது உங்களின் அனைத்து நட்சத்திரங்கள் மற்றும் பொம்மைகளை அழித்துவிடும்.',
      done: 'சேமித்து மூடவும்',
    }
  };

  const currentT = t[settings.language] || t.en;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'fr', name: 'Français' },
    { code: 'ta', name: 'தமிழ்' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-lg p-6 rounded-3xl shadow-xl flex flex-col max-h-[90vh] ${
          settings.darkMode
            ? 'bg-slate-900 border border-slate-800 text-white'
            : highContrast
            ? 'bg-white border-4 border-black text-black'
            : 'bg-gradient-to-b from-sky-50 to-white text-slate-800 border border-sky-100'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <Sliders className={`w-7 h-7 ${highContrast ? 'text-black' : 'text-sky-500'}`} />
            <div>
              <h2 className={`text-xl md:text-2xl font-black leading-none ${highContrast ? 'text-black' : 'text-sky-600'}`}>
                {currentT.title}
              </h2>
              <p className="text-slate-400 text-xs mt-1">{currentT.sub}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-settings-header"
            className={`p-1.5 rounded-full border transition-all ${
              highContrast
                ? 'border-black hover:bg-slate-100 text-black'
                : 'border-slate-200 text-slate-400 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body with scrolls */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 mb-6">
          {/* SENSORY & AUDIO CONTROLS */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${settings.darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              Sensory & Sound
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Music Switch */}
              <button
                onClick={() => toggleSetting('musicEnabled')}
                id="toggle-setting-music"
                className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.musicEnabled
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-200 bg-sky-100/30'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <span className="font-semibold text-sm">{currentT.music}</span>
                <span className="text-xl">{settings.musicEnabled ? '🎵' : '🔇'}</span>
              </button>

              {/* Sound Switch */}
              <button
                onClick={() => toggleSetting('soundEnabled')}
                id="toggle-setting-sound"
                className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.soundEnabled
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-200 bg-sky-100/30'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <span className="font-semibold text-sm">{currentT.sound}</span>
                <span className="text-xl">{settings.soundEnabled ? '🔔' : '🔕'}</span>
              </button>
            </div>
          </div>

          {/* ACCESSIBILITY CONTROLS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Accessibility Aids
            </h3>

            <div className="space-y-2">
              {/* Voice Instructions / Speak back */}
              <button
                onClick={() => toggleSetting('voiceInstructionsEnabled')}
                id="toggle-setting-voice"
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.voiceInstructionsEnabled
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-200 bg-sky-100/30'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <div className="text-left">
                  <span className="block font-semibold text-sm">{currentT.voice}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Read matched labels and greetings aloud</span>
                </div>
                <span className="text-xl">{settings.voiceInstructionsEnabled ? '🗣️' : '🤫'}</span>
              </button>

              {/* Reduced Motion Toggle */}
              <button
                onClick={() => toggleSetting('reducedMotion')}
                id="toggle-setting-reduced-motion"
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.reducedMotion
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-200 bg-sky-100/30'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <div className="text-left">
                  <span className="block font-semibold text-sm">{currentT.motion}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Slows and eases card flips and cloud motion</span>
                </div>
                <span className="text-xl">{settings.reducedMotion ? '🧘' : '⚡'}</span>
              </button>

              {/* High Contrast Toggle */}
              <button
                onClick={() => toggleSetting('highContrast')}
                id="toggle-setting-high-contrast"
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.highContrast
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-200 bg-sky-100/30'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <div className="text-left">
                  <span className="block font-semibold text-sm">{currentT.contrast}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Thick black lines and stark clear backgrounds</span>
                </div>
                <span className="text-xl">👁️</span>
              </button>

              {/* Large Text Switch */}
              <button
                onClick={() => toggleSetting('largeText')}
                id="toggle-setting-large-text"
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.largeText
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-200 bg-sky-100/30'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <div className="text-left">
                  <span className="block font-semibold text-sm">{currentT.largeText}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Increases text sizes for readability</span>
                </div>
                <span className="text-xl">🔤</span>
              </button>

              {/* Dark/Light Mode */}
              <button
                onClick={() => toggleSetting('darkMode')}
                id="toggle-setting-dark-mode"
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  settings.darkMode
                    ? 'border-indigo-400 bg-slate-800'
                    : 'border-slate-100/50 bg-slate-50/20'
                }`}
              >
                <div className="text-left">
                  <span className="block font-semibold text-sm">{currentT.dark}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Gentle indigo tints to avoid eye strains</span>
                </div>
                <span className="text-xl">{settings.darkMode ? '🌙' : '☀️'}</span>
              </button>
            </div>
          </div>

          {/* ANIMATION SPEED */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {currentT.speed}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleSpeedChange('normal')}
                id="speed-normal-button"
                className={`flex-1 py-3 rounded-2xl font-bold border-2 transition-all ${
                  settings.animationSpeed === 'normal'
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-300 bg-sky-100/40 text-sky-700'
                    : 'border-slate-100 bg-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => handleSpeedChange('slow')}
                id="speed-slow-button"
                className={`flex-1 py-3 rounded-2xl font-bold border-2 transition-all ${
                  settings.animationSpeed === 'slow'
                    ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-300 bg-sky-100/40 text-sky-700'
                    : 'border-slate-100 bg-white'
                }`}
              >
                Slow (Calming 🧘)
              </button>
            </div>
          </div>

          {/* LANGUAGE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {currentT.lang}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l.code)}
                  id={`lang-${l.code}-button`}
                  className={`py-3.5 rounded-2xl font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                    settings.language === l.code
                      ? highContrast ? 'border-black bg-emerald-100 font-extrabold' : 'border-sky-300 bg-sky-100/40 text-sky-700'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <span>{l.name}</span>
                  {settings.language === l.code && <Check className="w-4 h-4 stroke-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* DANGER AREA / RESET */}
          <div className="pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-left">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-rose-800 text-sm">{currentT.reset}</h4>
                <p className="text-rose-600 text-xs mt-0.5">{currentT.resetWarn}</p>
                <button
                  onClick={() => {
                    const confirm = window.confirm('Are you sure you want to reset your stars and toy shop?');
                    if (confirm) onResetProgress();
                  }}
                  id="reset-progress-button"
                  className="mt-3 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Yes, Reset Progress
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            id="close-settings-button"
            className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm shadow-xs ${
              highContrast
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-105'
            }`}
          >
            {currentT.done}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
