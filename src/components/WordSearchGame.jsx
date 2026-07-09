'use client';

import React, { useState, useRef, useEffect } from 'react';

// Fallback vocabulary words containing the active letter if lesson vocabulary is short
const FALLBACK_WORDS = {
  A: ['ARM', 'MARCH', 'START', 'JAR'],
  B: ['BAT', 'BALL', 'BEAR', 'BABY'],
  C: ['CAT', 'CAKE', 'CAR', 'CUP'],
  D: ['DOG', 'DUCK', 'DOLL', 'DISH'],
  E: ['EGG', 'ELBOW', 'ELEPHANT', 'EXIT'],
  F: ['FISH', 'FOX', 'FROG', 'FOOT'],
  G: ['GOAT', 'GIRAFFE', 'GUM', 'GATE'],
  H: ['HAT', 'HOUSE', 'HEN', 'HAND'],
  I: ['IGLOO', 'INK', 'INSECT', 'ICE'],
  J: ['JAR', 'JAM', 'JELLY', 'JUMP'],
  K: ['KITE', 'KEY', 'KANGAROO', 'KING'],
  L: ['LION', 'LEAF', 'LEMON', 'LAMP'],
  M: ['MOM', 'MONKEY', 'MAP', 'MILK'],
  N: ['NEST', 'NUT', 'NOSE', 'NET'],
  O: ['OWL', 'OCTOPUS', 'ORANGE', 'ON'],
  P: ['PIG', 'PENCIL', 'PEAR', 'PIN'],
  Q: ['QUEEN', 'QUILT', 'QUIET', 'QUACK'],
  R: ['RAT', 'RING', 'ROSE', 'RAIN'],
  S: ['SUN', 'SNAKE', 'STAR', 'SAD'],
  T: ['TENT', 'TIGER', 'TOY', 'TREE'],
  U: ['UMBRELLA', 'UP', 'UNCLE', 'UNDER'],
  V: ['VAN', 'VASE', 'VEST', 'VIOLIN'],
  W: ['WIND', 'WEB', 'WOLF', 'WAGON'],
  X: ['XRAY', 'XYLOPHONE', 'BOX', 'FOX'],
  Y: ['YAK', 'YELLOW', 'YARN', 'YUM'],
  Z: ['ZEBRA', 'ZOO', 'ZIPPER', 'ZERO']
};

const getRandomCapsuleColor = (index) => {
  const colors = [
    'bg-rose-500/30 border-rose-400 text-rose-800',
    'bg-emerald-500/30 border-emerald-400 text-emerald-800',
    'bg-amber-500/30 border-amber-400 text-amber-800',
    'bg-indigo-500/30 border-indigo-400 text-indigo-800',
    'bg-purple-500/30 border-purple-400 text-purple-800',
    'bg-sky-500/30 border-sky-400 text-sky-800'
  ];
  return colors[index % colors.length];
};

// Procedural Word Search Grid Generator
const generateDynamicGrid = (targetLetter, wordsList) => {
  const size = 6; // A highly child-friendly 6x6 grid size
  const target = targetLetter.toUpperCase();

  // Consolidate target words (filter unique uppercase clean strings)
  let rawWords = (wordsList || []).map(w => w.toUpperCase().replace(/[^A-Z]/g, ''));
  
  // Complement with fallback list to ensure at least 3 words are present
  const fallbacks = FALLBACK_WORDS[target] || FALLBACK_WORDS.A;
  for (const w of fallbacks) {
    if (rawWords.length >= 4) break;
    if (!rawWords.includes(w)) {
      rawWords.push(w);
    }
  }

  // Ensure words fit in a 6x6 grid (max length 6)
  const cleanWords = rawWords.filter(w => w.length > 0 && w.length <= size).slice(0, 4);

  // Initialize empty grid
  let grid = Array.from({ length: size }, () => Array(size).fill(''));
  let solutions = [];

  // Placement Directions: Horizontal, Vertical, Diagonal
  const directions = [
    { r: 0, c: 1 },  // Right
    { r: 1, c: 0 },  // Down
    { r: 1, c: 1 }   // Diagonal Down-Right
  ];

  for (const word of cleanWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      
      const maxR = dir.r === 0 ? size : size - word.length + 1;
      const maxC = dir.c === 0 ? size : size - word.length + 1;

      if (maxR <= 0 || maxC <= 0) continue;

      const r = Math.floor(Math.random() * maxR);
      const c = Math.floor(Math.random() * maxC);

      // Verify letters overlap / boundaries
      let fits = true;
      const coords = [];

      for (let i = 0; i < word.length; i++) {
        const currR = r + dir.r * i;
        const currC = c + dir.c * i;
        const existingLetter = grid[currR][currC];
        
        if (existingLetter !== '' && existingLetter !== word[i]) {
          fits = false;
          break;
        }
        coords.push([currR, currC]);
      }

      if (fits) {
        coords.forEach(([currR, currC], i) => {
          grid[currR][currC] = word[i];
        });
        solutions.push({
          word,
          coords,
          color: getRandomCapsuleColor(solutions.length)
        });
        placed = true;
      }
    }
  }

  // Fill empty cells with random letters, sprinkling the target letter as distractor (30% probability)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        if (Math.random() < 0.3) {
          grid[r][c] = target;
        } else {
          grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }

  return { grid, solutions, words: cleanWords };
};

export default function WordSearchGame({ activeLetter = 'A', vocabulary = [], onGameCompleted }) {
  const [gameState, setGameState] = useState({ grid: [], solutions: [], words: [] });
  const [foundWords, setFoundWords] = useState([]);
  const [selection, setSelection] = useState(null); // { start: [r, c], end: [r, c], coords: [[r, c]] }
  const [isSelecting, setIsSelecting] = useState(false);
  const gridRef = useRef(null);

  const serializedVocab = (vocabulary || []).join(',');

  // Generate dynamic puzzle grid when activeLetter or vocabulary changes
  useEffect(() => {
    const puzzle = generateDynamicGrid(activeLetter, vocabulary);
    Promise.resolve().then(() => {
      setGameState(puzzle);
      setFoundWords([]);
      setSelection(null);
      setIsSelecting(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLetter, serializedVocab]);

  const isCoordsInArray = (coords, [r, c]) => {
    return coords.some(([cr, cc]) => cr === r && cc === c);
  };

  const getCellHighlights = (r, c) => {
    const list = [];
    gameState.solutions.forEach((sol) => {
      if (foundWords.includes(sol.word) && isCoordsInArray(sol.coords, [r, c])) {
        list.push(sol.color);
      }
    });

    if (selection && isCoordsInArray(selection.coords, [r, c])) {
      list.push('bg-indigo-200 border-indigo-400 text-indigo-900 scale-105 shadow-sm');
    }
    return list.join(' ');
  };

  const getLineCoordinates = (start, end) => {
    const [r1, c1] = start;
    const [r2, c2] = end;

    const dr = r2 - r1;
    const dc = c2 - c1;

    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) {
      return [start];
    }

    const coords = [];
    let currR = r1;
    let currC = c1;

    while (true) {
      coords.push([currR, currC]);
      if (currR === r2 && currC === c2) break;
      currR += stepR;
      currC += stepC;
    }
    return coords;
  };

  const handleCellStart = (r, c) => {
    setIsSelecting(true);
    setSelection({
      start: [r, c],
      end: [r, c],
      coords: [[r, c]]
    });
  };

  const handleCellEnter = (r, c) => {
    if (!isSelecting || !selection) return;

    const start = selection.start;
    const coords = getLineCoordinates(start, [r, c]);

    setSelection({
      start,
      end: [r, c],
      coords
    });
  };

  const handleSelectionEnd = () => {
    if (!isSelecting || !selection || gameState.grid.length === 0) return;
    setIsSelecting(false);

    const letters = selection.coords.map(([r, c]) => gameState.grid[r][c]).join('');
    const reverseLetters = [...selection.coords].reverse().map(([r, c]) => gameState.grid[r][c]).join('');

    const matchedSolution = gameState.solutions.find(
      (sol) => (sol.word === letters || sol.word === reverseLetters) && !foundWords.includes(sol.word)
    );

    if (matchedSolution) {
      const nextFound = [...foundWords, matchedSolution.word];
      setFoundWords(nextFound);
      speakWord(matchedSolution.word);

      if (nextFound.length === gameState.words.length) {
        setTimeout(() => {
          if (onGameCompleted) {
            onGameCompleted();
          }
        }, 1200);
      }
    }

    setSelection(null);
  };

  const speakWord = (word) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsSelecting(false);
      setSelection(null);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isSelecting]);

  if (gameState.grid.length === 0) {
    return <div className="text-slate-400 font-bold animate-pulse text-sm">Generating puzzle...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 max-w-[500px] select-none">
      
      {/* Sopa de Letras Grid */}
      <div 
        ref={gridRef}
        onMouseLeave={() => setIsSelecting(false) || setSelection(null)}
        className="grid bg-[#2d3748] border-8 border-slate-700 shadow-2xl p-4 rounded-[32px] gap-2 touch-none relative overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${gameState.grid[0].length}, minmax(0, 1fr))`,
        }}
      >
        {gameState.grid.map((row, r) => 
          row.map((letter, c) => {
            const highlightClass = getCellHighlights(r, c);
            const isBaseHighlighted = highlightClass !== '';
            
            return (
              <button
                key={`${r}-${c}`}
                onMouseDown={() => handleCellStart(r, c)}
                onMouseEnter={() => handleCellEnter(r, c)}
                onMouseUp={handleSelectionEnd}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  const element = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (element && element.dataset.row) {
                    handleCellStart(Number(element.dataset.row), Number(element.dataset.col));
                  }
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const element = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (element && element.dataset.row) {
                    handleCellEnter(Number(element.dataset.row), Number(element.dataset.col));
                  }
                }}
                onTouchEnd={handleSelectionEnd}
                data-row={r}
                data-col={c}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-sans font-black text-lg md:text-xl tracking-tight transition-all cursor-pointer border-2 ${
                  isBaseHighlighted 
                    ? highlightClass 
                    : 'bg-white/10 hover:bg-white/20 border-transparent text-white'
                }`}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      {/* Target Word List */}
      <div className="flex flex-wrap justify-center gap-3 w-full bg-slate-100 p-4 rounded-[24px] border-2 border-slate-200 shadow-inner">
        {gameState.words.map((word) => {
          const isFound = foundWords.includes(word);
          return (
            <span
              key={word}
              className={`px-4 py-1.5 rounded-full font-black text-xs md:text-sm tracking-wider transition-all duration-300 border-2 ${
                isFound
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-600 line-through opacity-70 scale-95'
                  : 'bg-white border-slate-300 text-slate-600'
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
      
    </div>
  );
}
