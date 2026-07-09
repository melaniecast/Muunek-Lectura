'use client';

import React, { useState, useEffect } from 'react';
import { CrayonDoodleImage } from '@/app/page.js'; // Import the same doodle image fallback

export default function LearnWordsGame({ activeLetter = 'F', vocabulary = [], onCompleted }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [solved, setSolved] = useState(false);
  const [shakingIdx, setShakingIdx] = useState(null);

  const currentItem = vocabulary[currentWordIdx];
  const targetWord = currentItem ? currentItem.word : '';
  const fallbackEmoji = currentItem ? currentItem.emoji : '';

  // Generate options (1 correct, 2 random distractors)
  useEffect(() => {
    if (!targetWord) return;

    const firstLetter = targetWord.charAt(0).toUpperCase();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const distractors = [];

    while (distractors.length < 2) {
      const char = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (char !== firstLetter && !distractors.includes(char)) {
        distractors.push(char);
      }
    }

    const allOptions = [firstLetter, ...distractors];
    
    // Shuffle options array
    const shuffled = allOptions
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    Promise.resolve().then(() => {
      setOptions(shuffled);
      setSolved(false);
      setShakingIdx(null);
    });
  }, [currentWordIdx, targetWord]);

  // Handle letter option click
  const handleOptionClick = (letter, idx) => {
    if (solved) return;

    const firstLetter = targetWord.charAt(0).toUpperCase();

    if (letter === firstLetter) {
      setSolved(true);
      speakWord(targetWord);

      // Play victory audio/mascot trigger
      if (typeof window !== 'undefined' && window.AudioContext) {
        // synthesize simple cute success beep
        playSuccessBeep();
      }

      // Advance after 1.5 seconds
      setTimeout(() => {
        if (currentWordIdx < vocabulary.length - 1) {
          setCurrentWordIdx(prev => prev + 1);
        } else {
          // Finished all words
          if (onCompleted) {
            onCompleted();
          }
        }
      }, 1500);
    } else {
      // Incorrect guess - trigger shake animation
      setShakingIdx(idx);
      playWrongBuzz();
      setTimeout(() => setShakingIdx(null), 500);
    }
  };

  const playSuccessBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  };

  const playWrongBuzz = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  const speakWord = (word) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentItem) {
    return <div className="text-slate-400 font-bold animate-pulse text-sm">No vocabulary words...</div>;
  }

  // Split target word into individual characters for segmented display
  const firstChar = targetWord.charAt(0);
  const restChars = targetWord.slice(1).split('');

  return (
    <div className="w-full flex flex-col items-center gap-6 max-w-[500px] animate-slide-up select-none">
      
      {/* Upper Section: Crayon sticker illustration and segment slots */}
      <div 
        className="w-full bg-white border-[6px] border-slate-700 p-6 flex flex-col items-center gap-6 shadow-[0_12px_0_#475569] relative"
        style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
      >
        {/* Large Illustration / Emoji */}
        <div className="w-32 h-32 flex items-center justify-center bg-slate-50 border-4 border-dashed border-slate-200 rounded-[28px] p-3 shadow-inner">
          <CrayonDoodleImage word={targetWord} fallbackEmoji={fallbackEmoji} />
        </div>

        {/* Segmented Word Slots ([?] [o] [g]) */}
        <div className="flex gap-2.5 items-center justify-center">
          
          {/* Missing first letter slot */}
          <div 
            className={`w-14 h-14 md:w-16 md:h-16 rounded-[18px] border-4 flex items-center justify-center font-sans font-black text-2xl md:text-3xl transition-all duration-300 ${
              solved 
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700 animate-bounce scale-110 shadow-sm' 
                : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
            }`}
          >
            {solved ? firstChar : '?'}
          </div>

          {/* Rest of the word letters */}
          {restChars.map((char, index) => (
            <div 
              key={index}
              className="w-14 h-14 md:w-16 md:h-16 rounded-[18px] border-4 border-slate-700 bg-white flex items-center justify-center font-sans font-black text-2xl md:text-3xl text-slate-800 shadow-[0_4px_0_#334155]"
            >
              {char}
            </div>
          ))}

        </div>
      </div>

      {/* Progress Indicators Bar */}
      <div className="text-xs font-black text-slate-400 mt-2">
        Word {currentWordIdx + 1} of {vocabulary.length}
      </div>

      {/* Lower Section: 3 circular options */}
      <div className="flex justify-center gap-6 mt-2 w-full max-w-sm">
        {options.map((letter, idx) => {
          const isShaking = shakingIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(letter, idx)}
              disabled={solved}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-[6px] border-slate-700 shadow-[0_8px_0_#475569] bg-white flex items-center justify-center font-sans font-black text-2xl md:text-3xl text-slate-800 hover:scale-105 active:translate-y-1 active:shadow-[0_4px_0_#475569] transition-all cursor-pointer ${
                isShaking ? 'animate-shake border-rose-500 shadow-[0_8px_0_#be123c]' : ''
              } ${solved ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {letter}
            </button>
          );
        })}
      </div>

    </div>
  );
}
