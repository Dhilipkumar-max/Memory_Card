import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Users,
  Settings as SettingsIcon,
  HelpCircle,
  Trophy,
  ShoppingBag,
  Gift,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  ArrowLeft,
  Calendar,
  Shuffle,
  Lightbulb,
  Maximize2,
  LogOut,
  User,
  Activity,
  Award
} from 'lucide-react';
import { audioSynth } from './utils/audio';
import { Card } from './components/Card';
import { Mascot } from './components/Mascot';
import { MascotCompanion } from './components/MascotCompanion';
import { SettingsModal } from './components/SettingsModal';
import { AchievementsModal } from './components/AchievementsModal';
import { LuckyWheel } from './components/LuckyWheel';
import { StarShop } from './components/StarShop';
import { Certificate } from './components/Certificate';
import { Difficulty, CardTheme, CardItem, PlayerProfile, GameSettings, GameStatistics, Achievement } from './types';

// Theme-specific vocabulary lists (8 cards in each)
const THEME_DATA: Record<CardTheme, string[]> = {
  animals: ['Dog', 'Cat', 'Lion', 'Elephant', 'Monkey', 'Cow', 'Rabbit', 'Bird'],
  fruits: ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Watermelon', 'Pineapple', 'Strawberry'],
  shapes: ['Circle', 'Triangle', 'Square', 'Rectangle', 'Star', 'Heart', 'Diamond', 'Oval'],
  vehicles: ['Car', 'Train', 'Airplane', 'Rocket', 'Boat', 'Bicycle', 'Helicopter', 'Fire Truck'],
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown'],
  numbers: ['1', '2', '3', '4', '5', '6', '7', '8'],
  alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ocean: ['Fish', 'Octopus', 'Crab', 'Whale', 'Starfish', 'Seahorse', 'Turtle', 'Jellyfish'],
  space: ['Sun', 'Moon', 'Planet', 'Star', 'Rocket', 'Astronaut', 'Alien', 'Comet'],
  farm: ['Pig', 'Sheep', 'Chicken', 'Horse', 'Duck', 'Goat', 'Rooster', 'Donkey'],
};

// Default achievements schema
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_match', title: 'First Match', description: 'Found your very first pair of matched cards!', isUnlocked: false, icon: '🌟' },
  { id: 'memory_master', title: 'Memory Master', description: 'Complete a matching game without any mistakes!', isUnlocked: false, icon: '🧠' },
  { id: 'perfect_game', title: 'Perfect Game', description: 'Finished a game with 100% accuracy!', isUnlocked: false, icon: '🏆' },
  { id: 'animal_expert', title: 'Animal Expert', description: 'Matched all Animal cards successfully!', isUnlocked: false, icon: '🦁' },
  { id: 'fruit_champion', title: 'Fruit Champion', description: 'Matched all Fruit cards successfully!', isUnlocked: false, icon: '🍓' },
  { id: 'fast_thinker', title: 'Fast Thinker', description: 'Completed a matching board in under 45 seconds!', isUnlocked: false, icon: '⚡' },
  { id: 'shape_genius', title: 'Shape Genius', description: 'Completed all Shape matches successfully!', isUnlocked: false, icon: '🔺' },
  { id: 'matches_100', title: '100 Matches', description: 'Successfully found 100 matching card pairs!', isUnlocked: false, icon: '🏅' },
  { id: 'matches_500', title: '500 Matches', description: 'Found an amazing 500 matching card pairs!', isUnlocked: false, icon: '👑' },
];

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Aarav',
  avatar: 'bunny',
  stars: 10,
  coins: 50,
  xp: 100,
  unlockedThemes: ['animals', 'fruits', 'shapes', 'vehicles', 'colors', 'numbers', 'alphabet'],
  unlockedAvatars: ['bunny', 'bear', 'kitten'],
  stickers: [],
};

const DEFAULT_SETTINGS: GameSettings = {
  musicEnabled: true,
  soundEnabled: true,
  darkMode: false,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  animationSpeed: 'normal',
  voiceInstructionsEnabled: true,
  language: 'en',
};

const DEFAULT_STATS: GameStatistics = {
  gamesPlayed: 0,
  gamesWon: 0,
  matchesFound: 0,
  totalFlips: 0,
  correctFlips: 0,
  timePlayed: 0,
  currentStreak: 0,
  longestStreak: 0,
  starsCollected: 0,
};

// Multilingual vocabulary dictionary to support proper immersive spoken translations
const VOCAB_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Animals
  'Dog': { es: 'Perro', fr: 'Chien', hi: 'कुत्ता', ta: 'நாய்' },
  'Cat': { es: 'Gato', fr: 'Chat', hi: 'बिल्ली', ta: 'பூனை' },
  'Lion': { es: 'León', fr: 'Lion', hi: 'शेर', ta: 'சிங்கம்' },
  'Elephant': { es: 'Elefante', fr: 'Éléphant', hi: 'हाथी', ta: 'யானை' },
  'Monkey': { es: 'Mono', fr: 'Singe', hi: 'बंदर', ta: 'குரங்கு' },
  'Cow': { es: 'Vaca', fr: 'Vache', hi: 'गाय', ta: 'பசு' },
  'Rabbit': { es: 'Conejo', fr: 'Lapin', hi: 'खरगोश', ta: 'முயல்' },
  'Bird': { es: 'Pájaro', fr: 'Oiseau', hi: 'चिड़िया', ta: 'பறவை' },

  // Fruits
  'Apple': { es: 'Manzana', fr: 'Pomme', hi: 'सेब', ta: 'ஆப்பிள்' },
  'Banana': { es: 'Plátano', fr: 'Banane', hi: 'केला', ta: 'வாழைப்பழம்' },
  'Orange': { es: 'Naranja', fr: 'Orange', hi: 'संतरा', ta: 'ஆரஞ்சு' },
  'Grapes': { es: 'Uvas', fr: 'Raisin', hi: 'अंगूर', ta: 'திராட்சை' },
  'Mango': { es: 'Mango', fr: 'Mangue', hi: 'आम', ta: 'மாம்பழம்' },
  'Watermelon': { es: 'Sandía', fr: 'Pastèque', hi: 'तरबूज', ta: 'தர்பூசணி' },
  'Pineapple': { es: 'Piña', fr: 'Ananas', hi: 'அनानास', ta: 'அன்னாசிப்பழம்' },
  'Strawberry': { es: 'Fresa', fr: 'Fraise', hi: 'स्ट्रॉबेरी', ta: 'ஸ்ட்ராபெர்ரி' },

  // Shapes
  'Circle': { es: 'Círculo', fr: 'Cercle', hi: 'वृत्त', ta: 'வட்டம்' },
  'Triangle': { es: 'Triángulo', fr: 'Triangle', hi: 'त्रिकोण', ta: 'முக்கோணம்' },
  'Square': { es: 'Cuadrado', fr: 'Carré', hi: 'वर्ग', ta: 'சதுரம்' },
  'Rectangle': { es: 'Rectángulo', fr: 'Rectangle', hi: 'आयताकार', ta: 'செவ்வகம்' },
  'Star': { es: 'Estrella', fr: 'Étoile', hi: 'तारा', ta: 'நட்சத்திரம்' },
  'Heart': { es: 'Corazón', fr: 'Cœur', hi: 'दिल', ta: 'இதயம்' },
  'Diamond': { es: 'Diamante', fr: 'Losange', hi: 'हीरा', ta: 'வைரம்' },
  'Oval': { es: 'Óvalo', fr: 'Ovale', hi: 'अंडाकार', ta: 'நீள்வட்டம்' },

  // Vehicles
  'Car': { es: 'Coche', fr: 'Voiture', hi: 'गाड़ी', ta: 'கார்' },
  'Train': { es: 'Tren', fr: 'Train', hi: 'ट्रेन', ta: 'இரயில்' },
  'Airplane': { es: 'Avión', fr: 'Avion', hi: 'हवाई जहाज', ta: 'விமானம்' },
  'Rocket': { es: 'Cohete', fr: 'Fusée', hi: 'रॉकेट', ta: 'ராக்கெட்' },
  'Boat': { es: 'Barco', fr: 'Bateau', hi: 'नाव', ta: 'படகு' },
  'Bicycle': { es: 'Bicicleta', fr: 'Vélo', hi: 'साइकिल', ta: 'சைக்கிள்' },
  'Helicopter': { es: 'Helicóptero', fr: 'Hélicoptère', hi: 'हेलीकॉप्टर', ta: 'ஹெலிகாப்டர்' },
  'Fire Truck': { es: 'Camión de bomberos', fr: 'Camion de pompiers', hi: 'दमकल गाड़ी', ta: 'தீயணைப்பு வண்டி' },

  // Colors
  'Red': { es: 'Rojo', fr: 'Rouge', hi: 'लाल', ta: 'சிகப்பு' },
  'Blue': { es: 'Azul', fr: 'Bleu', hi: 'नीला', ta: 'நீலம்' },
  'Green': { es: 'Verde', fr: 'Vert', hi: 'हरा', ta: 'பச்சை' },
  'Yellow': { es: 'Amarillo', fr: 'Jaune', hi: 'पीला', ta: 'மஞ்சள்' },
  'OrangeColor': { es: 'Naranja', fr: 'Orange', hi: 'नारंगी', ta: 'ஆரஞ்சு' },
  'Purple': { es: 'Púrpura', fr: 'Violet', hi: 'बैंगनी', ta: 'ஊதா' },
  'Pink': { es: 'Rosa', fr: 'Rose', hi: 'गुलाबी', ta: 'இளஞ்சிவப்பு' },
  'Brown': { es: 'Marrón', fr: 'Marron', hi: 'भूरा', ta: 'பழுப்பு' },

  // Numbers
  '1': { es: 'Uno', fr: 'Un', hi: 'एक', ta: 'ஒன்று' },
  '2': { es: 'Dos', fr: 'Deux', hi: 'दो', ta: 'இரண்டு' },
  '3': { es: 'Tres', fr: 'Trois', hi: 'तीन', ta: 'மூன்று' },
  '4': { es: 'Cuatro', fr: 'Quatre', hi: 'चार', ta: 'நான்கு' },
  '5': { es: 'Cinco', fr: 'Cinq', hi: 'पांच', ta: 'ஐந்து' },
  '6': { es: 'Seis', fr: 'Six', hi: 'छह', ta: 'ஆறு' },
  '7': { es: 'Siete', fr: 'Sept', hi: 'सात', ta: 'ஏழு' },
  '8': { es: 'Ocho', fr: 'Huit', hi: 'आठ', ta: 'எட்டு' },

  // Alphabet
  'A': { es: 'A', fr: 'A', hi: 'ए', ta: 'ஏ' },
  'B': { es: 'B', fr: 'B', hi: 'बी', ta: 'பீ' },
  'C': { es: 'C', fr: 'C', hi: 'सी', ta: 'சீ' },
  'D': { es: 'D', fr: 'D', hi: 'डी', ta: 'டி' },
  'E': { es: 'E', fr: 'E', hi: 'ई', ta: 'ஈ' },
  'F': { es: 'F', fr: 'F', hi: 'எஃப்', ta: 'எஃப்' },
  'G': { es: 'G', fr: 'G', hi: 'जी', ta: 'ஜி' },
  'H': { es: 'H', fr: 'H', hi: 'एच', ta: 'ஹெச்' },

  // Ocean
  'Fish': { es: 'Pez', fr: 'Poisson', hi: 'मछली', ta: 'மீன்' },
  'Octopus': { es: 'Pulpo', fr: 'Pieuvre', hi: 'अष्टबाहु', ta: 'ஆக்டோபஸ்' },
  'Crab': { es: 'Cangrejo', fr: 'Crabe', hi: 'केकड़ा', ta: 'நண்டு' },
  'Whale': { es: 'Ballena', fr: 'Baleine', hi: 'ह्वेल', ta: 'திமிங்கலம்' },
  'Starfish': { es: 'Estrella de mar', fr: 'Étoile de mer', hi: 'तारा मछली', ta: 'நட்சத்திர மீன்' },
  'Seahorse': { es: 'Caballito de mar', fr: 'Hippocampe', hi: 'समुद्री घोड़ा', ta: 'கடல் குதிரை' },
  'Turtle': { es: 'Tortuga', fr: 'Tortue', hi: 'कछुआ', ta: 'ஆமை' },
  'Jellyfish': { es: 'Medusa', fr: 'Méduse', hi: 'जैलिफ़िश', ta: 'ஜெல்லிமீன்' },

  // Space
  'Sun': { es: 'Sol', fr: 'Soleil', hi: 'सूर्य', ta: 'சூரியன்' },
  'Moon': { es: 'Luna', fr: 'Lune', hi: 'चाँद', ta: 'நிலா' },
  'Planet': { es: 'Planeta', fr: 'Planète', hi: 'ग्रह', ta: 'கிரகம்' },
  'Astronaut': { es: 'Astronauta', fr: 'Astronaute', hi: 'अंतरिक्ष यात्री', ta: 'விண்வெளி வீரர்' },
  'Alien': { es: 'Alienígena', fr: 'Extraterrestre', hi: 'एलियन', ta: 'ஏலியன்' },
  'Comet': { es: 'Cometa', fr: 'Comète', hi: 'धूमकेतु', ta: 'வால் நட்சத்திரம்' },

  // Farm
  'Pig': { es: 'Cerdo', fr: 'Cochon', hi: 'सुअर', ta: 'பன்றி' },
  'Sheep': { es: 'Oveja', fr: 'Mouton', hi: 'भेड़', ta: 'செம்மறியாடு' },
  'Chicken': { es: 'Pollo', fr: 'Poulet', hi: 'मुर्गी', ta: 'கோழி' },
  'Horse': { es: 'Caballo', fr: 'Cheval', hi: 'घोड़ा', ta: 'குதிரை' },
  'Duck': { es: 'Pato', fr: 'Canard', hi: 'बतख', ta: 'வாத்து' },
  'Goat': { es: 'Cabra', fr: 'Chèvre', hi: 'बकरी', ta: 'ஆடு' },
  'Rooster': { es: 'Gallo', fr: 'Coq', hi: 'मुर्गा', ta: 'சேவல்' },
  'Donkey': { es: 'Burro', fr: 'Âne', hi: 'गधा', ta: 'கழுதை' },

  // Themes
  'animals': { es: 'animales', fr: 'animaux', hi: 'जानवरों', ta: 'விலங்குகள்' },
  'fruits': { es: 'frutas', fr: 'fruits', hi: 'फलों', ta: 'பழங்கள்' },
  'shapes': { es: 'formas', fr: 'formes', hi: 'आकृतियों', ta: 'வடிவங்கள்' },
  'vehicles': { es: 'vehículos', fr: 'véhicules', hi: 'वाहनों', ta: 'வாகனங்கள்' },
  'colors': { es: 'colores', fr: 'couleurs', hi: 'रंगों', ta: 'வண்ணங்கள்' },
  'numbers': { es: 'números', fr: 'nombres', hi: 'संख्याओं', ta: 'எண்கள்' },
  'alphabet': { es: 'letras', fr: 'lettres', hi: 'अक्षरों', ta: 'எழுத்துக்கள்' },
  'ocean': { es: 'océano', fr: 'océan', hi: 'समुद्र', ta: 'கடல் உலகம்' },
  'space': { es: 'espacio', fr: 'espace', hi: 'अंतरिक्ष', ta: 'விண்வெளி' },
  'farm': { es: 'granja', fr: 'ferme', hi: 'खेत', ta: 'பண்ணை விலங்குகள்' }
};

// Helper to translate core spoken voice messages on-the-fly for immersive multilingual voice guide
const translateSpokenText = (text: string, lang: 'en' | 'es' | 'hi' | 'fr' | 'ta'): string => {
  if (lang === 'en') return text;

  // Vocabulary translations lookup helper
  const translateWord = (word: string): string => {
    const cleanWord = word.trim().replace(/[!.,]/g, '');
    const found = VOCAB_TRANSLATIONS[cleanWord];
    if (found && found[lang]) {
      return found[lang];
    }
    return word;
  };

  // Exact match static phrases
  if (text.includes("Welcome to Memory Adventure! Tap any button to start.")) {
    if (lang === 'es') return "¡Bienvenido a Memory Adventure! Presiona cualquier botón para comenzar.";
    if (lang === 'fr') return "Bienvenue dans Memory Adventure ! Appuyez sur n'importe quel bouton pour commencer.";
    if (lang === 'hi') return "मेमोरी एडवेंचर में आपका स्वागत है! शुरू करने के लिए किसी भी बटन को दबाएं।";
    if (lang === 'ta') return "நினைவக சாகசத்திற்கு உங்களை வரவேற்கிறோம்! விளையாட ஏதேனும் ஒரு பொத்தானைத் தட்டவும்.";
  }

  if (text.includes("The cards are face down. Tap two cards to find matching pairs!")) {
    if (lang === 'es') return "Las cartas están boca abajo. ¡Toca dos cartas para encontrar parejas!";
    if (lang === 'fr') return "Les cartes sont face cachée. Appuyez sur deux cartes pour trouver des paires !";
    if (lang === 'hi') return "पत्ते उल्टे रखे हैं। मैचिंग जोड़े खोजने के लिए दो पत्तों को छुएं!";
    if (lang === 'ta') return "அட்டைகள் தலைகீழாக உள்ளன. பொருந்தும் இணைகளைக் கண்டறிய இரண்டு அட்டைகளைத் தட்டவும்!";
  }

  if (text.includes("Revealing the cards to help you remember!")) {
    if (lang === 'es') return "¡Revelando las cartas para ayudarte a recordar!";
    if (lang === 'fr') return "Révélation des cartes pour vous aider à vous souvenir !";
    if (lang === 'hi') return "याद रखने में मदद के लिए पत्ते दिखाए जा रहे हैं!";
    if (lang === 'ta') return "உங்களுக்கு நினைவூட்ட அட்டைகள் இப்போது காண்பிக்கப்படுகின்றன!";
  }

  if (text.includes("Shuffling the hidden cards for a fresh start!")) {
    if (lang === 'es') return "¡Barajando las cartas ocultas para un nuevo comienzo!";
    if (lang === 'fr') return "Mélange des cartes cachées pour un nouveau départ !";
    if (lang === 'hi') return "छिपे हुए पत्तों को फिर से मिलाया जा रहा है!";
    if (lang === 'ta') return "மறைக்கப்பட்ட அட்டைகள் மீண்டும் கலைக்கப்படுகின்றன!";
  }

  if (text.includes("All stars, sticker collections, and high scores have been safely reset!")) {
    if (lang === 'es') return "¡Todas las estrellas, colecciones y puntuaciones han sido reiniciadas!";
    if (lang === 'fr') return "Toutes les étoiles, collections et scores ont été réinitialisés !";
    if (lang === 'hi') return "सभी सितारे और स्कोर सुरक्षित रूप से रीसेट कर दिए गए हैं!";
    if (lang === 'ta') return "அனைத்து நட்சத்திரங்கள் மற்றும் பொம்மைகள் பாதுகாப்பாக மீட்டமைக்கப்பட்டுள்ளன!";
  }

  // Dynamic Template phrases
  // Turn goes to [Name]!
  if (text.includes("Turn goes to ")) {
    const name = text.replace("Turn goes to ", "").replace("!", "").trim();
    if (lang === 'es') return `¡Es el turno de ${name}!`;
    if (lang === 'fr') return `C'est au tour de ${name} !`;
    if (lang === 'hi') return `अब ${name} की बारी है!`;
    if (lang === 'ta') return `அடுத்தது ${name} அவர்களின் முறை!`;
  }

  // Congratulations! You cleared the board in [Time] seconds...
  if (text.includes("Congratulations! You cleared the board")) {
    const secondsMatch = text.match(/\d+/);
    const secs = secondsMatch ? secondsMatch[0] : "some";
    if (lang === 'es') return `¡Felicitaciones! Completaste el tablero en ${secs} segundos con increíble concentración! ¡Ganaste un certificado especial!`;
    if (lang === 'fr') return `Félicitations ! Vous avez vidé le plateau en ${secs} secondes avec une concentration incroyable ! Vous avez gagné un certificat officiel !`;
    if (lang === 'hi') return `बधाई हो! आपने शानदार एकाग्रता के साथ ${secs} सेकंड में बोर्ड को पूरा कर लिया! आपको एक विशेष प्रमाण पत्र मिला है!`;
    if (lang === 'ta') return `வாழ்த்துகள்! நீங்கள் அனைத்து அட்டைகளையும் ${secs} வினாடிகளில் வெற்றிகரமாக பொருத்திவிட்டீர்கள்! உங்களுக்கு ஒரு சிறப்பு சான்றிதழ் கிடைத்துள்ளது!`;
  }

  // Hooray! You unlocked a new badge: [Badge]!
  if (text.includes("unlocked a new badge:")) {
    const badgePart = text.split("unlocked a new badge:");
    const badgeTitle = badgePart[1] ? badgePart[1].replace("!", "").trim() : "";
    if (lang === 'es') return `¡Hooray! Desbloqueaste una nueva insignia: ${badgeTitle}!`;
    if (lang === 'fr') return `Hourra ! Vous avez débloqué un nouveau badge : ${badgeTitle} !`;
    if (lang === 'hi') return `हुर्रे! आपने एक नया बैज अनलॉक किया है: ${badgeTitle}!`;
    if (lang === 'ta') return `சூப்பர்! நீங்கள் ஒரு புதிய பேட்ஜை வென்றுள்ளீர்கள்: ${badgeTitle}!`;
  }

  // Playing with [Theme] theme!
  if (text.includes("Playing with ") && text.includes(" theme!")) {
    const themeName = text.replace("Playing with ", "").replace(" theme!", "").trim();
    const translatedTheme = translateWord(themeName);
    if (lang === 'es') return `¡Jugando con el tema de ${translatedTheme}!`;
    if (lang === 'fr') return `Jouer avec le thème ${translatedTheme} !`;
    if (lang === 'hi') return `अब ${translatedTheme} थीम के साथ खेल रहे हैं!`;
    if (lang === 'ta') return `இப்போது ${translatedTheme} கருப்பொருளுடன் விளையாடுகிறீர்கள்!`;
  }

  // Today's daily challenge is [Theme] on [Diff] difficulty. Let's do it!
  if (text.includes("Today's daily challenge is ")) {
    const words = text.split(" ");
    let themeVal = "animals";
    let diffVal = "easy";
    const onIndex = words.indexOf("on");
    const isIndex = words.indexOf("is");
    if (isIndex !== -1 && onIndex !== -1 && onIndex > isIndex + 1) {
      themeVal = words.slice(isIndex + 1, onIndex).join(" ");
    }
    const diffIndex = words.indexOf("difficulty.");
    if (onIndex !== -1 && diffIndex !== -1 && diffIndex > onIndex + 1) {
      diffVal = words.slice(onIndex + 1, diffIndex).join(" ");
    }

    const transTheme = translateWord(themeVal);
    const diffTranslations: Record<string, Record<string, string>> = {
      easy: { es: 'fácil', fr: 'facile', hi: 'आसान', ta: 'எளிய' },
      medium: { es: 'medio', fr: 'moyen', hi: 'मध्यम', ta: 'நடுத்தர' },
      hard: { es: 'difícil', fr: 'difficile', hi: 'कठिन', ta: 'கடின' },
      expert: { es: 'experto', fr: 'expert', hi: 'विशेषज्ञ', ta: 'நிபுணர்' }
    };
    const transDiff = diffTranslations[diffVal]?.[lang] || diffVal;

    if (lang === 'es') return `El desafío diario de hoy es ${transTheme} en dificultad ${transDiff}. ¡Hagámoslo!`;
    if (lang === 'fr') return `Le défi quotidien d'aujourd'hui est ${transTheme} en difficulté ${transDiff}. C'est parti !`;
    if (lang === 'hi') return `आज की दैनिक चुनौती ${transTheme} है, कठिनाई ${transDiff}। चलिए शुरू करते हैं!`;
    if (lang === 'ta') return `இன்றைய தினசரி சவால் ${transTheme} கருப்பொருளில் ${transDiff} நிலை ஆகும். விளையாடலாம்!`;
  }

  // Match: Great Job! You matched the Apple!
  if (text.includes("You matched the ")) {
    const item = text.substring(text.indexOf("You matched the ") + 16).replace("!", "").trim();
    const translatedItem = translateWord(item);

    if (lang === 'es') {
      const praises = ['¡Excelente!', '¡Buen trabajo!', '¡Fantástico!', '¡Increíble!'];
      const p = praises[Math.floor(Math.random() * praises.length)];
      return `${p} ¡Has encontrado el ${translatedItem}!`;
    }
    if (lang === 'fr') {
      const praises = ['Super !', 'Bien joué !', 'Génial !', 'Magnifique !'];
      const p = praises[Math.floor(Math.random() * praises.length)];
      return `${p} Vous avez associé le ${translatedItem} !`;
    }
    if (lang === 'hi') {
      const praises = ['शानदार!', 'बहुत बढ़िया!', 'अति उत्तम!', 'लाजवाब!'];
      const p = praises[Math.floor(Math.random() * praises.length)];
      return `${p} आपने ${translatedItem} का जोड़ा खोज लिया!`;
    }
    if (lang === 'ta') {
      const praises = ['அற்புதம்!', 'மிக நன்று!', 'சூப்பர்!', 'பிரமாதம்!'];
      const p = praises[Math.floor(Math.random() * praises.length)];
      return `${p} நீங்கள் ${translatedItem} அட்டையைப் பொருத்திவிட்டீர்கள்!`;
    }
  }

  return text;
};

export default function App() {
  // Persistence & States
  const [profile, setProfile] = useState<PlayerProfile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState<GameStatistics>(DEFAULT_STATS);
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS);

  // Active Screens & Overlays
  const [currentView, setCurrentView] = useState<'home' | 'difficulty-select' | 'theme-select' | 'playing' | 'paused' | 'how-to-play' | 'profile' | 'stats'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Game Engine State
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [theme, setTheme] = useState<CardTheme>('animals');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [companionEvent, setCompanionEvent] = useState<'match' | 'mismatch' | 'victory' | 'start' | 'idle' | null>('idle');
  
  // Game metrics
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [players, setPlayers] = useState([
    { name: 'Player 1', avatar: 'bunny', score: 0, matches: 0, stars: 0 },
    { name: 'Player 2', avatar: 'kitten', score: 0, matches: 0, stars: 0 }
  ]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [revealedMatchCount, setRevealedMatchCount] = useState(0);

  // Game limits & helper flags
  const [canFlip, setCanFlip] = useState(true);
  const [hintActive, setHintActive] = useState(false);
  const [shufflesLeft, setShufflesLeft] = useState(1);
  const [hintsLeft, setHintsLeft] = useState(2);

  // Refs for tracking time
  const timerRef = useRef<any>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('ma_profile');
      const savedSettings = localStorage.getItem('ma_settings');
      const savedStats = localStorage.getItem('ma_stats');
      const savedAchievements = localStorage.getItem('ma_achievements');

      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        audioSynth.setSoundEnabled(parsed.soundEnabled);
        audioSynth.setMusicEnabled(parsed.musicEnabled);
      } else {
        // Init default synthesizer states
        audioSynth.setSoundEnabled(DEFAULT_SETTINGS.soundEnabled);
        audioSynth.setMusicEnabled(DEFAULT_SETTINGS.musicEnabled);
      }
      if (savedStats) setStats(JSON.parse(savedStats));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Save changes automatically
  const saveState = (newProfile?: PlayerProfile, newSettings?: GameSettings, newStats?: GameStatistics, newAchievements?: Achievement[]) => {
    try {
      if (newProfile) {
        setProfile(newProfile);
        localStorage.setItem('ma_profile', JSON.stringify(newProfile));
      }
      if (newSettings) {
        setSettings(newSettings);
        localStorage.setItem('ma_settings', JSON.stringify(newSettings));
        audioSynth.setSoundEnabled(newSettings.soundEnabled);
        audioSynth.setMusicEnabled(newSettings.musicEnabled);
      }
      if (newStats) {
        setStats(newStats);
        localStorage.setItem('ma_stats', JSON.stringify(newStats));
      }
      if (newAchievements) {
        setAchievements(newAchievements);
        localStorage.setItem('ma_achievements', JSON.stringify(newAchievements));
      }
    } catch (e) {
      console.error('Failed to save state to local storage:', e);
    }
  };

  // Sound triggering on load/views
  useEffect(() => {
    if (settings.musicEnabled) {
      audioSynth.startAmbientMusic();
    } else {
      audioSynth.stopAmbientMusic();
    }
    return () => {
      audioSynth.stopAmbientMusic();
    };
  }, [settings.musicEnabled]);

  // Game timer
  useEffect(() => {
    if (isPlaying && !showSettings && !showAchievements && !showCertificate && !showShop && !showWheel) {
      timerRef.current = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, showSettings, showAchievements, showCertificate, showShop, showWheel]);

  // Speak voice instruction out loud safely
  const speakVoice = (text: string) => {
    if (!settings.voiceInstructionsEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        // Translate text on-the-fly to the active language
        const translatedText = translateSpokenText(text, settings.language);
        
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.rate = 0.95; // child-friendly pacing
        utterance.pitch = 1.1; // soft, cute pitch
        
        // Find a matching lang
        if (settings.language === 'es') utterance.lang = 'es-ES';
        else if (settings.language === 'fr') utterance.lang = 'fr-FR';
        else if (settings.language === 'hi') utterance.lang = 'hi-IN';
        else if (settings.language === 'ta') utterance.lang = 'ta-IN'; // Tamil (India)
        else utterance.lang = 'en-US';

        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error('Speech synthesis error:', e);
    }
  };

  // Greet user on load
  useEffect(() => {
    const timer = setTimeout(() => {
      speakVoice("Welcome to Memory Adventure! Tap any button to start.");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Set up Daily Challenge
  const handleDailyChallenge = () => {
    audioSynth.playClick();
    setIsDailyChallenge(true);
    // Randomize difficulty & theme
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
    const themes = profile.unlockedThemes;
    const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    setDifficulty(randomDiff);
    setTheme(randomTheme);
    setIsMultiplayer(false);
    
    // Greet text
    speakVoice(`Today's daily challenge is ${randomTheme} on ${randomDiff} difficulty. Let's do it!`);

    startPlayingGame(randomDiff, randomTheme, false);
  };

  // Launch a game board
  const startPlayingGame = (targetDiff: Difficulty, targetTheme: CardTheme, targetMulti: boolean) => {
    // Determine card pair count
    let pairsCount = 3; // easy
    if (targetDiff === 'medium') pairsCount = 4;
    else if (targetDiff === 'hard') pairsCount = 6;
    else if (targetDiff === 'expert') pairsCount = 8;

    // Get theme words
    const words = [...THEME_DATA[targetTheme]].slice(0, pairsCount);
    // Double words to make cards
    const cardValues = [...words, ...words];

    // Shuffle
    const shuffled: CardItem[] = cardValues
      .map((val, idx) => ({
        id: `card-${idx}-${Math.random().toString(36).substr(2, 4)}`,
        uniqueId: `card-uniq-${idx}-${Math.random().toString(36).substr(2, 4)}`,
        value: val,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setSelectedIndices([]);
    setGameTime(0);
    setRevealedMatchCount(0);
    setHintsLeft(targetDiff === 'easy' ? 3 : targetDiff === 'expert' ? 1 : 2);
    setShufflesLeft(1);
    setCurrentPlayerIdx(0);
    
    // Initialize custom players
    setPlayers([
      { name: targetMulti ? 'Player 1' : (profile.name || 'Explorer'), avatar: profile.avatar, score: 0, matches: 0, stars: 0 },
      { name: targetMulti ? 'Player 2' : 'Player 2', avatar: 'kitten', score: 0, matches: 0, stars: 0 }
    ]);

    setCompanionEvent('start');
    setIsPlaying(true);
    setCurrentView('playing');
    setCanFlip(true);

    speakVoice(`The cards are face down. Tap two cards to find matching pairs!`);
  };

  // Handle Card Tap/Click
  const handleCardClick = (index: number) => {
    if (!canFlip || cards[index].isFlipped || cards[index].isMatched) return;

    audioSynth.playFlip();

    // Set first or second flipped card
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newFlipped = [...selectedIndices, index];
    setSelectedIndices(newFlipped);

    // Update stats
    const updatedStats = { ...stats, totalFlips: stats.totalFlips + 1 };
    saveState(undefined, undefined, updatedStats);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].value === cards[secondIdx].value) {
        // MATCH FOUND!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedIndices([]);
          setCanFlip(true);
          setRevealedMatchCount((prev) => prev + 1);

          audioSynth.playMatchSuccess();
          setCompanionEvent('match');

          // Verbal/Text positive reinforcement selection
          const praises = ['Great Job!', 'Awesome!', 'Excellent!', 'Fantastic!'];
          const selectedPraise = praises[Math.floor(Math.random() * praises.length)];
          speakVoice(`${selectedPraise} You matched the ${cards[firstIdx].value}!`);

          // Update Score
          if (isMultiplayer) {
            setPlayers((prev) => {
              const updated = [...prev];
              updated[currentPlayerIdx].score += 10;
              updated[currentPlayerIdx].matches += 1;
              updated[currentPlayerIdx].stars += 1;
              return updated;
            });
          } else {
            // Single Player updates
            setProfile((prev) => ({
              ...prev,
              stars: prev.stars + 1,
              coins: prev.coins + 2,
              xp: prev.xp + 15
            }));
          }

          // Update statistics
          const freshStats = {
            ...stats,
            matchesFound: stats.matchesFound + 1,
            correctFlips: stats.correctFlips + 2,
            currentStreak: stats.currentStreak + 1,
            longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1),
            starsCollected: stats.starsCollected + 1
          };
          saveState(undefined, undefined, freshStats);

          // Check if board fully cleared!
          const isCleared = matchedCards.every((c) => c.isMatched);
          if (isCleared) {
            handleVictory();
          }
        }, 600);
      } else {
        // MISMATCH
        setCompanionEvent('mismatch');
        
        // Custom slow flip-back speed based on accessibility settings
        const flipDelay = settings.animationSpeed === 'slow' ? 2200 : 1200;

        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setSelectedIndices([]);
          setCanFlip(true);

          // Reset streak
          saveState(undefined, undefined, { ...stats, currentStreak: 0 });

          // Swap Player turn in multiplayer
          if (isMultiplayer) {
            const nextPlayer = (currentPlayerIdx + 1) % 2;
            setCurrentPlayerIdx(nextPlayer);
            speakVoice(`Turn goes to ${players[nextPlayer].name}!`);
          }
        }, flipDelay);
      }
    }
  };

  // Board Completion Victory
  const handleVictory = () => {
    setIsPlaying(false);
    audioSynth.playLevelComplete();
    setCompanionEvent('victory');

    // Stats updates
    const completedGames = stats.gamesPlayed + 1;
    const completedWins = stats.gamesWon + 1;
    
    const freshStats = {
      ...stats,
      gamesPlayed: completedGames,
      gamesWon: completedWins,
    };

    saveState(undefined, undefined, freshStats);
    
    // Check & unlock Achievements
    checkAndUnlockAchievements(completedGames);

    speakVoice(`Congratulations! You cleared the board in ${gameTime} seconds with amazing focus! You earned a special certificate!`);

    setTimeout(() => {
      setShowCertificate(true);
    }, 1500);
  };

  // Evaluate & Unlock medals
  const checkAndUnlockAchievements = (gamesPlayed: number) => {
    const updatedAchievements = achievements.map((badge) => {
      if (badge.isUnlocked) return badge;

      let shouldUnlock = false;

      if (badge.id === 'first_match' && stats.matchesFound > 0) shouldUnlock = true;
      if (badge.id === 'perfect_game' && (stats.correctFlips / (stats.totalFlips || 1)) >= 0.9) shouldUnlock = true;
      if (badge.id === 'animal_expert' && theme === 'animals') shouldUnlock = true;
      if (badge.id === 'fruit_champion' && theme === 'fruits') shouldUnlock = true;
      if (badge.id === 'shape_genius' && theme === 'shapes') shouldUnlock = true;
      if (badge.id === 'fast_thinker' && gameTime < 45) shouldUnlock = true;
      if (badge.id === 'matches_100' && stats.matchesFound >= 100) shouldUnlock = true;
      if (badge.id === 'matches_500' && stats.matchesFound >= 500) shouldUnlock = true;

      if (shouldUnlock) {
        speakVoice(`Hooray! You unlocked a new badge: ${badge.title}!`);
        return { ...badge, isUnlocked: true, unlockedAt: new Date().toISOString() };
      }
      return badge;
    });

    saveState(undefined, undefined, undefined, updatedAchievements);
  };

  // Accessibility Hints Helper (Temporarily flips cards)
  const triggerHint = () => {
    if (hintsLeft <= 0 || hintActive || !canFlip) return;
    
    audioSynth.playClick();
    setHintsLeft((prev) => prev - 1);
    setHintActive(true);
    setCanFlip(false);

    speakVoice("Revealing the cards to help you remember!");

    // Flip all cards face up
    const flippedAll = cards.map((c) => ({ ...c, isFlipped: true }));
    setCards(flippedAll);

    // Slow calming duration before flipping back
    const hintDuration = settings.animationSpeed === 'slow' ? 3500 : 2000;

    setTimeout(() => {
      const resetAll = cards.map((c) => ({ ...c, isFlipped: c.isMatched }));
      setCards(resetAll);
      setHintActive(false);
      setCanFlip(true);
    }, hintDuration);
  };

  // Shuffle Helper (Shuffles remaining face-down cards if stuck)
  const triggerShuffle = () => {
    if (shufflesLeft <= 0 || !canFlip) return;

    audioSynth.playClick();
    setShufflesLeft((prev) => prev - 1);

    speakVoice("Shuffling the hidden cards for a fresh start!");

    // Extract unmatched cards
    const unmatched = cards.filter((c) => !c.isMatched);
    const matched = cards.filter((c) => c.isMatched);

    // Shuffle unmatched only
    const shuffledUnmatched = [...unmatched].sort(() => Math.random() - 0.5);
    const combined = [...matched, ...shuffledUnmatched];

    setCards(combined);
  };

  // Full Reset Progress for Psychologists/Families
  const handleResetProgress = () => {
    localStorage.clear();
    setProfile(DEFAULT_PROFILE);
    setSettings(DEFAULT_SETTINGS);
    setStats(DEFAULT_STATS);
    setAchievements(DEFAULT_ACHIEVEMENTS);
    setShowSettings(false);
    audioSynth.playMatchSuccess();
    speakVoice("All stars, sticker collections, and high scores have been safely reset!");
  };

  // Sticker unlocked callback from Lucky Wheel
  const handleStickerUnlocked = (stickerId: string, stickerName: string) => {
    const updatedProfile = {
      ...profile,
      stickers: [...profile.stickers, stickerId],
    };
    saveState(updatedProfile);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 overflow-x-hidden relative ${
        settings.darkMode
          ? 'bg-slate-950 text-slate-100'
          : settings.highContrast
          ? 'bg-white text-black'
          : 'bg-[#E0F7FA] text-slate-800'
      } ${settings.largeText ? 'text-lg' : 'text-base'}`}
    >
      {/* Soft blur bubbles/backdrop for Geometric Balance */}
      {!settings.darkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-48 h-24 bg-white rounded-full opacity-60 filter blur-2xl"></div>
          <div className="absolute top-40 right-20 w-64 h-32 bg-white rounded-full opacity-40 filter blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-56 h-28 bg-white rounded-full opacity-50 filter blur-2xl"></div>
        </div>
      )}

      {/* HEADER BAR */}
      <header className={`py-4 px-6 md:px-10 flex items-center justify-between z-10 ${
        settings.highContrast ? 'border-black border-b-4' : ''
      }`}>
        <button
          onClick={() => {
            audioSynth.playClick();
            if (currentView !== 'home') {
              setCurrentView('home');
              setIsPlaying(false);
            }
          }}
          className="flex items-center gap-3 text-left cursor-pointer select-none border-none bg-transparent"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFD54F] rounded-full flex items-center justify-center">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-sm rotate-45"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className={`text-[#455A64] text-xl md:text-3xl font-black tracking-tight leading-none font-sans ${settings.highContrast ? 'text-black underline' : ''}`}>
              Memory Adventure
            </h1>
            <span className="text-[10px] text-[#90A4AE] uppercase tracking-widest font-bold mt-0.5 hidden md:block">Autism-Friendly Learning Game</span>
          </div>
        </button>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Stars Collected badge */}
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm shadow-xs select-none ${
            settings.highContrast ? 'border-2 border-black bg-yellow-100 text-black' : 'bg-white text-[#455A64] border border-slate-100'
          }`}>
            <span className="text-base">⭐</span>
            <span>{profile.stars}</span>
          </div>

          {/* Quick Mute button */}
          <button
            onClick={() => {
              const toggled = !settings.soundEnabled;
              saveState(undefined, { ...settings, soundEnabled: toggled, musicEnabled: toggled });
            }}
            id="global-mute-button"
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full shadow-sm flex items-center justify-center border-2 border-transparent hover:border-[#80DEEA] transition-all cursor-pointer ${
              settings.highContrast
                ? 'border-2 border-black bg-white hover:bg-slate-100 text-black'
                : 'bg-white text-slate-700'
            }`}
            aria-label={settings.soundEnabled ? 'Mute' : 'Unmute'}
          >
            <span className="text-lg">{settings.soundEnabled ? '🔊' : '🔇'}</span>
          </button>

          {/* Settings cog */}
          <button
            onClick={() => {
              audioSynth.playClick();
              setShowSettings(true);
            }}
            id="global-settings-button"
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full shadow-sm flex items-center justify-center border-2 border-transparent hover:border-[#80DEEA] transition-all cursor-pointer ${
              settings.highContrast
                ? 'border-2 border-black bg-white hover:bg-slate-100 text-black'
                : 'bg-white text-slate-700'
            }`}
            aria-label="Open game settings"
          >
            <span className="text-lg">⚙️</span>
          </button>
        </div>
      </header>

      {/* CORE SCREENS ROUTER */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 z-10 w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {/* 1. HOME SCREEN */}
          {currentView === 'home' && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center text-center md:text-left mt-2 md:mt-6"
            >
              {/* Column 1: Companion Mascot Card */}
              <div className="flex flex-col items-center justify-center">
                <div className={`relative w-80 h-80 bg-white rounded-[60px] shadow-xl flex items-center justify-center border-8 border-white mb-6 transform hover:scale-102 transition-transform duration-300`}>
                  {/* Decorative badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FF8A65] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-extrabold font-sans">!</span>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className="w-48 h-48 bg-[#DCFCE7] rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                      <Mascot state="wave" size="lg" highContrast={settings.highContrast} />
                    </div>
                    <p className="text-[#546E7A] text-lg font-bold italic font-sans px-4">
                      Hi! Let's play together!
                    </p>
                  </div>
                </div>

                {/* Badges row below Mascot card */}
                <div className="flex gap-4">
                  <div className="px-6 py-3 bg-white rounded-full shadow-sm flex items-center gap-2 border border-slate-100/60 hover:scale-105 transition-transform">
                    <span className="text-[#FBC02D] text-lg">⭐</span>
                    <span className="font-extrabold text-[#455A64] text-sm font-sans">{profile.stars} Stars</span>
                  </div>
                  <div className="px-6 py-3 bg-white rounded-full shadow-sm flex items-center gap-2 border border-slate-100/60 hover:scale-105 transition-transform">
                    <span className="text-[#4FC3F7] text-lg">🏆</span>
                    <span className="font-extrabold text-[#455A64] text-sm font-sans">Level {Math.floor(profile.xp / 100) || 1}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Action Buttons List */}
              <div className="flex flex-col gap-4 w-full">
                {/* Single Player Button */}
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setIsMultiplayer(false);
                    setIsDailyChallenge(false);
                    setCurrentView('difficulty-select');
                  }}
                  id="singleplayer-button"
                  className={`group flex items-center justify-between bg-gradient-to-r from-[#81D4FA] to-[#4FC3F7] p-6 rounded-[32px] shadow-lg border-b-8 border-[#0288D1] transform active:translate-y-1 active:border-b-4 transition-all w-full text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-5 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/30 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-inner">
                      👤
                    </div>
                    <span className="text-white text-2xl md:text-3xl font-black tracking-wide font-sans">Single Player</span>
                  </div>
                  <span className="text-white/60 text-3xl font-bold group-hover:translate-x-2 transition-transform">→</span>
                </button>

                {/* Multiplayer Button */}
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setIsMultiplayer(true);
                    setIsDailyChallenge(false);
                    setCurrentView('difficulty-select');
                  }}
                  id="multiplayer-button"
                  className={`group flex items-center justify-between bg-gradient-to-r from-[#A5D6A7] to-[#81C784] p-6 rounded-[32px] shadow-lg border-b-8 border-[#388E3C] transform active:translate-y-1 active:border-b-4 transition-all w-full text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-5 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/30 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-inner">
                      👥
                    </div>
                    <span className="text-white text-2xl md:text-3xl font-black tracking-wide font-sans">Multiplayer</span>
                  </div>
                  <span className="text-white/60 text-3xl font-bold group-hover:translate-x-2 transition-transform">→</span>
                </button>

                {/* Grid of Secondary Actions */}
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                  {/* Daily Play */}
                  <button
                    onClick={handleDailyChallenge}
                    id="daily-challenge-button"
                    className="flex items-center justify-center gap-2 bg-white py-4 px-3 rounded-[24px] shadow-md border-b-4 border-[#CFD8DC] text-[#455A64] font-extrabold text-sm md:text-base hover:bg-gray-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer text-center"
                  >
                    <span>📅</span> Daily Play
                  </button>

                  {/* Toy Shop */}
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setShowShop(true);
                    }}
                    id="shop-button"
                    className="flex items-center justify-center gap-2 bg-white py-4 px-3 rounded-[24px] shadow-md border-b-4 border-[#CFD8DC] text-[#455A64] font-extrabold text-sm md:text-base hover:bg-gray-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer text-center"
                  >
                    <span>🛍️</span> Toy Shop
                  </button>

                  {/* Lucky Spin */}
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setShowWheel(true);
                    }}
                    id="wheel-button"
                    className="flex items-center justify-center gap-2 bg-white py-4 px-3 rounded-[24px] shadow-md border-b-4 border-[#CFD8DC] text-[#455A64] font-extrabold text-sm md:text-base hover:bg-gray-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer text-center"
                  >
                    <span>🎁</span> Lucky Spin
                  </button>

                  {/* How to Play */}
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setCurrentView('how-to-play');
                    }}
                    id="how-to-play-button"
                    className="flex items-center justify-center gap-2 bg-white py-4 px-3 rounded-[24px] shadow-md border-b-4 border-[#CFD8DC] text-[#455A64] font-extrabold text-sm md:text-base hover:bg-gray-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer text-center"
                  >
                    <span>📖</span> How to Play
                  </button>

                  {/* Achievements */}
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setShowAchievements(true);
                    }}
                    id="home-achievements-button"
                    className="flex items-center justify-center gap-2 bg-white py-4 px-3 rounded-[24px] shadow-md border-b-4 border-[#CFD8DC] text-[#455A64] font-extrabold text-sm md:text-base hover:bg-gray-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer text-center"
                  >
                    <span>🏆</span> Badges ({achievements.filter((a) => a.isUnlocked).length})
                  </button>

                  {/* Stats */}
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setCurrentView('stats');
                    }}
                    id="home-stats-button"
                    className="flex items-center justify-center gap-2 bg-white py-4 px-3 rounded-[24px] shadow-md border-b-4 border-[#CFD8DC] text-[#455A64] font-extrabold text-sm md:text-base hover:bg-gray-50 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer text-center"
                  >
                    <span>📊</span> My Stats
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. DIFFICULTY SELECT SCREEN */}
          {currentView === 'difficulty-select' && (
            <motion.div
              key="difficulty-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center w-full max-w-md flex flex-col items-center gap-6"
            >
              <button
                onClick={() => {
                  audioSynth.playClick();
                  setCurrentView('home');
                }}
                id="diff-back-button"
                className="self-start flex items-center gap-1 text-xs font-black text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Back</span>
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800">Select Difficulty</h2>
                <p className="text-slate-400 text-xs mt-1">Choose how many cards you would like to pair!</p>
              </div>

              {/* Difficulty Options List */}
              <div className="flex flex-col gap-3 w-full">
                {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((diff) => {
                  const cardCounts = { easy: '6 cards (3 pairs)', medium: '8 cards (4 pairs)', hard: '12 cards (6 pairs)', expert: '16 cards (8 pairs)' };
                  const colorGradients = {
                    easy: 'from-emerald-50 to-teal-50 hover:border-emerald-300 border-emerald-100 text-emerald-700',
                    medium: 'from-sky-50 to-blue-50 hover:border-sky-300 border-sky-100 text-sky-700',
                    hard: 'from-amber-50 to-orange-50 hover:border-amber-300 border-amber-100 text-amber-700',
                    expert: 'from-rose-50 to-pink-50 hover:border-rose-300 border-rose-100 text-rose-700',
                  };

                  return (
                    <button
                      key={diff}
                      onClick={() => {
                        audioSynth.playClick();
                        setDifficulty(diff);
                        setCurrentView('theme-select');
                      }}
                      id={`diff-${diff}-button`}
                      className={`p-4 rounded-2xl border-2 text-left transition-all hover:scale-101 active:scale-99 flex justify-between items-center ${
                        settings.highContrast
                          ? 'border-black bg-white text-black'
                          : `bg-gradient-to-r ${colorGradients[diff]}`
                      }`}
                    >
                      <div>
                        <span className="block font-black text-base capitalize">{diff}</span>
                        <span className="text-slate-400 text-xs">{cardCounts[diff]}</span>
                      </div>
                      <span className="text-2xl font-bold" aria-hidden="true">➡️</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 3. THEME SELECT SCREEN */}
          {currentView === 'theme-select' && (
            <motion.div
              key="theme-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setCurrentView('difficulty-select');
                  }}
                  id="theme-back-button"
                  className="flex items-center gap-1 text-xs font-black text-slate-400 hover:text-slate-600"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Go Back</span>
                </button>

                {/* Randomize theme button */}
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    const available = profile.unlockedThemes;
                    const random = available[Math.floor(Math.random() * available.length)];
                    setTheme(random);
                    speakVoice(`Playing with ${random} theme!`);
                    startPlayingGame(difficulty, random, isMultiplayer);
                  }}
                  id="random-theme-button"
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    settings.highContrast
                      ? 'border-2 border-black bg-white text-black'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Random Theme</span>
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800">Choose Card Theme</h2>
                <p className="text-slate-400 text-xs mt-1">Pick a beautiful watercolor world to match and learn!</p>
              </div>

              {/* Themes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {([
                  { id: 'animals', name: 'Animals', emoji: '🐶' },
                  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
                  { id: 'shapes', name: 'Shapes', emoji: '🔺' },
                  { id: 'vehicles', name: 'Vehicles', emoji: '🚗' },
                  { id: 'colors', name: 'Colors', emoji: '🎨' },
                  { id: 'numbers', name: 'Numbers', emoji: '🔢' },
                  { id: 'alphabet', name: 'Letters', emoji: '🔤' },
                  { id: 'ocean', name: 'Ocean World', emoji: '🌊' },
                  { id: 'space', name: 'Space Cosmos', emoji: '🚀' },
                  { id: 'farm', name: 'Farm Animals', emoji: '🐷' },
                ] as { id: CardTheme; name: string; emoji: string }[]).map((th) => {
                  const isUnlocked = profile.unlockedThemes.includes(th.id);

                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        if (!isUnlocked) {
                          audioSynth.playClick();
                          setShowShop(true);
                          return;
                        }
                        audioSynth.playClick();
                        setTheme(th.id);
                        startPlayingGame(difficulty, th.id, isMultiplayer);
                      }}
                      id={`theme-${th.id}-button`}
                      disabled={false}
                      className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 text-center transition-all ${
                        !isUnlocked
                          ? 'border-slate-100 bg-slate-100/50 opacity-60 cursor-not-allowed'
                          : settings.highContrast
                          ? 'border-black bg-white text-black'
                          : 'bg-white border-sky-100/60 hover:border-sky-300 hover:shadow-md'
                      }`}
                    >
                      <span className="text-4xl" aria-hidden="true">{th.emoji}</span>
                      <div className="mt-1">
                        <span className="block font-bold text-sm text-slate-700 capitalize leading-tight">{th.name}</span>
                        {!isUnlocked ? (
                          <span className="text-[9px] font-bold text-amber-500 flex items-center justify-center gap-1 mt-0.5">
                            🔒 Lock
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-emerald-400 mt-0.5 block uppercase">Ready</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 4. ACTIVE GAMEPLAY BOARD */}
          {currentView === 'playing' && (
            <motion.div
              key="playing-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-6"
            >
              {/* Gameplay Info Panel */}
              <div className={`p-4 rounded-3xl flex flex-wrap items-center justify-between gap-4 border ${
                settings.highContrast ? 'border-4 border-black text-black' : 'bg-white/70 backdrop-blur-xs border-white/50 shadow-xs'
              }`}>
                {/* Active Player & Turns in Multiplayer */}
                {isMultiplayer ? (
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-sky-100/50 border ${
                      settings.highContrast ? 'border-black' : 'border-sky-200'
                    }`}>
                      {currentPlayerIdx === 0 ? '🐰' : '🐱'}
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-slate-400 block uppercase font-black">Current Turn</span>
                      <span className="font-extrabold text-sm text-indigo-600 block capitalize">
                        {players[currentPlayerIdx].name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-sky-100/50 border ${
                      settings.highContrast ? 'border-black bg-white' : 'border-sky-200'
                    }`}>
                      🐰
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-slate-400 block uppercase font-black">Memory Adventure</span>
                      <span className="font-extrabold text-sm text-slate-700 block capitalize">
                        {profile.name || 'Explorer'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Star Progress Bar */}
                <div className="flex-1 max-w-xs hidden sm:block">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase mb-1">
                    <span>Progress Tracker</span>
                    <span>{revealedMatchCount} / {cards.length / 2} Pairs</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${settings.highContrast ? 'bg-black' : 'bg-sky-400'}`}
                      animate={{ width: `${(revealedMatchCount / (cards.length / 2 || 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Score or Stars Tracker */}
                <div className="flex items-center gap-4">
                  {isMultiplayer ? (
                    <div className="text-right">
                      <span className="text-xs text-slate-400 uppercase font-black block">Matches Found</span>
                      <div className="flex gap-4 text-xs font-bold mt-0.5">
                        <span className="text-indigo-500">🐰 {players[0].name}: {players[0].matches}</span>
                        <span className="text-emerald-500">🐱 {players[1].name}: {players[1].matches}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-xs text-slate-400 uppercase font-black block">Time Tracker</span>
                      <span className="text-base font-black text-slate-700">{gameTime} seconds</span>
                    </div>
                  )}

                  {/* Pause Button */}
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setCurrentView('paused');
                    }}
                    id="pause-game-button"
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                      settings.highContrast
                        ? 'border-2 border-black bg-white text-black hover:bg-slate-100'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    Pause
                  </button>
                </div>
              </div>

              {/* Central Grid Board */}
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
                {/* Pet Companion Cheerleading Section */}
                <div className="w-full md:w-auto shrink-0">
                  <MascotCompanion lastEvent={companionEvent} highContrast={settings.highContrast} />
                </div>

                {/* Game Cards Board Grid */}
                <div className="flex-1 flex justify-center">
                  <div className={`grid gap-4 justify-items-center ${
                    cards.length <= 6
                      ? 'grid-cols-3'
                      : cards.length <= 8
                      ? 'grid-cols-4'
                      : cards.length <= 12
                      ? 'grid-cols-3 sm:grid-cols-4'
                      : 'grid-cols-4'
                  }`}>
                    {cards.map((card, idx) => (
                      <Card
                        key={card.uniqueId}
                        card={card}
                        theme={theme}
                        onClick={() => handleCardClick(idx)}
                        reducedMotion={settings.reducedMotion}
                        highContrast={settings.highContrast}
                        slowMotion={settings.animationSpeed === 'slow'}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Level Helpers Bar (Hints & Shuffling options) */}
              <div className="flex justify-center gap-3 mt-4">
                {/* Hint Button */}
                <button
                  onClick={triggerHint}
                  disabled={hintsLeft <= 0 || hintActive || !canFlip}
                  id="game-hint-button"
                  className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all ${
                    hintsLeft <= 0 || hintActive || !canFlip
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : settings.highContrast
                      ? 'border-2 border-black bg-white text-black'
                      : 'bg-amber-100/50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Use Hint ({hintsLeft})</span>
                </button>

                {/* Shuffle Cards Button */}
                <button
                  onClick={triggerShuffle}
                  disabled={shufflesLeft <= 0 || !canFlip}
                  id="game-shuffle-button"
                  className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all ${
                    shufflesLeft <= 0 || !canFlip
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : settings.highContrast
                      ? 'border-2 border-black bg-white text-black'
                      : 'bg-indigo-100/50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  <Shuffle className="w-4 h-4 text-indigo-500" />
                  <span>Shuffle ({shufflesLeft})</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. PAUSED SCREEN OVERLAY */}
          {currentView === 'paused' && (
            <motion.div
              key="paused-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center w-full max-w-sm flex flex-col items-center gap-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800">Game Paused</h2>
                <p className="text-slate-400 text-xs mt-1">Take your time. Deep breath in, deep breath out 🧘</p>
              </div>

              {/* Pause Actions */}
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setCurrentView('playing');
                  }}
                  id="resume-button"
                  className={`py-3.5 rounded-2xl font-black text-sm transition-all shadow-xs ${
                    settings.highContrast
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-105'
                  }`}
                >
                  Resume Game
                </button>

                <button
                  onClick={() => {
                    audioSynth.playClick();
                    startPlayingGame(difficulty, theme, isMultiplayer);
                  }}
                  id="restart-button"
                  className={`py-3.5 rounded-2xl font-bold text-sm transition-all border ${
                    settings.highContrast
                      ? 'border-black text-black bg-white hover:bg-slate-100'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Restart Board
                </button>

                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setShowSettings(true);
                  }}
                  id="paused-settings-button"
                  className={`py-3.5 rounded-2xl font-bold text-sm transition-all border ${
                    settings.highContrast
                      ? 'border-black text-black bg-white hover:bg-slate-100'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Accessibility Settings
                </button>

                <button
                  onClick={() => {
                    audioSynth.playClick();
                    setCurrentView('home');
                    setIsPlaying(false);
                  }}
                  id="quit-button"
                  className="py-3.5 rounded-2xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all mt-2"
                >
                  Quit to Main Menu
                </button>
              </div>
            </motion.div>
          )}

          {/* 6. HOW TO PLAY SCREEN */}
          {currentView === 'how-to-play' && (
            <motion.div
              key="how-to-play-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-lg flex flex-col gap-6"
            >
              <button
                onClick={() => {
                  audioSynth.playClick();
                  setCurrentView('home');
                }}
                id="how-back-button"
                className="self-start flex items-center gap-1 text-xs font-black text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Back Home</span>
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800">How to Play</h2>
                <p className="text-slate-400 text-xs mt-1">Simple guidelines to matching objects and having fun!</p>
              </div>

              {/* Steps */}
              <div className="space-y-4 text-left">
                {[
                  { step: '1', title: 'Tap a Card', desc: 'Click or tap any face-down card to reveal its friendly illustration and name label.' },
                  { step: '2', title: 'Find Its Partner', desc: 'Tap another card. If the drawings match exactly, they stay visible on the screen!' },
                  { step: '3', title: 'Collect Your Rewards', desc: 'Matching cards earns you cute stars, virtual coins, and stickers for your toy chest.' },
                  { step: '4', title: 'Earn Your Certificate', desc: 'Clearing all cards on the board displays a beautiful printable completion award!' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`p-4 rounded-2xl border flex items-start gap-4 ${
                      settings.highContrast ? 'border-black bg-white' : 'bg-white border-sky-100'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-black text-sm flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-700">{s.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  audioSynth.playClick();
                  setCurrentView('home');
                }}
                id="how-start-button"
                className={`py-4 rounded-2xl font-black text-sm transition-all shadow-md ${
                  settings.highContrast
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-105'
                }`}
              >
                Let's Play Now!
              </button>
            </motion.div>
          )}

          {/* 7. STATISTICS VIEW */}
          {currentView === 'stats' && (
            <motion.div
              key="stats-view-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-lg flex flex-col gap-6"
            >
              <button
                onClick={() => {
                  audioSynth.playClick();
                  setCurrentView('home');
                }}
                id="stats-back-button"
                className="self-start flex items-center gap-1 text-xs font-black text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Back Home</span>
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800">My Game Stats</h2>
                <p className="text-slate-400 text-xs mt-1">Look at all your beautiful focusing milestones!</p>
              </div>

              {/* Stats Card Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                {[
                  { label: 'Completed Games', value: stats.gamesWon, desc: 'Total boards fully cleared', emoji: '🏆' },
                  { label: 'Total Matches', value: stats.matchesFound, desc: 'Pairs successfully matched', emoji: '⭐' },
                  { label: 'Accuracy Rating', value: `${stats.totalFlips > 0 ? Math.round((stats.correctFlips / stats.totalFlips) * 100) : 0}%`, desc: 'Precision in flipping', emoji: '🎯' },
                  { label: 'Stars Gathered', value: stats.starsCollected, desc: 'Stars won from gameplay', emoji: '✨' },
                  { label: 'Max Matching Streak', value: stats.longestStreak, desc: 'Consecutive matches found', emoji: '🔥' },
                  { label: 'Toy Chest Stickers', value: profile.stickers.length, desc: 'Unlocked stickers owned', emoji: '🎁' },
                ].map((st, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                      settings.highContrast ? 'border-black bg-white text-black' : 'bg-white border-sky-100 shadow-xs'
                    }`}
                  >
                    <span className="text-3xl">{st.emoji}</span>
                    <div>
                      <span className="block font-bold text-sm text-slate-700 leading-tight">{st.label}</span>
                      <span className="block text-xl font-black text-indigo-600 mt-1 leading-none">{st.value}</span>
                      <span className="text-[10px] text-slate-400 block mt-1">{st.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  audioSynth.playClick();
                  setCurrentView('home');
                }}
                id="stats-done-button"
                className={`py-3.5 rounded-2xl font-black text-sm transition-all ${
                  settings.highContrast
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* MODALS & OVERLAYS */}

      {/* 1. SETTINGS PANEL */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSettingsChange={(updated) => saveState(undefined, updated)}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettings(false)}
          highContrast={settings.highContrast}
        />
      )}

      {/* 2. ACHIEVEMENTS LIST */}
      {showAchievements && (
        <AchievementsModal
          achievements={achievements}
          stats={stats}
          onClose={() => setShowAchievements(false)}
          highContrast={settings.highContrast}
        />
      )}

      {/* 3. TOY STAR SHOP */}
      {showShop && (
        <StarShop
          profile={profile}
          onPurchaseComplete={(updated) => saveState(updated)}
          onClose={() => setShowShop(false)}
          highContrast={settings.highContrast}
        />
      )}

      {/* 4. LUCKY REWARD SPIN WHEEL */}
      {showWheel && (
        <LuckyWheel
          onRewardUnlocked={handleStickerUnlocked}
          onClose={() => setShowWheel(false)}
          highContrast={settings.highContrast}
        />
      )}

      {/* 5. CERTIFICATE SCREEN */}
      {showCertificate && (
        <Certificate
          playerName={isMultiplayer ? players[currentPlayerIdx].name : (profile.name || 'Explorer')}
          starsEarned={isMultiplayer ? players[currentPlayerIdx].stars : Math.round(cards.length / 2)}
          accuracy={stats.totalFlips > 0 ? Math.round((stats.correctFlips / stats.totalFlips) * 100) : 100}
          timeSeconds={gameTime}
          difficulty={difficulty}
          theme={theme}
          onNextLevel={() => {
            setShowCertificate(false);
            // Move up difficulty level automatically or pick next theme
            const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];
            const nextIdx = (difficulties.indexOf(difficulty) + 1) % difficulties.length;
            const nextDiff = difficulties[nextIdx];
            setDifficulty(nextDiff);
            startPlayingGame(nextDiff, theme, isMultiplayer);
          }}
          onReplay={() => {
            setShowCertificate(false);
            startPlayingGame(difficulty, theme, isMultiplayer);
          }}
          onHome={() => {
            setShowCertificate(false);
            setCurrentView('home');
          }}
          highContrast={settings.highContrast}
        />
      )}

      {/* CORE THEMED FOOTER */}
      <footer className={`mt-8 py-4 px-6 md:px-16 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:justify-between z-10 border-t border-slate-100/60 ${
        settings.darkMode
          ? 'bg-slate-900/80 text-slate-300'
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        {/* Daily Goal section */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[#90A4AE] text-xs uppercase tracking-widest font-black font-sans text-center md:text-left">Daily Goal</span>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="w-48 h-3 bg-[#ECEFF1] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#4DB6AC] rounded-full"
                  animate={{ width: `${Math.min((stats.gamesWon / 10) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-[#455A64] font-black text-sm font-sans">{Math.min(stats.gamesWon, 10)}/10</span>
            </div>
          </div>
        </div>

        {/* Dynamic theme stats & neurodivergent disclaimer */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3 select-none">
              <div className="w-9 h-9 rounded-full bg-[#FFD54F] border-2 border-white shadow-sm flex items-center justify-center text-sm">🦁</div>
              <div className="w-9 h-9 rounded-full bg-[#4FC3F7] border-2 border-white shadow-sm flex items-center justify-center text-sm">🍏</div>
              <div className="w-9 h-9 rounded-full bg-[#81C784] border-2 border-white shadow-sm flex items-center justify-center text-sm">⭐</div>
            </div>
            <p className="text-[#546E7A] text-xs font-black font-sans">
              {profile.unlockedThemes.length} Themes Unlocked
            </p>
          </div>

          <div className="text-[10px] text-slate-400 font-medium max-w-[280px] text-center md:text-right leading-tight border-t md:border-t-0 md:border-l border-slate-200/60 pt-2 md:pt-0 md:pl-4">
            Developed with safe, soothing colors and geometric balance for neurodivergent learning. © 2026.
          </div>
        </div>
      </footer>
    </div>
  );
}
