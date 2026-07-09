'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MAX_BUBBLES = 15;
const CORRECT_TARGET = 10;

const PASTEL_COLORS = [
  { bg: 'bg-rose-300', border: 'border-rose-400', shadow: '#E8737F' },
  { bg: 'bg-sky-300', border: 'border-sky-400', shadow: '#5AA3E8' },
  { bg: 'bg-emerald-300', border: 'border-emerald-400', shadow: '#5AE87D' },
  { bg: 'bg-amber-200', border: 'border-amber-300', shadow: '#E8E85A' },
  { bg: 'bg-violet-300', border: 'border-violet-400', shadow: '#B85AE8' },
  { bg: 'bg-orange-200', border: 'border-orange-300', shadow: '#E89B5A' },
  { bg: 'bg-cyan-200', border: 'border-cyan-300', shadow: '#5AE8E8' },
];

const playSound = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

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
      [261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.2);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.2);
      });
    }
  } catch (e) {
    console.warn('Audio error:', e);
  }
};

let bubbleIdCounter = 0;

export default function BubbleGame({
  targetLetter = 'M',
  lessonId = 1,
  childId = null,
  onProgressSave = null,
  onComplete = null,
  onLetterPopped = null,
  showInstructions = true,
  customMessage = '',
}) {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [poppingId, setPoppingId] = useState(null);
  const [fadingId, setFadingId] = useState(null);
  const [lastFeedback, setLastFeedback] = useState(null);

  const scoreRef = useRef(0);
  const spawnTimerRef = useRef(null);
  const animFrameRef = useRef(null);
  const bubblesRef = useRef([]);

  const target = targetLetter.toUpperCase();
  const otherLetters = ALPHABET.split('').filter((l) => l !== target);

  const randomLetter = useCallback(() => {
    return Math.random() > 0.6
      ? target
      : otherLetters[Math.floor(Math.random() * otherLetters.length)];
  }, [target, otherLetters]);

  const getColor = useCallback(
    (letter) => {
      if (letter === target) {
        return PASTEL_COLORS[1];
      }
      return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
    },
    [target]
  );

  const createBubble = useCallback(
    (startAtBottom = false) => {
      const letter = randomLetter();
      const color = getColor(letter);
      const size = 60 + Math.random() * 25;
      return {
        id: ++bubbleIdCounter,
        x: 5 + Math.random() * 85,
        y: startAtBottom ? 110 : Math.random() * 60 + 5,
        vy: 0.15 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.08,
        letter,
        color,
        size,
        isPopping: false,
        isFadingWrong: false,
      };
    },
    [randomLetter, getColor]
  );

  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 5; i++) {
      initial.push(createBubble(false));
    }
    Promise.resolve().then(() => {
      setBubbles(initial);
      scoreRef.current = 0;
      setScore(0);
      setAttempts(0);
      setGameOver(false);
      setShowCelebration(false);
    });
    bubbleIdCounter = 0;
  }, [target, createBubble]);

  useEffect(() => {
    spawnTimerRef.current = setInterval(() => {
      if (scoreRef.current >= CORRECT_TARGET) return;
      setBubbles((prev) => {
        if (prev.length >= MAX_BUBBLES) return prev;
        return [...prev, createBubble(true)];
      });
    }, 1500);
    return () => clearInterval(spawnTimerRef.current);
  }, [createBubble]);

  useEffect(() => {
    let lastTime = performance.now();
    const move = (now) => {
      const dt = (now - lastTime) / 16;
      lastTime = now;
      setBubbles((prev) =>
        prev
          .map((b) => ({
            ...b,
            y: b.y - b.vy * dt,
            x: b.x + b.vx * dt,
          }))
          .filter((b) => b.y > -15)
      );
      animFrameRef.current = requestAnimationFrame(move);
    };
    animFrameRef.current = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleBubbleClick = useCallback(
    (id, letter) => {
      if (gameOver) return;
      const bubble = bubblesRef.current.find((b) => b.id === id);
      if (!bubble || bubble.isPopping || bubble.isFadingWrong) return;

      setAttempts((prev) => prev + 1);

      if (letter === target) {
        playSound('pop');
        setPoppingId(id);

        const newScore = scoreRef.current + 1;
        scoreRef.current = newScore;
        setScore(newScore);

        if (onLetterPopped) {
          onLetterPopped({ letter, score: newScore, target });
        }

        setLastFeedback({ type: 'correct', letter });
        setTimeout(() => setLastFeedback(null), 800);

        setTimeout(() => {
          setBubbles((prev) =>
            prev.map((b) =>
              b.id === id ? createBubble(true) : b
            )
          );
          setPoppingId(null);
        }, 350);

        if (newScore >= CORRECT_TARGET) {
          setTimeout(() => {
            playSound('win');
            setGameOver(true);
            setShowCelebration(true);
            if (onProgressSave) {
              onProgressSave({
                lessonId,
                childId,
                bubbleScore: newScore,
                attempts,
                completed: true,
                targetLetter: target,
              });
            }
            if (onComplete) {
              onComplete({ score: newScore, attempts, targetLetter: target });
            }
          }, 400);
        }
      } else {
        playSound('wrong');
        setFadingId(id);
        setLastFeedback({ type: 'wrong', letter });
        setTimeout(() => setLastFeedback(null), 800);

        setTimeout(() => {
          setBubbles((prev) =>
            prev.map((b) =>
              b.id === id ? createBubble(true) : b
            )
          );
          setFadingId(null);
        }, 400);
      }
    },
    [gameOver, target, createBubble, onProgressSave, onComplete, onLetterPopped, lessonId, childId, attempts]
  );

  const handleRestart = useCallback(() => {
    bubbleIdCounter = 0;
    scoreRef.current = 0;
    setScore(0);
    setAttempts(0);
    setGameOver(false);
    setShowCelebration(false);
    setPoppingId(null);
    setFadingId(null);
    setLastFeedback(null);
    const fresh = [];
    for (let i = 0; i < 5; i++) {
      fresh.push(createBubble(false));
    }
    setBubbles(fresh);
  }, [createBubble]);

  return (
    <div className="relative w-full max-w-[600px] mx-auto select-none font-['Fredoka','Quicksand',sans-serif]">
      {/* Header */}
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl animate-[iconBounce_2s_ease-in-out_infinite]">🫧</span>
          <h3 className="text-xl font-bold text-slate-700">
            Pop the Letter{' '}
            <span className="text-sky-500 text-2xl font-extrabold">&quot;{target}&quot;</span>!
          </h3>
        </div>
        {showInstructions && (
          <p className="text-sm text-slate-500 mt-1">
            Tap the bubbles with the letter <strong>{target}</strong> to score {CORRECT_TARGET} points!
          </p>
        )}
        {customMessage && <p className="text-sm text-slate-500 mt-1">{customMessage}</p>}
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-center gap-3 bg-white/90 border-[3px] border-slate-700 rounded-full px-5 py-2 mb-3 shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Score</span>
        <div className="flex gap-0.5">
          {Array.from({ length: CORRECT_TARGET }).map((_, i) => (
            <span
              key={i}
              className={`text-sm transition-all duration-300 ${
                i < score
                  ? 'text-amber-400 scale-125 font-bold drop-shadow-[0_1px_2px_rgba(255,208,0,0.6)] animate-[starPop_0.4s_ease]'
                  : 'text-slate-300 opacity-50'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm font-bold text-sky-500">
          {score} / {CORRECT_TARGET}
        </span>
      </div>

      {/* Feedback toast */}
      {lastFeedback && (
        <div
          className={`absolute top-[140px] left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-sm font-bold z-20 pointer-events-none animate-[feedbackSlide_0.8s_ease_forwards] ${
            lastFeedback.type === 'correct'
              ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-400'
              : 'bg-rose-100 text-rose-700 border-2 border-rose-400'
          }`}
        >
          {lastFeedback.type === 'correct' ? '✓ Correct!' : '✗ Try again!'}
        </div>
      )}

      {/* Game area */}
      <div
        className="relative w-full h-[420px] rounded-3xl overflow-hidden border-4 border-slate-700 shadow-inner"
        style={{
          background: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 40%, #B3E5FC 70%, #E1F5FE 100%)',
        }}
      >
        {/* Grass bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(129,199,132,0.2))',
            borderRadius: '0 0 20px 20px',
          }}
        />

        {/* Floating Bubbles */}
        {bubbles.map((b) => {
          let animClass = '';
          if (b.id === poppingId) animClass = 'animate-[bubblePop_0.35s_ease-out_forwards] pointer-events-none';
          else if (b.id === fadingId) animClass = 'animate-[bubbleFade_0.4s_ease-out_forwards] pointer-events-none';
          else animClass = 'animate-[bubbleFloat_0.3s_ease-out] hover:scale-105 active:scale-95';

          const isTargetBubble = b.letter === target;

          return (
            <button
              key={b.id}
              className={`absolute rounded-full border-[3px] border-white cursor-pointer flex items-center justify-center outline-none -webkit-tap-highlight-color:-transparent transition-transform duration-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] ${animClass}`}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                backgroundColor: isTargetBubble ? '#BAE1FF' : b.color.shadow,
                boxShadow: `0 4px 0 ${b.color.shadow}, inset 0 2px 4px rgba(255,255,255,0.5)`,
              }}
              onClick={() => handleBubbleClick(b.id, b.letter)}
              disabled={gameOver}
            >
              {/* Shine */}
              <span
                className="absolute bg-white/60 rounded-full rotate-[-30deg] pointer-events-none"
                style={{ top: '12%', left: '18%', width: '30%', height: '20%' }}
              />
              <span
                className={`relative z-[2] font-['Fredoka',sans-serif] text-lg font-extrabold pointer-events-none ${
                  isTargetBubble ? 'text-sky-700' : 'text-slate-700'
                }`}
              >
                {b.letter}
              </span>
            </button>
          );
        })}

        {/* Celebration overlay */}
        {showCelebration && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex items-center justify-center rounded-3xl animate-[celebrationFadeIn_0.5s_ease]">
            <div className="text-center p-8 animate-[celebrationBounce_0.6s_ease]">
              <div className="text-6xl mb-3 animate-[emojiFloat_1.5s_ease-in-out_infinite]">🎉🏆🎉</div>
              <h2 className="text-3xl font-extrabold text-purple-600 mb-2 tracking-tight">
                Congratulations!
              </h2>
              <p className="text-lg font-bold text-slate-600 mb-4 leading-relaxed">
                You popped <strong>{CORRECT_TARGET}</strong> letters{' '}
                <span className="text-sky-500 text-xl font-black">&quot;{target}&quot;</span>!
                <br />
                You did it! 🌟
              </p>

              {/* Medal */}
              <div className="w-20 h-20 mx-auto mb-5 bg-amber-50 border-4 border-amber-400 rounded-full flex items-center justify-center shadow-lg animate-[medalPulse_1.5s_ease-in-out_infinite]">
                <span className="text-4xl">🥇</span>
              </div>

              <button
                onClick={handleRestart}
                className="bg-[#10AC84] hover:bg-[#0f9b77] text-white font-black px-8 py-3 rounded-full shadow-[0_6px_0_#0a7257] active:translate-y-1.5 active:shadow-none text-lg transition-all transform hover:scale-105 cursor-pointer"
              >
                Play Again 🔄
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restart button (when not in celebration) */}
      {!showCelebration && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleRestart}
            className="font-['Fredoka',sans-serif] text-base font-bold px-7 py-2.5 border-[3px] border-slate-700 rounded-full bg-white text-slate-700 cursor-pointer shadow-[0_4px_0_rgba(0,0,0,0.15)] transition-all duration-150 flex items-center gap-1.5 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
          >
            🔄 Restart Game
          </button>
        </div>
      )}

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes starPop {
          0% { transform: scale(0.5); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1.3); }
        }
        @keyframes feedbackSlide {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes bubbleFloat {
          0% { opacity: 0.3; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bubblePop {
          0% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.5); opacity: 0.9; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bubbleFade {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.9) rotate(10deg); opacity: 0.5; }
          100% { transform: scale(0.6) rotate(-5deg); opacity: 0; }
        }
        @keyframes celebrationFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes celebrationBounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes emojiFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes medalPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(255,208,0,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 6px 24px rgba(255,208,0,0.5); }
        }
      `}</style>
    </div>
  );
}
