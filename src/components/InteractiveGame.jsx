import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck, CircleAlert, ArrowLeft } from 'lucide-react';

const initialItems = [
  { id: 1, cause: "Tư hữu tư liệu sản xuất", effect: "Xã hội phân hóa thành các giai cấp" },
  { id: 2, cause: "Lợi ích dân tộc bị xâm phạm", effect: "Tinh thần đoàn kết chống xâm lược tăng cao" },
  { id: 3, cause: "Hòa bình và xây dựng đất nước", effect: "Mâu thuẫn giai cấp nổi bật hơn" },
  { id: 4, cause: "Kết hợp độc lập dân tộc", effect: "Giải phóng giai cấp có điều kiện thực hiện" },
];

const InteractiveGame = () => {
  const [selectedCause, setSelectedCause] = useState(null);
  const [matches, setMatches] = useState([]);
  const [lastMatchedId, setLastMatchedId] = useState(null);
  const [shuffledEffects, setShuffledEffects] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Shuffle effects to make it a real game
    setShuffledEffects([...initialItems].sort(() => Math.random() - 0.5));
  }, []);

  const handleMatch = (effect) => {
    if (!selectedCause) {
      setError("Hãy chọn một nguyên nhân trước!");
      setTimeout(() => setError(null), 2000);
      return;
    }

    if (selectedCause.id === effect.id) {
      const newMatches = [...matches, selectedCause.id];
      setMatches(newMatches);
      setLastMatchedId(selectedCause.id);
      setSelectedCause(null);
      setError(null);
      
      if (newMatches.length === initialItems.length) {
        setSuccess(true);
      }
    } else {
      setError("Sai rồi! Hãy thử lại liên kết khác.");
      setTimeout(() => setError(null), 2000);
      setSelectedCause(null);
    }
  };

  return (
    <section className="py-24 px-6 bg-white border-y border-zinc-100 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 uppercase tracking-tight">
            Thử Thách Quan Hệ
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium">
            Hãy kết nối đúng nguyên nhân với kết quả trong chủ đề giai cấp và dân tộc.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Causes Column */}
          <div className="space-y-4">
            <div className="text-center mb-8">
              <span className="bg-soviet-red text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Nguyên Nhân</span>
            </div>
            {initialItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: matches.includes(item.id) ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !matches.includes(item.id) && setSelectedCause(item)}
                disabled={matches.includes(item.id)}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                  matches.includes(item.id)
                    ? 'bg-zinc-50 border-zinc-200 text-zinc-300'
                    : selectedCause?.id === item.id
                    ? 'border-soviet-red bg-soviet-red/5 text-soviet-red shadow-lg shadow-soviet-red/10'
                    : 'border-zinc-100 bg-white text-zinc-700 hover:border-soviet-red/30 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-bold text-lg">{item.cause}</span>
                  {matches.includes(item.id) && <CircleCheck className="text-green-500 w-6 h-6" />}
                </div>
                {selectedCause?.id === item.id && (
                  <motion.div layoutId="active-indicator" className="absolute bottom-0 left-0 h-1 bg-soviet-red w-full" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Effects Column */}
          <div className="space-y-4">
            <div className="text-center mb-8">
              <span className="bg-soviet-orange text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Kết Quả</span>
            </div>
            {shuffledEffects.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: matches.includes(item.id) ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !matches.includes(item.id) && handleMatch(item)}
                disabled={matches.includes(item.id)}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  matches.includes(item.id)
                    ? 'bg-zinc-50 border-zinc-100 text-zinc-400 opacity-40'
                    : 'border-zinc-100 bg-white text-zinc-700 hover:border-soviet-orange/30 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{item.effect}</span>
                  {matches.includes(item.id) && (
                    <div className="flex items-center gap-2">
                      <CircleCheck className="text-green-500 w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Arrow and Feedback for correct match */}
                {matches.includes(item.id) && (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 z-20 text-center"
                  >
                    <motion.div
                      animate={{ x: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="mb-2"
                    >
                      <ArrowLeft className="text-soviet-red w-8 h-8" />
                    </motion.div>
                    <span className="text-soviet-red font-bold text-sm leading-tight">
                      Kết quả vừa hình thành có thể tạo ra nguyên nhân mới trong giai đoạn tiếp theo.
                    </span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feedback Message */}
        <div className="h-12 mt-8 flex justify-center items-center">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-soviet-red font-bold"
              >
                <CircleAlert className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16 p-12 bg-white border-4 border-soviet-gold rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(245,158,11,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-soviet-red via-soviet-gold to-soviet-red" />
              <h4 className="text-4xl font-black text-zinc-900 mb-6 uppercase tracking-tighter">Kết Nối Hoàn Tất</h4>
              <p className="text-soviet-red text-2xl italic font-serif leading-tight">
                "Mỗi kết quả mới đều mở ra một điều kiện lịch sử mới cho xã hội."
              </p>
              <div className="mt-8 text-zinc-400 font-black uppercase tracking-[0.4em] text-xs">
                — Giai cấp và dân tộc
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGame;
