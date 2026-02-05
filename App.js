// createDeck.js
// Utility to manage decks in localStorage under the key "decks".

/**
 * Generate a short unique id using timestamp + random bits.
 * Collision extremely unlikely for typical usage.
 */
function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}

/** Load decks array from localStorage (returns [] if none or on parse error) */
function loadDecks() {
  try {
    const raw = localStorage.getItem('decks');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse decks from localStorage, returning empty array.', e);
    return [];
  }
}

/** Save decks array to localStorage */
function saveDecks(decks) {
  localStorage.setItem('decks', JSON.stringify(decks));
}

/**
 * createDeck(name)
 * - Adds a new deck with a unique id to the decks array and saves to localStorage.
 * - Returns the newly created deck object.
 *
 * Throws an Error if name is missing/empty.
 */
function createDeck(name) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new Error('createDeck: name is required and must be a non-empty string.');
  }

  const decks = loadDecks();
  const newDeck = {
    id: generateId(),
    name: name.trim(),
    cards: [] // start with empty cards array; shape can be adjusted as needed
  };

  decks.push(newDeck);
  saveDecks(decks);

  return newDeck;
}

// Export for module usage (uncomment if using modules)
// export { createDeck, loadDecks, saveDecks };
