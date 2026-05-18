let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

/**
 * Play a synthesized sound effect for when a player is stunned (wrong answer or timeout)
 * Descending detuned buzzy tone followed by a thud.
 */
export const playStunSound = () => {
  try {
    initAudio();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    
    // Buzz Oscillator 1
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    
    // Slide frequency down from 190Hz to 60Hz to feel heavy and sad
    osc1.frequency.setValueAtTime(190, now);
    osc1.frequency.linearRampToValueAtTime(60, now + 0.5);
    
    osc2.frequency.setValueAtTime(186, now);
    osc2.frequency.linearRampToValueAtTime(56, now + 0.5);
    
    // Volume envelope
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  } catch (e) {
    console.warn('Failed to play audio:', e);
  }
};

/**
 * Play a synthesized combo celebration sound
 * Rising chiming arpeggio where the scale rises with combo count.
 * For combo >= 3, adds a crowd cheer/whoosh sweep.
 */
export const playComboSound = (comboCount) => {
  try {
    initAudio();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    
    // Notes: C5, D5, E5, F5, G5, A5, B5, C6
    const baseFreqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    
    const notesCount = Math.min(2 + comboCount, 6);
    const noteDuration = 0.08;
    
    for (let i = 0; i < notesCount; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const noteIdx = (i * 2) % baseFreqs.length;
      // Shift pitch higher for epic combos!
      const freq = baseFreqs[noteIdx] * (comboCount >= 5 ? 1.5 : 1);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * noteDuration);
      
      // Plucky volume envelope
      gain.gain.setValueAtTime(0.12, now + i * noteDuration);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * noteDuration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * noteDuration);
      osc.stop(now + (i + 1.5) * noteDuration);
    }
    
    // Crowd cheer effect on high combos
    if (comboCount >= 3) {
      playCheerSweep(comboCount);
    }
  } catch (e) {
    console.warn('Failed to play audio:', e);
  }
};

/**
 * Crowd sweep / wind whoosh synthesizer for high combos
 */
const playCheerSweep = (comboCount) => {
  const ctx = audioCtx;
  const now = ctx.currentTime;
  
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Fill buffer with white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  
  // High pass filter sweeping upward to sound like a crowd cheering / rising sweep
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(1000 + comboCount * 120, now + 1.0);
  filter.Q.setValueAtTime(1.5, now);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noiseSource.start(now);
  noiseSource.stop(now + 1.3);
};

/**
 * Play an epic triumphant victory major fanfare
 */
export const playWinSound = () => {
  try {
    initAudio();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    
    // Major scale fanfare: C4 -> E4 -> G4 -> C5
    const notes = [
      { freq: 261.63, time: 0 },   // C4
      { freq: 329.63, time: 0.15 }, // E4
      { freq: 392.00, time: 0.3 },  // G4
      { freq: 523.25, time: 0.45 }, // C5
    ];
    
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now + note.time);
      
      // Add a nice retro vibrato to the final high note
      if (note.freq === 523.25) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 6; 
        lfoGain.gain.value = 8;  
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now + note.time);
        lfo.stop(now + 1.6);
      }
      
      gain.gain.setValueAtTime(0.18, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + 1.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + note.time);
      osc.stop(now + note.time + 1.2);
    });
    
    // Play quick bright chime sweep in the background
    playChimeSweep();
  } catch (e) {
    console.warn('Failed to play audio:', e);
  }
};

const playChimeSweep = () => {
  const ctx = audioCtx;
  const now = ctx.currentTime;
  const chimes = [523, 659, 784, 987, 1046, 1318, 1568];
  
  chimes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + 0.35 + i * 0.04);
    
    gain.gain.setValueAtTime(0.08, now + 0.35 + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + i * 0.04 + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + 0.35 + i * 0.04);
    osc.stop(now + 0.35 + i * 0.04 + 0.4);
  });
};

/**
 * Play a heavy, sad descending minor tone that fades away tragically
 */
export const playLoseSound = () => {
  try {
    initAudio();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    
    // Sad minor descent: G3 -> Eb3 -> C3 -> G2
    const notes = [
      { freq: 196.00, time: 0 },    // G3
      { freq: 155.56, time: 0.22 },  // Eb3
      { freq: 130.81, time: 0.44 },  // C3
      { freq: 98.00,  time: 0.66 }   // G2 (Bass Drop)
    ];
    
    notes.forEach((note, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.freq, now + note.time);
      
      // Slur the lowest bass note downwards even more
      if (index === 3) {
        osc.frequency.exponentialRampToValueAtTime(55, now + note.time + 1.1);
      }
      
      gain.gain.setValueAtTime(0.16, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + 1.4);
      
      // Filter out high irritating buzzy harmonics to make it dark and muddy
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + note.time);
      osc.stop(now + note.time + 1.5);
    });
  } catch (e) {
    console.warn('Failed to play audio:', e);
  }
};
