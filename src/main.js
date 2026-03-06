import './style.css';

/**
 * Failbell Workshop App - Main Audio Application Logic
 * Implements centralized audio state management, UI synchronization, and keyboard shortcuts.
 */

// Global State
const state = {
  currentAudio: null,
  currentBellId: null,
  isPlaying: false,
  volume: 1.0
};

// Positive Feedback Messages for Psychological Safety
const feedbackMessages = [
  "本気の失敗にこそ価値がある！",
  "失敗は、次への貴重なデータだ。",
  "ナイス・チャレンジ！",
  "素晴らしいトライです！",
  "まずはやってみたことに拍手！",
  "完璧じゃなくていい、進もう！",
  "それは、挑戦の証ですね！",
  "ナイストライ！次へ活かそう"
];

// DOM Elements
const elements = {
  bells: Array.from(document.querySelectorAll('.bell-btn')),
  btnPlayPause: document.getElementById('btn-play-pause'),
  iconPlay: document.getElementById('icon-play'),
  iconPause: document.getElementById('icon-pause'),
  btnStop: document.getElementById('btn-stop'),
  volumeSlider: document.getElementById('volume-slider')
};

// Map shortcuts 1-5 to array indices for easy access
const bellShortcuts = {
  '1': 0, '2': 1, '3': 2, '4': 3, '5': 4
};

document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
});

function initEventListeners() {
  // Bell Buttons Click
  elements.bells.forEach((btn, index) => {
    btn.addEventListener('click', () => handleBellClick(btn, index));
  });

  // Global Controls Click
  elements.btnPlayPause.addEventListener('click', togglePlayPause);
  elements.btnStop.addEventListener('click', stopAudio);

  // Volume Change
  elements.volumeSlider.addEventListener('input', (e) => {
    state.volume = parseFloat(e.target.value);
    if (state.currentAudio) {
      state.currentAudio.volume = state.volume;
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore input if user is typing elsewhere (e.g., if there were text fields)
    if (e.target.tagName === 'INPUT') return;

    if (e.key in bellShortcuts) {
      const index = bellShortcuts[e.key];
      const btn = elements.bells[index];
      if (btn) handleBellClick(btn, index);
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault(); // Prevent page scroll
      togglePlayPause();
    } else if (e.key === 'Escape') {
      stopAudio();
    }
  });
}

/**
 * Handle individual bell button click
 */
function handleBellClick(btn, index) {
  const soundFile = btn.getAttribute('data-sound');
  if (!soundFile) return;

  // Add a quick physical click feedback
  btn.classList.add('scale-95');
  setTimeout(() => btn.classList.remove('scale-95'), 150);

  // If clicking the same active bell, toggle play/pause instead
  if (state.currentBellId === btn.id) {
    // We restart it from beginning if it was finished, else toggle
    if (state.currentAudio && state.currentAudio.ended) {
      playNewAudio(btn, soundFile);
    } else {
      togglePlayPause();
    }
    return;
  }

  // Otherwise, play the new selected sound entirely
  playNewAudio(btn, soundFile);
}

/**
 * Loads and plays a newly selected audio file
 */
function playNewAudio(btn, soundFile) {
  // Stop existing audio immediately
  if (state.currentAudio) {
    state.currentAudio.pause();
    state.currentAudio.currentTime = 0;
  }

  clearAllActiveVisuals();

  // Create new audio instance
  const audio = new Audio(`./assets/sounds/${soundFile}`);
  audio.volume = state.volume;

  // Audio lifecycle events
  audio.addEventListener('ended', onAudioEnded);
  audio.addEventListener('play', () => updateUIControlStatus(true));
  audio.addEventListener('pause', () => updateUIControlStatus(false));

  state.currentAudio = audio;
  state.currentBellId = btn.id;

  // Visuals & Positive Feedback
  setActiveVisuals(btn);
  showPositiveFeedback();

  // Play
  audio.play().catch(err => console.error('Audio playback failed:', err));
}

/**
 * Toggles Play/Pause state of the currently loaded audio
 */
function togglePlayPause() {
  if (!state.currentAudio) return; // Nothing loaded yet

  // If audio had ended but we hit play again, reset to 0
  if (state.currentAudio.ended) {
    state.currentAudio.currentTime = 0;
    state.currentAudio.play();
  } else if (state.currentAudio.paused) {
    state.currentAudio.play();
  } else {
    state.currentAudio.pause();
  }
}

/**
 * Completely stops playback and resets time
 */
function stopAudio() {
  if (state.currentAudio) {
    state.currentAudio.pause();
    state.currentAudio.currentTime = 0;
  }
  clearAllActiveVisuals();
  updateUIControlStatus(false);
  state.isPlaying = false;
  // Keep the currentAudio object intact in case they hit play again (restarts).
}

/**
 * Fires when audio finishes natively
 */
function onAudioEnded() {
  updateUIControlStatus(false);
  // Visually keep it selected, but stop pulsing
  const activeBtn = document.getElementById(state.currentBellId);
  if (activeBtn) {
    const ring = activeBtn.querySelector('.active-ring');
    if (ring) ring.classList.remove('animate-pulse');
  }
}

/**
 * Updates the global control bar play/pause icons
 */
function updateUIControlStatus(isPlaying) {
  state.isPlaying = isPlaying;

  if (isPlaying) {
    elements.iconPlay.classList.add('hidden');
    elements.iconPause.classList.remove('hidden');

    // Resume pulsing on active ring
    const activeBtn = document.getElementById(state.currentBellId);
    if (activeBtn) {
      const ring = activeBtn.querySelector('.active-ring');
      if (ring) {
        ring.classList.add('opacity-100');
        ring.classList.add('animate-pulse');
      }
    }
  } else {
    elements.iconPlay.classList.remove('hidden');
    elements.iconPause.classList.add('hidden');

    // Remove pulsing but keep ring slightly visible
    const activeBtn = document.getElementById(state.currentBellId);
    if (activeBtn) {
      const ring = activeBtn.querySelector('.active-ring');
      if (ring) ring.classList.remove('animate-pulse');
    }
  }
}

/**
 * Adds the visual indicator to the currently selected bell
 */
function setActiveVisuals(btn) {
  const ring = btn.querySelector('.active-ring');
  if (ring) {
    ring.classList.remove('opacity-0');
    ring.classList.add('opacity-100', 'animate-pulse');
  }
}

/**
 * Removes the visual indicators from all bells
 */
function clearAllActiveVisuals() {
  elements.bells.forEach(b => {
    const ring = b.querySelector('.active-ring');
    if (ring) {
      ring.classList.remove('opacity-100', 'animate-pulse');
      ring.classList.add('opacity-0');
    }
  });
}

/**
 * Displays a transient positive feedback toast
 */
function showPositiveFeedback() {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Select random message
  const msg = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'bg-white/90 backdrop-blur-md shadow-lg border border-indigo-100 rounded-2xl px-5 py-3 text-indigo-700 font-medium tracking-wide text-sm md:text-base transform transition-all duration-500 ease-out translate-y-4 opacity-0';
  toast.textContent = msg;

  // Append and animate in
  container.appendChild(toast);

  // Trigger reflow to ensure the transition applies
  void toast.offsetWidth;

  toast.classList.remove('translate-y-4', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  // Animate out and remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('-translate-y-4', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 500); // Wait for fade out transition
  }, 3500);
}

