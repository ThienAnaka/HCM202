import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Skull, Zap, Timer, ShieldAlert, Star, RotateCcw, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import QUESTIONS from './tugofwar/questions';
import { playStunSound, playComboSound, playWinSound, playLoseSound } from './tugofwar/soundEffects';

/* ───── helpers ───── */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const pick = (pool, used) => {
  const available = pool.filter((_, i) => !used.has(i));
  if (available.length === 0) return { item: pool[Math.floor(Math.random() * pool.length)], idx: -1 };
  const idx = pool.indexOf(available[Math.floor(Math.random() * available.length)]);
  return { item: pool[idx], idx };
};

const TIMER_DURATION = 15;

/* ───── sub-components ───── */
const PlayerCharacter = ({ team, index, isStunned, isPulling, combo }) => {
  const isLeft = team === 'left';
  
  // Base breathing animation
  const breathing = {
    y: [0, -3, 0],
    rotate: isLeft ? -5 : 5,
    transition: {
      duration: 1.8 + index * 0.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Pulling animation (leaning back and shaking with exertion)
  const pulling = {
    rotate: isLeft ? -25 : 25,
    x: isLeft ? [-2, 2, -2] : [2, -2, 2],
    y: [-2, 2, -2],
    transition: {
      x: { repeat: Infinity, duration: 0.12 + index * 0.04, ease: "linear" },
      y: { repeat: Infinity, duration: 0.16 + index * 0.04, ease: "linear" },
    }
  };

  // Stunned animation (dizzy, shaking, drooping down)
  const stunned = {
    rotate: isLeft ? 15 : -15,
    y: 6,
    x: [-1, 1, -1],
    transition: {
      x: { repeat: Infinity, duration: 0.1, ease: "linear" }
    }
  };

  const currentAnim = isStunned ? stunned : isPulling ? pulling : breathing;

  return (
    <motion.div
      className="relative flex flex-col items-center select-none"
      animate={currentAnim}
      style={{ zIndex: 10 - index }}
    >
      {/* Dizzy stars for stunned */}
      {isStunned && (
        <motion.div 
          className="absolute -top-6 text-sm"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          💫🌟💫
        </motion.div>
      )}

      {/* Glow for high combo */}
      {!isStunned && combo >= 3 && (
        <div className={`absolute -inset-2 bg-gradient-to-t rounded-full blur-md animate-pulse ${
          isLeft 
            ? 'from-amber-500/30 to-red-500/0' 
            : 'from-cyan-500/30 to-blue-500/0'
        }`} />
      )}

      {/* Head / Helmet / Cap */}
      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 z-10 ${
        isLeft 
          ? 'bg-gradient-to-br from-red-500 via-rose-600 to-red-700 border-yellow-400 shadow-red-500/20' 
          : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-700 border-cyan-400 shadow-blue-500/20'
      }`}>
        {isLeft ? (
          <span className="text-yellow-300 font-bold text-[10px] select-none">★</span>
        ) : (
          <span className="text-cyan-200 text-xs select-none">🤖</span>
        )}
      </div>

      {/* Body capsule with a leaning shoulder shape */}
      <div className={`w-7 h-9 -mt-1.5 rounded-t-2xl shadow-md border-t border-x ${
        isLeft 
          ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-400' 
          : 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400'
      }`} />

      {/* Small pulling arms */}
      <div className={`absolute top-5 w-5 h-1.5 rounded-full bg-amber-600/80 ${
        isLeft ? 'right-[-3px] rotate-[-20deg]' : 'left-[-3px] rotate-[20deg]'
      }`} />
    </motion.div>
  );
};

const TeamPullers = ({ team, isStunned, combo, isPulling, gamePhase }) => {
  const isLeft = team === 'left';
  
  return (
    <div className={`absolute bottom-2.5 flex -space-x-3.5 ${isLeft ? 'left-[2%]' : 'right-[2%] flex-row-reverse'}`}>
      {[0, 1, 2].map((idx) => (
        <PlayerCharacter
          key={idx}
          team={team}
          index={idx}
          isStunned={isStunned}
          isPulling={isPulling}
          combo={combo}
        />
      ))}
    </div>
  );
};

const RopeVisual = ({ ropePosition, leftStunned, rightStunned, leftCombo, rightCombo, gamePhase }) => {
  const pct = ((ropePosition + 100) / 200) * 100;
  
  const leftPulling = gamePhase === 'playing' && !leftStunned;
  const rightPulling = gamePhase === 'playing' && !rightStunned;

  return (
    <div className="relative w-full h-24 flex items-center select-none overflow-visible">
      {/* ground line */}
      <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-zinc-800 rounded-full" />
      {/* center mark */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-0.5 h-6 bg-zinc-700" />
      
      {/* rope */}
      <div 
        className="absolute bottom-[14px] left-[10%] right-[10%] h-2 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 shadow-md"
        style={{ 
          backgroundSize: '15px 15px', 
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.2) 6px, rgba(0,0,0,0.2) 8px)' 
        }} 
      />
      
      {/* marker / flag */}
      <motion.div
        className="absolute bottom-[10px]"
        animate={{ left: `${clamp(pct, 12, 88)}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ translateX: '-50%' }}
      >
        <div className="flex flex-col items-center">
          <div className="text-xl">🚩</div>
          <div className="w-4 h-4 rounded-full bg-white border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" />
        </div>
      </motion.div>
      
      {/* dynamic team sprites */}
      <TeamPullers team="left" isStunned={leftStunned} combo={leftCombo} isPulling={leftPulling} gamePhase={gamePhase} />
      <TeamPullers team="right" isStunned={rightStunned} combo={rightCombo} isPulling={rightPulling} gamePhase={gamePhase} />
    </div>
  );
};

const TimerBar = ({ timeLeft, total }) => {
  const pct = (timeLeft / total) * 100;
  const color = pct > 50 ? 'bg-emerald-500' : pct > 25 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse';
  return (
    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
      <motion.div className={`h-full ${color} rounded-full`} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} />
    </div>
  );
};

const ComboDisplay = ({ combo, isLeft }) => {
  if (combo < 2) return null;
  const fire = combo >= 5 ? '🔥🔥🔥' : combo >= 3 ? '🔥🔥' : '🔥';
  return (
    <motion.div
      key={combo}
      initial={{ scale: 0.7, opacity: 0, y: 5 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider ${
        isLeft 
          ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
      }`}
    >
      <Zap className="w-3 h-3" /> Combo x{combo} {fire}
    </motion.div>
  );
};

/* ───── main component ───── */
const TugOfWarGame = () => {
  const [gamePhase, setGamePhase] = useState('menu');
  const [ropePosition, setRopePosition] = useState(0); // -100 (Red wins) to 100 (Blue wins)
  
  // Red Team (Left) States
  const [leftCombo, setLeftCombo] = useState(0);
  const [leftScore, setLeftScore] = useState(0);
  const [leftStunned, setLeftStunned] = useState(false);
  const [leftStunTimer, setLeftStunTimer] = useState(0);
  const [leftFeedback, setLeftFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Blue Team (Right) States
  const [rightCombo, setRightCombo] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [rightStunned, setRightStunned] = useState(false);
  const [rightStunTimer, setRightStunTimer] = useState(0);
  const [rightFeedback, setRightFeedback] = useState(null); // 'correct' | 'wrong' | null

  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(TIMER_DURATION);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctShuffledIdx, setCorrectShuffledIdx] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [answered, setAnswered] = useState(false);
  const [roundWinner, setRoundWinner] = useState(null); // 'left' | 'right' | 'timeout' | null

  const timerRef = useRef(null);

  /* ── pick next question ── */
  const nextQuestion = useCallback(() => {
    const { item, idx } = pick(QUESTIONS, usedQuestions);
    if (idx >= 0) setUsedQuestions(prev => new Set(prev).add(idx));
    setCurrentQuestion(item);

    const indices = item.options.map((_, i) => i);
    const shuffled = shuffle(indices);
    setShuffledOptions(shuffled.map(i => item.options[i]));
    setCorrectShuffledIdx(shuffled.indexOf(item.correct));

    setQuestionTimer(TIMER_DURATION);
    setAnswered(false);
    setLeftFeedback(null);
    setRightFeedback(null);
    setRoundWinner(null);
  }, [usedQuestions]);

  /* ── start game ── */
  const startGame = () => {
    setRopePosition(0);
    setLeftCombo(0);
    setRightCombo(0);
    setLeftScore(0);
    setRightScore(0);
    setQuestionsAsked(0);
    setLeftStunned(false);
    setRightStunned(false);
    setLeftStunTimer(0);
    setRightStunTimer(0);
    setUsedQuestions(new Set());
    setLeftFeedback(null);
    setRightFeedback(null);
    setRoundWinner(null);
    setAnswered(false);
    setGamePhase('playing');
  };

  /* ── load first question when playing starts ── */
  useEffect(() => {
    if (gamePhase === 'playing' && !currentQuestion) nextQuestion();
  }, [gamePhase, currentQuestion, nextQuestion]);

  /* ── question timer ── */
  useEffect(() => {
    if (gamePhase !== 'playing' || answered) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setQuestionTimer(prev => {
        if (prev <= 1) { handleTimeout(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gamePhase, answered, currentQuestion]);

  /* ── left stun countdown ── */
  useEffect(() => {
    if (!leftStunned) return;
    const id = setInterval(() => {
      setLeftStunTimer(prev => {
        if (prev <= 1) { 
          setLeftStunned(false); 
          setLeftFeedback(null);
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [leftStunned]);

  /* ── right stun countdown ── */
  useEffect(() => {
    if (!rightStunned) return;
    const id = setInterval(() => {
      setRightStunTimer(prev => {
        if (prev <= 1) { 
          setRightStunned(false); 
          setRightFeedback(null);
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [rightStunned]);

  /* ── handle answers ── */
  const handleAnswer = (team, idx) => {
    if (answered || gamePhase !== 'playing') return;

    const isCorrect = idx === correctShuffledIdx;

    if (team === 'left') {
      if (leftStunned) return;
      if (isCorrect) {
        // Red Team got it right!
        const newCombo = leftCombo + 1;
        const pull = 12 + newCombo * 2;
        setLeftCombo(newCombo);
        setRightCombo(0);
        setLeftScore(s => s + 1);
        setLeftFeedback('correct');
        setRoundWinner('left');
        setAnswered(true);
        setRopePosition(prev => {
          const next = prev - pull;
          if (next <= -100) {
            setGamePhase('win_red');
            playWinSound();
            return -100;
          }
          return next;
        });
        playComboSound(newCombo);
        setQuestionsAsked(q => q + 1);
        setTimeout(() => { if (gamePhase === 'playing') nextQuestion(); }, 1500);
      } else {
        // Red Team got it wrong!
        setLeftCombo(0);
        setLeftFeedback('wrong');
        setLeftStunned(true);
        setLeftStunTimer(3);
        setRopePosition(prev => {
          const next = prev + 10; // penalty: pulled towards opponent (right)
          if (next >= 100) {
            setGamePhase('win_blue');
            playWinSound();
            return 100;
          }
          return next;
        });
        playStunSound();
      }
    } else {
      // Blue Team (Right)
      if (rightStunned) return;
      if (isCorrect) {
        // Blue Team got it right!
        const newCombo = rightCombo + 1;
        const pull = 12 + newCombo * 2;
        setRightCombo(newCombo);
        setLeftCombo(0);
        setRightScore(s => s + 1);
        setRightFeedback('correct');
        setRoundWinner('right');
        setAnswered(true);
        setRopePosition(prev => {
          const next = prev + pull;
          if (next >= 100) {
            setGamePhase('win_blue');
            playWinSound();
            return 100;
          }
          return next;
        });
        playComboSound(newCombo);
        setQuestionsAsked(q => q + 1);
        setTimeout(() => { if (gamePhase === 'playing') nextQuestion(); }, 1500);
      } else {
        // Blue Team got it wrong!
        setRightCombo(0);
        setRightFeedback('wrong');
        setRightStunned(true);
        setRightStunTimer(3);
        setRopePosition(prev => {
          const next = prev - 10; // penalty: pulled towards opponent (left)
          if (next <= -100) {
            setGamePhase('win_red');
            playWinSound();
            return -100;
          }
          return next;
        });
        playStunSound();
      }
    }
  };

  const handleTimeout = () => {
    setLeftCombo(0);
    setRightCombo(0);
    setAnswered(true);
    setRoundWinner('timeout');
    setQuestionsAsked(q => q + 1);
    playStunSound();
    setTimeout(() => { if (gamePhase === 'playing') nextQuestion(); }, 1500);
  };

  /* ── keyboard listener ── */
  useEffect(() => {
    if (gamePhase !== 'playing' || answered) return;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const redKeys = ['a', 's', 'd', 'f'];
      const blueKeys = ['j', 'k', 'l', ';'];

      if (redKeys.includes(key)) {
        if (leftStunned) return;
        const idx = redKeys.indexOf(key);
        handleAnswer('left', idx);
      } else if (blueKeys.includes(key)) {
        if (rightStunned) return;
        const idx = blueKeys.indexOf(key);
        handleAnswer('right', idx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gamePhase, answered, leftStunned, rightStunned, correctShuffledIdx, leftCombo, rightCombo]);

  /* ───── RENDER ───── */

  // 1. MENU
  if (gamePhase === 'menu') {
    return (
      <section className="min-h-screen bg-zinc-950 pt-28 pb-16 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="mb-6">
            <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Quay về trang chủ
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-5xl mb-4">🪢</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Kéo Co <span className="text-red-500">Đồng Đội</span>
            </h1>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mb-6 rounded-full" />
            
            <p className="text-zinc-400 mb-6 font-medium text-sm max-w-lg mx-auto">
              Trò chơi kéo co đối kháng hai đội trên cùng một màn hình! Trả lời đúng câu hỏi về <strong className="text-white">Tư tưởng Hồ Chí Minh</strong> để kéo dây về phía mình. Trả lời sai sẽ bị phạt và bị choáng!
            </p>

            <div className="grid grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-8 text-xs">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex flex-col gap-1 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                <strong className="text-red-400 block text-sm uppercase mb-1">🔴 ĐỘI ĐỎ (Bên Trái)</strong>
                <span className="text-zinc-400">⚡ Điều khiển: Phím <b className="text-red-300 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-900/50">A, S, D, F</b> hoặc Click</span>
                <span className="text-zinc-400">✅ Trả lời đúng: Kéo dây về bên TRÁI</span>
                <span className="text-zinc-400">❌ Trả lời sai: Bị choáng 3s, dây bị kéo sang PHẢI</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col gap-1 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                <strong className="text-blue-400 block text-sm uppercase mb-1">🔵 ĐỘI XANH (Bên Phải)</strong>
                <span className="text-zinc-400">⚡ Điều khiển: Phím <b className="text-blue-300 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-900/50">J, K, L, ;</b> hoặc Click</span>
                <span className="text-zinc-400">✅ Trả lời đúng: Kéo dây về bên PHẢI</span>
                <span className="text-zinc-400">❌ Trả lời sai: Bị choáng 3s, dây bị kéo sang TRÁI</span>
              </div>
            </div>

            <button 
              onClick={startGame} 
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-black uppercase tracking-[0.25em] rounded-full shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:scale-105 active:scale-95 transition-all text-base border border-red-500/30"
            >
              Bắt Đầu Kéo Co!
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // 2. WIN STATE
  if (gamePhase === 'win_red' || gamePhase === 'win_blue') {
    const redWon = gamePhase === 'win_red';
    return (
      <section className="min-h-screen bg-zinc-950 pt-28 pb-16 px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="text-center max-w-md w-full bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-3xl backdrop-blur-sm"
        >
          <div className="text-6xl mb-4 animate-bounce">{redWon ? '🏆🔴' : '🏆🔵'}</div>
          <h2 className={`text-3xl font-black uppercase mb-2 ${redWon ? 'text-red-500' : 'text-blue-400'}`}>
            {redWon ? 'Đội Đỏ Chiến Thắng!' : 'Đội Xanh Chiến Thắng!'}
          </h2>
          <p className="text-zinc-400 mb-6 text-sm font-medium">
            {redWon ? 'Đội Đỏ đã xuất sắc kéo sập phòng tuyến Đội Xanh!' : 'Đội Xanh đã xuất sắc kéo sập phòng tuyến Đội Đỏ!'}
          </p>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-red-400">{leftScore}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Số câu đúng Đỏ</div>
            </div>
            <div className="bg-blue-950/20 border border-blue-900/30 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-400">{rightScore}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Số câu đúng Xanh</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={startGame} 
              className="px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-zinc-950 font-black uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-[0_5px_15px_rgba(245,158,11,0.2)]"
            >
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
            <Link 
              to="/" 
              className="px-8 py-3.5 bg-zinc-800 text-white font-black uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all flex items-center"
            >
              Trang chủ
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  // 3. PLAYING STATE (PERFECTLY FITTED TO 1 SCREEN)
  return (
    <section className="h-screen w-screen bg-zinc-950 text-white flex flex-col justify-between overflow-hidden p-3 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center h-8 px-2 shrink-0">
        <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-widest transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Về trang chủ
        </Link>
        <h2 className="text-xs sm:text-sm font-black text-zinc-300 uppercase tracking-[0.25em]">
          Kéo Co <span className="text-red-500">Đồng Đội</span>
        </h2>
        <button 
          onClick={startGame} 
          className="text-zinc-500 hover:text-white flex items-center gap-1 font-bold uppercase text-[9px] tracking-widest transition-all hover:rotate-180 duration-500"
          title="Chơi lại từ đầu"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* ROPE / GAME STAGE SECTION */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-2 sm:p-2.5 flex flex-col gap-1 shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        {/* Score and Position Row */}
        <div className="flex justify-between items-center text-xs font-black tracking-wider px-2">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xs sm:text-sm">🔴 Đội Đỏ</span>
            <span className="bg-red-500/10 text-red-400 border border-red-900/40 px-1.5 py-0.5 rounded text-[10px] font-mono">{leftScore} điểm</span>
            <ComboDisplay combo={leftCombo} isLeft={true} />
          </div>
          
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black hidden sm:inline">
            Sân Thi Đấu
          </span>

          <div className="flex items-center gap-2">
            <ComboDisplay combo={rightCombo} isLeft={false} />
            <span className="bg-blue-500/10 text-blue-400 border border-blue-900/40 px-1.5 py-0.5 rounded text-[10px] font-mono">{rightScore} điểm</span>
            <span className="text-blue-400 text-xs sm:text-sm">Đội Xanh 🔵</span>
          </div>
        </div>

        {/* Rope Visual */}
        <RopeVisual 
          ropePosition={ropePosition} 
          leftStunned={leftStunned}
          rightStunned={rightStunned}
          leftCombo={leftCombo}
          rightCombo={rightCombo}
          gamePhase={gamePhase}
        />
        
        {/* Dynamic Force Bar */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[9px] text-red-400 font-black uppercase tracking-wider shrink-0 select-none">Đỏ</span>
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative border border-zinc-900 shadow-inner">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-zinc-600 z-10" />
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${clamp(50 - ropePosition / 2, 0, 100)}%` }}
              style={{ background: 'linear-gradient(90deg, #ef4444, #3b82f6)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
          </div>
          <span className="text-[9px] text-blue-400 font-black uppercase tracking-wider shrink-0 select-none">Xanh</span>
        </div>
      </div>

      {/* QUESTION AREA */}
      <div className="bg-zinc-900/60 rounded-2xl p-2.5 sm:p-3 border border-zinc-800/80 relative overflow-hidden flex flex-col justify-center min-h-[85px] max-h-[105px] shrink-0">
        
        {/* Progress Bar & Timer */}
        <div className="flex items-center gap-2 mb-1.5">
          <Timer className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <TimerBar timeLeft={questionTimer} total={TIMER_DURATION} />
          <span className={`font-mono font-black text-xs shrink-0 min-w-[2ch] text-right ${questionTimer <= 4 ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>
            {questionTimer}s
          </span>
        </div>

        {/* Question Text */}
        {currentQuestion && (
          <p className="text-zinc-100 font-bold text-xs sm:text-sm md:text-[15px] leading-snug text-center line-clamp-3 select-none px-4">
            {currentQuestion.q}
          </p>
        )}

        {/* Global Feedback Banner */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/95 flex items-center justify-center z-30"
            >
              {roundWinner === 'left' && (
                <span className="text-red-400 text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 select-none animate-pulse">
                  🎉 Đội Đỏ đã trả lời ĐÚNG! +Lực kéo 🟥
                </span>
              )}
              {roundWinner === 'right' && (
                <span className="text-blue-400 text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 select-none animate-pulse">
                  🟦 Đội Xanh đã trả lời ĐÚNG! +Lực kéo 🎉
                </span>
              )}
              {roundWinner === 'timeout' && (
                <span className="text-yellow-500 text-xs sm:text-sm font-black uppercase tracking-widest select-none">
                  ⏰ HẾT GIỜ! Câu hỏi tiếp theo...
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DUAL OPTION COLUMNS */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0 py-2">
        
        {/* LEFT COLUMN: TEAM RED */}
        <div className="flex flex-col bg-zinc-900/10 border border-zinc-800/80 rounded-2xl p-2 relative min-h-0 h-full justify-between shadow-[0_4px_25px_rgba(0,0,0,0.1)]">
          {/* Column Header */}
          <div className="flex justify-between items-center px-1 border-b border-zinc-900/50 pb-1.5 shrink-0">
            <span className="text-[10px] sm:text-xs font-black text-red-500 tracking-wider flex items-center gap-1 select-none">
              🔴 ĐỘI ĐỎ <span className="text-[9px] text-zinc-500 font-bold hidden md:inline">(A,S,D,F)</span>
            </span>
            {leftFeedback === 'wrong' && (
              <span className="text-[9px] font-black text-red-400 animate-pulse uppercase select-none">
                Sai phạt 3s!
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="flex-1 flex flex-col justify-between gap-1.5 mt-2 min-h-0">
            {shuffledOptions.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const hotkey = ['A', 'S', 'D', 'F'][idx];
              const isCorrect = idx === correctShuffledIdx;
              const showResult = answered;
              
              return (
                <button
                  key={idx}
                  disabled={answered || leftStunned}
                  onClick={() => handleAnswer('left', idx)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-left font-semibold transition-all relative flex-1 min-h-0 text-xs ${
                    showResult && isCorrect 
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                      : showResult && !isCorrect 
                      ? 'border-zinc-800/50 text-zinc-600 opacity-30'
                      : 'border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:bg-red-500/5 hover:text-white'
                  }`}
                >
                  {/* Option Badge */}
                  <span className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center shrink-0 select-none ${
                    showResult && isCorrect 
                      ? 'bg-emerald-500 text-zinc-950' 
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {letter}
                  </span>
                  
                  {/* Option Text */}
                  <span className="line-clamp-2 leading-snug flex-1 text-[11px] sm:text-xs">
                    {opt}
                  </span>

                  {/* Hotkey Badge */}
                  <span className="text-[9px] font-mono font-extrabold text-zinc-600 bg-zinc-950 border border-zinc-850 px-1 rounded shrink-0 select-none hidden sm:inline">
                    {hotkey}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Left Stun Overlay */}
          {leftStunned && (
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-20 border border-red-500/20 select-none">
              <div className="text-2xl mb-1 animate-bounce">💫</div>
              <span className="text-red-500 font-black uppercase text-xs tracking-wider">Đội Đỏ Bị Choáng!</span>
              <span className="text-zinc-400 text-[10px] font-bold mt-1">Hồi phục sau {leftStunTimer}s...</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: TEAM BLUE */}
        <div className="flex flex-col bg-zinc-900/10 border border-zinc-800/80 rounded-2xl p-2 relative min-h-0 h-full justify-between shadow-[0_4px_25px_rgba(0,0,0,0.1)]">
          {/* Column Header */}
          <div className="flex justify-between items-center px-1 border-b border-zinc-900/50 pb-1.5 shrink-0">
            <span className="text-[10px] sm:text-xs font-black text-blue-400 tracking-wider flex items-center gap-1 select-none">
              🔵 ĐỘI XANH <span className="text-[9px] text-zinc-500 font-bold hidden md:inline">(J,K,L,;)</span>
            </span>
            {rightFeedback === 'wrong' && (
              <span className="text-[9px] font-black text-red-400 animate-pulse uppercase select-none">
                Sai phạt 3s!
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="flex-1 flex flex-col justify-between gap-1.5 mt-2 min-h-0">
            {shuffledOptions.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const hotkey = ['J', 'K', 'L', ';'][idx];
              const isCorrect = idx === correctShuffledIdx;
              const showResult = answered;
              
              return (
                <button
                  key={idx}
                  disabled={answered || rightStunned}
                  onClick={() => handleAnswer('right', idx)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-left font-semibold transition-all relative flex-1 min-h-0 text-xs ${
                    showResult && isCorrect 
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                      : showResult && !isCorrect 
                      ? 'border-zinc-800/50 text-zinc-600 opacity-30'
                      : 'border-zinc-800 text-zinc-300 hover:border-blue-400/50 hover:bg-blue-400/5 hover:text-white'
                  }`}
                >
                  {/* Option Badge */}
                  <span className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center shrink-0 select-none ${
                    showResult && isCorrect 
                      ? 'bg-emerald-500 text-zinc-950' 
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {letter}
                  </span>
                  
                  {/* Option Text */}
                  <span className="line-clamp-2 leading-snug flex-1 text-[11px] sm:text-xs">
                    {opt}
                  </span>

                  {/* Hotkey Badge */}
                  <span className="text-[9px] font-mono font-extrabold text-zinc-600 bg-zinc-950 border border-zinc-850 px-1 rounded shrink-0 select-none hidden sm:inline">
                    {hotkey}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Stun Overlay */}
          {rightStunned && (
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-20 border border-blue-500/20 select-none">
              <div className="text-2xl mb-1 animate-bounce">💫</div>
              <span className="text-blue-400 font-black uppercase text-xs tracking-wider">Đội Xanh Bị Choáng!</span>
              <span className="text-zinc-400 text-[10px] font-bold mt-1">Hồi phục sau {rightStunTimer}s...</span>
            </div>
          )}
        </div>

      </div>

      {/* FOOTER RULES (IMAGE RULES) */}
      <div className="text-center text-[9px] text-zinc-650 uppercase tracking-widest font-black py-0.5 border-t border-zinc-900 flex justify-center gap-6 shrink-0 select-none">
        <span className="text-emerald-500/80">✅ Trả lời đúng: Kéo dây về phía mình</span>
        <span className="text-red-500/80">❌ Trả lời sai: Bị đối phương kéo lại</span>
      </div>

    </section>
  );
};

export default TugOfWarGame;

