/**
 * Developer Easter Eggs & DevTools Console Greeting
 * - Konami Code Listener (↑ ↑ ↓ ↓ ← → ← → B A)
 * - DevTools Console ASCII Greeting & Engineering Artifacts
 */

export function initEasterEggs(onKonamiSuccess) {
  // 1. DevTools ASCII Art Banner
  const asciiBanner = `
%c  ____                  _ _     ____       _   _               
 / ___| _   _ _ __ ___ (_) |_  |  _ \\ __ _| |_| |__   ___  _ __ 
 \\___ \\| | | | '_ \` _ \\| | __| | |_) / _\` | __| '_ \\ / _ \\| '__|
  ___) | |_| | | | | | | | |_  |  _ < (_| | |_| | | | (_) | |   
 |____/ \\__,_|_| |_| |_|_|\\__| |_| \\_\\__,_|\\__|_| |_|\\___/|_|   

%c🚀 Welcome to Sumit Rathor's Portfolio Console!
✨ Looking under the hood? I appreciate engineers who inspect source code.
🛠️ Stack: React 18, Vite, Three.js Starfield, Vanilla CSS Design System.
💼 Available for Software Engineering & Full Stack Roles (< 24hr response).
📧 Email: sumitrathor906@gmail.com
🔗 GitHub: https://github.com/sumitrathor1

💡 PRO-TIP: Try pressing 'Ctrl + ~' or clicking the '>_ CLI' button to open the interactive Developer Terminal!
🎮 Secret: Enter the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) on the page for a surprise!
`;

  try {
    console.log(
      asciiBanner,
      'color: #00f2fe; font-weight: 800; font-family: monospace;',
      'color: #a855f7; font-size: 13px; font-weight: 600;'
    );
  } catch (err) {
    // Silent fail in restrictive environments
  }

  // 2. Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, b, a
  const konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];
  let konamiIndex = 0;

  const handleKeyDown = (e) => {
    // Skip if typing inside inputs or textareas
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) {
      return;
    }

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const expected = konamiSequence[konamiIndex].length === 1
      ? konamiSequence[konamiIndex].toLowerCase()
      : konamiSequence[konamiIndex];

    if (key === expected) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        if (typeof onKonamiSuccess === 'function') {
          onKonamiSuccess();
        }
      }
    } else {
      konamiIndex = 0;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
