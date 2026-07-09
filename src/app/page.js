'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import leccion1Data from '@/content/leccion1.json';
import WordSearchGame from '@/components/WordSearchGame';
import LearnWordsGame from '@/components/LearnWordsGame';

// Crayon-doodle style Avatar components inspired by the user's sketch drawing
export const AvatarKodi = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full rounded-full p-1 bg-[#f0fdf4] shadow-inner">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#86efac" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M 24 35 C 14 26, 26 10, 36 20 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 76 35 C 86 26, 74 10, 64 20 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 23 54 C 21 32, 79 32, 77 54 C 75 76, 25 76, 23 54 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 25 30 Q 20 22 27 24" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
    <path d="M 75 30 Q 80 22 73 24" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
    <circle cx="40" cy="46" r="4.5" fill="#0f172a" />
    <circle cx="60" cy="46" r="4.5" fill="#0f172a" />
    <path d="M 38 60 C 38 52, 62 52, 62 60 Z" fill="#fef08a" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="57" r="3" fill="#0f172a" />
    <path d="M 44 63 Q 50 69 56 63" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AvatarRhea = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full rounded-full p-1 bg-[#fdf2f8] shadow-inner">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M 18 40 L 32 12 L 42 38 Z" fill="#fbcfe8" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 82 40 L 68 12 L 58 38 Z" fill="#fbcfe8" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 22 52 C 20 32, 80 32, 78 52 C 76 72, 24 72, 22 52 Z" fill="#fbcfe8" stroke="#ec4899" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="14" y1="50" x2="26" y2="52" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
    <line x1="12" y1="57" x2="24" y2="57" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
    <line x1="86" y1="50" x2="74" y2="52" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
    <line x1="88" y1="57" x2="76" y2="57" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
    <circle cx="38" cy="46" r="4.5" fill="#0f172a" />
    <circle cx="62" cy="46" r="4.5" fill="#0f172a" />
    <polygon points="50,54 46,49 54,49" fill="#0f172a" />
    <path d="M 44 58 Q 50 64 56 58" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const AvatarOllo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full rounded-full p-1 bg-[#eff6ff] shadow-inner">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M 26 40 C 8 34, 10 66, 26 60 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 74 40 C 92 34, 90 66, 74 60 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 28 50 C 28 32, 72 32, 72 50 C 72 68, 28 68, 28 50 Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="42" cy="44" r="3.5" fill="#0f172a" />
    <circle cx="58" cy="44" r="3.5" fill="#0f172a" />
    <path d="M 36 32 L 50 14 L 64 32 Z" fill="#818cf8" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 50 52 C 48 68, 62 70, 60 60" fill="none" stroke="#3b82f6" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AvatarSandy = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full rounded-full p-1 bg-[#fffbeb] shadow-inner">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#fde68a" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M 20 38 L 26 10 L 40 32 Z" fill="#fde68a" stroke="#d97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 80 38 L 74 10 L 60 32 Z" fill="#fde68a" stroke="#d97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 24 48 Q 50 76 76 48 Q 50 28 24 48 Z" fill="#fde68a" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="44" r="4" fill="#0f172a" />
    <circle cx="60" cy="44" r="4" fill="#0f172a" />
    <circle cx="50" cy="60" r="3.5" fill="#0f172a" />
    <path d="M 45 54 Q 50 58 55 54" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Green Bear Kodi Mascot in full crayon doodle sketch style
const KodiMascot = ({ bubbleText }) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 relative max-w-sm sm:max-w-md mx-auto">
    <div className="relative animate-bubble-float">
      <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36 drop-shadow-md">
        <ellipse cx="100" cy="180" rx="45" ry="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 50 120 C 25 100, 30 140, 50 135 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 150 120 C 175 100, 170 140, 150 135 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 75 165 C 60 180, 90 185, 85 165" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 125 165 C 110 180, 140 185, 135 165" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 62 55 C 44 40, 68 20, 78 48 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 138 55 C 156 40, 132 20, 122 48 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 64 48 Q 58 40 68 44" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 136 48 Q 142 40 132 44" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 52 135 C 50 95, 150 95, 148 135 C 146 175, 54 175, 52 135 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 75 135 C 75 115, 125 115, 125 135 C 125 155, 75 155, 75 135 Z" fill="#fef08a" stroke="#eab308" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />
        <path d="M 55 90 C 50 50, 150 50, 145 90 C 140 130, 60 130, 55 90 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="85" cy="80" r="5" fill="#0f172a" />
        <circle cx="115" cy="80" r="5" fill="#0f172a" />
        <path d="M 82 100 C 82 92, 118 92, 118 100 Z" fill="#fff" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="100" cy="95" rx="5" ry="3.5" fill="#0f172a" />
        <path d="M 94 103 Q 100 109 106 103" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>

    {bubbleText && (
      <div
        className="relative bg-white border-4 border-[#10b981] text-slate-800 text-base md:text-lg font-black p-4 shadow-md max-w-[240px] text-center animate-bounce-in"
        style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-4 h-4 bg-white border-l-4 border-b-4 border-[#10b981] rotate-45 hidden sm:block"></div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-4 border-l-4 border-[#10b981] rotate-45 sm:hidden"></div>
        {bubbleText}
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════
// VOCABULARY CRAYON DOODLE SVG SUBCOMPONENTS
// ═══════════════════════════════════════════

const DoodleSun = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <circle cx="50" cy="50" r="20" fill="#fef08a" stroke="#eab308" strokeWidth="4" />
    <path d="M 42 50 Q 50 56 58 50" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    <circle cx="42" cy="44" r="2.5" fill="#78350f" />
    <circle cx="58" cy="44" r="2.5" fill="#78350f" />
    <path d="M 50 12 L 50 22 M 50 78 L 50 88 M 12 50 L 22 50 M 78 50 L 88 50" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
    <path d="M 23 23 L 30 30 M 70 70 L 77 77 M 23 77 L 30 70 M 70 23 L 77 30" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const DoodleBee = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <ellipse cx="44" cy="28" rx="8" ry="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3.5" transform="rotate(-15 44 28)" />
    <ellipse cx="56" cy="28" rx="8" ry="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3.5" transform="rotate(15 56 28)" />
    <ellipse cx="50" cy="54" rx="26" ry="22" fill="#fef08a" stroke="#0f172a" strokeWidth="4" />
    <path d="M 40 33 Q 44 54 40 75" fill="none" stroke="#0f172a" strokeWidth="4.5" />
    <path d="M 52 32 Q 56 54 52 76" fill="none" stroke="#0f172a" strokeWidth="4.5" />
    <circle cx="68" cy="48" r="3.5" fill="#0f172a" />
    <circle cx="68" cy="58" r="1.5" fill="#0f172a" />
    <path d="M 72 53 Q 76 56 74 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DoodleDinosaur = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 22 75 C 22 55, 30 42, 42 36 C 48 33, 58 40, 64 30 Q 68 20, 62 12 Q 50 14, 48 24 M 62 12 Q 76 12, 74 26 C 72 40, 52 48, 48 68" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 38 32 L 34 26 L 42 30 M 28 42 L 22 36 L 30 40 M 20 54 L 14 50 L 22 52 M 18 66 L 12 64 L 20 66" fill="none" stroke="#10b981" strokeWidth="3" />
    <circle cx="64" cy="20" r="3" fill="#047857" />
    <path d="M 68 25 Q 64 27 62 23" fill="none" stroke="#047857" strokeWidth="2.5" />
  </svg>
);

const DoodleMoon = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 32 20 C 62 20, 78 45, 72 75 C 48 70, 28 50, 32 20 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 44 32 Q 52 52 62 62" fill="none" stroke="#fde047" strokeWidth="3" strokeDasharray="4 4" />
  </svg>
);

const DoodleCar = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 15 62 L 22 45 L 42 42 L 58 42 L 78 48 L 85 62 Z" fill="none" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 28 45 L 32 30 L 68 30 L 72 45" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="62" r="9" fill="none" stroke="#0f172a" strokeWidth="4" />
    <circle cx="32" cy="62" r="3" fill="#0f172a" />
    <circle cx="68" cy="62" r="9" fill="none" stroke="#0f172a" strokeWidth="4" />
    <circle cx="68" cy="62" r="3" fill="#0f172a" />
  </svg>
);

const DoodleWhale = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 18 52 C 22 32, 78 32, 82 52 C 80 68, 38 68, 18 52 Z" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 80 51 Q 92 38 90 58 Q 82 54 80 51" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 50 36 Q 45 20 38 23 M 50 36 Q 50 16 52 18 M 50 36 Q 55 20 62 23" fill="none" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="32" cy="45" r="3" fill="#1d4ed8" />
    <path d="M 32 52 Q 38 54 40 50" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DoodleBear = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <circle cx="50" cy="52" r="25" fill="none" stroke="#b45309" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="28" cy="30" r="9" fill="none" stroke="#b45309" strokeWidth="3.5" />
    <circle cx="72" cy="30" r="9" fill="none" stroke="#b45309" strokeWidth="3.5" />
    <ellipse cx="50" cy="60" rx="9" ry="6" fill="none" stroke="#b45309" strokeWidth="2.5" />
    <circle cx="50" cy="56" r="3" fill="#0f172a" />
    <circle cx="42" cy="44" r="3.5" fill="#0f172a" />
    <circle cx="58" cy="44" r="3.5" fill="#0f172a" />
    <path d="M 46 64 Q 50 67 54 64" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DoodleStar = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 50 12 L 61 36 L 88 38 L 68 56 L 74 82 L 50 68 L 26 82 L 32 56 L 12 38 L 39 36 Z" fill="none" stroke="#eab308" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 38 38 L 62 62 M 62 38 L 38 62" fill="none" stroke="#fde047" strokeWidth="2.5" strokeDasharray="3 3" />
  </svg>
);

const DoodleBoy = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <circle cx="50" cy="48" r="22" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 32 35 L 36 24 L 42 30 L 48 22 L 54 30 L 60 24 L 68 35" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="42" cy="44" r="3" fill="#1d4ed8" />
    <circle cx="58" cy="44" r="3" fill="#1d4ed8" />
    <path d="M 44 54 Q 50 60 56 54" fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const DoodleGirl = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <circle cx="50" cy="48" r="20" fill="none" stroke="#db2777" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 28 38 Q 12 32 20 22 Q 28 26 30 38" fill="none" stroke="#db2777" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 72 38 Q 88 32 80 22 Q 72 26 70 38" fill="none" stroke="#db2777" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="42" cy="45" r="3" fill="#be185d" />
    <circle cx="58" cy="45" r="3" fill="#be185d" />
    <path d="M 44 56 Q 50 62 56 56" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const DoodleCat = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 22 38 L 30 14 L 42 32" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 78 38 L 70 14 L 58 32" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 24 48 C 22 32, 78 32, 76 48 C 74 64, 26 64, 24 48 Z" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="44" r="3" fill="#0f172a" />
    <circle cx="60" cy="44" r="3" fill="#0f172a" />
    <path d="M 44 52 Q 50 56 56 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DoodleMom = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <circle cx="42" cy="38" r="14" fill="none" stroke="#b45309" strokeWidth="4" />
    <path d="M 26 38 Q 22 20 42 20 Q 62 20 58 38" fill="none" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="64" cy="58" r="10" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
    <circle cx="36" cy="36" r="2.5" fill="#7c2d12" />
    <circle cx="48" cy="36" r="2.5" fill="#7c2d12" />
    <path d="M 38 43 Q 42 46 46 43" fill="none" stroke="#7c2d12" strokeWidth="2.5" />
    <circle cx="60" cy="56" r="1.5" fill="#1e3a8a" />
    <circle cx="68" cy="56" r="1.5" fill="#1e3a8a" />
    <path d="M 61 62 Q 64 65 67 62" fill="none" stroke="#1e3a8a" strokeWidth="2" />
  </svg>
);

const DoodleMonkey = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <circle cx="50" cy="46" r="20" fill="none" stroke="#b45309" strokeWidth="4" />
    <circle cx="28" cy="44" r="7.5" fill="none" stroke="#b45309" strokeWidth="3.5" />
    <circle cx="74" cy="44" r="7.5" fill="none" stroke="#b45309" strokeWidth="3.5" />
    <path d="M 38 46 C 38 36, 62 36, 62 46 C 62 56, 38 56, 38 46 Z" fill="none" stroke="#fde047" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="44" cy="42" r="2.5" fill="#0f172a" />
    <circle cx="56" cy="42" r="2.5" fill="#0f172a" />
    <path d="M 45 52 Q 50 56 55 52" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DoodleSnake = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 20 65 Q 35 30 50 65 Q 65 95 80 65" fill="none" stroke="#10b981" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="80" cy="62" r="5" fill="#10b981" />
    <circle cx="81" cy="60" r="1" fill="#fff" />
    <path d="M 84 62 L 89 62" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DoodleApple = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto">
    <path d="M 50 32 C 30 30, 25 60, 42 75 C 50 82, 50 82, 58 75 C 75 60, 70 30, 50 32 Z" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 50 32 L 50 20" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    <path d="M 50 20 Q 60 14 62 24 C 55 24 50 22 50 20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Switcher that maps vocabulary words to their corresponding custom crayon SVGs
export const CrayonDoodleImage = ({ word, fallbackEmoji }) => {
  const w = word.toLowerCase().trim();
  if (w === 'mom') return <DoodleMom />;
  if (w === 'monkey') return <DoodleMonkey />;
  if (w === 'sun') return <DoodleSun />;
  if (w === 'bee') return <DoodleBee />;
  if (w === 'dinosaur') return <DoodleDinosaur />;
  if (w === 'moon') return <DoodleMoon />;
  if (w === 'car') return <DoodleCar />;
  if (w === 'whale') return <DoodleWhale />;
  if (w === 'bear') return <DoodleBear />;
  if (w === 'star') return <DoodleStar />;
  if (w === 'boy') return <DoodleBoy />;
  if (w === 'girl') return <DoodleGirl />;
  if (w === 'cat') return <DoodleCat />;
  if (w === 'snake') return <DoodleSnake />;
  if (w === 'apple') return <DoodleApple />;

  // Dynamic styled fallback frame for emojis
  return (
    <div
      className="w-16 h-16 flex items-center justify-center bg-slate-50/50 border-4 border-dashed border-slate-300"
      style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
    >
      <span className="text-4xl select-none leading-none filter contrast-90 saturate-85">{fallbackEmoji}</span>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: CORE CONFIGURATIONS AND UTILS FOR DASHBOARDS
// ═══════════════════════════════════════════

export const LETTER_TO_LESSON = {
  A: 3, B: 9, C: 45, D: 5, E: 4, F: 6, G: 7, H: 7, I: 5, J: 11, K: 10, L: 8,
  M: 1, N: 3, O: 6, P: 2, Q: 46, R: 4, S: 1, T: 2, U: 8, V: 11, W: 9, X: 12, Y: 10, Z: 12
};

export const GRID_ILLUSTRATIONS = {
  A: { name: "Apple", emoji: "🍎" },
  B: { name: "Bee", emoji: "🐝" },
  C: { name: "Cat", emoji: "🐱" },
  D: { name: "Dinosaur", emoji: "🦕" },
  E: { name: "Elephant", emoji: "🐘" },
  F: { name: "Fish", emoji: "🐟" },
  G: { name: "Gorilla", emoji: "🦍" },
  H: { name: "Hat", emoji: "🎩" },
  I: { name: "Ice Cream", emoji: "🍦" },
  J: { name: "Jellyfish", emoji: "🪼" },
  K: { name: "Kite", emoji: "🪁" },
  L: { name: "Lion", emoji: "🦁" },
  M: { name: "Moon", emoji: "🌙" },
  N: { name: "Nest", emoji: "🪹" },
  O: { name: "Owl", emoji: "🦉" },
  P: { name: "Penguin", emoji: "🐧" },
  Q: { name: "Queen", emoji: "👑" },
  R: { name: "Rocket", emoji: "🚀" },
  S: { name: "Sun", emoji: "☀️" },
  T: { name: "Tiger", emoji: "🐯" },
  U: { name: "Umbrella", emoji: "☂️" },
  V: { name: "Volcano", emoji: "🌋" },
  W: { name: "Whale", emoji: "🐋" },
  X: { name: "Xylophone", emoji: "🪘" },
  Y: { name: "Yak", emoji: "🐂" },
  Z: { name: "Zebra", emoji: "🦓" }
};

export const BUBBLE_COLORS = [
  'bg-rose-400/80 border-rose-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(244,63,94,0.3)] text-rose-50',
  'bg-sky-400/80 border-sky-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(14,165,233,0.3)] text-sky-50',
  'bg-emerald-400/80 border-emerald-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(16,185,129,0.3)] text-emerald-50',
  'bg-amber-400/80 border-amber-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(245,158,11,0.3)] text-amber-50',
  'bg-violet-400/80 border-violet-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(139,92,246,0.3)] text-violet-50',
  'bg-pink-400/80 border-pink-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(236,72,153,0.3)] text-pink-50',
  'bg-teal-400/80 border-teal-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(20,184,166,0.3)] text-teal-50'
];

export const TRACING_GUIDES = {
  A: [
    { d: "M 200 50 L 120 240", num: 1, sx: 200, sy: 50 },
    { d: "M 200 50 L 280 240", num: 2, sx: 200, sy: 50 },
    { d: "M 150 170 L 250 170", num: 3, sx: 150, sy: 170 }
  ],
  B: [
    { d: "M 150 50 L 150 240", num: 1, sx: 150, sy: 50 },
    { d: "M 150 50 C 250 50, 250 140, 150 140", num: 2, sx: 150, sy: 50 },
    { d: "M 150 140 C 265 140, 265 240, 150 240", num: 3, sx: 150, sy: 140 }
  ],
  C: [
    { d: "M 260 80 C 140 60, 140 230, 260 210", num: 1, sx: 260, sy: 80 }
  ],
  D: [
    { d: "M 150 50 L 150 240", num: 1, sx: 150, sy: 50 },
    { d: "M 150 50 C 280 50, 280 240, 150 240", num: 2, sx: 150, sy: 50 }
  ],
  E: [
    { d: "M 160 50 L 160 240", num: 1, sx: 160, sy: 50 },
    { d: "M 160 50 L 260 50", num: 2, sx: 160, sy: 50 },
    { d: "M 160 145 L 230 145", num: 3, sx: 160, sy: 145 },
    { d: "M 160 240 L 260 240", num: 4, sx: 160, sy: 240 }
  ],
  F: [
    { d: "M 160 50 L 160 240", num: 1, sx: 160, sy: 50 },
    { d: "M 160 50 L 260 50", num: 2, sx: 160, sy: 50 },
    { d: "M 160 145 L 230 145", num: 3, sx: 160, sy: 145 }
  ],
  G: [
    { d: "M 260 80 C 130 60, 130 230, 260 210 L 260 150 L 210 150", num: 1, sx: 260, sy: 80 }
  ],
  H: [
    { d: "M 150 50 L 150 240", num: 1, sx: 150, sy: 50 },
    { d: "M 250 50 L 250 240", num: 2, sx: 250, sy: 50 },
    { d: "M 150 145 L 250 145", num: 3, sx: 150, sy: 145 }
  ],
  I: [
    { d: "M 200 50 L 200 240", num: 1, sx: 200, sy: 50 },
    { d: "M 150 50 L 250 50", num: 2, sx: 150, sy: 50 },
    { d: "M 150 240 L 250 240", num: 3, sx: 150, sy: 240 }
  ],
  J: [
    { d: "M 200 50 L 200 200 C 200 240, 140 240, 140 200", num: 1, sx: 200, sy: 50 },
    { d: "M 150 50 L 250 50", num: 2, sx: 150, sy: 50 }
  ],
  K: [
    { d: "M 160 50 L 160 240", num: 1, sx: 160, sy: 50 },
    { d: "M 260 50 L 160 145", num: 2, sx: 260, sy: 50 },
    { d: "M 160 145 L 260 240", num: 3, sx: 160, sy: 145 }
  ],
  L: [
    { d: "M 160 50 L 160 240", num: 1, sx: 160, sy: 50 },
    { d: "M 160 240 L 250 240", num: 2, sx: 160, sy: 240 }
  ],
  M: [
    { d: "M 140 240 L 140 50", num: 1, sx: 140, sy: 240 },
    { d: "M 140 50 L 200 170", num: 2, sx: 140, sy: 50 },
    { d: "M 200 170 L 260 50", num: 3, sx: 200, sy: 170 },
    { d: "M 260 50 L 260 240", num: 4, sx: 260, sy: 50 }
  ],
  N: [
    { d: "M 140 240 L 140 50", num: 1, sx: 140, sy: 240 },
    { d: "M 140 50 L 260 240", num: 2, sx: 140, sy: 50 },
    { d: "M 260 240 L 260 50", num: 3, sx: 260, sy: 240 }
  ],
  O: [
    { d: "M 200 50 C 130 50, 130 240, 200 240 C 270 240, 270 50, 200 50", num: 1, sx: 200, sy: 50 }
  ],
  P: [
    { d: "M 150 50 L 150 240", num: 1, sx: 150, sy: 50 },
    { d: "M 150 50 C 260 50, 260 140, 150 140", num: 2, sx: 150, sy: 50 }
  ],
  Q: [
    { d: "M 200 50 C 130 50, 130 240, 200 240 C 270 240, 270 50, 200 50", num: 1, sx: 200, sy: 50 },
    { d: "M 220 190 L 270 240", num: 2, sx: 220, sy: 190 }
  ],
  R: [
    { d: "M 150 50 L 150 240", num: 1, sx: 150, sy: 50 },
    { d: "M 150 50 C 260 50, 260 140, 150 140", num: 2, sx: 150, sy: 50 },
    { d: "M 150 140 L 250 240", num: 3, sx: 150, sy: 140 }
  ],
  S: [
    { d: "M 250 80 C 170 55, 130 115, 200 150 C 270 185, 220 245, 150 220", num: 1, sx: 250, sy: 80 }
  ],
  T: [
    { d: "M 200 50 L 200 240", num: 1, sx: 200, sy: 50 },
    { d: "M 140 50 L 260 50", num: 2, sx: 140, sy: 50 }
  ],
  U: [
    { d: "M 150 50 L 150 180 C 150 240, 250 240, 250 180 L 250 50", num: 1, sx: 150, sy: 50 }
  ],
  V: [
    { d: "M 140 50 L 200 240", num: 1, sx: 140, sy: 50 },
    { d: "M 260 50 L 200 240", num: 2, sx: 260, sy: 50 }
  ],
  W: [
    { d: "M 120 50 L 160 240", num: 1, sx: 120, sy: 50 },
    { d: "M 160 240 L 200 120", num: 2, sx: 160, sy: 240 },
    { d: "M 200 120 L 240 240", num: 3, sx: 200, sy: 120 },
    { d: "M 240 240 L 280 50", num: 4, sx: 240, sy: 240 }
  ],
  X: [
    { d: "M 140 50 L 260 240", num: 1, sx: 140, sy: 50 },
    { d: "M 260 50 L 140 240", num: 2, sx: 260, sy: 50 }
  ],
  Y: [
    { d: "M 140 50 L 200 140", num: 1, sx: 140, sy: 50 },
    { d: "M 260 50 L 200 140", num: 2, sx: 260, sy: 50 },
    { d: "M 200 140 L 200 240", num: 3, sx: 200, sy: 140 }
  ],
  Z: [
    { d: "M 140 50 L 260 50", num: 1, sx: 140, sy: 50 },
    { d: "M 260 50 L 140 240", num: 2, sx: 260, sy: 50 },
    { d: "M 140 240 L 260 240", num: 3, sx: 140, sy: 240 }
  ]
};

export const CircularProgress = ({ value, max, label, color }) => {
  const radius = 30;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center bg-white border-2 border-slate-100 p-4 rounded-[24px] shadow-sm w-32">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="32" cy="32" r={radius} stroke="#f1f5f9" strokeWidth={strokeWidth} fill="transparent" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-base font-black text-slate-800 leading-none">{value}</span>
          <span className="text-[9px] font-bold text-slate-400">/{max}</span>
        </div>
      </div>
      <span className="text-[10px] font-black text-slate-500 mt-2 text-center leading-tight whitespace-nowrap">{label}</span>
    </div>
  );
};

export const MiniProgressRing = ({ value, max, label, color }) => {
  const radius = 12;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

  return (
    <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 py-1 px-2 rounded-full shadow-sm">
      <div className="relative w-7 h-7 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="14" cy="14" r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="transparent" />
          <circle
            cx="14"
            cy="14"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[9px] font-black text-slate-800 leading-none">{value}</span>
        </div>
      </div>
      <div className="flex flex-col text-left pr-1">
        <span className="text-[7px] font-black text-slate-400 uppercase leading-none tracking-wider">{label}</span>
        <span className="text-[6px] font-bold text-slate-300 leading-none">max {max}</span>
      </div>
    </div>
  );
};


export const WeeklyActivity = ({ activeProfileId }) => {
  const days = [
    { name: 'Mon', value: 8, color: '#74c0fc' },
    { name: 'Tue', value: 18, color: '#ff8787' },
    { name: 'Wed', value: 5, color: '#ffd43b' },
    { name: 'Thu', value: 22, color: '#b197fc' },
    { name: 'Fri', value: 14, color: '#63e6be' },
    { name: 'Sat', value: 30, color: '#4dadf7' },
    { name: 'Sun', value: 12, color: '#ff87a0' },
  ];

  const maxVal = 35;

  return (
    <div className="w-full bg-white border-4 border-slate-300 p-5 rounded-[32px] shadow-[0_8px_0_#cbd5e1] flex flex-col">
      <div className="flex items-center gap-2 mb-3 border-b-2 border-dashed border-slate-100 pb-1.5">
        <span className="text-[#10ac84] text-lg font-black">📈</span>
        <h3 className="text-base font-black text-slate-800">Weekly Activity</h3>
      </div>
      <div className="flex items-end justify-between h-36 px-2 pt-2">
        {days.map((d, i) => {
          const heightPercent = (d.value / maxVal) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1 group relative">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 bg-slate-800 text-white text-[9px] font-extrabold py-0.5 px-1.5 rounded absolute -top-8 pointer-events-none shadow-md z-30">
                {d.value} min
              </div>
              <div
                className="w-6 sm:w-8 rounded-t-lg transition-all duration-500 ease-out shadow-sm hover:brightness-95"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: d.color,
                  borderRadius: '6px 6px 0 0'
                }}
              />
              <span className="text-[10px] font-black text-slate-400 mt-2">{d.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Achievements milestones checker
const checkAchievements = (profile, elapsedSeconds) => {
  const achievements = [
    { id: 1, name: "First Star ⭐", desc: "Earned your first gold star!", unlocked: (profile?.stars >= 1) },
    { id: 2, name: "Super Tracer 🎨", desc: "Earned 10 or more stars!", unlocked: (profile?.stars >= 10) },
    { id: 3, name: "Bubble Popper 🎈", desc: "Successfully popped lesson bubbles!", unlocked: (profile?.stars >= 3) },
    { id: 4, name: "Story Time Listener 📖", desc: "Read any story aloud!", unlocked: (profile?.leccion_actual > 1 || profile?.stars >= 2) },
    { id: 5, name: "Fast Learner 🚀", desc: "Reached Lesson 5!", unlocked: (profile?.leccion_actual >= 5) },
    { id: 6, name: "Double Digits 🔟", desc: "Reached Lesson 10!", unlocked: (profile?.leccion_actual >= 10) },
    { id: 7, name: "Dedicated Reader ⏳", desc: "Played for more than 5 minutes total!", unlocked: (elapsedSeconds > 300) },
    { id: 8, name: "ABC Scholar 🏆", desc: "Reached Lesson 26!", unlocked: (profile?.leccion_actual >= 26) }
  ];
  return achievements;
};

// ═══════════════════════════════════════════
// MAIN APPLICATION COMPONENT
// ═══════════════════════════════════════════

// Helpers moved outside component to ensure pure renders
const getRandomSuccessPhrase = () => {
  const frasesExito = [
    "Great job! You traced the letter!",
    "Fantastic drawing!",
    "Wonderful, you are a superstar!",
    "Perfect tracing, keep it up!"
  ];
  return frasesExito[Math.floor(Math.random() * frasesExito.length)];
};

const generateStarCoordinates = (rect, index) => {
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const angulo = (index / 10) * Math.PI * 2 + Math.random() * 0.5;
  const distancia = 120 + Math.random() * 60;
  const dx = Math.cos(angulo) * distancia;
  const dy = Math.sin(angulo) * distancia - 150;
  return {
    id: Date.now() + '-' + index + '-' + Math.random(),
    x: startX,
    y: startY,
    dx,
    dy: dy < -50 ? dy : -150
  };
};

const generateBubble = (index, target, otherLessonLetters, distractorAlphabet, colors, startAtBottom = false) => {
  let letter = target;
  if (index >= 3) {
    letter = index % 2 === 0 && otherLessonLetters.length > 0
      ? otherLessonLetters[Math.floor(Math.random() * otherLessonLetters.length)]
      : distractorAlphabet[Math.floor(Math.random() * distractorAlphabet.length)];
  }
  const size = 64;
  return {
    id: index + '-' + Date.now() + '-' + Math.random(),
    x: Math.random() * (450 - size),
    y: startAtBottom ? 340 : 20 + Math.random() * 220,
    vx: (Math.random() - 0.5) * 1.0,
    vy: 1.2 + Math.random() * 0.8,
    wobbleAmp: 0.4 + Math.random() * 0.6,
    wobbleSpeed: 0.02 + Math.random() * 0.02,
    wobbleOffset: Math.random() * Math.PI * 2,
    letter,
    colorClass: colors[index % colors.length],
    size,
    popped: false,
    wiggle: false,
    isPopping: false,
    isFadingWrong: false
  };
};

const playSoundEffect = (type) => {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  try {
    const ctx = new AudioContext();
    if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'win') {
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.2);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.2);
      });
    }
  } catch (err) {
    console.error("Audio playback error:", err);
  }
};


const generateRandomParentGateNumbers = () => {
  const n1 = Math.floor(Math.random() * 7) + 3; // 3 to 9
  const n2 = Math.floor(Math.random() * 7) + 3;
  return { n1, n2 };
};

let tempProfileIdCounter = 0;
const generateTempProfileId = () => {
  tempProfileIdCounter += 1;
  return tempProfileIdCounter;
};

export default function Home() {
  const [sesionActiva, setSesionActiva] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginMethod, setLoginMethod] = useState('google'); // 'google' | 'email'
  const [emailMode, setEmailMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google OAuth state
  const [googleCredential, setGoogleCredential] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [nombrePadre, setNombrePadre] = useState('');
  const [nombreHijo, setNombreHijo] = useState('');
  const [edadHijo, setEdadHijo] = useState(3);
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dynamic profiles list (limit expanded to 5 children)
  const [perfiles, setPerfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(null);

  // Profile creation form state
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState('kodi'); // 'kodi' | 'rhea' | 'ollo' | 'sandy'

  const [sonidoActivo, setSonidoActivo] = useState('');
  const [leccionActivaId, setLeccionActivaId] = useState(1);
  const [leccionData, setLeccionData] = useState(leccion1Data);

  const [letraActiva, setLetraActiva] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [isDrawing, setIsDrawing] = useState(false);
  const [flyingStars, setFlyingStars] = useState([]);
  const [mascotText, setMascotText] = useState('');
  const [mostrarGuiaPadre, setMostrarGuiaPadre] = useState(true);

  // Tab navigation for Letter Activities: added "story"
  const [activeTab, setActiveTab] = useState('trace'); // 'trace' | 'pop' | 'words' | 'story'

  // Interactive story time speech synthesis state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);

  // Bouncing bubbles state
  const [bubbles, setBubbles] = useState([]);
  const [bubbleScore, setBubbleScore] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [floatingScores, setFloatingScores] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const [particles, setParticles] = useState([]);

  const canvasRef = useRef(null);
  const utteranceRef = useRef(null);

  const { titulo, guion_padre, ejercicios_nino, parent_story } = leccionData || leccion1Data;
  const nombreMellizo = perfiles.find(p => String(p.id) === String(activeProfileId))?.name || '';
  const clics = perfiles.find(p => String(p.id) === String(activeProfileId))?.stars || 0;

  // Active vocabulary words for the selected letter
  const ejercicioActivo = ejercicios_nino?.find(ej => ej.letra === letraActiva);
  const vocabulario = ejercicioActivo?.words || [];
  const currentLetterIdx = ejercicios_nino?.findIndex(ex => ex.letra === letraActiva) ?? -1;

  // Parse English mini-story into sentences
  const storySentences = parent_story
    ? parent_story.split('.').map(s => s.trim()).filter(Boolean).map(s => s + '.')
    : [];

  // ═══════════════════════════════════════════
  // NEW: CUSTOM SUB-VIEWS AND POPUP CONTROLS
  // ═══════════════════════════════════════════
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'learn' | 'parents'
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionLimit, setSessionLimit] = useState(1800); // 30m default limit (in seconds)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [parentLockGate, setParentLockGate] = useState({ show: false, answer: '', n1: 0, n2: 0, nextAction: null, error: false });
  const [isParentsCornerUnlocked, setIsParentsCornerUnlocked] = useState(false);
  const [chooseLetterFilter, setChooseLetterFilter] = useState('all'); // 'all' | 'todo' | 'done'
  const [showAllLettersGrid, setShowAllLettersGrid] = useState(true);

  const sessionLimitRef = useRef(1800);
  const sessionTimeRef = useRef(0);

  useEffect(() => {
    sessionLimitRef.current = sessionLimit;
  }, [sessionLimit]);

  useEffect(() => {
    sessionTimeRef.current = sessionTime;
  }, [sessionTime]);

  const [completedActivities, setCompletedActivities] = useState({
    trace: false,
    pop: false,
    search: false,
    words: false
  });
  const [clickedWords, setClickedWords] = useState([]);

  // Web Speech API with repeated letter collapse logic
  const hablarTexto = (texto, callback) => {
    if (typeof window === 'undefined') {
      if (callback) callback();
      return;
    }

    if (!window.speechSynthesis) {
      if (callback) callback();
      return;
    }

    window.speechSynthesis.cancel();

    // Collapse repeated consonants (2 or more)
    let processed = texto.replace(/([^aeiouAEIOU\s\d.,!?;:])\1+/gi, '$1');
    // Collapse repeated vowels (3 or more, keeping double vowels like ee, oo)
    processed = processed.replace(/([aeiouAEIOU])\1{2,}/gi, '$1');

    const utterance = new SpeechSynthesisUtterance(processed);
    utterance.lang = 'en-US';

    utteranceRef.current = utterance;

    if (callback) {
      utterance.onend = () => {
        callback();
      };
      utterance.onerror = () => {
        callback();
      };
    }

    window.speechSynthesis.speak(utterance);
  };

  // Helper functions declared before their first access inside useEffects
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    Promise.resolve().then(() => {
      setSonidoActivo('');
    });
  };

  const initBubbles = () => {
    const target = letraActiva;
    const otherLessonLetters = ejercicios_nino ? ejercicios_nino.map(e => e.letra).filter(l => l !== target) : [];
    const distractorAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== target);

    const colors = BUBBLE_COLORS;

    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push(generateBubble(i, target, otherLessonLetters, distractorAlphabet, colors));
    }
    Promise.resolve().then(() => {
      setBubbles(list);
      setBubbleScore(0);
      setShowWinModal(false);
      setComboCount(0);
      setFloatingScores([]);
      setParticles([]);
    });
  };


  const handleGoogleCredentialResponse = (response) => {
    Promise.resolve().then(() => {
      setAuthError('');
      setGoogleCredential(response.credential);
    });

    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      Promise.resolve().then(() => {
        setGoogleUserData({
          google_id: payload.sub,
          email: payload.email,
          name: payload.name || '',
          picture: payload.picture || '',
        });
        setUserEmail(payload.email);
        setNombrePadre(payload.name || '');
        setShowRegistrationForm(true);
      });
    } catch {
      Promise.resolve().then(() => {
        setAuthError('No se pudo procesar la respuesta de Google.');
      });
    }
  };

  // Asynchronously load the lesson JSON from content files
  useEffect(() => {
    if (leccionActivaId === 1) {
      Promise.resolve().then(() => {
        setLeccionData(leccion1Data);
      });
      return;
    }

    import(`../content/leccion${leccionActivaId}.json`)
      .then((module) => {
        setLeccionData(module.default);
      })
      .catch((err) => {
        console.error("Failed to load lesson JSON asynchronously:", err);
      });
  }, [leccionActivaId]);

  // Reset letter when lesson changes
  useEffect(() => {
    if (ejercicios_nino && ejercicios_nino.length > 0) {
      const letterInNewLesson = ejercicios_nino.find(ex => ex.letra === letraActiva);
      if (!letterInNewLesson) {
        Promise.resolve().then(() => {
          setLetraActiva(ejercicios_nino[0].letra);
        });
      }
      clearCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leccionData]);

  // Reset activity completions when lesson changes
  useEffect(() => {
    Promise.resolve().then(() => {
      setCompletedActivities({
        trace: false,
        pop: false,
        search: false,
        words: false
      });
      setClickedWords([]);
    });
  }, [leccionActivaId]);

  // Update canvas and mascot dialog when letter or active child changes
  useEffect(() => {
    clearCanvas();
    Promise.resolve().then(() => {
      setCurrentSentenceIndex(-1);
    });
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (nombreMellizo) {
      const ejercicio = ejercicios_nino.find(e => e.letra === letraActiva);
      const sonidoDesc = ejercicio ? ejercicio.sonido : '';
      Promise.resolve().then(() => {
        if (activeTab === 'trace') {
          setMascotText(`Hello ${nombreMellizo}! Let's trace letter ${letraActiva} and say /${sonidoDesc}/! 🎨`);
        } else if (activeTab === 'pop') {
          setMascotText(`Find and pop all the bubbles with letter ${letraActiva}, ${nombreMellizo}! 🎈`);
        } else if (activeTab === 'words') {
          setMascotText(`Let's learn words starting with letter ${letraActiva}, ${nombreMellizo}! 🔤`);
        } else {
          setMascotText(`Tap the play button to read this sweet story together, ${nombreMellizo}! 📖`);
        }
      });
    } else {
      Promise.resolve().then(() => {
        setMascotText('Please create a profile for your child to start learning! 🚀');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letraActiva, activeProfileId, perfiles, activeTab, leccionData]);

  // Re-run bubble initialization on tab or active letter changes
  useEffect(() => {
    if (activeTab === 'pop') {
      initBubbles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letraActiva, activeTab, leccionData]);

  // Continuous Bubble Spawning Loop
  useEffect(() => {
    if (activeTab !== 'pop' || showWinModal) return;

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= 8) return prev;

        const target = letraActiva;
        const otherLessonLetters = ejercicios_nino ? ejercicios_nino.map(e => e.letra).filter(l => l !== target) : [];
        const distractorAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== target);
        const colors = BUBBLE_COLORS;

        const nextIndex = prev.length;
        const newB = generateBubble(nextIndex, target, otherLessonLetters, distractorAlphabet, colors, true);
        return [...prev, newB];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [activeTab, letraActiva, ejercicios_nino, showWinModal]);

  const bubbleScoreRef = useRef(0);
  useEffect(() => {
    bubbleScoreRef.current = bubbleScore;
  }, [bubbleScore]);

  // Bubble Floating Physics Loop (60 FPS requestAnimationFrame)
  useEffect(() => {
    if (activeTab !== 'pop') return;

    let animationFrameId;

    const target = letraActiva;
    const otherLessonLetters = ejercicios_nino ? ejercicios_nino.map(e => e.letra).filter(l => l !== target) : [];
    const distractorAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== target);
    const colors = BUBBLE_COLORS;

    let tickCount = 0;
    const tick = () => {
      tickCount++;
      setBubbles((prev) => {
        if (!prev || prev.length === 0) return [];
        return prev.map((b, idx) => {
          if (b.popped || b.isPopping || b.isFadingWrong) return b;

          // Speed increases based on correct bubble pops (progressive difficulty)
          const scoreFactor = 1 + (bubbleScoreRef.current * 0.1);

          // Smooth horizontal drift (sine wave with per-bubble wobble)
          const wobble = Math.sin(tickCount * (b.wobbleSpeed || 0.03) + (b.wobbleOffset || 0)) * (b.wobbleAmp || 0.5);
          let nextX = b.x + b.vx + wobble;
          let nextY = b.y - (b.vy * scoreFactor);
          let nextVx = b.vx;

          const widthLimit = 500 - b.size;

          // Wall bouncing (horizontal)
          if (nextX <= 0) {
            nextX = 0;
            nextVx = Math.abs(b.vx);
          } else if (nextX >= widthLimit) {
            nextX = widthLimit;
            nextVx = -Math.abs(b.vx);
          }

          // Off-screen reset to bottom inline (no side effects, no setTimeout!)
          if (nextY + b.size < 0) {
            return generateBubble(idx, target, otherLessonLetters, distractorAlphabet, colors, true);
          }

          return {
            ...b,
            x: nextX,
            y: nextY,
            vx: nextVx
          };
        });
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, letraActiva, ejercicios_nino]);

  // ═══════════════════════════════════════════
  // PERSISTED SESSION LIMIT TIMER EFFECT
  // ═══════════════════════════════════════════
  useEffect(() => {
    if (!sesionActiva) {
      Promise.resolve().then(() => {
        setSessionTime(0);
      });
      return;
    }

    const savedTime = localStorage.getItem('muunek_session_time');
    const savedLimit = localStorage.getItem('muunek_session_limit');
    Promise.resolve().then(() => {
      if (savedTime) {
        setSessionTime(Number(savedTime));
        sessionTimeRef.current = Number(savedTime);
      }
      if (savedLimit) {
        setSessionLimit(Number(savedLimit));
        sessionLimitRef.current = Number(savedLimit);
      }
    });

    const ticker = setInterval(() => {
      setSessionTime((prev) => {
        const next = prev + 1;
        localStorage.setItem('muunek_session_time', String(next));

        const currentLim = sessionLimitRef.current;
        if (next >= currentLim) {
          setShowTimeUpModal(true);
        } else {
          setShowTimeUpModal(false);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesionActiva]);

  // Format time (HH:MM:SS) for Today's Session display clock
  const getFormattedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  const getRemainingMinutes = () => {
    const diff = Math.max(0, sessionLimit - sessionTime);
    return Math.ceil(diff / 60);
  };

  // Parent Math gate controller
  const triggerParentGate = (nextAction) => {
    const { n1, n2 } = generateRandomParentGateNumbers();
    setParentLockGate({
      show: true,
      answer: '',
      n1,
      n2,
      nextAction,
      error: false
    });
  };

  const verifyParentGate = (e) => {
    e.preventDefault();
    const correctVal = parentLockGate.n1 + parentLockGate.n2;
    if (parseInt(parentLockGate.answer, 10) === correctVal) {
      const act = parentLockGate.nextAction;
      setParentLockGate({ show: false, answer: '', n1: 0, n2: 0, nextAction: null, error: false });
      if (act) act();
    } else {
      setParentLockGate(prev => ({ ...prev, error: true, answer: '' }));
      setTimeout(() => {
        setParentLockGate(prev => ({ ...prev, error: false }));
      }, 500);
    }
  };

  // Navigating to Parents Corner with math gate
  const handleNavigateToParentsCorner = () => {
    if (isParentsCornerUnlocked) {
      setCurrentView('parents');
    } else {
      triggerParentGate(() => {
        setIsParentsCornerUnlocked(true);
        setCurrentView('parents');
      });
    }
  };

  // Set limit handler with direct local storage save
  const handleSetSessionLimit = (minutesVal) => {
    const limitSecs = minutesVal * 60;
    setSessionLimit(limitSecs);
    sessionLimitRef.current = limitSecs;
    localStorage.setItem('muunek_session_limit', String(limitSecs));

    // If the new limit is higher than current session time, clear modal
    if (sessionTimeRef.current < limitSecs) {
      setShowTimeUpModal(false);
    }
  };

  // Letters completed dynamic counting
  const activeProfile = perfiles.find(p => String(p.id) === String(activeProfileId));
  const learnedLetters = activeProfile ? Object.entries(LETTER_TO_LESSON)
    .filter(([letra, lessonNum]) => lessonNum < activeProfile.leccion_actual)
    .map(([letra]) => letra) : [];

  // Load profiles from MySQL database (with localstorage fallback)
  const fetchPerfiles = async (emailKey) => {
    try {
      const res = await fetch(`/api/perfiles?email=${encodeURIComponent(emailKey)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.perfiles) {
          setPerfiles(data.perfiles);
          if (data.perfiles.length > 0) {
            const first = data.perfiles[0];
            setActiveProfileId(first.id);
            setLeccionActivaId(Number(first.leccion_actual) || 1);
          }
          localStorage.setItem(`muunek_profiles_${emailKey}`, JSON.stringify(data.perfiles));
          return;
        }
      }
      loadLocalStorage(emailKey);
    } catch (err) {
      console.warn("Failed to load profiles from DB, loading from localStorage fallback:", err);
      loadLocalStorage(emailKey);
    }
  };

  const loadLocalStorage = (emailKey) => {
    const saved = localStorage.getItem(`muunek_profiles_${emailKey}`);
    if (saved) {
      const list = JSON.parse(saved);
      setPerfiles(list);
      if (list.length > 0) {
        const first = list[0];
        setActiveProfileId(first.id);
        setLeccionActivaId(Number(first.leccion_actual) || 1);
      }
    }
  };

  // Add child profile in localState and trigger background DB save
  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    const newProfile = {
      id: generateTempProfileId(), // temporary ID
      name: newProfileName.trim(),
      avatar: newProfileAvatar,
      stars: 0,
      leccion_actual: 1
    };

    const updated = [...perfiles, newProfile];
    setPerfiles(updated);
    setActiveProfileId(newProfile.id);
    setLeccionActivaId(1);
    localStorage.setItem(`muunek_profiles_${userEmail}`, JSON.stringify(updated));

    hablarTexto(`Welcome ${newProfile.name}!`);

    // Sync to MySQL
    fetch('/api/perfiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        name: newProfile.name,
        avatar: newProfile.avatar,
        stars: 0,
        leccion_actual: 1
      })
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        if (data.id) {
          setPerfiles(prev => prev.map(p => p.id === newProfile.id ? { ...p, id: data.id } : p));
          const listWithRealIds = updated.map(p => p.id === newProfile.id ? { ...p, id: data.id } : p);
          localStorage.setItem(`muunek_profiles_${userEmail}`, JSON.stringify(listWithRealIds));
          setActiveProfileId(data.id);
        }
      }
    }).catch(err => {
      console.warn("MySQL sync failed, using localStorage:", err);
    });

    setNewProfileName('');
    setNewProfileAvatar('kodi');
    setShowAddProfileModal(false);
  };

  // Selection handler for switching active profile (loads child's current lesson progress)
  const seleccionarPerfil = (profile) => {
    setActiveProfileId(profile.id);
    setLeccionActivaId(Number(profile.leccion_actual) || 1);
    hablarTexto(`Hello ${profile.name}!`);
  };

  // Update handler for changing lessons (saves to active child profile and triggers DB syncs)
  const cambiarLeccion = (val) => {
    setLeccionActivaId(Number(val));

    if (!activeProfileId) return;

    // Update progress in active child profile
    const updatedProfiles = perfiles.map(p => {
      if (String(p.id) === String(activeProfileId)) {
        const updated = { ...p, leccion_actual: val };

        // Sync progress updates to MySQL in background
        fetch('/api/perfiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            name: updated.name,
            avatar: updated.avatar,
            stars: updated.stars,
            leccion_actual: val
          })
        }).catch(err => console.warn("Failed to sync profile lesson progress to MySQL:", err));

        // Sync progress updates to MongoDB in background
        fetch('/api/progreso', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hijo_id: String(activeProfileId),
            leccion_actual: val,
            clics_a_sumar: 0
          })
        }).catch(err => console.warn("Failed to sync progress to MongoDB:", err));

        return updated;
      }
      return p;
    });

    setPerfiles(updatedProfiles);
    localStorage.setItem(`muunek_profiles_${userEmail}`, JSON.stringify(updatedProfiles));
  };

  // Delete profile from localState and trigger background DB delete
  const handleDeleteProfile = (id, e) => {
    e.stopPropagation();
    const updated = perfiles.filter(p => p.id !== id);
    setPerfiles(updated);
    localStorage.setItem(`muunek_profiles_${userEmail}`, JSON.stringify(updated));
    if (String(activeProfileId) === String(id)) {
      const nextActive = updated.length > 0 ? updated[0] : null;
      setActiveProfileId(nextActive ? nextActive.id : null);
      setLeccionActivaId(nextActive ? Number(nextActive.leccion_actual) || 1 : 1);
    }

    // Sync deletion to MySQL
    fetch(`/api/perfiles?id=${id}`, {
      method: 'DELETE'
    }).catch(err => {
      console.warn("MySQL deletion sync failed, using localStorage:", err);
    });
  };

  // Update profile stars on complete and sync to database APIs
  const handleEarnStar = (e) => {
    if (!activeProfileId) return;

    const profile = perfiles.find(p => String(p.id) === String(activeProfileId));
    if (!profile) return;

    const nextStars = profile.stars + 1;

    // Update in UI state & LocalStorage
    const updatedList = perfiles.map(p => String(p.id) === String(activeProfileId) ? { ...p, stars: nextStars } : p);
    setPerfiles(updatedList);
    localStorage.setItem(`muunek_profiles_${userEmail}`, JSON.stringify(updatedList));

    // 1. Sync updated stars count and lesson to MySQL
    fetch('/api/perfiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        name: profile.name,
        avatar: profile.avatar,
        stars: nextStars,
        leccion_actual: leccionActivaId
      })
    }).catch(err => console.warn("Failed to sync profile stars to MySQL:", err));

    // 2. Sync lesson progress & clicks to MongoDB
    fetch('/api/progreso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hijo_id: String(activeProfileId), leccion_actual: leccionActivaId, clics_a_sumar: 1 })
    }).catch(err => console.warn("Failed to sync progress to MongoDB:", err));
  };

  // Interactive reading: read sentence-by-sentence with visual highlighting
  const leerCuentoEnVozAlta = () => {
    if (storySentences.length === 0) return;

    let index = 0;
    setCurrentSentenceIndex(0);
    setMascotText("I am reading the story for you! 📖");

    const speakNext = () => {
      if (index >= storySentences.length) {
        setCurrentSentenceIndex(-1);
        setMascotText("Wonderful reading! Let's read it again! 🎉");
        return;
      }
      setCurrentSentenceIndex(index);
      hablarTexto(storySentences[index], () => {
        index++;
        speakNext();
      });
    };

    speakNext();
  };

  // Handle bubble click in Pop Game
  const handleBubbleClick = (e, bubble) => {
    if (bubble.popped || bubble.isPopping || bubble.isFadingWrong) return;

    const target = letraActiva;
    const otherLessonLetters = ejercicios_nino ? ejercicios_nino.map(ex => ex.letra).filter(l => l !== target) : [];
    const distractorAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== target);
    const colors = BUBBLE_COLORS;

    if (bubble.letter === target) {
      // Correct letter - play synth pop sound
      playSoundEffect('pop');

      // Screen shake effect
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 300);

      // Spawn particles at bubble position
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + '-' + i,
        x: bubble.x + bubble.size / 2,
        y: bubble.y + bubble.size / 2,
        angle: (i * 60) + Math.random() * 30,
        speed: 2 + Math.random() * 3,
        color: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94'][Math.floor(Math.random() * 5)]
      }));
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 600);

      // Mark bubble as popping in state
      setBubbles(prev => prev.map(b =>
        b.id === bubble.id ? { ...b, isPopping: true } : b
      ));

      // Combo system
      setComboCount(prev => {
        const newCombo = prev + 1;
        // Floating score text
        const scoreValue = newCombo >= 3 ? newCombo : 1;
        const floatText = newCombo >= 3 ? `+${scoreValue} COMBO x${newCombo}!` : '+1';
        const floatId = Date.now();
        setFloatingScores(fs => [...fs, { id: floatId, x: bubble.x, y: bubble.y, text: floatText, isCombo: newCombo >= 3 }]);
        setTimeout(() => {
          setFloatingScores(fs => fs.filter(f => f.id !== floatId));
        }, 1000);
        return newCombo;
      });

      // Earn profile stars & trigger flying star graphics
      handleEarnStar(e);
      lanzarEstrellas(e);
      hablarTexto(target);

      // Increment score
      setBubbleScore(prev => {
        const nextScore = prev + 1;
        if (nextScore >= 10) {
          // Trigger win modal & celebration arpeggio
          setTimeout(() => {
            setShowWinModal(true);
            playSoundEffect('win');
            hablarTexto("Congratulations! You did it!");
          }, 400);
        }
        return nextScore;
      });

      // Replace bubble at the bottom after pop animation finishes
      setTimeout(() => {
        setBubbles(prev => prev.map(b => {
          if (b.id === bubble.id) {
            const idx = prev.findIndex(item => item.id === bubble.id);
            return generateBubble(idx >= 0 ? idx : 0, target, otherLessonLetters, distractorAlphabet, colors, true);
          }
          return b;
        }));
      }, 350);

    } else {
      // Wrong letter - play light buzzer, animate error fade out, reset combo
      playSoundEffect('wrong');
      setComboCount(0);

      setBubbles(prev => prev.map(b =>
        b.id === bubble.id ? { ...b, isFadingWrong: true } : b
      ));

      // Replace wrong bubble at the bottom after fade animation finishes
      setTimeout(() => {
        setBubbles(prev => prev.map(b => {
          if (b.id === bubble.id) {
            const idx = prev.findIndex(item => item.id === bubble.id);
            return generateBubble(idx >= 0 ? idx : 0, target, otherLessonLetters, distractorAlphabet, colors, true);
          }
          return b;
        }));
      }, 400);
    }
  };

  // Next level transition handler inside Pop Game
  const handleNextLevel = () => {
    setShowWinModal(false);
    setComboCount(0);
    setFloatingScores([]);
    setParticles([]);

    // Complete pop game activity for current letter
    setCompletedActivities(prev => ({ ...prev, pop: true }));
    setMascotText(`Fantastic! Now let's play the Word Search game for letter ${letraActiva}! 🔍`);
    setActiveTab('search');
    hablarTexto("Awesome! You completed the bubble game! Now let's do a word search!");
  };

  // Scale client coordinates for canvas drawing
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    return { x, y };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(x, y);
    ctx.stroke();

    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 16;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const reproducirSonidoLetra = () => {
    const ejercicio = ejercicios_nino.find(e => e.letra === letraActiva);
    if (ejercicio) {
      setSonidoActivo(ejercicio.sonido);
      hablarTexto(`${ejercicio.letra} says ${ejercicio.sonido}`);
      setTimeout(() => setSonidoActivo(''), 2000);
    }
  };

  // Launch gold reward stars
  const lanzarEstrellas = (e) => {
    if (!e || !e.target) return;
    const rect = e.target.getBoundingClientRect();
    const nuevasEstrellas = Array.from({ length: 10 }).map((_, i) => generateStarCoordinates(rect, i));

    setFlyingStars(prev => [...prev, ...nuevasEstrellas]);

    setTimeout(() => {
      setFlyingStars(prev => prev.filter(s => !nuevasEstrellas.find(ns => ns.id === s.id)));
    }, 1200);
  };

  const finalizarEjercicio = (e) => {
    if (!activeProfileId) return;
    const ejercicio = ejercicios_nino.find(e => e.letra === letraActiva);
    if (!ejercicio) return;

    // Save star and sync
    handleEarnStar(e);

    const fraseAleatoria = getRandomSuccessPhrase();

    hablarTexto(`${fraseAleatoria}. Letter ${ejercicio.letra} says ${ejercicio.sonido}`);

    setMascotText(`Awesome ${nombreMellizo}! That tracing is perfect! ⭐`);
    setSonidoActivo(ejercicio.sonido);
    setTimeout(() => setSonidoActivo(''), 2500);

    lanzarEstrellas(e);

    setTimeout(() => {
      clearCanvas();
      // Mark trace activity as completed for current letter
      setCompletedActivities(prev => ({ ...prev, trace: true }));
      setMascotText(`Great job! Let's pop some bubbles now! 🎈`);
      setActiveTab('pop');
      hablarTexto("Pop the bubbles!");
    }, 2500);
  };

  const handleWordStickerClick = (word) => {
    hablarTexto(`${letraActiva} is for ${word}!`);
    if (!clickedWords.includes(word)) {
      const updated = [...clickedWords, word];
      setClickedWords(updated);

      const activeWords = vocabulario.map(w => w.word);
      const activeDone = activeWords.every(w => updated.includes(w));

      if (activeDone) {
        // Mark words activity as completed for current letter
        setCompletedActivities(prev => ({ ...prev, words: true }));
        setMascotText(`Fantastic! You learned all words for letter ${letraActiva}! 🔤`);
      }
    }
  };

  const handleCompleteLesson = (e) => {
    const allActivitiesCompleted = completedActivities.trace && completedActivities.pop && completedActivities.search && completedActivities.words;
    if (!allActivitiesCompleted) return;

    handleEarnStar(e);
    lanzarEstrellas(e);

    const currentIdx = ejercicios_nino.findIndex(ex => ex.letra === letraActiva);

    if (currentIdx < ejercicios_nino.length - 1) {
      // Go to the next letter in the same lesson
      const nextLetter = ejercicios_nino[currentIdx + 1].letra;
      setLetraActiva(nextLetter);
      setBubbleScore(0);
      setCompletedActivities({
        trace: false,
        pop: false,
        search: false,
        words: false
      });
      setClickedWords([]);
      setActiveTab('trace');
      setMascotText(`Awesome! Let's learn the next letter "${nextLetter}"! 🚀`);
      hablarTexto(`Let's trace letter ${nextLetter}!`);
    } else {
      // Completed all letters in current lesson -> Go to next lesson
      const currentLessonNum = Number(leccionActivaId);
      const nextLessonId = Math.min(100, currentLessonNum + 1);
      if (nextLessonId > currentLessonNum) {
        setMascotText(`Woohoo ${nombreMellizo}! Lesson ${currentLessonNum} completed! Let's go to Lesson ${nextLessonId}! 🚀`);
        cambiarLeccion(nextLessonId);
        setActiveTab('trace');
        setCompletedActivities({
          trace: false,
          pop: false,
          search: false,
          words: false
        });
        setClickedWords([]);
      } else {
        setMascotText(`Incredible ${nombreMellizo}! You finished all 100 lessons! 🏆🎉`);
      }
    }
  };

  const statusCheckHandler = (e) => {
    e.preventDefault();
    cerrarSesion();
  };

  // Initialize Google Identity Services
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === 'tu-google-client-id-aqui') {
      Promise.resolve().then(() => {
        setAuthError('Google Sign-In no está configurado. Usa el inicio de sesión por email.');
      });
      return;
    }

    const checkGoogle = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(checkGoogle);
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
        } catch {
          setAuthError('Error al inicializar Google Sign-In. Verifica el Client ID en .env.local');
        }
      }
    }, 200);
    return () => clearInterval(checkGoogle);
  }, []);

  // handleGoogleCredentialResponse is declared above

  // Render Google Sign-In button
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loginMethod !== 'google' || showRegistrationForm || sesionActiva) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === 'tu-google-client-id-aqui') return;

    const checkRender = setInterval(() => {
      const container = document.getElementById('google-signin-btn');
      if (container && window.google?.accounts?.id) {
        clearInterval(checkRender);
        container.innerHTML = '';
        try {
          window.google.accounts.id.renderButton(container, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            width: container.offsetWidth || 300,
            text: 'continue_with',
            shape: 'pill',
          });
        } catch {
          setAuthError('No se pudo renderizar el botón de Google. Verifica la configuración.');
        }
      }
    }, 200);
    return () => clearInterval(checkRender);
  }, [loginMethod, showRegistrationForm, sesionActiva]);

  // Submit registration to backend
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const trimmedPadre = nombrePadre.trim();
    const trimmedHijo = nombreHijo.trim();

    // ── Frontend validation with explicit error messages ──
    if (!trimmedPadre) {
      setAuthError('Nombre del padre/madre es obligatorio.');
      return;
    }

    if (trimmedPadre.length < 2 || trimmedPadre.length > 100) {
      setAuthError('Nombre del padre/madre debe tener entre 2 y 100 caracteres.');
      return;
    }

    if (!googleCredential) {
      setAuthError('Token de Google no disponible. Intenta iniciar sesión de nuevo.');
      return;
    }

    setIsRegistering(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: googleCredential,
          nombre_padre: trimmedPadre,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || 'Error al registrar. Intenta de nuevo.');
        setIsRegistering(false);
        return;
      }

      // Registration successful — start session
      setUserEmail(googleUserData.email);
      setSesionActiva(true);
      setShowRegistrationForm(false);
      fetchPerfiles(googleUserData.email);
      setShowAllLettersGrid(true);
    } catch {
      setAuthError('Error de conexión. Verifica tu internet.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setAuthError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    if (!password || password.length < 6) {
      setAuthError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: emailMode, // 'signin' or 'signup'
          email: cleanEmail,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || 'Error al autenticar. Intenta de nuevo.');
        return;
      }

      // Success - sign in parent
      setUserEmail(cleanEmail);
      setSesionActiva(true);
      fetchPerfiles(cleanEmail);
      setPassword('');
      setShowAllLettersGrid(true);
    } catch {
      setAuthError('Error de conexión. Verifica tu internet.');
    }
  };

  const cerrarSesion = () => {
    setSesionActiva(false);
    setPerfiles([]);
    setActiveProfileId(null);
    setSonidoActivo('');
    setLeccionActivaId(1);
    setLetraActiva('M');
    setActiveTab('trace');
    setGoogleCredential(null);
    setGoogleUserData(null);
    setShowRegistrationForm(false);
    setAuthError('');
    setNombrePadre('');
    setNombreHijo('');
    setEdadHijo(3);
    setCurrentView('home');
    setSessionTime(0);
    setShowTimeUpModal(false);
    setIsParentsCornerUnlocked(false);
    setShowAllLettersGrid(true);
    localStorage.removeItem('muunek_session_time');
    if (typeof window !== 'undefined' && window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  // Traced letters count matching selection
  const unlockedAchievements = activeProfile ? checkAchievements(activeProfile, sessionTime).filter(a => a.unlocked) : [];
  const allActivitiesCompleted = completedActivities.trace && completedActivities.pop && completedActivities.search && completedActivities.words;

  // Letters Choose Selector grid items click logic
  const handleSelectLetterFromGrid = (letter) => {
    const targetLesson = LETTER_TO_LESSON[letter];
    if (targetLesson) {
      cambiarLeccion(targetLesson);
      setLetraActiva(letter);
      setShowAllLettersGrid(false);
      setCurrentView('learn');
      setActiveTab('trace');
      hablarTexto(`Let's trace letter ${letter}!`);
    }
  };

  // ═══════════════════════════════════════════
  // SCREEN 1: STATIC CENTRED LOGIN / SCROLLING BG
  // ═══════════════════════════════════════════
  if (!sesionActiva) {
    return (
      <main className="relative min-h-[200vh] w-full font-sans select-none overflow-x-hidden">

        {/* Background that scrolls vertically as you scroll down */}
        <div className="absolute inset-0 w-full h-[200vh] bg-login-principal z-0"></div>

        {/* STATIC CENTERED LOGIN CARD WITH SCRAPBOOK CHALK EFFECT */}
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[92%] max-w-md bg-white/95 backdrop-blur-md p-6 md:p-8 border-4 border-[#4ECDC4] shadow-[0_16px_0_#10AC84] text-center animate-bounce-in"
          style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
        >

          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
            📖 Learn with Parents
          </h2>
          <p className="text-sm font-bold text-slate-500 mt-2 mb-6">
            Playful English learning through interactive phonics
          </p>

          {showRegistrationForm && googleUserData ? (
            /* REGISTRATION FORM AFTER GOOGLE AUTH */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
              <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 mb-2">
                {googleUserData.picture && (
                  <img src={googleUserData.picture} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                )}
                <div>
                  <p className="text-sm font-black text-slate-800">{googleUserData.name}</p>
                  <p className="text-xs font-bold text-slate-400">{googleUserData.email}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-slate-700 block mb-1">
                  Tu nombre (padre/madre) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: María López"
                  value={nombrePadre}
                  onChange={(e) => setNombrePadre(e.target.value)}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-[#4ECDC4] text-sm"
                />
              </div>



              {authError && (
                <div className="bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs font-bold px-4 py-2 rounded-xl">
                  {authError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegistrationForm(false);
                    setGoogleCredential(null);
                    setGoogleUserData(null);
                    setAuthError('');
                  }}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3 rounded-full shadow-[0_4px_0_#cbd5e1] active:translate-y-1 active:shadow-none text-sm transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="flex-1 bg-[#10AC84] hover:bg-[#0f9b77] disabled:opacity-50 text-white font-black py-3 rounded-full shadow-[0_4px_0_#0a7257] active:translate-y-1 active:shadow-none text-sm transition-all cursor-pointer"
                >
                  {isRegistering ? 'Registrando...' : 'Crear Cuenta 🚀'}
                </button>
              </div>
            </form>

          ) : loginMethod === 'google' ? (
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500 mb-4">
                Inicia sesión con tu cuenta de Google para crear perfiles de tus hijos
              </p>

              {/* Real Google Identity Services button container */}
              <div id="google-signin-btn" className="flex justify-center min-h-[44px]" />

              {authError && (
                <div className="bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs font-bold px-4 py-2 rounded-xl">
                  {authError}
                </div>
              )}

              <button
                onClick={() => { setLoginMethod('email'); setAuthError(''); }}
                className="w-full bg-sky-400 hover:bg-sky-500 shadow-[0_8px_0_#0284c7] text-white font-black py-4 px-6 rounded-full active:translate-y-2 active:shadow-[0_4px_0_#0284c7] transition-all duration-100 cursor-pointer text-lg mt-2"
              >
                Sign In with Email
              </button>

              <p className="text-xs text-slate-400 font-bold mt-4">
                Secure access for parents and guardians
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormLogin} className="space-y-4 text-left">
              <div>
                <label className="text-sm font-black text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm"
                />
              </div>

              {authError && (
                <div className="bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs font-bold px-4 py-2 rounded-xl mb-2">
                  {authError}
                </div>
              )}

              <div className="pt-2">
                {emailMode === 'signin' ? (
                  <button
                    type="submit"
                    className="w-full bg-[#10AC84] shadow-[0_6px_0_#0a7257] active:translate-y-1 active:shadow-[0_2px_0_#0a7257] text-white font-black py-3.5 rounded-full text-base transition-all text-center cursor-pointer"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-amber-400 shadow-[0_6px_0_#d97706] active:translate-y-1 active:shadow-[0_2px_0_#d97706] text-white font-black py-3.5 rounded-full text-base transition-all text-center cursor-pointer"
                  >
                    Create Account
                  </button>
                )}
              </div>

              <div className="flex justify-between text-xs font-black text-slate-400 pt-2 px-1">
                {emailMode === 'signin' ? (
                  <button type="button" onClick={() => { setEmailMode('signup'); setAuthError(''); }} className="hover:text-sky-500 cursor-pointer">
                    Create Account
                  </button>
                ) : (
                  <button type="button" onClick={() => { setEmailMode('signin'); setAuthError(''); }} className="hover:text-sky-500 cursor-pointer">
                    Already have account? Sign In
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => { setLoginMethod('google'); setAuthError(''); }}
                  className="text-sky-400 hover:text-sky-500 font-black cursor-pointer"
                >
                  ← Google Sign-In
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="fixed bottom-4 left-4 z-30 bg-black/40 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold animate-pulse pointer-events-none">
          ↕️ Scroll down to move the background!
        </div>
      </main>
    );
  }

  // ═══════════════════════════════════════════
  // SCREEN 2: DYNAMIC TABS VIEWBOARD
  // ═══════════════════════════════════════════
  return (
    <main className="min-h-screen bg-dashboard-secundaria p-4 md:p-6 font-sans relative overflow-x-hidden select-none flex flex-col pb-28">

      {/* GLOBAL BACKGROUND MUSIC OR VOICE SYNTHESIS STATUS BAR */}
      {sonidoActivo && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#ffd43b] border-4 border-white text-slate-800 font-black px-6 py-2 rounded-full shadow-lg animate-bounce text-sm md:text-base uppercase tracking-wider pointer-events-none">
          🗣️ {sonidoActivo}!
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 relative z-10">

        {/* =========================================
            1. HOME VIEW 🏠
            ========================================= */}
        {currentView === 'home' && (
          <div className="flex-1 flex flex-col items-center justify-center py-6 animate-slide-up relative">

            {/* Top Bar with Sign Out and Parents buttons */}
            <div className="absolute top-2 right-2 z-20 flex gap-2">
              <button
                onClick={handleNavigateToParentsCorner}
                className="bg-purple-500 hover:bg-purple-600 text-white font-black px-4 py-2 rounded-full shadow-[0_4px_0_#6b21a8] active:translate-y-1 active:shadow-none text-xs transition-all cursor-pointer flex items-center gap-1"
              >
                Parents 🛡️
              </button>
              <button
                onClick={statusCheckHandler}
                className="bg-rose-500 hover:bg-rose-600 text-white font-black px-4 py-2 rounded-full shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-none text-xs transition-all cursor-pointer flex items-center gap-1"
              >
                Sign Out ✕
              </button>
            </div>

            {/* Sketch cloud decorations overlay (Canva style) */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-80 pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-rose-200/50">
                <path d="M20,50 C10,40 10,20 30,20 C40,10 60,10 70,20 C90,20 90,40 80,50 Z" />
              </svg>
            </div>
            <div className="absolute top-10 right-4 w-44 h-24 opacity-80 pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 50" className="w-full h-full fill-sky-200/50">
                <path d="M10,40 C5,30 15,10 35,15 C45,5 65,5 75,15 C90,10 95,30 85,40 Z" />
              </svg>
            </div>
            <div className="absolute bottom-10 left-10 w-36 h-36 opacity-80 pointer-events-none hidden lg:block">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-200/40">
                <path d="M10,80 Q30,40 50,80 T90,80" stroke="#a3e635" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M20,90 Q40,60 60,90" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Landing page branding */}
            <div className="text-center space-y-3 max-w-2xl bg-white/70 backdrop-blur-sm p-8 rounded-[40px] border-4 border-white shadow-xl">
              <div className="inline-block bg-sky-100 text-sky-600 font-extrabold text-xs px-3 py-1.5 rounded-full tracking-widest uppercase border border-sky-200 mb-2">
                📂 Learn
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">
                with <span className="text-sky-400">Parents</span><span className="text-rose-500">!</span>
              </h1>
              <p className="text-base md:text-lg font-bold text-slate-500 italic">
                Adventures with ABC — for ages 3 to 7 🌈
              </p>

              {/* Characters Illustration Row */}
              <div className="flex justify-center gap-3 py-6">
                {[
                  { emoji: "🐝", name: "Bee", bg: "bg-amber-100 border-amber-300" },
                  { emoji: "🦍", name: "Gorilla", bg: "bg-slate-100 border-slate-300" },
                  { emoji: "🦕", name: "Dino", bg: "bg-emerald-100 border-emerald-300" },
                  { emoji: "☀️", name: "Sun", bg: "bg-yellow-100 border-yellow-300" },
                  { emoji: "🚀", name: "Rocket", bg: "bg-rose-100 border-rose-300" }
                ].map((char, index) => (
                  <div key={index} className={`w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-2xl border-2 shadow-sm ${char.bg} transform hover:scale-115 transition-all duration-200 cursor-pointer`}>
                    <span className="text-2xl md:text-3xl">{char.emoji}</span>
                    <span className="text-[9px] font-black text-slate-400 mt-0.5">{char.name}</span>
                  </div>
                ))}
              </div>

              {/* Primary Call to Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 w-full max-w-md mx-auto">
                <button
                  onClick={() => {
                    if (perfiles.length === 0) {
                      setShowAddProfileModal(true);
                    } else {
                      setCurrentView('learn');
                      setShowAllLettersGrid(false);
                    }
                  }}
                  className="flex-1 bg-sky-400 hover:bg-sky-500 shadow-[0_8px_0_#0284c7] active:translate-y-1 active:shadow-[0_4px_0_#0284c7] text-white font-black py-4 px-6 rounded-full transition-all text-center cursor-pointer text-lg flex items-center justify-center gap-2"
                >
                  <span>abc</span> Learn ABCs!
                </button>
                <button
                  onClick={handleNavigateToParentsCorner}
                  className="flex-1 bg-purple-400 hover:bg-purple-500 shadow-[0_8px_0_#6b21a8] active:translate-y-1 active:shadow-[0_4px_0_#6b21a8] text-white font-black py-4 px-6 rounded-full transition-all text-center cursor-pointer text-lg flex items-center justify-center gap-2"
                >
                  <span>🛡️</span> Parent Corner
                </button>
              </div>

              {/* Grid of bottom features */}
              <div className="grid grid-cols-3 gap-3 pt-8 max-w-md mx-auto border-t-2 border-dashed border-slate-200 mt-6">
                <button
                  onClick={() => {
                    if (perfiles.length === 0) { setShowAddProfileModal(true); return; }
                    setCurrentView('learn');
                    setActiveTab('trace');
                    setShowAllLettersGrid(false);
                  }}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-all hover:scale-105"
                >
                  <span className="text-2xl">🖍️</span>
                  <span className="text-xs font-black text-slate-600 mt-1">Trace Letters</span>
                </button>
                <button
                  onClick={() => {
                    if (perfiles.length === 0) { setShowAddProfileModal(true); return; }
                    setCurrentView('learn');
                    setShowAllLettersGrid(true);
                  }}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-all hover:scale-105"
                >
                  <span className="text-2xl">🎯</span>
                  <span className="text-xs font-black text-slate-600 mt-1">26 Letters</span>
                </button>
                <button
                  onClick={handleNavigateToParentsCorner}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-all hover:scale-105"
                >
                  <span className="text-2xl">📊</span>
                  <span className="text-xs font-black text-slate-600 mt-1">Track Progress</span>
                </button>
              </div>

              {/* Profiles layout wrapper in Landing */}
              {perfiles.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 flex flex-col items-center gap-2 mt-6">
                  <span className="text-xs font-black text-slate-400">Switching child:</span>
                  <div className="flex gap-4">
                    {perfiles.map(p => (
                      <button
                        key={p.id}
                        onClick={() => seleccionarPerfil(p)}
                        className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${p.id === activeProfileId ? 'bg-yellow-400 text-slate-800 animate-pulse' : 'bg-white border text-slate-500 hover:bg-slate-100'
                          }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* =========================================
            2. LEARN VIEW 📖
            ========================================= */}
        {currentView === 'learn' && (
          <div className="flex-1 flex flex-col animate-slide-up">

            {/* TOP HEADER */}
            <header className="bg-white/95 border-4 border-[#74c0fc] shadow-[0_8px_0_#a5d8ff] rounded-[32px] p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    onClick={() => setCurrentView('home')}
                    className="bg-[#54a0ff] border-2 border-white px-4 py-2 rounded-full text-white font-black text-xl shadow-md rotate-[-2deg] cursor-pointer hover:scale-102 transition-all"
                  >
                    MUUNEK 🚀
                  </div>

                  <button
                    onClick={() => setCurrentView('home')}
                    className="bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-black flex items-center justify-center gap-1"
                    title="Go to Home"
                  >
                    🏠 <span className="hidden lg:inline">Home</span>
                  </button>

                  <button
                    onClick={handleNavigateToParentsCorner}
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-black flex items-center justify-center gap-1"
                    title="Parents Corner"
                  >
                    🛡️ <span className="hidden lg:inline">Parents</span>
                  </button>
                </div>

                {/* 100 Lessons Selector */}
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border-2 border-slate-200 shadow-inner">
                  <button
                    onClick={() => {
                      const prevId = Math.max(1, leccionActivaId - 1);
                      cambiarLeccion(prevId);
                      hablarTexto(`Lesson ${prevId}`);
                    }}
                    disabled={leccionActivaId === 1}
                    className="text-slate-500 hover:text-[#7048e8] disabled:opacity-30 cursor-pointer font-black text-lg px-2 disabled:cursor-not-allowed select-none active:scale-95 transition-all"
                  >
                    ◀
                  </button>
                  <select
                    value={leccionActivaId}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      cambiarLeccion(val);
                      hablarTexto(`Lesson ${val}`);
                    }}
                    className="bg-transparent text-slate-700 font-black text-sm outline-none cursor-pointer border-none select-none font-sans px-1"
                  >
                    {Array.from({ length: 100 }).map((_, i) => (
                      <option key={i + 1} value={i + 1} className="font-sans font-bold">
                        Lesson {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      const nextId = Math.min(100, leccionActivaId + 1);
                      cambiarLeccion(nextId);
                      hablarTexto(`Lesson ${nextId}`);
                    }}
                    disabled={leccionActivaId === 100}
                    className="text-slate-500 hover:text-[#7048e8] disabled:opacity-30 cursor-pointer font-black text-lg px-2 disabled:cursor-not-allowed select-none active:scale-95 transition-all"
                  >
                    ▶
                  </button>
                </div>

                <button
                  onClick={() => setShowAllLettersGrid(prev => !prev)}
                  className="px-4 py-2 rounded-full font-black text-sm bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95 transition-all cursor-pointer flex items-center gap-1 shadow-sm border border-amber-200"
                >
                  {showAllLettersGrid ? '📖 Back to Lesson' : '🎯 Choose a Letter'}
                </button>

                <button
                  onClick={() => {
                    const state = !mostrarGuiaPadre;
                    setMostrarGuiaPadre(state);
                    hablarTexto(state ? "Guide opened" : "Guide closed");
                  }}
                  className="px-4 py-2 rounded-full font-black text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm border border-indigo-200"
                >
                  {mostrarGuiaPadre ? '👁️ Hide Parent Guide' : '👁️ Show Parent Guide'}
                </button>
              </div>

              {/* Dynamic Profiles Switcher */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {perfiles.map((p) => {
                    const activo = p.id === activeProfileId;
                    return (
                      <div key={p.id} className="relative group">
                        <button
                          onClick={() => seleccionarPerfil(p)}
                          className="focus:outline-none flex flex-col items-center cursor-pointer"
                        >
                          <div className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${activo ? 'border-yellow-400 shadow-md scale-105' : 'border-slate-200 hover:scale-102'
                            }`}>
                            {p.avatar === 'rhea' ? <AvatarRhea /> :
                              p.avatar === 'ollo' ? <AvatarOllo /> :
                                p.avatar === 'sandy' ? <AvatarSandy /> :
                                  <AvatarKodi />}
                          </div>
                          <span className={`text-[10px] font-black mt-0.5 ${activo ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
                            {p.name}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="h-8 w-[2px] bg-slate-200 hidden md:block"></div>
                <button
                  onClick={statusCheckHandler}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-black px-4 py-2 rounded-full shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-none text-xs transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </header>

            {/* LEARNING BODY */}
            {perfiles.length === 0 ? (
              <div
                className="flex-1 bg-white/95 border-[8px] border-slate-700 shadow-2xl p-12 text-center flex flex-col items-center justify-center gap-6 my-auto max-xl mx-auto w-full max-w-xl"
                style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
              >
                <KodiMascot bubbleText="Welcome parents! Please create a child profile to start learning together!" />
                <button
                  onClick={() => setShowAddProfileModal(true)}
                  className="bg-[#10AC84] hover:bg-[#0f9b77] text-white font-black py-4 px-8 rounded-full shadow-[0_8px_0_#0a7257] active:translate-y-2 active:shadow-none text-xl transform hover:scale-105 transition-all cursor-pointer"
                >
                  + Create Profile
                </button>
              </div>
            ) : showAllLettersGrid ? (

              /* ═══════════════════════════════════════════
                 NEW: CHOOSE A LETTER GRID DASHBOARD
                 ═══════════════════════════════════════════ */
              <div className="bg-white border-[10px] border-slate-700 p-6 shadow-2xl flex flex-col items-center w-full animate-slide-up"
                style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
              >
                <div className="text-center w-full max-w-lg mb-6">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">Choose a Letter!</h2>
                  <p className="text-sm font-bold text-slate-500 mt-1 flex items-center justify-center gap-1">
                    {learnedLetters.length} of 26 letters learned <span className="text-yellow-400 text-lg">⭐</span>
                  </p>

                  {/* Progress bar of letters */}
                  <div className="w-full bg-slate-100 rounded-full h-4 mt-3 border-2 border-slate-200 overflow-hidden p-0.5">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all duration-500 shadow-inner"
                      style={{ width: `${(learnedLetters.length / 26) * 100}%` }}
                    />
                  </div>

                  {/* Letters filters */}
                  <div className="flex gap-2 justify-center mt-5">
                    {[
                      { id: 'all', label: `All (26)` },
                      { id: 'todo', label: `To Do (${26 - learnedLetters.length})` },
                      { id: 'done', label: `Done (${learnedLetters.length})` }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setChooseLetterFilter(tab.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${chooseLetterFilter === tab.id
                          ? 'bg-sky-400 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letters grid ordered by Introductory Lesson */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 w-full max-w-5xl">
                  {Object.keys(LETTER_TO_LESSON)
                    // Apply ordering matching the lesson sequence
                    .sort((a, b) => LETTER_TO_LESSON[a] - LETTER_TO_LESSON[b])
                    .map((letra) => {
                      const learned = learnedLetters.includes(letra);

                      // Filter checks
                      if (chooseLetterFilter === 'todo' && learned) return null;
                      if (chooseLetterFilter === 'done' && !learned) return null;

                      const ill = GRID_ILLUSTRATIONS[letra] || { name: 'Sun', emoji: '☀️' };

                      // Colors mapping by index
                      const colorMap = {
                        A: 'text-rose-500', B: 'text-amber-500', C: 'text-teal-500', D: 'text-emerald-500',
                        E: 'text-purple-500', F: 'text-sky-500', G: 'text-indigo-500', H: 'text-orange-500',
                        I: 'text-rose-500', J: 'text-purple-500', K: 'text-cyan-500', L: 'text-amber-500',
                        M: 'text-rose-500', N: 'text-emerald-500', O: 'text-amber-500', P: 'text-sky-500',
                        Q: 'text-yellow-600', R: 'text-rose-500', S: 'text-yellow-500', T: 'text-orange-500',
                        U: 'text-sky-500', V: 'text-red-500', W: 'text-sky-500', X: 'text-violet-500',
                        Y: 'text-emerald-500', Z: 'text-indigo-500'
                      };
                      const letterColorClass = colorMap[letra] || 'text-indigo-500';

                      return (
                        <button
                          key={letra}
                          onClick={() => handleSelectLetterFromGrid(letra)}
                          className={`bg-white border-4 p-5 rounded-[32px] shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-2 cursor-pointer relative ${learned ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-300'
                            }`}
                        >
                          {learned && (
                            <span className="absolute top-2 right-2 text-xs text-emerald-600 font-extrabold bg-white border border-emerald-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm z-10">
                              ✓
                            </span>
                          )}
                          <span className="text-4xl select-none leading-none">{ill.emoji}</span>
                          <span className={`text-5xl font-black ${letterColorClass} tracking-tight`}>{letra}</span>
                          <span className="text-xs font-black text-slate-500 leading-none uppercase tracking-wider">{ill.name}</span>
                        </button>
                      );
                    })}
                </div>
              </div>

            ) : (

              /* DYNAMIC LESSON BOARD GRID */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">

                {/* LEFT SIDEBAR: COLLAPSIBLE PARENT GUIDE */}
                {mostrarGuiaPadre && (
                  <section className="lg:col-span-4 flex flex-col animate-slide-up">
                    <div
                      className="bg-slate-50 border-4 border-slate-300 shadow-[0_8px_0_#cbd5e1] p-6 flex flex-col justify-between flex-1"
                      style={{ fontFamily: "'Nunito', sans-serif", borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
                    >
                      <div>
                        <div className="flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-2 mb-4">
                          <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                            👨‍👩‍👦 Parent Guide
                          </h3>
                          <button
                            onClick={() => {
                              setMostrarGuiaPadre(false);
                              hablarTexto("Guide collapsed");
                            }}
                            className="text-xs font-black bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-full text-slate-600 transition-all cursor-pointer"
                          >
                            Hide
                          </button>
                        </div>

                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
                          <p className="text-indigo-600 font-extrabold text-base">
                            📢 Introduction:
                          </p>
                          <p className="pl-3 border-l-4 border-indigo-400 text-slate-700 italic bg-white/70 p-3 rounded-2xl shadow-sm">
                            &quot;{guion_padre?.introduccion}&quot;
                          </p>

                          <p className="text-[#10AC84] font-extrabold text-base mt-6">
                            👉 Practice Steps:
                          </p>
                          <div className="space-y-3 bg-white/70 p-3 rounded-2xl shadow-sm text-slate-700">
                            {guion_padre?.instruccion_m && (
                              <p className="pl-2 border-l-2 border-emerald-400">
                                {guion_padre.instruccion_m}
                              </p>
                            )}
                            {guion_padre?.instruccion_s && (
                              <p className="pl-2 border-l-2 border-emerald-400">
                                {guion_padre.instruccion_s}
                              </p>
                            )}
                            {guion_padre?.instruccion_t && (
                              <p className="pl-2 border-l-2 border-emerald-400">
                                {guion_padre.instruccion_t}
                              </p>
                            )}
                            {guion_padre?.instruccion_p && (
                              <p className="pl-2 border-l-2 border-emerald-400">
                                {guion_padre.instruccion_p}
                              </p>
                            )}
                            {guion_padre?.instruccion_a && (
                              <p className="pl-2 border-l-2 border-emerald-400">
                                {guion_padre.instruccion_a}
                              </p>
                            )}
                            {guion_padre?.instruccion_n && (
                              <p className="pl-2 border-l-2 border-emerald-400">
                                {guion_padre.instruccion_n}
                              </p>
                            )}
                            {Object.keys(guion_padre || {}).map((key) => {
                              if (["introduccion", "instruccion_m", "instruccion_s", "instruccion_t", "instruccion_p", "instruccion_a", "instruccion_n"].includes(key)) return null;
                              return (
                                <p key={key} className="pl-2 border-l-2 border-emerald-400">
                                  {guion_padre[key]}
                                </p>
                              );
                            })}
                          </div>

                          {/* Phonics story block */}
                          {parent_story && (
                            <div className="mt-6 bg-[#ffeedd]/70 border-2 border-orange-200 p-4 rounded-2xl shadow-sm text-slate-700">
                              <p className="text-orange-600 font-extrabold text-sm uppercase tracking-wider mb-1 flex items-center gap-1">
                                <span>📖</span> Read Story to Child:
                              </p>
                              <p className="font-serif italic text-sm md:text-base leading-relaxed text-slate-800">
                                &quot;{parent_story}&quot;
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-extrabold text-slate-400 flex items-center justify-between">
                        <span>Session: {userEmail}</span>
                        <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-500 uppercase text-[10px]">Guide</span>
                      </div>
                    </div>
                  </section>
                )}

                {/* RIGHT MAIN PANEL: TABLET */}
                <section className={`flex flex-col gap-4 transition-all duration-300 ${mostrarGuiaPadre ? 'lg:col-span-8' : 'lg:col-span-12'}`}>

                  {/* MASCOT CHAT */}
                  <div className="w-full">
                    <KodiMascot bubbleText={mascotText} />
                  </div>

                  {/* TABLET UNIT WITH ROUGH SKETCHBOOK OUTLINE */}
                  <div
                    className="bg-white border-[10px] border-slate-700 shadow-2xl relative p-5 flex flex-col items-center justify-between gap-4 flex-1 animate-bounce-in"
                    style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
                  >

                    {/* Header row in tablet */}
                    <div className="w-full flex items-center justify-between border-b-2 border-slate-100 pb-2">

                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-white text-white font-black px-5 py-2 rounded-full shadow-md text-base md:text-lg flex items-center gap-2 transform rotate-[-1.5deg]">
                        ⭐ {nombreMellizo}: {clics} stars
                      </div>

                      {/* Current letter indicator */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-500">Letter:</span>
                        <div className="w-14 h-14 rounded-full text-white text-2xl font-black flex items-center justify-center border-4 border-white shadow-md bg-[#FF6B6B] shadow-[0_6px_0_#be123c]">
                          {letraActiva}
                        </div>
                      </div>

                      {/* Phonetics speaker key */}
                      <button
                        onClick={reproducirSonidoLetra}
                        className="bg-[#54a0ff] hover:bg-[#2e86de] border-4 border-white text-white p-3 rounded-full shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                        title="Listen Pronunciation"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      </button>
                    </div>

                    {/* TABLET TABS NAVIGATION */}
                    <div className="flex flex-wrap gap-3 w-full justify-center mt-1">
                      <button
                        onClick={() => { setActiveTab('trace'); hablarTexto("Let's trace!"); }}
                        className={`px-4 py-2 rounded-full font-black text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === 'trace'
                          ? 'bg-sky-400 text-white shadow-[0_4px_0_#0284c7] scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        🎨 Trace Letter
                      </button>
                      <button
                        onClick={() => { setActiveTab('pop'); hablarTexto("Pop the bubbles!"); }}
                        className={`px-4 py-2 rounded-full font-black text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === 'pop'
                          ? 'bg-[#10AC84] text-white shadow-[0_4px_0_#0a7257] scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        🎈 Pop Game
                      </button>
                      <button
                        onClick={() => { setActiveTab('search'); hablarTexto("Find the hidden words!"); }}
                        className={`px-4 py-2 rounded-full font-black text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === 'search'
                          ? 'bg-indigo-500 text-white shadow-[0_4px_0_#4338ca] scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        🔍 Word Search
                      </button>
                      <button
                        onClick={() => { setActiveTab('words'); hablarTexto("Learn vocabulary!"); }}
                        className={`px-4 py-2 rounded-full font-black text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === 'words'
                          ? 'bg-amber-400 text-white shadow-[0_4px_0_#d97706] scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        🔤 Learn Words
                      </button>
                      <button
                        onClick={() => { setActiveTab('story'); hablarTexto("Listen to the story!"); }}
                        className={`px-4 py-2 rounded-full font-black text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeTab === 'story'
                          ? 'bg-purple-500 text-white shadow-[0_4px_0_#5b21b6] scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        📖 Story Time
                      </button>
                    </div>

                    {/* TABLET CORE CONTAINER */}
                    <div className="w-full flex flex-col items-center flex-1 justify-center min-h-[350px]">
                      {activeTab === 'trace' && (
                        /* ACTIVITY 1: TRACING BOARD WITH DOTS AND ARROWS OVERLAY */
                        <div className="flex flex-col items-center gap-4 w-full animate-slide-up">
                          <div className="relative w-full max-w-[500px] h-[300px] bg-slate-50 border-4 border-dashed border-slate-200 rounded-[32px] overflow-hidden shadow-inner flex items-center justify-center">

                            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                              {/* Background letter outline */}
                              <text
                                x="50%"
                                y="55%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="3"
                                className="font-black text-[200px]"
                                style={{ fontFamily: "'Fredoka', sans-serif" }}
                              >
                                {letraActiva}
                              </text>

                              {/* Numbered circles and directed arrows guide */}
                              {TRACING_GUIDES[letraActiva] && (
                                <g className="opacity-80">
                                  <defs>
                                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" />
                                    </marker>
                                  </defs>
                                  {TRACING_GUIDES[letraActiva].map((stroke, index) => (
                                    <g key={index}>
                                      <path
                                        d={stroke.d}
                                        stroke="#60a5fa"
                                        strokeWidth="6"
                                        strokeDasharray="8 6"
                                        fill="none"
                                        markerEnd="url(#arrow)"
                                        strokeLinecap="round"
                                      />
                                      <circle cx={stroke.sx} cy={stroke.sy} r="10" fill="#22c55e" stroke="white" strokeWidth="2" />
                                      <text
                                        x={stroke.sx}
                                        y={stroke.sy}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill="white"
                                        fontSize="10"
                                        fontWeight="900"
                                        fontFamily="'Fredoka', sans-serif"
                                      >
                                        {stroke.num}
                                      </text>
                                    </g>
                                  ))}
                                </g>
                              )}
                            </svg>

                            <canvas
                              ref={canvasRef}
                              width={500}
                              height={300}
                              className="absolute inset-0 z-10 cursor-pointer w-full h-full touch-none"
                              onMouseDown={startDrawing}
                              onMouseMove={draw}
                              onMouseUp={stopDrawing}
                              onMouseLeave={stopDrawing}
                              onTouchStart={startDrawing}
                              onTouchMove={draw}
                              onTouchEnd={stopDrawing}
                            />
                          </div>

                          <div className="w-full flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-end gap-3 bg-slate-100 px-5 py-2 rounded-3xl border-2 border-slate-200">
                              <button
                                onClick={() => setSelectedColor('#FF6B6B')}
                                className={`crayon-btn w-7 h-14 rounded-t-full cursor-pointer border-t-4 border-white/40 ${selectedColor === '#FF6B6B' ? 'active' : ''}`}
                                style={{ backgroundColor: '#FF6B6B', borderBottom: '6px solid #b91c1c' }}
                                title="Red Crayon"
                              />
                              <button
                                onClick={() => setSelectedColor('#54a0ff')}
                                className={`crayon-btn w-7 h-14 rounded-t-full cursor-pointer border-t-4 border-white/40 ${selectedColor === '#54a0ff' ? 'active' : ''}`}
                                style={{ backgroundColor: '#54a0ff', borderBottom: '6px solid #2e86de' }}
                                title="Blue Crayon"
                              />
                              <button
                                onClick={() => setSelectedColor('#1DD1A1')}
                                className={`crayon-btn w-7 h-14 rounded-t-full cursor-pointer border-t-4 border-white/40 ${selectedColor === '#1DD1A1' ? 'active' : ''}`}
                                style={{ backgroundColor: '#1DD1A1', borderBottom: '6px solid #10AC84' }}
                                title="Green Crayon"
                              />
                              <button
                                onClick={() => setSelectedColor('#a78bfa')}
                                className={`crayon-btn w-7 h-14 rounded-t-full cursor-pointer border-t-4 border-white/40 ${selectedColor === '#a78bfa' ? 'active' : ''}`}
                                style={{ backgroundColor: '#a78bfa', borderBottom: '6px solid #7c3aed' }}
                                title="Purple Crayon"
                              />
                              <button
                                onClick={() => setSelectedColor('#f8fafc')}
                                className={`crayon-btn w-8 h-10 rounded-lg cursor-pointer border-t-4 border-white/30 flex items-center justify-center text-xs font-black ${selectedColor === '#f8fafc' ? 'active' : ''}`}
                                style={{ backgroundColor: '#cbd5e1', borderBottom: '4px solid #64748b' }}
                                title="Chalk Eraser"
                              >
                                🧽
                              </button>
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={clearCanvas}
                                className="bg-slate-300 hover:bg-slate-400 text-slate-700 font-black px-5 py-2.5 rounded-full shadow-[0_4px_0_#94a3b8] active:translate-y-1 active:shadow-none text-sm cursor-pointer transition-all"
                              >
                                Clear
                              </button>
                              <button
                                onClick={finalizarEjercicio}
                                className="bg-[#10AC84] hover:bg-[#0f9b77] text-white font-black px-6 py-2.5 rounded-full shadow-[0_4px_0_#0a7257] active:translate-y-1 active:shadow-none text-base transform hover:scale-105 transition-all cursor-pointer"
                              >
                                Done! 👍
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'pop' && (
                        /* ACTIVITY 2: FLOATING BUBBLE POP GAME */
                        <div className={`relative w-full max-w-[500px] h-[360px] bg-indigo-50/50 border-4 border-dashed border-indigo-200 rounded-[32px] overflow-hidden shadow-inner flex items-center justify-center animate-slide-up select-none ${screenShake ? 'animate-shake' : ''}`}>

                          {/* Level Indicator Badge */}
                          <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full border-2 border-indigo-300 text-xs font-black text-indigo-600 z-20 pointer-events-none shadow-sm flex items-center gap-1">
                            <span>🌟</span> Level {currentLetterIdx >= 0 ? currentLetterIdx + 1 : 1}: <span className="text-[#FF6B6B] font-extrabold">{letraActiva}</span>
                          </div>

                          {/* 10-Star Scoreboard */}
                          <div className="absolute top-3 right-3 flex gap-0.5 z-20 pointer-events-none bg-white/90 px-2 py-1 rounded-full border-2 border-amber-300 shadow-sm">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs transition-all duration-300 ${i < bubbleScore
                                  ? 'text-amber-400 scale-125 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]'
                                  : 'text-slate-300 opacity-50'
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>

                          {/* Combo Display */}
                          {comboCount >= 2 && (
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce-in">
                              <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-black px-4 py-1 rounded-full text-sm shadow-lg border-2 border-white">
                                🔥 COMBO x{comboCount}!
                              </span>
                            </div>
                          )}

                          {/* Progress Bar */}
                          <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none">
                            <div className="bg-white/80 rounded-full h-3 border border-indigo-200 shadow-sm overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(bubbleScore / 10) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-center text-[10px] font-bold text-indigo-400 mt-1">
                              {bubbleScore}/10 pops to win!
                            </p>
                          </div>

                          {/* Floating Score Texts */}
                          {floatingScores.map(fs => (
                            <div
                              key={fs.id}
                              className={`absolute z-30 pointer-events-none font-black text-lg animate-float-up ${fs.isCombo ? 'text-orange-500 text-xl' : 'text-emerald-500'}`}
                              style={{ left: `${fs.x + 10}px`, top: `${fs.y - 10}px` }}
                            >
                              {fs.text}
                            </div>
                          ))}

                          {/* Particle Burst Effects */}
                          {particles.map(p => {
                            const rad = (p.angle * Math.PI) / 180;
                            const tx = Math.cos(rad) * p.speed * 20;
                            const ty = Math.sin(rad) * p.speed * 20;
                            return (
                              <div
                                key={p.id}
                                className="absolute w-2.5 h-2.5 rounded-full pointer-events-none z-10 animate-particle-burst"
                                style={{
                                  left: `${p.x}px`,
                                  top: `${p.y}px`,
                                  backgroundColor: p.color,
                                  '--tx': `${tx}px`,
                                  '--ty': `${ty}px`
                                }}
                              />
                            );
                          })}

                          {/* Floating Bubbles */}
                          {bubbles.map((b) => {
                            if (b.popped) return null;

                            const animationClass = b.isPopping
                              ? 'animate-bubble-pop pointer-events-none'
                              : b.isFadingWrong
                                ? 'animate-bubble-fade-wrong pointer-events-none'
                                : b.wiggle
                                  ? 'animate-wiggle scale-95'
                                  : 'hover:scale-110 active:scale-90';

                            const isTarget = b.letter === letraActiva;

                            return (
                              <button
                                key={b.id}
                                onClick={(e) => handleBubbleClick(e, b)}
                                className={`absolute rounded-full text-white text-xl md:text-2xl font-black flex items-center justify-center border-4 border-white cursor-pointer select-none transition-[transform,opacity] duration-200 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.15)] bg-gradient-to-tr from-white/10 to-white/30 ${b.colorClass
                                  } ${animationClass} ${isTarget ? 'ring-2 ring-yellow-300 ring-offset-1 animate-pulse' : ''}`}
                                style={{
                                  left: `${b.x}px`,
                                  top: `${b.y}px`,
                                  width: `${b.size}px`,
                                  height: `${b.size}px`,
                                  backdropFilter: 'blur(1px)',
                                }}
                              >
                                {/* Bubble shine reflection overlay */}
                                <span className="absolute top-1 left-2 w-3.5 h-2 bg-white/60 rounded-full rotate-[-30deg]"></span>
                                {b.letter}
                              </button>
                            );
                          })}

                          {/* Achievements Win Modal Overlay */}
                          {showWinModal && (
                            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-bounce-in">
                              <span className="text-6xl animate-bounce mb-2">🎉🏆🎉</span>
                              <h3 className="text-2xl font-black text-purple-600 tracking-tight">
                                Congratulations!
                              </h3>
                              <p className="text-base font-bold text-slate-600 mt-2 mb-6">
                                You popped 10 letters <span className="text-[#FF6B6B] text-xl font-black">&quot;{letraActiva}&quot;</span>! You did it! 🌟
                              </p>

                              {/* Golden medal display */}
                              <div className="w-20 h-20 bg-amber-100 border-4 border-amber-400 rounded-full flex items-center justify-center shadow-lg relative mb-6 animate-pulse">
                                <span className="text-4xl">🥇</span>
                              </div>

                              <button
                                onClick={handleNextLevel}
                                className="bg-[#10AC84] hover:bg-[#0f9b77] text-white font-black px-8 py-3 rounded-full shadow-[0_6px_0_#0a7257] active:translate-y-1 active:shadow-none text-base transition-all transform hover:scale-105 cursor-pointer"
                              >
                                Done! 👍
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'search' && (
                        /* ACTIVITY: WORD SEARCH GAME */
                        <div className="w-full flex flex-col items-center gap-4 animate-slide-up">
                          <div className="text-center mb-1">
                            <h4 className="text-xl font-extrabold text-indigo-700 flex items-center justify-center gap-2">
                              <span>🔍</span> Word Search!
                            </h4>
                            <p className="text-xs font-semibold text-slate-400">
                              Drag over letters to find vocabulary words!
                            </p>
                          </div>

                          <WordSearchGame
                            activeLetter={letraActiva}
                            vocabulary={vocabulario.map(item => item.word)}
                            onGameCompleted={() => {
                              // Mark search as completed
                              setCompletedActivities(prev => ({ ...prev, search: true }));
                              setMascotText(`Awesome job! You found all words! Let's learn their meanings! 🔤`);
                              setActiveTab('words');
                              hablarTexto("Great job! Now let's learn vocabulary words!");
                            }}
                          />
                        </div>
                      )}

                      {activeTab === 'words' && (
                        /* ACTIVITY 3: INTERACTIVE FILL-IN WORDS GAME */
                        <div className="w-full flex flex-col items-center gap-4 animate-slide-up">
                          <div className="text-center mb-2">
                            <h4 className="text-xl font-extrabold text-slate-700">
                              Let&apos;s learn words for letter: <span className="text-[#FF6B6B] text-2xl font-black">{letraActiva}</span> 🌟
                            </h4>
                            <p className="text-xs font-semibold text-slate-400 mt-1">
                              Tap the correct letter to complete each word!
                            </p>
                          </div>

                          <LearnWordsGame
                            activeLetter={letraActiva}
                            vocabulary={vocabulario}
                            onCompleted={() => {
                              setCompletedActivities(prev => ({ ...prev, words: true }));
                              setMascotText(`Fantastic job! You completed all vocabulary words! Now let's read a story together! 📖`);
                              setActiveTab('story');
                              hablarTexto("Great job! Now let's read a story together!");
                            }}
                          />
                        </div>
                      )}

                      {activeTab === 'story' && (
                        /* ACTIVITY 4: STORY TIME */
                        <div className="w-full flex flex-col items-center gap-4 animate-slide-up max-w-[520px]">
                          <div className="text-center mb-1">
                            <h4 className="text-xl font-extrabold text-purple-700 flex items-center justify-center gap-2">
                              <span>📖</span> Story Time!
                            </h4>
                            <p className="text-xs font-semibold text-slate-400">
                              Follow the yellow highlight as Kodi reads aloud!
                            </p>
                          </div>

                          <div
                            className="w-full bg-[#fdfaf6] border-4 border-slate-700 shadow-[0_8px_0_#475569] p-6 text-left leading-relaxed relative min-h-[140px] flex flex-col justify-between"
                            style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
                          >
                            <div className="text-lg font-medium text-slate-800 font-serif leading-loose">
                              {storySentences.map((sentence, idx) => {
                                const isCurrent = idx === currentSentenceIndex;
                                return (
                                  <span
                                    key={idx}
                                    className={`px-1 py-0.5 rounded transition-all duration-200 ${isCurrent
                                      ? 'bg-yellow-200 border-b-2 border-yellow-400 font-extrabold text-slate-900 scale-102 inline-block'
                                      : ''
                                      }`}
                                  >
                                    {sentence}{' '}
                                  </span>
                                );
                              })}
                            </div>

                            <div className="mt-6 flex items-center justify-between w-full gap-4">
                              <button
                                onClick={leerCuentoEnVozAlta}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-2.5 rounded-full shadow-[0_4px_0_#5b21b6] active:translate-y-1 active:shadow-none text-sm transition-all flex items-center gap-2 cursor-pointer"
                              >
                                <span>🔊</span> Read Aloud
                              </button>

                              <button
                                onClick={handleCompleteLesson}
                                disabled={!allActivitiesCompleted}
                                className={`font-black px-8 py-3 rounded-full text-base transition-all flex items-center gap-2 cursor-pointer ${allActivitiesCompleted
                                  ? 'bg-[#10AC84] hover:bg-[#0f9b77] text-white shadow-[0_6px_0_#0a7257] active:translate-y-1 active:shadow-none transform hover:scale-105 animate-bounce'
                                  : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60'
                                  }`}
                              >
                                {allActivitiesCompleted
                                  ? (currentLetterIdx < (ejercicios_nino?.length || 0) - 1
                                    ? 'Siguiente Nivel! 🚀'
                                    : 'Siguiente Lección! 🎓')
                                  : 'Done! 👍'}
                              </button>
                            </div>

                            {!allActivitiesCompleted && (
                              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[10px] sm:text-xs text-amber-700 font-black flex flex-wrap gap-x-4 gap-y-1 justify-center w-full shadow-inner animate-pulse">
                                <span>To finish this lesson, complete:</span>
                                <span className={completedActivities.trace ? 'text-emerald-600' : 'opacity-65'}>
                                  {completedActivities.trace ? '✓' : '○'} Trace Letter
                                </span>
                                <span className={completedActivities.pop ? 'text-emerald-600' : 'opacity-65'}>
                                  {completedActivities.pop ? '✓' : '○'} Pop Game
                                </span>
                                <span className={completedActivities.search ? 'text-emerald-600' : 'opacity-65'}>
                                  {completedActivities.search ? '✓' : '○'} Word Search
                                </span>
                                <span className={completedActivities.words ? 'text-emerald-600' : 'opacity-65'}>
                                  {completedActivities.words ? '✓' : '○'} Learn Words
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </section>

              </div>
            )}
          </div>
        )}

        {/* =========================================
            3. PARENTS DASHBOARD VIEW 🛡️
            ========================================= */}
        {currentView === 'parents' && (
          <div className="flex-1 flex flex-col gap-6 animate-slide-up py-4">

            {/* Title banner */}
            <div className="bg-white border-4 border-[#b197fc] shadow-[0_8px_0_#d0bfff] rounded-[32px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-800">Parents Corner</h2>
                <p className="text-sm font-bold text-slate-500">Monitor activity, set controls, and view reading metrics</p>
              </div>
              <button
                onClick={() => setIsParentsCornerUnlocked(false) || setCurrentView('home')}
                className="bg-slate-500 hover:bg-slate-600 text-white font-black px-6 py-3 rounded-full shadow-[0_4px_0_#334155] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
              >
                🔒 Exit Parents Corner
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left column: Session clock, limits and activity */}
              <div className="lg:col-span-6 space-y-6">

                {/* Clock Card */}
                <div className="bg-white border-4 border-slate-300 p-6 rounded-[32px] shadow-[0_8px_0_#cbd5e1] text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-purple-600 font-extrabold">
                    <span>⏱️</span>
                    <span className="text-sm uppercase tracking-wider font-black">Today&apos;s Session</span>
                  </div>

                  {/* Digital clock display */}
                  <div className="text-5xl md:text-6xl font-mono font-black text-purple-600 tracking-wider">
                    {getFormattedTime(sessionTime)}
                  </div>

                  <div className="text-xs font-bold text-slate-400">
                    {sessionTime >= sessionLimit ? (
                      <span className="text-rose-500 font-black">Limit reached! Take a break.</span>
                    ) : (
                      <span>{getRemainingMinutes()} min remaining</span>
                    )}
                  </div>

                  {/* Limit Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full transition-all duration-300 shadow-inner"
                      style={{ width: `${Math.min(100, (sessionTime / sessionLimit) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 block">
                    {Math.min(100, Math.round((sessionTime / sessionLimit) * 100))}% of {Math.round(sessionLimit / 60)} min limit
                  </span>
                </div>

                {/* Time Limits Selector */}
                <div className="bg-white border-4 border-slate-300 p-6 rounded-[32px] shadow-[0_8px_0_#cbd5e1] space-y-3">
                  <div className="flex items-center gap-2 border-b-2 border-dashed border-slate-100 pb-1.5">
                    <span className="text-amber-500 text-lg">⚙️</span>
                    <h3 className="text-base font-black text-slate-800">Set Session Time Limit</h3>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[15, 20, 30, 45, 60].map((mins) => {
                      const isActive = sessionLimit === mins * 60;
                      return (
                        <button
                          key={mins}
                          onClick={() => handleSetSessionLimit(mins)}
                          className={`py-2 px-1 rounded-2xl font-black text-xs transition-all text-center cursor-pointer border-2 ${isActive
                            ? 'bg-amber-400 text-white border-amber-500 shadow-sm animate-pop'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                          {mins}m
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 italic">
                    The timer pauses automatically when the parent session is signed out.
                  </p>
                </div>

                {/* Weekly activity SVG chart */}
                <WeeklyActivity activeProfileId={activeProfileId} />

              </div>

              {/* Right column: Unified profiles list with circular progress metrics for each child */}
              <div className="lg:col-span-6 space-y-6">

                {/* Unified Child Profiles & Learning Progress Card */}
                <div className="bg-white border-4 border-slate-300 p-6 rounded-[32px] shadow-[0_8px_0_#cbd5e1] space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-500 text-lg">👥</span>
                      <h3 className="text-base font-black text-slate-800">Child Profiles & Progress</h3>
                    </div>
                    {perfiles.length < 5 && (
                      <button
                        onClick={() => setShowAddProfileModal(true)}
                        className="bg-[#10AC84] hover:bg-[#0f9b77] text-white font-black px-4 py-2 rounded-full text-xs transition-all shadow-[0_3px_0_#0a7257] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center gap-1"
                      >
                        <span>+</span> Add Child
                      </button>
                    )}
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {perfiles.map(p => {
                      const lettersCount = Object.entries(LETTER_TO_LESSON).filter(([letra, lessonNum]) => lessonNum < (p.leccion_actual || 1)).length;
                      const wordsCount = Math.min(26, lettersCount * 2);
                      const achievementsCount = checkAchievements(p, sessionTime).filter(a => a.unlocked).length;

                      return (
                        <div
                          key={p.id}
                          className="flex flex-col p-4 bg-slate-50 rounded-3xl border border-slate-200 gap-3"
                        >
                          {/* Row 1: Profile basic details & Delete button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                                {p.avatar === 'rhea' ? <AvatarRhea /> :
                                  p.avatar === 'ollo' ? <AvatarOllo /> :
                                    p.avatar === 'sandy' ? <AvatarSandy /> :
                                      <AvatarKodi />}
                              </div>
                              <div>
                                <span className="text-sm font-black text-slate-700 block">{p.name}</span>
                                <span className="text-[10px] font-bold text-slate-400">Lesson {p.leccion_actual || 1} • {p.stars || 0} ⭐</span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => handleDeleteProfile(p.id, e)}
                              className="bg-rose-100 hover:bg-rose-200 text-rose-600 font-black px-3 py-1.5 rounded-xl text-[10px] transition-all border border-rose-200 cursor-pointer hover:scale-102 active:scale-98"
                            >
                              Delete ✕
                            </button>
                          </div>

                          {/* Row 2: Dynamic progress mini gauges */}
                          <div className="flex flex-wrap items-center gap-2 justify-between bg-white p-2 rounded-2xl border border-slate-100 shadow-inner">
                            <MiniProgressRing value={lettersCount} max={26} color="#49a9ea" label="Letters" />
                            <MiniProgressRing value={wordsCount} max={26} color="#f35d5d" label="Words" />
                            <MiniProgressRing value={achievementsCount} max={8} color="#eab308" label="Badges" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>



      {/* =========================================
          5. MODAL POPUPS & INTERACTIVE LOCKS
          ========================================= */}

      {/* OVERLAY LOCK: PARENTS GATE MATHEMATICS QUESTION */}
      {parentLockGate.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" style={{ zIndex: 100 }}>
          <div
            className={`bg-white border-[8px] border-[#b197fc] shadow-2xl p-6 md:p-8 w-full max-w-sm text-center ${parentLockGate.error ? 'animate-wiggle border-rose-500' : 'animate-bounce-in'
              }`}
            style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
          >
            <h3 className="text-xl font-black text-slate-800 mb-2">Parents Only! 🔒</h3>
            <p className="text-xs font-bold text-slate-400 mb-6">
              Please solve this math question to enter the Parents zone:
            </p>

            <form onSubmit={verifyParentGate} className="space-y-4">
              <div className="text-3xl font-black text-indigo-600 font-mono tracking-wide py-2 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                {parentLockGate.n1} + {parentLockGate.n2} = ?
              </div>

              <input
                type="number"
                required
                autoFocus
                placeholder="Enter answer"
                value={parentLockGate.answer}
                onChange={(e) => setParentLockGate(prev => ({ ...prev, answer: e.target.value }))}
                className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-indigo-400 text-center text-lg"
              />

              {parentLockGate.error && (
                <div className="text-rose-500 text-xs font-black">
                  Incorrect answer, try again! ✕
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setParentLockGate({ show: false, answer: '', n1: 0, n2: 0, nextAction: null, error: false })}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-2.5 rounded-full text-sm cursor-pointer shadow-sm border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-black py-2.5 rounded-full text-sm cursor-pointer shadow-[0_4px_0_#6b21a8] active:translate-y-1 active:shadow-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL: TIME IS UP BREAK POPUP */}
      {showTimeUpModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border-[10px] border-rose-500 shadow-2xl p-6 md:p-8 w-full max-w-md text-center animate-bounce-in"
            style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
          >
            <span className="text-5xl block mb-2">⏰</span>
            <h2 className="text-3xl font-black text-rose-500 mb-2">Time to Rest!</h2>
            <p className="text-sm font-bold text-slate-500 mb-6">
              You have reached your session limit for today. Let&apos;s rest your eyes and play outside!
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  triggerParentGate(() => {
                    // Add 15 minutes (900 seconds) to either the current limit or current elapsed time, whichever is higher
                    const currentLim = sessionLimitRef.current;
                    const currentTime = sessionTimeRef.current;
                    const referenceTime = Math.max(currentLim, currentTime);
                    const newLimitMins = Math.round((referenceTime + 900) / 60);
                    handleSetSessionLimit(newLimitMins);
                    setShowTimeUpModal(false);
                  });
                }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-white font-black py-3 rounded-full shadow-[0_4px_0_#d97706] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
              >
                🛠️ Parents: Add 15 More Minutes
              </button>

              <button
                onClick={() => {
                  triggerParentGate(() => {
                    // Deactivate timer, saving to localStorage as well
                    setSessionLimit(999999);
                    sessionLimitRef.current = 999999;
                    localStorage.setItem('muunek_session_limit', '999999');
                    setShowTimeUpModal(false);
                  });
                }}
                className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-black py-3 rounded-full shadow-[0_4px_0_#0a7257] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
              >
                🔓 Parents: Turn Off Session Limit
              </button>

              <button
                onClick={cerrarSesion}
                className="w-full bg-slate-500 hover:bg-slate-600 text-white font-black py-3 rounded-full shadow-[0_4px_0_#334155] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
              >
                👋 Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENDER MODAL: CREATE CHILD PROFILE */}
      {showAddProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border-[8px] border-[#74c0fc] shadow-2xl p-6 md:p-8 w-full max-w-md text-center animate-bounce-in"
            style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
          >

            <h3 className="text-2xl font-black text-slate-800 mb-2">
              Create Child Profile 🎨
            </h3>
            <p className="text-sm font-bold text-slate-500 mb-6">
              Enter your child&apos;s name and choose a character avatar
            </p>

            <form onSubmit={handleAddProfile} className="space-y-6">
              <div className="text-left">
                <label className="text-sm font-black text-slate-700 block mb-1">
                  Child&apos;s Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-700 block mb-3 text-left">
                  Choose a Character
                </label>
                <div className="grid grid-cols-4 gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setNewProfileAvatar('kodi')}
                    className={`aspect-square rounded-2xl border-4 focus:outline-none p-1 transition-all flex flex-col items-center justify-center ${newProfileAvatar === 'kodi'
                      ? 'border-yellow-400 scale-105 bg-amber-50 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 bg-white'
                      }`}
                    title="Kodi (Bear)"
                  >
                    <AvatarKodi />
                    <span className="text-[10px] font-black text-slate-600 mt-1">Kodi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProfileAvatar('rhea')}
                    className={`aspect-square rounded-2xl border-4 focus:outline-none p-1 transition-all flex flex-col items-center justify-center ${newProfileAvatar === 'rhea'
                      ? 'border-yellow-400 scale-105 bg-amber-50 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 bg-white'
                      }`}
                    title="Rhea (Red Panda)"
                  >
                    <AvatarRhea />
                    <span className="text-[10px] font-black text-slate-600 mt-1">Rhea</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProfileAvatar('ollo')}
                    className={`aspect-square rounded-2xl border-4 focus:outline-none p-1 transition-all flex flex-col items-center justify-center ${newProfileAvatar === 'ollo'
                      ? 'border-yellow-400 scale-105 bg-amber-50 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 bg-white'
                      }`}
                    title="Ollo (Elephant)"
                  >
                    <AvatarOllo />
                    <span className="text-[10px] font-black text-slate-600 mt-1">Ollo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProfileAvatar('sandy')}
                    className={`aspect-square rounded-2xl border-4 focus:outline-none p-1 transition-all flex flex-col items-center justify-center ${newProfileAvatar === 'sandy'
                      ? 'border-yellow-400 scale-105 bg-amber-50 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 bg-white'
                      }`}
                    title="Sandy (Fox)"
                  >
                    <AvatarSandy />
                    <span className="text-[10px] font-black text-slate-600 mt-1">Sandy</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProfileModal(false);
                    setNewProfileName('');
                    setNewProfileAvatar('kodi');
                  }}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3 rounded-full shadow-[0_4px_0_#cbd5e1] active:translate-y-1 active:shadow-none text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#10AC84] hover:bg-[#0f9b77] text-white font-black py-3 rounded-full shadow-[0_4px_0_#0a7257] active:translate-y-1 active:shadow-none text-sm transition-all cursor-pointer"
                >
                  Let&apos;s Go! 🚀
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* FLYING STARS RENDER */}
      {flyingStars.map((star) => (
        <div
          key={star.id}
          className="flying-star text-4xl text-yellow-400 select-none"
          style={{
            left: star.x,
            top: star.y,
            '--dx': `${star.dx}px`,
            '--dy': `${star.dy}px`
          }}
        >
          ⭐
        </div>
      ))}
    </main>
  );
}