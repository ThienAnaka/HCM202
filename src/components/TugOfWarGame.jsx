import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Skull, Zap, Timer, ShieldAlert, Star, RotateCcw, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import QUESTIONS from './tugofwar/questions';
import { playStunSound, playWinSound } from './tugofwar/soundEffects';
import { MAX_QUESTIONS_PER_GAME, resolveGamePhaseAfterRound, ROPE_LIMIT } from './tugofwar/gameRules';

/* ───── helpers ───── */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const pick = (pool, used) => {
  const available = pool.filter((_, i) => !used.has(i));
  if (available.length === 0) return { item: pool[Math.floor(Math.random() * pool.length)], idx: -1 };
  const idx = pool.indexOf(available[Math.floor(Math.random() * available.length)]);
  return { item: pool[idx], idx };
};

const TIMER_DURATION = 20;
const PULL_PER_CORRECT = ROPE_LIMIT / 3; // make 3 correct answers equal a full win

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
        <div className={`absolute -inset-2 bg-gradient-to-t rounded-full blur-md animate-pulse ${isLeft
          ? 'from-amber-500/30 to-red-500/0'
          : 'from-cyan-500/30 to-blue-500/0'
          }`} />
      )}

      {/* Head / Helmet / Cap */}
      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 z-10 ${isLeft
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
      <div className={`w-7 h-9 -mt-1.5 rounded-t-2xl shadow-md border-t border-x ${isLeft
        ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-400'
        : 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400'
        }`} />

      {/* Small pulling arms */}
      <div className={`absolute top-5 w-5 h-1.5 rounded-full bg-amber-600/80 ${isLeft ? 'right-[-3px] rotate-[-20deg]' : 'left-[-3px] rotate-[20deg]'
        }`} />
    </motion.div>
  );
};

const TeamPullers = ({ team, isStunned, combo, isPulling, gamePhase, ropePosition }) => {
  const isLeft = team === 'left';

  return (
    <motion.div
      className={`absolute bottom-2.5 flex -space-x-3.5 ${isLeft ? 'left-[4%]' : 'right-[4%] flex-row-reverse'}`}
      animate={{
        x: ropePosition * 0.8,
        y: isPulling ? [0, -1, 1, 0] : 0
      }}
      transition={{
        x: { type: 'spring', stiffness: 200, damping: 25 },
        y: { repeat: Infinity, duration: 0.15, ease: "linear" }
      }}
    >
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
    </motion.div>
  );
};

const RopeVisual = ({ ropePosition, leftStunned, rightStunned, leftCombo, rightCombo, gamePhase }) => {
  const pct = ((ropePosition + ROPE_LIMIT) / (ROPE_LIMIT * 2)) * 100;

  const leftPulling = gamePhase === 'playing' && !leftStunned;
  const rightPulling = gamePhase === 'playing' && !rightStunned;

  // Quantize flag position into 3 steps per side so it snaps to -3..3 (7 positions)
  const step = ROPE_LIMIT / 3;
  const quantized = Math.round(ropePosition / step) * step;
  const tickPositions = Array.from({ length: 7 }, (_, i) => (i - 3) * step);

  // Helper: convert rope value (-ROPE_LIMIT..ROPE_LIMIT) to percent across rope area (4%..96%)
  const valueToPercent = (val) => {
    const usable = 92; // percent (100 - 4% left - 4% right)
    return 4 + ((val + ROPE_LIMIT) / (ROPE_LIMIT * 2)) * usable;
  };

  return (
    <div className="relative w-full h-24 flex items-center select-none overflow-visible">
      {/* ground line */}
      <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-zinc-300 rounded-full" />
      {/* center mark */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-0.5 h-6 bg-zinc-400" />

      {/* rope */}
      <motion.div
        className="absolute bottom-[13px] h-3 rounded shadow-md border-y border-amber-950/30"
        style={{
          left: '4%',
          right: '4%',
          backgroundImage: 'repeating-linear-gradient(-45deg, #b45309, #b45309 6px, #f59e0b 6px, #f59e0b 12px)'
        }}
        animate={{
          x: ropePosition * 0.8,
          y: gamePhase === 'playing' && (leftPulling || rightPulling) ? [-0.5, 0.5, -0.5] : 0
        }}
        transition={{
          x: { type: 'spring', stiffness: 200, damping: 25 },
          y: { repeat: Infinity, duration: 0.1, ease: "linear" }
        }}
      />

      {/* marker / flag */}
      <div
        className="absolute bottom-[10px]"
        style={{
          left: `${valueToPercent(quantized)}%`,
          transform: 'translateX(-50%)'
        }}
      >
        <motion.div
          animate={{
            y: gamePhase === 'playing' && (leftPulling || rightPulling) ? [-1, 1, -1] : 0
          }}
          transition={{
            y: { repeat: Infinity, duration: 0.1, ease: "linear" }
          }}
        >
        <div className="flex flex-col items-center">
          <div className="w-6 text-center text-xl leading-none translate-x-[1px]">🚩</div>
          <div className="w-4 h-4 rounded-full bg-white border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" />
        </div>
        </motion.div>
      </div>

      {/* dynamic team sprites */}
      <TeamPullers team="left" isStunned={leftStunned} combo={leftCombo} isPulling={leftPulling} gamePhase={gamePhase} ropePosition={ropePosition} />
      <TeamPullers team="right" isStunned={rightStunned} combo={rightCombo} isPulling={rightPulling} gamePhase={gamePhase} ropePosition={ropePosition} />
    </div>
  );
};

const TimerBar = ({ timeLeft, total }) => {
  const pct = (timeLeft / total) * 100;
  const color = pct > 50 ? 'bg-emerald-500' : pct > 25 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse';
  return (
    <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
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
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider ${isLeft
        ? 'bg-soviet-red/10 text-soviet-red border border-soviet-red/20 shadow-sm shadow-soviet-red/5'
        : 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm shadow-blue-100/10'
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

  const finishRound = (nextRopePosition, nextScores = { left: leftScore, right: rightScore }) => {
    const nextQuestionsAsked = questionsAsked + 1;

    // Immediate win if score difference reaches 3
    if (Math.abs((nextScores.left || 0) - (nextScores.right || 0)) >= 3) {
      const winner = (nextScores.left || 0) > (nextScores.right || 0) ? 'win_red' : 'win_blue';
      setQuestionsAsked(nextQuestionsAsked);
      setTimeout(() => {
        setGamePhase(winner);
        playWinSound();
      }, 800);
      return;
    }

    if (nextQuestionsAsked >= MAX_QUESTIONS_PER_GAME) {
      const left = nextScores.left || 0;
      const right = nextScores.right || 0;
      const nextPhase = left > right ? 'win_red' : right > left ? 'win_blue' : 'draw';

      setQuestionsAsked(nextQuestionsAsked);
      setTimeout(() => {
        setGamePhase(nextPhase);
        if (nextPhase !== 'draw') playWinSound();
      }, 1500);
      return;
    }

    const nextPhase = resolveGamePhaseAfterRound({
      nextQuestionsAsked,
      ropePosition: nextRopePosition,
    });

    setQuestionsAsked(nextQuestionsAsked);

    if (nextPhase !== 'playing') {
      const finishGame = () => {
        setGamePhase(nextPhase);
        if (nextPhase !== 'draw') playWinSound();
      };

      if (Math.abs(nextRopePosition) >= ROPE_LIMIT) {
        finishGame();
      } else {
        setTimeout(finishGame, 1500);
      }
      return;
    }

    setTimeout(() => nextQuestion(), 1500);
  };

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
    setCurrentQuestion(null);
    setShuffledOptions([]);
    setCorrectShuffledIdx(0);
    setQuestionTimer(TIMER_DURATION);
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
        const pull = PULL_PER_CORRECT;
        setRightCombo(0);
        setLeftFeedback('correct');
        setRoundWinner('left');
        setAnswered(true);

        const nextLeftScore = leftScore + 1;
        setLeftScore(s => s + 1);

        const nextRopePosition = clamp(ropePosition - pull, -100, 100);
        setRopePosition(nextRopePosition);

        finishRound(nextRopePosition, { left: nextLeftScore, right: rightScore });
      } else {
        // Red Team got it wrong!
        setLeftCombo(0);
        setLeftFeedback('wrong');
        setRoundWinner('left_wrong');
        setAnswered(true);
        setLeftStunned(true);
        setLeftStunTimer(3);
        const nextRopePosition = clamp(ropePosition + 10, -100, 100);
        setRopePosition(nextRopePosition);
        playStunSound();
        finishRound(nextRopePosition, { left: leftScore, right: rightScore });
      }
    } else {
      // Blue Team (Right)
      if (rightStunned) return;
      if (isCorrect) {
        // Blue Team got it right!
        const pull = PULL_PER_CORRECT;
        setLeftCombo(0);
        setRightFeedback('correct');
        setRoundWinner('right');
        setAnswered(true);

        const nextRightScore = rightScore + 1;
        setRightScore(s => s + 1);

        const nextRopePosition = clamp(ropePosition + pull, -100, 100);
        setRopePosition(nextRopePosition);

        finishRound(nextRopePosition, { left: leftScore, right: nextRightScore });
      } else {
        // Blue Team got it wrong!
        setRightCombo(0);
        setRightFeedback('wrong');
        setRoundWinner('right_wrong');
        setAnswered(true);
        setRightStunned(true);
        setRightStunTimer(3);
        const nextRopePosition = clamp(ropePosition - 10, -100, 100);
        setRopePosition(nextRopePosition);
        playStunSound();
        finishRound(nextRopePosition, { left: leftScore, right: rightScore });
      }
    }
  };

  const handleTimeout = () => {
    setLeftCombo(0);
    setRightCombo(0);
    setAnswered(true);
    setRoundWinner('timeout');
    playStunSound();
    finishRound(ropePosition, { left: leftScore, right: rightScore });
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
  }, [gamePhase, answered, leftStunned, rightStunned, correctShuffledIdx, leftCombo, rightCombo, ropePosition, questionsAsked]);

  /* ───── RENDER ───── */

  // 1. MENU
  if (gamePhase === 'menu') {
    return (
      <section className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-md border-2 border-soviet-red/20 shadow-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden">
          {/* Top border decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-soviet-red via-soviet-gold to-soviet-red" />

          <div className="mb-6">
            <Link to="/" className="text-zinc-400 hover:text-soviet-red flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Quay về trang chủ
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-5xl mb-4">🪢</div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-2 uppercase tracking-tight">
              Kéo Co <span className="text-soviet-red">Đồng Đội</span>
            </h1>
            <div className="h-1.5 w-24 bg-soviet-gold mx-auto mb-6 rounded-full" />

            <p className="text-zinc-650 mb-8 font-medium text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Trò chơi kéo co đối kháng hai đội trên cùng một màn hình! Trả lời đúng câu hỏi về <strong className="text-soviet-red font-black">Tư tưởng Hồ Chí Minh</strong> để kéo dây về phía mình. Trả lời sai sẽ bị phạt và bị choáng!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-lg mx-auto mb-8 text-xs">
              <div className="bg-soviet-red/5 border border-soviet-red/20 rounded-2xl p-5 flex flex-col gap-1.5 shadow-sm">
                <strong className="text-soviet-red block text-sm uppercase mb-1">🔴 ĐỘI ĐỎ (Bên Trái)</strong>
                <span className="text-zinc-600">⚡ Điều khiển: Phím <b className="text-soviet-red bg-soviet-red/10 px-2 py-0.5 rounded border border-soviet-red/20">A, S, D, F</b> hoặc Click</span>
                <span className="text-zinc-600">✅ Trả lời đúng: Kéo dây về bên TRÁI</span>
                <span className="text-zinc-600">❌ Trả lời sai: Bị choáng 3s, dây bị kéo sang PHẢI</span>
              </div>
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 flex flex-col gap-1.5 shadow-sm">
                <strong className="text-blue-600 block text-sm uppercase mb-1">🔵 ĐỘI XANH (Bên Phải)</strong>
                <span className="text-zinc-600">⚡ Điều khiển: Phím <b className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">J, K, L, ;</b> hoặc Click</span>
                <span className="text-zinc-600">✅ Trả lời đúng: Kéo dây về bên PHẢI</span>
                <span className="text-zinc-600">❌ Trả lời sai: Bị choáng 3s, dây bị kéo sang TRÁI</span>
              </div>
            </div>

            <div className="max-w-lg mx-auto mb-8 bg-white border border-zinc-200 rounded-2xl p-5 text-left text-xs shadow-sm">
              <strong className="text-zinc-800 block text-sm uppercase mb-2">Điều kiện thắng</strong>
              <div className="flex flex-col gap-1.5 text-zinc-600">
                <span>Trận đấu có tối đa <b className="text-soviet-red">20 câu hỏi</b>.</span>
                <span>Mỗi câu kết thúc khi có đội trả lời đúng, trả lời sai hoặc hết giờ.</span>
                <span>Hết 20 câu, đội nào kéo dây lệch về phía mình nhiều hơn sẽ chiến thắng.</span>
                <span>Nếu dây chạm biên trước câu 20, đội kéo được dây chạm biên thắng ngay.</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-10 py-4 bg-soviet-red hover:bg-soviet-orange text-white font-black uppercase tracking-[0.25em] rounded-full shadow-lg shadow-soviet-red/20 hover:scale-105 active:scale-95 transition-all text-base border-2 border-soviet-gold/30"
            >
              Bắt Đầu Kéo Co!
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // 2. WIN STATE
  if (gamePhase === 'draw') {
    return (
      <section className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md w-full bg-white/90 backdrop-blur-md border-2 border-zinc-200 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-soviet-red via-soviet-gold to-blue-600" />

          <div className="text-6xl mb-4">🤝</div>
          <h2 className="text-3xl font-black uppercase mb-2 text-zinc-800">
            Hai đội hòa nhau!
          </h2>
          <p className="text-zinc-600 mb-6 text-sm font-medium">
            Sau {MAX_QUESTIONS_PER_GAME} câu, hai đội bằng điểm nên trận đấu kết thúc với kết quả hòa.
          </p>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-soviet-red/5 border border-soviet-red/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-soviet-red">{leftScore}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Số câu đúng Đỏ</div>
            </div>
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-600">{rightScore}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Số câu đúng Xanh</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-soviet-gold hover:bg-soviet-orange text-zinc-900 font-black uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md border border-soviet-gold"
            >
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
            <Link
              to="/"
              className="px-8 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-black uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-zinc-200"
            >
              Trang chủ
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  if (gamePhase === 'win_red' || gamePhase === 'win_blue') {
    const redWon = gamePhase === 'win_red';
    return (
      <section className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md w-full bg-white/90 backdrop-blur-md border-2 border-soviet-red/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Top border decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-soviet-red via-soviet-gold to-soviet-red" />

          <div className="text-6xl mb-4 animate-bounce">{redWon ? '🏆🔴' : '🏆🔵'}</div>
          <h2 className={`text-3xl font-black uppercase mb-2 ${redWon ? 'text-soviet-red' : 'text-blue-600'}`}>
            {redWon ? 'Đội Đỏ Chiến Thắng!' : 'Đội Xanh Chiến Thắng!'}
          </h2>
          <p className="text-zinc-600 mb-6 text-sm font-medium">
            {redWon ? 'Đội Đỏ đã xuất sắc kéo sập phòng tuyến Đội Xanh!' : 'Đội Xanh đã xuất sắc kéo sập phòng tuyến Đội Đỏ!'}
          </p>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-soviet-red/5 border border-soviet-red/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-soviet-red">{leftScore}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Số câu đúng Đỏ</div>
            </div>
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-600">{rightScore}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Số câu đúng Xanh</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-soviet-gold hover:bg-soviet-orange text-zinc-900 font-black uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md border border-soviet-gold"
            >
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
            <Link
              to="/"
              className="px-8 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-black uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-zinc-200"
            >
              Trang chủ
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  // 3. PLAYING STATE
  return (
    <section className="min-h-screen w-full text-zinc-800 flex flex-col gap-3 pt-28 pb-8 px-4 select-none relative z-10">

      {/* HEADER SECTION */}
      <div className="flex justify-between items-center h-8 px-2 shrink-0">
        <Link to="/" className="text-zinc-500 hover:text-soviet-red flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-widest transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Về trang chủ
        </Link>
        <h2 className="text-xs sm:text-sm font-black text-zinc-700 uppercase tracking-[0.25em]">
          Kéo Co <span className="text-soviet-red">Đồng Đội</span>
        </h2>
        <button
          onClick={startGame}
          className="text-zinc-500 hover:text-soviet-red flex items-center gap-1 font-bold uppercase text-[9px] tracking-widest transition-all hover:rotate-180 duration-500"
          title="Chơi lại từ đầu"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* ROPE / GAME STAGE SECTION */}
      <div className="bg-white/90 backdrop-blur-md border-2 border-soviet-red/10 rounded-2xl p-3 flex flex-col gap-2 shrink-0 shadow-lg">
        {/* Score and Position Row */}
        <div className="flex justify-between items-center text-xs font-black tracking-wider px-2">
          <div className="flex items-center gap-2">
            <span className="text-soviet-red text-xs sm:text-sm font-extrabold uppercase">🔴 Đội Đỏ</span>
            <span className="bg-soviet-red/5 text-soviet-red border border-soviet-red/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-sm">{leftScore} điểm</span>
            <ComboDisplay combo={leftCombo} isLeft={true} />
          </div>

          <span className="text-[10px] text-zinc-450 uppercase tracking-[0.2em] font-black hidden sm:inline">
            Câu {Math.min(questionsAsked + 1, MAX_QUESTIONS_PER_GAME)}/{MAX_QUESTIONS_PER_GAME}
          </span>

          <div className="flex items-center gap-2">
            <ComboDisplay combo={rightCombo} isLeft={false} />
            <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-sm">{rightScore} điểm</span>
            <span className="text-blue-600 text-xs sm:text-sm font-extrabold uppercase">Đội Xanh 🔵</span>
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

        {/* Dynamic Force Bar removed - rope visual renders progress now */}
      </div>

      {/* QUESTION AREA */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 border-soviet-red/10 relative overflow-hidden flex flex-col justify-center min-h-[118px] shrink-0 shadow-md">

        {/* Progress Bar & Timer */}
        <div className="flex items-center gap-2 mb-1.5">
          <Timer className="w-3.5 h-3.5 text-zinc-450 shrink-0" />
          <TimerBar timeLeft={questionTimer} total={TIMER_DURATION} />
          <span className={`font-mono font-black text-xs shrink-0 min-w-[2ch] text-right ${questionTimer <= 4 ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>
            {questionTimer}s
          </span>
        </div>

        {/* Question Text */}
        {currentQuestion && (
          <p className="text-zinc-800 font-bold text-sm md:text-[15px] leading-relaxed text-center select-none px-2 sm:px-6">
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
              className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-sm border border-zinc-200 rounded-xl px-3 py-2 flex items-center justify-center z-30 shadow-md"
            >
              {roundWinner === 'left' && (
                <span className="text-soviet-red text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 text-center select-none animate-pulse">
                  🎉 Đội Đỏ đã trả lời ĐÚNG! +Lực kéo 🟥
                </span>
              )}
              {roundWinner === 'right' && (
                <span className="text-blue-600 text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 text-center select-none animate-pulse">
                  🟦 Đội Xanh đã trả lời ĐÚNG! +Lực kéo 🎉
                </span>
              )}
              {roundWinner === 'timeout' && (
                <span className="text-soviet-orange text-xs sm:text-sm font-black uppercase tracking-widest text-center select-none">
                  ⏰ HẾT GIỜ! Câu hỏi tiếp theo...
                </span>
              )}
              {roundWinner === 'left_wrong' && (
                <span className="text-blue-600 text-xs sm:text-sm font-black uppercase tracking-widest text-center select-none">
                  Đội Đỏ trả lời sai! Đáp án đúng: {shuffledOptions[correctShuffledIdx]}
                </span>
              )}
              {roundWinner === 'right_wrong' && (
                <span className="text-soviet-red text-xs sm:text-sm font-black uppercase tracking-widest text-center select-none">
                  Đội Xanh trả lời sai! Đáp án đúng: {shuffledOptions[correctShuffledIdx]}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DUAL OPTION COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-1">

        {/* LEFT COLUMN: TEAM RED */}
        <div className="flex flex-col bg-white/80 backdrop-blur-md border-2 border-soviet-red/10 rounded-2xl p-3 relative min-h-[260px] justify-between shadow-md">
          {/* Column Header */}
          <div className="flex justify-between items-center px-1 border-b border-zinc-200/50 pb-1.5 shrink-0">
            <span className="text-[10px] sm:text-xs font-black text-soviet-red tracking-wider flex items-center gap-1 select-none">
              🔴 ĐỘI ĐỎ <span className="text-[9px] text-zinc-400 font-bold hidden md:inline">(A,S,D,F)</span>
            </span>
            {leftFeedback === 'wrong' && (
              <span className="text-[9px] font-black text-red-600 animate-pulse uppercase select-none">
                Sai phạt 3s!
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-2 mt-3">
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
                  className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-left font-semibold transition-all relative min-h-[54px] text-xs ${showResult && isCorrect
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                    : showResult && !isCorrect
                      ? 'border-zinc-100 text-zinc-400 opacity-40 shadow-none pointer-events-none'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-soviet-red/30 hover:bg-soviet-red/5 hover:text-soviet-red shadow-sm'
                    }`}
                >
                  {/* Option Badge */}
                  <span className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center shrink-0 select-none ${showResult && isCorrect
                    ? 'bg-emerald-500 text-white font-black'
                    : 'bg-zinc-100 text-zinc-400'
                    }`}>
                    {letter}
                  </span>

                  {/* Option Text */}
                  <span className="leading-snug flex-1 text-[12px] sm:text-[13px]">
                    {opt}
                  </span>

                  {/* Hotkey Badge */}
                  <span className="text-[9px] font-mono font-extrabold text-zinc-500 bg-zinc-50 border border-zinc-150 px-1 rounded shrink-0 select-none hidden sm:inline">
                    {hotkey}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Left Stun Overlay */}
          {leftStunned && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-[3px] rounded-2xl flex flex-col items-center justify-center z-20 border-2 border-soviet-red/30 shadow-lg select-none">
              <div className="text-2xl mb-1 animate-bounce">💫</div>
              <span className="text-soviet-red font-black uppercase text-xs tracking-wider">Đội Đỏ Bị Choáng!</span>
              <span className="text-zinc-500 text-[10px] font-bold mt-1">Hồi phục sau {leftStunTimer}s...</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: TEAM BLUE */}
        <div className="flex flex-col bg-white/80 backdrop-blur-md border-2 border-soviet-red/10 rounded-2xl p-3 relative min-h-[260px] justify-between shadow-md">
          {/* Column Header */}
          <div className="flex justify-between items-center px-1 border-b border-zinc-200/50 pb-1.5 shrink-0">
            <span className="text-[10px] sm:text-xs font-black text-blue-600 tracking-wider flex items-center gap-1 select-none">
              🔵 ĐỘI XANH <span className="text-[9px] text-zinc-400 font-bold hidden md:inline">(J,K,L,;)</span>
            </span>
            {rightFeedback === 'wrong' && (
              <span className="text-[9px] font-black text-red-600 animate-pulse uppercase select-none">
                Sai phạt 3s!
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-2 mt-3">
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
                  className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-left font-semibold transition-all relative min-h-[54px] text-xs ${showResult && isCorrect
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                    : showResult && !isCorrect
                      ? 'border-zinc-100 text-zinc-400 opacity-40 shadow-none pointer-events-none'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-600 shadow-sm'
                    }`}
                >
                  {/* Option Badge */}
                  <span className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center shrink-0 select-none ${showResult && isCorrect
                    ? 'bg-emerald-500 text-white font-black'
                    : 'bg-zinc-100 text-zinc-400'
                    }`}>
                    {letter}
                  </span>

                  {/* Option Text */}
                  <span className="leading-snug flex-1 text-[12px] sm:text-[13px]">
                    {opt}
                  </span>

                  {/* Hotkey Badge */}
                  <span className="text-[9px] font-mono font-extrabold text-zinc-500 bg-zinc-50 border border-zinc-150 px-1 rounded shrink-0 select-none hidden sm:inline">
                    {hotkey}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Stun Overlay */}
          {rightStunned && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-[3px] rounded-2xl flex flex-col items-center justify-center z-20 border-2 border-blue-400/30 shadow-lg select-none">
              <div className="text-2xl mb-1 animate-bounce">💫</div>
              <span className="text-blue-600 font-black uppercase text-xs tracking-wider">Đội Xanh Bị Choáng!</span>
              <span className="text-zinc-500 text-[10px] font-bold mt-1">Hồi phục sau {rightStunTimer}s...</span>
            </div>
          )}
        </div>

      </div>

      {/* FOOTER RULES (IMAGE RULES) */}
      <div className="text-center text-[9px] text-zinc-500 uppercase tracking-widest font-black py-1.5 border-t border-zinc-200/60 flex justify-center gap-6 shrink-0 select-none">
        <span className="text-emerald-600/90">✅ Trả lời đúng: Kéo dây về phía mình</span>
        <span className="text-soviet-red/90">❌ Trả lời sai: Bị đối phương kéo lại</span>
      </div>

    </section>
  );
};

export default TugOfWarGame;

