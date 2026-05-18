import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Skull, Zap, Timer, ShieldAlert, Star, RotateCcw } from 'lucide-react';
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

const TIMER_DURATION = 12;

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

      {/* Fire glow for high combo (Team Red only) */}
      {!isStunned && isLeft && combo >= 3 && (
        <div className="absolute -inset-2 bg-gradient-to-t from-amber-500/30 to-red-500/0 rounded-full blur-md animate-pulse" />
      )}

      {/* Head / Helmet / Cap */}
      <div className={`relative w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 z-10 ${
        isLeft 
          ? 'bg-gradient-to-br from-red-500 via-rose-600 to-red-700 border-yellow-400 shadow-red-500/20' 
          : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-700 border-cyan-400 shadow-blue-500/20'
      }`}>
        {isLeft ? (
          // Red team: Gold star
          <span className="text-yellow-300 font-bold text-xs select-none">★</span>
        ) : (
          // Blue team: AI / Robot face
          <span className="text-cyan-200 text-xs select-none">🤖</span>
        )}
      </div>

      {/* Body capsule with a leaning shoulder shape */}
      <div className={`w-8 h-10 -mt-2 rounded-t-2xl shadow-md border-t border-x ${
        isLeft 
          ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-400' 
          : 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400'
      }`} />

      {/* Small pulling arms */}
      <div className={`absolute top-6 w-6 h-2 rounded-full bg-amber-600/80 ${
        isLeft ? 'right-[-4px] rotate-[-20deg]' : 'left-[-4px] rotate-[20deg]'
      }`} />
    </motion.div>
  );
};

const TeamPullers = ({ team, isStunned, combo, feedback, gamePhase }) => {
  const isLeft = team === 'left';
  
  // Decide states for the team
  let isTeamStunned = false;
  let isTeamPulling = false;
  
  if (gamePhase === 'playing') {
    if (isLeft) {
      isTeamStunned = isStunned;
      isTeamPulling = !isStunned && (feedback === 'correct' || !feedback);
    } else {
      // AI team
      isTeamStunned = false;
      isTeamPulling = true;
    }
  }

  return (
    <div className={`absolute bottom-3 flex -space-x-3 ${isLeft ? 'left-[1%]' : 'right-[1%] flex-row-reverse'}`}>
      {[0, 1, 2].map((idx) => (
        <PlayerCharacter
          key={idx}
          team={team}
          index={idx}
          isStunned={isTeamStunned}
          isPulling={isTeamPulling}
          combo={combo}
        />
      ))}
    </div>
  );
};

const RopeVisual = ({ ropePosition, isStunned, combo, feedback, gamePhase }) => {
  const pct = ((ropePosition + 100) / 200) * 100;
  return (
    <div className="relative w-full h-36 flex items-center select-none overflow-visible">
      {/* ground line */}
      <div className="absolute bottom-4 left-0 right-0 h-1 bg-zinc-700 rounded-full" />
      {/* zone labels */}
      <div className="absolute top-0 left-4 text-[10px] font-black uppercase tracking-widest text-green-400 opacity-60">Đội Đỏ thắng ◄</div>
      <div className="absolute top-0 right-4 text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-60">► Đội Xanh thắng</div>
      {/* center mark */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-0.5 h-6 bg-zinc-600" />
      {/* rope */}
      <div className="absolute bottom-[14px] left-[15%] right-[15%] h-3 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 shadow-lg"
        style={{ backgroundSize: '20px 20px', backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.15) 8px, rgba(0,0,0,0.15) 10px)' }} />
      {/* marker / flag */}
      <motion.div
        className="absolute bottom-[10px]"
        animate={{ left: `${clamp(pct, 15, 85)}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ translateX: '-50%' }}
      >
        <div className="flex flex-col items-center">
          <div className="text-2xl">🚩</div>
          <div className="w-5 h-5 rounded-full bg-white border-4 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
        </div>
      </motion.div>
      {/* dynamic team sprites */}
      <TeamPullers team="left" isStunned={isStunned} combo={combo} feedback={feedback} gamePhase={gamePhase} />
      <TeamPullers team="right" isStunned={false} combo={0} feedback={feedback} gamePhase={gamePhase} />
    </div>
  );
};

const TimerBar = ({ timeLeft, total }) => {
  const pct = (timeLeft / total) * 100;
  const color = pct > 50 ? 'bg-green-500' : pct > 25 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
      <motion.div className={`h-full ${color} rounded-full`} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} />
    </div>
  );
};

const ComboDisplay = ({ combo }) => {
  if (combo < 2) return null;
  const fire = combo >= 5 ? '🔥🔥🔥' : combo >= 3 ? '🔥🔥' : '🔥';
  return (
    <motion.div
      key={combo}
      initial={{ scale: 0.5, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm uppercase tracking-wider ${
        combo >= 5 ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white shadow-[0_0_30px_rgba(250,204,21,0.5)]'
        : combo >= 3 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
        : 'bg-green-500/20 text-green-400 border border-green-500/30'
      }`}
    >
      <Zap className="w-4 h-4" /> Combo x{combo} {fire}
    </motion.div>
  );
};

/* ───── main component ───── */
const TugOfWarGame = () => {
  const [gamePhase, setGamePhase] = useState('menu');
  const [ropePosition, setRopePosition] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [isStunned, setIsStunned] = useState(false);
  const [stunTimer, setStunTimer] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(TIMER_DURATION);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctShuffledIdx, setCorrectShuffledIdx] = useState(0);
  const [aiForce, setAiForce] = useState(1.0);
  const [feedback, setFeedback] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [answered, setAnswered] = useState(false);

  const aiIntervalRef = useRef(null);
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
    setFeedback(null);
  }, [usedQuestions]);

  /* ── start game ── */
  const startGame = () => {
    setRopePosition(0);
    setCombo(0);
    setScore(0);
    setQuestionsAsked(0);
    setIsStunned(false);
    setStunTimer(0);
    setAiForce(1.0);
    setUsedQuestions(new Set());
    setFeedback(null);
    setGamePhase('playing');
  };

  /* ── load first question when playing starts ── */
  useEffect(() => {
    if (gamePhase === 'playing' && !currentQuestion) nextQuestion();
  }, [gamePhase, currentQuestion, nextQuestion]);

  /* ── AI pull interval ── */
  useEffect(() => {
    if (gamePhase !== 'playing') { clearInterval(aiIntervalRef.current); return; }
    aiIntervalRef.current = setInterval(() => {
      setRopePosition(prev => {
        const pull = isStunned ? aiForce * 1.5 : aiForce;
        const next = prev + pull;
        if (next >= 100) { 
          setGamePhase('lose'); 
          playLoseSound();
          return 100; 
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(aiIntervalRef.current);
  }, [gamePhase, aiForce, isStunned]);

  /* ── question timer ── */
  useEffect(() => {
    if (gamePhase !== 'playing' || isStunned || answered) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setQuestionTimer(prev => {
        if (prev <= 1) { handleTimeout(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gamePhase, isStunned, answered, currentQuestion]);

  /* ── stun countdown ── */
  useEffect(() => {
    if (!isStunned) return;
    const id = setInterval(() => {
      setStunTimer(prev => {
        if (prev <= 1) { setIsStunned(false); nextQuestion(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isStunned, nextQuestion]);

  /* ── handle correct ── */
  const handleCorrect = () => {
    const newCombo = combo + 1;
    const pull = 8 + newCombo * 2;
    setCombo(newCombo);
    setScore(s => s + 1);
    setFeedback('correct');
    setRopePosition(prev => {
      const next = prev - pull;
      if (next <= -100) { 
        setGamePhase('win'); 
        playWinSound();
        return -100; 
      }
      return next;
    });
    playComboSound(newCombo);
    setAiForce(f => f + 0.15);
    setQuestionsAsked(q => q + 1);
    setAnswered(true);
    setTimeout(() => { if (gamePhase === 'playing') nextQuestion(); }, 1200);
  };

  /* ── handle wrong ── */
  const handleWrong = () => {
    setCombo(0);
    setFeedback('wrong');
    setRopePosition(prev => clamp(prev + 12, -100, 100));
    setAiForce(f => f + 0.15);
    setQuestionsAsked(q => q + 1);
    setAnswered(true);
    setIsStunned(true);
    setStunTimer(2);
    playStunSound();
  };

  const handleTimeout = () => handleWrong();

  const handleAnswer = (idx) => {
    if (answered || isStunned || gamePhase !== 'playing') return;
    idx === correctShuffledIdx ? handleCorrect() : handleWrong();
  };

  /* ── RENDER ── */

  // MENU
  if (gamePhase === 'menu') {
    return (
      <section className="min-h-screen bg-zinc-900 pt-32 pb-20 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="mb-8"><Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-xs transition-colors"><ArrowLeft className="w-4 h-4" /> Quay về trang chủ</Link></div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-6xl mb-6">🪢</div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight leading-none">
              Kéo Co <span className="text-soviet-red">Kiến Thức</span>
            </h1>
            <div className="h-1.5 w-20 bg-soviet-gold mx-auto mb-6 rounded-full" />
            <p className="text-zinc-400 mb-4 font-medium max-w-lg mx-auto">Trả lời đúng câu hỏi về <strong className="text-white">Tư tưởng Hồ Chí Minh về đạo đức</strong> để kéo dây về phía mình. Trả lời sai sẽ bị stun và mất combo!</p>
            <div className="grid grid-cols-2 gap-3 text-left max-w-md mx-auto mb-10 text-sm">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-green-400"><strong className="block mb-1">✅ Trả lời đúng</strong>Tăng lực kéo, tạo combo, đẩy dây về phía mình</div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400"><strong className="block mb-1">❌ Trả lời sai</strong>Bị stun 2s, giảm lực, mất combo</div>
            </div>
            <button onClick={startGame} className="px-12 py-5 bg-soviet-red text-white font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg">
              Bắt Đầu Kéo Co!
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // WIN / LOSE
  if (gamePhase === 'win' || gamePhase === 'lose') {
    const won = gamePhase === 'win';
    return (
      <section className="min-h-screen bg-zinc-900 pt-32 pb-20 px-4 flex flex-col items-center justify-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-lg">
          <div className="text-7xl mb-6">{won ? '🏆' : '💀'}</div>
          <h2 className={`text-5xl font-black uppercase mb-4 ${won ? 'text-soviet-gold' : 'text-red-500'}`}>{won ? 'Chiến Thắng!' : 'Thất Bại!'}</h2>
          <p className="text-zinc-400 mb-2 font-medium">{won ? 'Bạn đã kéo dây về phía mình thành công!' : 'Đội AI đã kéo dây về phía họ!'}</p>
          <div className="flex justify-center gap-6 my-8">
            <div className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-3xl font-black text-white">{score}</div><div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Câu đúng</div></div>
            <div className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-3xl font-black text-white">{questionsAsked}</div><div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Tổng câu</div></div>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { setCurrentQuestion(null); startGame(); }} className="px-10 py-4 bg-soviet-red text-white font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2"><RotateCcw className="w-5 h-5" /> Chơi lại</button>
            <Link to="/" className="px-10 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all">Trang chủ</Link>
          </div>
        </motion.div>
      </section>
    );
  }

  // PLAYING
  return (
    <section className="min-h-screen bg-zinc-900 pt-28 pb-20 px-4 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-3xl w-full">
        <div className="mb-4 flex justify-between items-center">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-xs transition-colors"><ArrowLeft className="w-4 h-4" /> Về</Link>
          <div className="flex items-center gap-4">
            <ComboDisplay combo={combo} />
            <div className="text-zinc-500 font-mono text-sm"><Star className="w-4 h-4 inline text-soviet-gold mr-1" />{score}</div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">
          Kéo Co <span className="text-soviet-red">Kiến Thức</span>
        </h2>

        {/* Rope Visual */}
        <div className="bg-zinc-800/60 rounded-3xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex justify-between text-sm font-black uppercase tracking-wider mb-2">
            <span className="text-green-400">🔴 Đội Đỏ (Bạn)</span>
            <span className="text-blue-400">Đội Xanh (AI) 🔵</span>
          </div>
          <RopeVisual 
            ropePosition={ropePosition} 
            isStunned={isStunned}
            combo={combo}
            feedback={feedback}
            gamePhase={gamePhase}
          />
          {/* force bar */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold whitespace-nowrap">Vị trí dây</span>
            <div className="flex-1 h-3 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${clamp(50 - ropePosition / 2, 0, 100)}%` }}
                style={{ background: 'linear-gradient(90deg, #22c55e, #eab308)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              />
            </div>
          </div>
        </div>

        {/* Stun overlay */}
        <AnimatePresence>
          {isStunned && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 text-center"
            >
              <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-2" />
              </motion.div>
              <p className="text-red-400 font-black uppercase tracking-widest text-lg">Stunned!</p>
              <p className="text-red-400/60 text-sm font-bold">Hồi phục sau {stunTimer}s...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question area */}
        {!isStunned && currentQuestion && (
          <motion.div
            key={currentQuestion.q}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800/80 backdrop-blur rounded-3xl p-6 md:p-8 border border-zinc-700/50"
          >
            {/* timer */}
            <div className="flex items-center gap-3 mb-4">
              <Timer className="w-4 h-4 text-zinc-400" />
              <TimerBar timeLeft={questionTimer} total={TIMER_DURATION} />
              <span className={`font-mono font-bold text-sm min-w-[2ch] ${questionTimer <= 3 ? 'text-red-500' : 'text-zinc-400'}`}>{questionTimer}</span>
            </div>

            {/* question text */}
            <p className="text-white font-bold text-lg md:text-xl mb-6 leading-relaxed">{currentQuestion.q}</p>

            {/* options */}
            <div className="grid gap-3">
              {shuffledOptions.map((opt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isCorrect = idx === correctShuffledIdx;
                const showResult = answered;
                return (
                  <motion.button
                    key={idx}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    disabled={answered}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 rounded-2xl border-2 text-left font-semibold transition-all flex items-center gap-3 ${
                      showResult && isCorrect ? 'border-green-500 bg-green-500/10 text-green-400'
                      : showResult && !isCorrect ? 'border-zinc-700 text-zinc-600 opacity-40'
                      : 'border-zinc-700 text-zinc-300 hover:border-soviet-gold hover:bg-zinc-700/50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                      showResult && isCorrect ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-400'
                    }`}>{letter}</span>
                    <span>{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* feedback flash */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`mt-4 p-4 rounded-xl text-center font-black uppercase tracking-widest text-sm ${
                    feedback === 'correct' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {feedback === 'correct' ? '✅ Chính xác! Dây đang về phía bạn!' : '❌ Sai rồi! Bạn bị stun 2 giây!'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* combo >= 5 screen glow */}
      {combo >= 5 && (
        <div className="fixed inset-0 pointer-events-none border-4 border-yellow-400/30 rounded-none z-50 animate-pulse" />
      )}
    </section>
  );
};

export default TugOfWarGame;
