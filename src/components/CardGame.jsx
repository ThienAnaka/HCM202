import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Club, Heart, Spade, Diamond, RefreshCcw, Hand, Trophy, TriangleAlert, Cpu, ArrowLeft, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUITS = [
  { name: 'Spades', icon: <Spade className="w-6 h-6" />, color: 'text-zinc-900' },
  { name: 'Hearts', icon: <Heart className="w-6 h-6" />, color: 'text-soviet-red' },
  { name: 'Clubs', icon: <Club className="w-6 h-6" />, color: 'text-zinc-900' },
  { name: 'Diamonds', icon: <Diamond className="w-6 h-6" />, color: 'text-soviet-red' },
];

const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const QUESTIONS = [
  {
    q: "Theo Vladimir Lênin, giai cấp là gì?",
    options: ["Tập đoàn người khác nhau về vị trí trong sản xuất xã hội", "Nhóm người cùng tôn giáo", "Nhóm người cùng ngôn ngữ", "Nhóm người cùng lãnh thổ"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Yếu tố quan trọng nhất để phân biệt các giai cấp là:",
    options: ["Văn hóa", "Tôn giáo", "Quan hệ với tư liệu sản xuất", "Ngôn ngữ"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Một giai cấp được xác định không dựa vào yếu tố nào?",
    options: ["Quan hệ với tư liệu sản xuất", "Vai trò trong lao động", "Cách phân phối của cải", "Màu da"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Nguồn gốc sâu xa của giai cấp là:",
    options: ["Khác biệt văn hóa", "Tư hữu về tư liệu sản xuất", "Khác biệt ngôn ngữ", "Tôn giáo"],
    correct: 1,
    desc: "Đáp án đúng: B"
  },
  {
    q: "Điều kiện nào làm xuất hiện giai cấp?",
    options: ["Có tư hữu và phân công lao động", "Xã hội nguyên thủy", "Không có sản xuất", "Không có phân công lao động"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Giai cấp thống trị là giai cấp:",
    options: ["Không có tài sản", "Lao động chân tay", "Không tham gia sản xuất", "Sở hữu tư liệu sản xuất"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Giai cấp bị trị thường là:",
    options: ["Chủ doanh nghiệp", "Nhà quản lý", "Người lao động không sở hữu tư liệu sản xuất", "Nhà nước"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Theo Karl Marx, lịch sử xã hội loài người là:",
    options: ["Lịch sử văn hóa", "Lịch sử khoa học", "Lịch sử tôn giáo", "Lịch sử đấu tranh giai cấp"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Đấu tranh giai cấp là:",
    options: ["Đấu tranh giữa các giai cấp có lợi ích đối lập", "Đấu tranh giữa các quốc gia", "Đấu tranh văn hóa", "Đấu tranh tôn giáo"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Đấu tranh giai cấp dẫn đến:",
    options: ["Xã hội đứng yên", "Xã hội phát triển", "Xã hội suy thoái", "Không ảnh hưởng"],
    correct: 1,
    desc: "Đáp án đúng: B"
  },
  {
    q: "Dân tộc là gì?",
    options: ["Nhóm người ngẫu nhiên", "Gia đình lớn", "Nhóm người cùng tôn giáo", "Cộng đồng người ổn định có đặc điểm chung"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Yếu tố nào không phải đặc trưng của dân tộc?",
    options: ["Tôn giáo bắt buộc giống nhau", "Lãnh thổ", "Ngôn ngữ", "Đời sống kinh tế"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Dân tộc theo nghĩa rộng là:",
    options: ["Bộ lạc", "Nhóm nhỏ", "Quốc gia", "Gia đình"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Dân tộc theo nghĩa hẹp là:",
    options: ["Quốc gia", "Nhà nước", "Tổ chức chính trị", "Cộng đồng người có chung văn hóa, nguồn gốc"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Đặc trưng quan trọng của dân tộc là:",
    options: ["Trang phục", "Khí hậu", "Văn hóa và ý thức dân tộc", "Thức ăn"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Dân tộc có tính chất gì?",
    options: ["Ngẫu nhiên", "Ổn định lâu dài", "Tạm thời", "Không ổn định"],
    correct: 1,
    desc: "Đáp án đúng: B"
  },
  {
    q: "Vai trò của dân tộc là:",
    options: ["Nền tảng của nhà nước", "Không quan trọng", "Gây chia rẽ", "Không ảnh hưởng"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Dân tộc có vai trò trong chiến tranh là:",
    options: ["Không ảnh hưởng", "Làm suy yếu", "Tạo đoàn kết", "Gây mâu thuẫn"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Dân tộc hình thành khi:",
    options: ["Có tiền", "Có công nghệ", "Có chiến tranh", "Có cộng đồng ổn định lâu dài"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Yếu tố tạo nên sự ổn định dân tộc là:",
    options: ["Tiền bạc", "Công nghệ", "Chính trị", "Lịch sử và văn hóa chung"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Giai cấp tồn tại ở đâu?",
    options: ["Ngoài xã hội", "Trong tự nhiên", "Trong lòng dân tộc", "Trong tôn giáo"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Quan hệ giữa giai cấp và dân tộc là:",
    options: ["Không liên quan", "Giống nhau", "Đối lập hoàn toàn", "Vừa thống nhất vừa mâu thuẫn"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Khi đất nước bị xâm lược, yếu tố nào đặt lên hàng đầu?",
    options: ["Lợi ích dân tộc", "Lợi ích cá nhân", "Lợi ích kinh tế", "Lợi ích giai cấp"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Trong thời bình, mâu thuẫn nổi bật là:",
    options: ["Tôn giáo", "Dân tộc", "Giai cấp", "Văn hóa"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Trong một dân tộc thường có:",
    options: ["Một giai cấp", "Không có giai cấp", "Nhiều giai cấp", "Chỉ có công nhân"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Theo quan điểm Mác – Lênin:",
    options: ["Giai cấp là cơ sở kinh tế", "Giai cấp là văn hóa", "Giai cấp là tự nhiên", "Giai cấp là chính trị"],
    correct: 0,
    desc: "Đáp án đúng: A"
  },
  {
    q: "Dân tộc theo quan điểm Mác – Lênin là:",
    options: ["Sinh học", "Tự nhiên", "Hình thức cộng đồng xã hội", "Tôn giáo"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Trong nhiều trường hợp, vấn đề dân tộc chịu ảnh hưởng bởi:",
    options: ["Ngôn ngữ", "Khí hậu", "Văn hóa", "Giai cấp"],
    correct: 3,
    desc: "Đáp án đúng: D"
  },
  {
    q: "Theo Hồ Chí Minh, cách mạng Việt Nam phải:",
    options: ["Không cần giải phóng", "Chỉ giải phóng dân tộc", "Kết hợp giải phóng dân tộc và giai cấp", "Chỉ giải phóng giai cấp"],
    correct: 2,
    desc: "Đáp án đúng: C"
  },
  {
    q: "Ý nghĩa lớn nhất của việc học chủ đề này là:",
    options: ["Hiểu và giải quyết các vấn đề xã hội", "Giải trí", "Không cần thiết", "Chỉ để thi"],
    correct: 0,
    desc: "Đáp án đúng: A"
  }
];

const Card = ({ card, hidden }) => (
  <motion.div
    initial={{ scale: 0, rotateY: 180 }}
    animate={{ scale: 1, rotateY: hidden ? 180 : 0 }}
    className={`w-24 h-36 bg-white rounded-xl border-2 border-zinc-200 shadow-lg flex flex-col items-center justify-center relative overflow-hidden ${hidden ? 'bg-soviet-red shadow-[0_0_20px_rgba(220,38,38,0.3)]' : ''}`}
  >
    {hidden ? (
      <div className="w-full h-full flex items-center justify-center bg-soviet-red">
        <div className="w-12 h-20 border-2 border-white/20 rounded-lg flex items-center justify-center text-white/20 font-black text-2xl italic">?</div>
      </div>
    ) : (
      <>
        <div className={`absolute top-2 left-2 font-black text-lg ${card.suit.color}`}>{card.value}</div>
        <div className={`${card.suit.color} scale-125`}>{card.suit.icon}</div>
        <div className={`absolute bottom-2 right-2 font-black text-lg rotate-180 ${card.suit.color}`}>{card.value}</div>
      </>
    )}
  </motion.div>
);

const CardGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); 
  const [message, setMessage] = useState('Chào mừng đến với trò chơi kiến thức Giai cấp và Dân tộc!');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  const isXiBan = (hand) => hand.length === 2 && hand.every(c => c.value === 'A');
  const isXiDach = (hand) => hand.length === 2 && hand.some(c => c.value === 'A') && hand.some(c => ['10', 'J', 'Q', 'K'].includes(c.value));

  const calculateScore = (hand) => {
    if (!hand || hand.length === 0) return 0;
    let score = 0;
    let aces = 0;
    for (let card of hand) {
      if (card.value === 'A') {
        aces += 1;
        score += 11;
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
    return score;
  };

  const createDeck = () => {
    const newDeck = [];
    for (let suit of SUITS) {
      for (let value of VALUES) {
        newDeck.push({ suit, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const newDeck = createDeck();
    const pHand = [newDeck.pop(), newDeck.pop()];
    const dHand = [newDeck.pop(), newDeck.pop()];
    
    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setPlayerScore(calculateScore(pHand));
    setDealerScore(calculateScore(dHand));
    setWrongAnswers(0);
    setShowResultOverlay(false);

    // Check Special Hands Immediately
    const playerXB = isXiBan(pHand);
    const playerXD = isXiDach(pHand);
    const dealerXB = isXiBan(dHand);
    const dealerXD = isXiDach(dHand);

    if (playerXB || playerXD || dealerXB || dealerXD) {
      setGameState('finished');
      setShowResultOverlay(true);
      if (playerXB && !dealerXB) setMessage("XÌ BÀN! Bạn thắng tuyệt đối!");
      else if (dealerXB && !playerXB) setMessage("NHÀ CÁI XÌ BÀN! Bạn đã thua.");
      else if (playerXD && !dealerXD && !dealerXB) setMessage("XÌ DÁCH! Bạn thắng ngay lập tức!");
      else if (dealerXD && !playerXD && !playerXB) setMessage("NHÀ CÁI XÌ DÁCH! Bạn đã thua.");
      else setMessage("Cả hai cùng có bộ bài đặc biệt! Hòa bài (Push)!");
    } else {
      setGameState('playing');
      setMessage('Muốn rút bài? Hãy trả lời đúng câu hỏi về giai cấp và dân tộc!');
    }
    setQuizFeedback(null);
  };

  const requestHit = () => {
    if (gameState !== 'playing') return;
    const randomQuiz = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuiz(randomQuiz);
    setQuizFeedback(null);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (index) => {
    if (index === currentQuiz.correct) {
      setQuizFeedback('correct');
      // Không tự động đóng, để người chơi đọc giải thích
    } else {
      setQuizFeedback('incorrect');
      setWrongAnswers(prev => prev + 1);
    }
  };

  const closeQuiz = () => {
    if (quizFeedback === 'correct') {
      executeHit();
    } else if (quizFeedback === 'incorrect') {
      if (wrongAnswers >= 3) {
        setGameState('finished');
        setShowResultOverlay(true);
        setMessage("BẠN ĐÃ THUA! Sai 3 câu hỏi, bạn không đủ trình độ để tiếp tục cuộc chơi!");
      } else {
        setMessage(`Sai rồi! Bạn không được rút bài lượt này. (Sai ${wrongAnswers}/3 câu)`);
      }
    }
    setShowQuiz(false);
    setQuizFeedback(null);
  };

  const executeHit = () => {
    const newDeck = [...deck];
    if (newDeck.length === 0) return;
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);
    const score = calculateScore(newHand);
    setPlayerScore(score);

    if (score > 21) {
      setGameState('finished');
      setShowResultOverlay(true);
      setMessage('Quá 21 điểm! Bạn đã thua.');
    } else {
      setMessage("Trả lời đúng! Bạn đã nhận được một lá bài.");
    }
  };

  const stand = () => {
    if (gameState !== 'playing') return;
    setGameState('dealerTurn');
    setMessage('Lượt của Nhà cái...');
  };

  useEffect(() => {
    if (gameState === 'dealerTurn') {
      const timer = setTimeout(() => {
        const dScore = calculateScore(dealerHand);
        const pScore = calculateScore(playerHand);
        
        // Logic Nhà cái thông minh & may mắn hơn:
        // 1. Rút nếu dưới 17 (bắt buộc)
        // 2. Rút nếu vẫn thua điểm người chơi và người chơi chưa quắc (đến ngưỡng 19 điểm)
        const shouldHit = dScore < 17 || (dScore < pScore && pScore <= 21 && dScore < 19);

        if (shouldHit) {
          let newDeck = [...deck];
          if (newDeck.length === 0) return;
          
          let nextCard = newDeck[newDeck.length - 1];
          
          // Nếu rút quân tiếp theo bị quắc, có 40% cơ hội tráo sang lá an toàn hơn
          if (calculateScore([...dealerHand, nextCard]) > 21 && Math.random() < 0.4) {
            const safeCardIdx = newDeck.findIndex(c => calculateScore([...dealerHand, c]) <= 21);
            if (safeCardIdx !== -1) {
              // Tráo quân bài an toàn lên đầu để rút
              const safeCard = newDeck.splice(safeCardIdx, 1)[0];
              newDeck.push(safeCard);
              nextCard = safeCard;
            }
          }

          const newCard = newDeck.pop();
          const nextDealerHand = [...dealerHand, newCard];
          setDeck(newDeck);
          setDealerHand(nextDealerHand);
          setDealerScore(calculateScore(nextDealerHand));
        } else {
          setGameState('finished');
          setShowResultOverlay(true);
          if (dScore > 21) setMessage('NHÀ CÁI QUẮC! Bạn đã thắng!');
          else if (pScore > dScore) setMessage('CHÚC MỪNG! Bạn thắng với điểm số cao hơn!');
          else if (pScore < dScore) setMessage('NHÀ CÁI THẮNG! Bạn đã thua rồi.');
          else setMessage('Hòa bài (Push)!');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, dealerHand, deck, playerHand]);

  return (
    <section className="min-h-screen bg-zinc-900 pt-32 pb-20 px-6 flex flex-col items-center overflow-x-hidden relative">
      <AnimatePresence>
        {showResultOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResultOverlay(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -10 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              className={`relative max-w-sm w-full p-8 rounded-[3rem] border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center ${
                message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                  ? 'bg-soviet-gold border-white text-zinc-900' 
                  : message.includes('Hòa')
                  ? 'bg-zinc-600 border-zinc-400 text-white'
                  : 'bg-soviet-red border-white text-white'
              }`}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-inherit border-4 border-white rounded-full flex items-center justify-center shadow-xl">
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') ? (
                  <Trophy className="w-12 h-12" />
                ) : message.includes('Hòa') ? (
                  <RefreshCcw className="w-12 h-12" />
                ) : (
                  <XCircle className="w-12 h-12" />
                )}
              </div>
              
              <h3 className="mt-8 text-3xl font-black uppercase italic tracking-tighter leading-tight mb-4">
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                  ? 'CHIẾN THẮNG!' 
                  : message.includes('Hòa')
                  ? 'KẾT QUẢ HÒA'
                  : 'THẤT BẠI!'}
              </h3>
              
              <p className="font-bold text-lg leading-tight mb-8 opacity-90">
                {message}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95 ${
                  message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-900'
                }`}
              >
                Chơi ván mới
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full">
        <div className="mb-8 flex justify-start">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay về trang chủ
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-[clamp(1.9rem,4.8vw,4.2rem)] font-black text-soviet-red mb-4 uppercase tracking-[-0.04em] italic leading-none whitespace-nowrap">
            Kiến Thức <span className="text-white">Giai Cấp &amp; Dân Tộc</span>
          </h2>
          <div className="h-1.5 w-20 bg-soviet-gold mx-auto mb-6 rounded-full" />
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm px-4">{message}</p>
        </motion.div>

        <div className="grid gap-12">
          {/* Dealer Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-white px-4">
              <span className="font-black uppercase tracking-widest text-xs opacity-50 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Nhà cái
              </span>
              <span className="font-mono font-bold text-soviet-gold text-xl">
                {gameState === 'finished' ? dealerScore : (dealerHand.length > 0 ? '??' : '0')}
              </span>
            </div>
            <div className="flex justify-center gap-4 flex-wrap min-h-[160px] p-8 bg-black/40 rounded-[2rem] border-2 border-dashed border-white/5">
              {dealerHand.map((card, i) => (
                <Card key={`dealer-${i}`} card={card} hidden={i === 1 && gameState === 'playing'} />
              ))}
            </div>
          </div>

          {/* Player Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-white px-4">
              <div className="flex flex-col">
                <span className="font-black uppercase tracking-widest text-xs opacity-50 flex items-center gap-2">
                  <Hand className="w-4 h-4" /> Bạn
                </span>
                {wrongAnswers > 0 && (
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mt-1">
                    Lỗi: {wrongAnswers}/3
                  </span>
                )}
              </div>
              <span className="font-mono font-bold text-soviet-red text-xl">{playerScore}</span>
            </div>
            <div className="flex justify-center gap-4 flex-wrap min-h-[160px] p-8 bg-black/40 rounded-[2rem] border-2 border-soviet-red/10 shadow-[0_0_50px_rgba(220,38,38,0.05)]">
              {playerHand.map((card, i) => (
                <Card key={`player-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {gameState === 'betting' && (
            <button
              onClick={startGame}
              className="px-12 py-5 bg-soviet-red text-white font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              Bắt đầu ván bài
            </button>
          )}

          {gameState === 'playing' && (
            <>
              <button
                onClick={requestHit}
                className="px-10 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest rounded-full hover:bg-zinc-100 transition-all shadow-xl flex items-center gap-3"
              >
                <HelpCircle className="w-5 h-5 text-soviet-red" /> Rút bài (Trả lời Quiz)
              </button>
              <button
                onClick={stand}
                className="px-10 py-4 bg-soviet-red text-white font-black uppercase tracking-widest rounded-full hover:bg-red-700 transition-all shadow-xl flex items-center gap-3"
              >
                <Hand className="w-5 h-5" /> Dừng
              </button>
            </>
          )}

          {gameState === 'finished' && (
            <div className="flex flex-col items-center gap-8 w-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xl md:text-3xl font-black uppercase tracking-tighter p-6 rounded-3xl border-2 text-center ${
                  message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') 
                    ? 'bg-soviet-gold/10 text-soviet-gold border-soviet-gold/20' 
                    : message.includes('Hòa') 
                    ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}
              >
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') 
                  ? <Trophy className="inline w-8 h-8 mr-3 mb-1" /> 
                  : <TriangleAlert className="inline w-8 h-8 mr-3 mb-1" />}
                {message}
              </motion.div>
              <button
                onClick={startGame}
                className="px-12 py-5 bg-white text-zinc-900 font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
              >
                Chơi ván mới
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && currentQuiz && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={quizFeedback ? closeQuiz : null}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-soviet-red" />
              
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-soviet-red/10 rounded-2xl flex items-center justify-center text-soviet-red">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-400 font-black uppercase text-xs tracking-widest italic">Lênin & Dân tộc</h3>
                  <p className="text-zinc-900 font-bold text-lg leading-tight">{currentQuiz.q}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {currentQuiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={quizFeedback !== null}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center group ${
                      quizFeedback === null 
                        ? 'border-zinc-100 hover:border-soviet-red hover:bg-soviet-red/5 text-zinc-700'
                        : idx === currentQuiz.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : quizFeedback === 'incorrect' && idx !== currentQuiz.correct
                        ? 'border-zinc-100 text-zinc-300 opacity-50'
                        : 'border-zinc-100'
                    }`}
                  >
                    <span>{idx + 1}. {option}</span>
                    {quizFeedback !== null && idx === currentQuiz.correct && <CheckCircle2 className="text-green-500 w-6 h-6" />}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {quizFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-8 p-6 rounded-2xl border-2 flex items-start gap-4 ${
                      quizFeedback === 'correct' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {quizFeedback === 'correct' ? (
                      <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-black uppercase text-xs tracking-widest mb-1">
                        {quizFeedback === 'correct' ? 'Chính xác!' : 'Chưa đúng rồi!'}
                      </p>
                      <p className="text-sm font-medium leading-relaxed">{currentQuiz.desc}</p>
                      
                      <button
                        onClick={closeQuiz}
                        className={`mt-4 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                          quizFeedback === 'correct' 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Tiếp tục ván bài
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CardGame;
