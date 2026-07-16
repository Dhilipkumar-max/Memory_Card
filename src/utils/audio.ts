// Web Audio API Synth for Autism-Friendly Memory Adventure
// Generates soft, pastel, sensory-friendly sound waves with zero external assets.

class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private isMusicPlaying = false;
  private soundEnabled = true;
  private musicEnabled = true;
  private volumeLevel = 0.5;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopAmbientMusic();
    } else {
      this.startAmbientMusic();
    }
  }

  setVolume(vol: number) {
    this.volumeLevel = Math.max(0, Math.min(1, vol));
  }

  // Play a soft, non-invasive click sound for buttons
  playClick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Calming middle-frequency click
    osc.frequency.setValueAtTime(350, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(this.volumeLevel * 0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Soft flip pop for card flipping
  playFlip() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle'; // softer than sine/square, warm tone
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(this.volumeLevel * 0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.13);
  }

  // Beautiful major arpeggio chime for matching cards
  playMatchSuccess() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 (Soft, comforting major chord)

    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.07);

      const noteVolume = this.volumeLevel * 0.25;
      gain.gain.setValueAtTime(0, now + index * 0.07);
      gain.gain.linearRampToValueAtTime(noteVolume, now + index * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + index * 0.07);
      osc.stop(now + index * 0.07 + 0.4);
    });
  }

  // Play a soft, happy celebration song on game win
  playLevelComplete() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Comforting pentatonic melody (C major): C4, D4, E4, G4, A4, C5
    const melody = [
      { f: 261.63, d: 0.15 }, // C4
      { f: 293.66, d: 0.15 }, // D4
      { f: 329.63, d: 0.15 }, // E4
      { f: 392.00, d: 0.15 }, // G4
      { f: 440.00, d: 0.15 }, // A4
      { f: 523.25, d: 0.35 }, // C5
    ];

    let currentOffset = 0;
    melody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + currentOffset);

      gain.gain.setValueAtTime(0, now + currentOffset);
      gain.gain.linearRampToValueAtTime(this.volumeLevel * 0.2, now + currentOffset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + currentOffset + note.d - 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + currentOffset);
      osc.stop(now + currentOffset + note.d);

      currentOffset += note.d * 0.85; // slight overlap
    });
  }

  // Ambient gentle music loop: very low-frequency warm chords playing slowly
  startAmbientMusic() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.isMusicPlaying = true;
    const playChordSequence = () => {
      if (!this.musicEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      // Gentle chord progressions in C Major / F Major / G Major, soft and slow
      // Chord 1: C Major (C3, E3, G3, C4)
      // Chord 2: F Major (F3, A3, C4, F4)
      // Chord 3: G Major (G3, B3, D4, G4)
      // Chord 4: Am (A3, C4, E4, A4)
      const chords = [
        [130.81, 164.81, 196.00, 261.63], // C
        [174.61, 220.00, 261.63, 349.23], // F
        [146.83, 196.00, 246.94, 293.66], // G (G-inverted or standard G)
        [220.00, 261.63, 329.63, 440.00], // Am
      ];

      const step = Math.floor(now / 5) % chords.length;
      const activeChord = chords[step];

      // Play soft pad chord
      activeChord.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine'; // pure and soft
        osc.frequency.setValueAtTime(freq, now);

        // Slow attack and slow decay to prevent popping and sound smooth (extremely calming)
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volumeLevel * 0.04, now + 1.5); // very soft
        gain.gain.linearRampToValueAtTime(this.volumeLevel * 0.04, now + 3.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 5.0);
      });
    };

    // Trigger chord every 4.8 seconds for smooth transitions
    playChordSequence();
    this.musicInterval = setInterval(playChordSequence, 4800);
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const audioSynth = new AudioSynthEngine();
