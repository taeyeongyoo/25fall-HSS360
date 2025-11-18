import { initialSceneId, storyGraph } from './storyData.js';

const backgroundEl = document.getElementById('vn-background');
const dialogueEl = document.getElementById('vn-dialogue');
const sceneLabelEl = document.getElementById('vn-scene-label');
const speakerEl = document.getElementById('vn-speaker');
const textEl = document.getElementById('vn-text');
const optionsOverlayEl = document.getElementById('vn-options-overlay');
const optionsEl = document.getElementById('vn-options');
const optionTemplate = document.getElementById('vn-option-template');
const startScreenEl = document.getElementById('vn-start-screen');
const startButtonEl = document.getElementById('vn-start-button');
const startTitleEl = document.getElementById('vn-start-title');
const startSubtitleEl = document.getElementById('vn-start-subtitle');

const state = {
  currentSceneId: null,
  choicesLocked: false,
  currentLines: [],
  currentLineIndex: 0,
  optionsVisible: false
};

const startScreenDefaults = {
  title: startTitleEl?.textContent ?? '',
  subtitle: startSubtitleEl?.textContent ?? '',
  button: startButtonEl?.textContent ?? ''
};
const END_SCREEN_DELAY_MS = 3000;
let endScreenTimeoutId = null;

const sceneListeners = new Set();
const preloadedBackgrounds = new Set();

const gradientPattern = /gradient\(/i;
const colorPattern = /^(#|rgb|hsl)/i;

function formatBackground(background) {
  if (!background) return 'none';
  const trimmed = background.trim();
  if (trimmed.startsWith('url(') || gradientPattern.test(trimmed) || colorPattern.test(trimmed)) {
    return trimmed;
  }
  return `url('${trimmed}')`;
}

function extractImageUrl(background) {
  if (!background) return null;
  const trimmed = background.trim();
  if (trimmed.startsWith('url(')) {
    return trimmed
      .slice(4, -1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
  }
  if (gradientPattern.test(trimmed) || colorPattern.test(trimmed)) {
    return null;
  }
  return trimmed;
}

function preloadBackground(background) {
  const imageUrl = extractImageUrl(background);
  if (!imageUrl || preloadedBackgrounds.has(imageUrl)) return;

  const img = new Image();
  img.src = imageUrl;
  preloadedBackgrounds.add(imageUrl);
}

function preloadSceneAssets(sceneId) {
  const scene = storyGraph[sceneId];
  if (!scene) return;
  preloadBackground(scene.background);
  scene.options?.forEach(option => {
    if (option.next) {
      const nextScene = storyGraph[option.next];
      if (nextScene) {
        preloadBackground(nextScene.background);
      }
    }
  });
}

function setChoicesLocked(locked) {
  state.choicesLocked = Boolean(locked);
  if (optionsOverlayEl) {
    optionsOverlayEl.classList.toggle('is-locked', state.choicesLocked);
  }
}

function clearOptions() {
  optionsEl.innerHTML = '';
}

function createOptionButton(option) {
  const button = optionTemplate.content.firstElementChild.cloneNode(true);
  button.textContent = option.text;
  if (option.variant === 'secondary') {
    button.classList.add('is-secondary');
  }
  button.dataset.optionId = option.id ?? option.text;
  button.addEventListener('click', () => {
    if (state.choicesLocked) return;
    if (option.action) {
      handleOptionAction(option.action);
      return;
    }
    if (option.next) {
      goToScene(option.next);
    }
  });
  return button;
}

function renderOptions(scene) {
  clearOptions();
  if (!scene.options || scene.options.length === 0) {
    const button = optionTemplate.content.firstElementChild.cloneNode(true);
    button.textContent = 'Restart story';
    button.classList.add('is-secondary');
    button.addEventListener('click', () => goToScene(initialSceneId));
    optionsEl.appendChild(button);
    return;
  }

  scene.options.forEach(option => {
    const button = createOptionButton(option);
    optionsEl.appendChild(button);
  });
}

function applyFade(element) {
  element.classList.remove('fade-in');
  // trigger reflow so animation restarts
  void element.offsetWidth; // eslint-disable-line no-unused-expressions
  element.classList.add('fade-in');
}

function renderScene(sceneId) {
  const scene = storyGraph[sceneId];
  if (!scene) {
    console.warn(`Scene with id "${sceneId}" is missing.`);
    return;
  }

  state.currentSceneId = sceneId;
  state.currentLines = buildLineObjects(scene);
  state.currentLineIndex = 0;
  state.optionsVisible = false;
  applyFade(backgroundEl);
  applyFade(textEl);
  hideOptionsOverlay();
  backgroundEl.style.backgroundImage = formatBackground(scene.background);
  sceneLabelEl.textContent = scene.label ?? '';
  speakerEl.textContent = scene.speaker ?? '';
  updateDialogueText();
  updateDialoguePrompt();

  emitSceneChange(sceneId);
  preloadSceneAssets(sceneId);
}

function updateDialogueText() {
  const line = state.currentLines[state.currentLineIndex] ?? { text: '', speaker: '' };
  textEl.textContent = line.text ?? '';
  const scene = storyGraph[state.currentSceneId];
  const resolvedSpeaker = line.speaker ?? scene?.speaker ?? '';
  speakerEl.textContent = resolvedSpeaker;
}

function updateDialoguePrompt() {
  if (!dialogueEl) return;
  const hasLines = state.currentLines.length > 0;
  const moreLines = state.currentLineIndex < state.currentLines.length - 1;
  const awaitingOptions = hasLines && !state.optionsVisible;
  const showPrompt = hasLines && (moreLines || awaitingOptions);
  dialogueEl.classList.toggle('is-waiting', showPrompt);
}

function hideOptionsOverlay() {
  if (!optionsOverlayEl) return;
  optionsOverlayEl.classList.remove('is-visible', 'is-locked');
  optionsOverlayEl.setAttribute('aria-hidden', 'true');
}

function showOptionsOverlay(scene) {
  if (!optionsOverlayEl) return;
  state.optionsVisible = true;
  renderOptions(scene);
  optionsOverlayEl.classList.add('is-visible');
  optionsOverlayEl.setAttribute('aria-hidden', 'false');
  updateDialoguePrompt();
}

function buildLineObjects(scene) {
  const fallbackSpeaker = scene?.speaker ?? '';
  const rawLines =
    Array.isArray(scene?.lines) && scene.lines.length > 0
      ? scene.lines
      : scene?.text
      ? [scene.text]
      : [''];
  return rawLines.map(line => normalizeLine(line, fallbackSpeaker));
}

function normalizeLine(line, fallbackSpeaker = '') {
  if (line && typeof line === 'object') {
    const text = line.text ?? '';
    const speaker = line.speaker ?? fallbackSpeaker;
    return { text, speaker };
  }
  const raw = String(line ?? '');
  const trimmed = raw.trimStart();
  const match = trimmed.match(/^([A-Za-z가-힣0-9_'"\s&·\-]+?):\s+/);
  if (match) {
    const speaker = match[1].replace(/^["']|["']$/g, '').trim();
    const text = trimmed.slice(match[0].length);
    return { text, speaker };
  }
  return { text: trimmed, speaker: fallbackSpeaker };
}

function handleDialogueAdvance() {
  if (!state.currentLines.length) return;
  const scene = storyGraph[state.currentSceneId];
  if (!scene) return;
  const moreLines = state.currentLineIndex < state.currentLines.length - 1;
  if (moreLines) {
    state.currentLineIndex += 1;
    updateDialogueText();
    updateDialoguePrompt();
    return;
  }
  if (!state.optionsVisible) {
    showOptionsOverlay(scene);
  }
}

function emitSceneChange(sceneId) {
  sceneListeners.forEach(listener => listener(sceneId));
}

function goToScene(sceneId) {
  renderScene(sceneId);
}

function onSceneChange(listener) {
  if (typeof listener === 'function') {
    sceneListeners.add(listener);
    return () => sceneListeners.delete(listener);
  }
  return () => {};
}

function hideStartScreen() {
  if (!startScreenEl) return;
  clearTimeout(endScreenTimeoutId);
  configureStartScreen('start');
  startScreenEl.classList.add('is-hidden');
  startScreenEl.setAttribute('aria-hidden', 'true');
}

function startStory() {
  hideStartScreen();
  renderScene(initialSceneId);
}

function configureStartScreen(mode = 'start') {
  if (!startScreenEl) return;
  if (mode === 'end') {
    startScreenEl.classList.add('is-the-end');
    if (startTitleEl) {
      startTitleEl.textContent = 'THE END';
    }
    if (startSubtitleEl) {
      startSubtitleEl.textContent =
        startScreenDefaults.subtitle || '사씨남정기: 교씨의 변론';
    }
    if (startButtonEl) {
      startButtonEl.textContent = '';
    }
  } else {
    startScreenEl.classList.remove('is-the-end');
    if (startTitleEl) startTitleEl.textContent = startScreenDefaults.title;
    if (startSubtitleEl) startSubtitleEl.textContent = startScreenDefaults.subtitle;
    if (startButtonEl) startButtonEl.textContent = startScreenDefaults.button;
  }
}

function showStartScreen(mode = 'start') {
  if (!startScreenEl) return;
  clearTimeout(endScreenTimeoutId);
  configureStartScreen(mode);
  startScreenEl.classList.remove('is-hidden');
  startScreenEl.setAttribute('aria-hidden', 'false');
  if (mode === 'end') {
    endScreenTimeoutId = setTimeout(() => {
      configureStartScreen('start');
    }, END_SCREEN_DELAY_MS);
  }
}

function returnToMainScreen() {
  hideOptionsOverlay();
  setChoicesLocked(false);
  state.currentSceneId = null;
  state.currentLines = [];
  state.currentLineIndex = 0;
  state.optionsVisible = false;
  sceneLabelEl.textContent = '';
  speakerEl.textContent = '';
  textEl.textContent = '';
  showStartScreen('end');
}

function handleOptionAction(action) {
  switch (action) {
    case 'returnToMain':
      returnToMainScreen();
      break;
    default:
      break;
  }
}

preloadSceneAssets(initialSceneId);

if (startButtonEl) {
  startButtonEl.addEventListener('click', startStory);
} else {
  renderScene(initialSceneId);
}

if (dialogueEl) {
  dialogueEl.addEventListener('click', handleDialogueAdvance);
}

// Expose minimal hooks for upcoming real-time integrations.
window.visualNovelApp = {
  getCurrentSceneId: () => state.currentSceneId,
  goToScene,
  lockChoices: setChoicesLocked,
  onSceneChange,
  preloadScene: preloadSceneAssets,
  startStory
};
