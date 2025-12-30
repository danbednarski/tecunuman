/**
 * Main entry point for the Tecun Uman game
 * 
 * This file orchestrates loading of all modules.
 * During the migration, it imports TypeScript modules and ensures
 * they're available before the legacy JS files run.
 * 
 * MIGRATION STRATEGY:
 * - i18n.ts: FULLY migrated, replaces i18n.js
 * - vocabulary.ts: Types defined, but vocabulary.js still provides data
 * - lessons.ts: Types defined, but lessons.js still provides data
 * - game.js: Not yet migrated
 */

// Import TypeScript modules (these will be compiled by Vite)
import { initI18n } from './i18n';

// The i18n module exposes its functions to window automatically,
// so the other JS files can use them.

// Note: vocabulary.ts and lessons.ts provide TYPE DEFINITIONS
// but the actual data/functions still come from vocabulary.js and lessons.js
// which are loaded via <script> tags in index.html

// Wait for DOM to be ready, then initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize i18n first (language detection, UI updates)
    initI18n();
    
    // The other initialization (difficulty, game) is handled by the legacy JS files
    // which are still loaded via <script> tags in index.html
});

