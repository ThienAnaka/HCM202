import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Club, Diamond, Target, BookOpen, Spade } from 'lucide-react';

const MindmapPage = () => {
  const playSteps = [
    {
      id: 1,
      title: 'Chia bài',
      description: 'Bạn và nhà cái mỗi bên nhận 2 lá bài ban đầu.',
    },
    {
      id: 2,
      title: 'Câu hỏi',
      description: 'Hệ thống đưa ra câu hỏi về Giai cấp và Dân tộc.',
    },
    {
      id: 3,
      title: 'Trả lời',
      description: 'Chọn đáp án đúng để được phép rút thêm một lá bài.',
    },
    {
      id: 4,
      title: 'Quyết định',
      description: 'Rút thêm hoặc dừng khi bạn thấy điểm đủ tốt.',
    },
    {
      id: 5,
      title: 'So điểm',
      description: 'Ai gần 21 hơn mà không quắc sẽ giành chiến thắng.',
    },
  ];

  const valueRules = [
    { name: 'Số (2 -> 10)', score: '= đúng số trên bài' },
    { name: 'J, Q, K (bài mặt)', score: '= 10 điểm' },
    { name: 'A (xì)', score: '= 1 hoặc 11 điểm' },
    { name: 'Blackjack (A + 10/J/Q/K)', score: '= 21 ngay' },
  ];

  const outcomeRules = [
    { condition: 'Điểm bạn gần 21, hơn nhà cái', result: 'Thắng ✓' },
    { condition: 'Điểm bạn bằng nhà cái', result: 'Hòa' },
    { condition: 'Điểm bạn vượt quá 21 (bust)', result: 'Thua X' },
    { condition: 'Nhà cái gần 21 hơn bạn', result: 'Thua X' },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 py-20 px-6 pt-32 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-800/80 p-8 md:p-12 mb-10"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-soviet-gold uppercase tracking-[0.25em] text-sm font-bold mb-4">Kiến thức - Giai cấp & Dân tộc</p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
                <span className="text-soviet-red italic">Luật chơi</span> rút bài
              </h1>
              <p className="text-zinc-300 text-lg font-semibold max-w-2xl leading-relaxed">
                Trả lời đúng câu hỏi để được rút bài thêm. Tổng điểm bài gần 21 nhất mà không vượt quá sẽ thắng.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/game"
                  className="px-6 py-3 rounded-xl bg-soviet-red text-white font-black uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Vào chơi ngay
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl border border-zinc-500 text-zinc-200 font-black uppercase tracking-wider hover:border-zinc-300 hover:text-white transition-colors"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-24 h-32 rounded-xl bg-zinc-100 text-zinc-900 border border-white/50 shadow-xl flex flex-col items-center justify-center">
                <span className="text-3xl font-black">J</span>
                <Club className="w-6 h-6 text-zinc-900 mt-1" />
              </div>
              <div className="w-24 h-32 rounded-xl bg-soviet-red text-white border border-red-300/40 shadow-xl flex flex-col items-center justify-center">
                <span className="text-3xl font-black">Q</span>
                <Diamond className="w-6 h-6 text-white mt-1" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-zinc-200 font-black uppercase text-3xl tracking-wide mb-6">Các bước chơi</h2>
          <div className="grid md:grid-cols-5 gap-3 rounded-3xl overflow-hidden border border-white/10 bg-zinc-800/70">
            {playSteps.map((step) => (
              <div key={step.id} className="p-5 border-r border-white/10 last:border-r-0 min-h-[180px]">
                <div className="w-9 h-9 rounded-full bg-soviet-red text-white font-black text-sm flex items-center justify-center mb-4">
                  {step.id}
                </div>
                <p className="text-xl font-black text-zinc-100 mb-2">{step.title}</p>
                <p className="text-zinc-400 text-lg leading-relaxed font-semibold">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          <div className="rounded-3xl border border-white/15 bg-zinc-800/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-soviet-gold" />
              <h3 className="text-3xl font-black text-zinc-100">Giá trị bài</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-zinc-700 text-zinc-300 font-bold uppercase">Điểm tính</span>
            </div>
            <div className="divide-y divide-white/10">
              {valueRules.map((rule) => (
                <div key={rule.name} className="py-3 flex items-center justify-between gap-4">
                  <p className="text-zinc-200 text-xl font-semibold">{rule.name}</p>
                  <p className="text-zinc-100 text-xl font-black whitespace-nowrap">{rule.score}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-zinc-800/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-soviet-red" />
              <h3 className="text-3xl font-black text-zinc-100">Điều kiện thắng / thua</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold uppercase">Quan trọng</span>
            </div>
            <div className="divide-y divide-white/10">
              {outcomeRules.map((rule) => (
                <div key={rule.condition} className="py-3 flex items-center justify-between gap-4">
                  <p className="text-zinc-200 text-xl font-semibold">{rule.condition}</p>
                  <p className="text-zinc-100 text-xl font-black whitespace-nowrap">{rule.result}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-zinc-200 font-black uppercase text-3xl tracking-wide mb-6">Kết quả</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border-2 border-emerald-300/40 bg-emerald-200/20 p-6">
              <p className="text-emerald-300 font-black text-2xl uppercase mb-3">Thắng</p>
              <p className="text-emerald-100 text-lg font-semibold">Điểm bạn cao hơn nhà cái hoặc nhà cái bị bust (quá 21).</p>
            </div>
            <div className="rounded-2xl border-2 border-amber-300/40 bg-amber-100/20 p-6">
              <p className="text-amber-300 font-black text-2xl uppercase mb-3">Hòa</p>
              <p className="text-amber-100 text-lg font-semibold">Hai bên có tổng điểm bằng nhau, không ai thắng, không ai thua.</p>
            </div>
            <div className="rounded-2xl border-2 border-rose-300/40 bg-rose-100/20 p-6">
              <p className="text-rose-300 font-black text-2xl uppercase mb-3">Thua</p>
              <p className="text-rose-100 text-lg font-semibold">Bạn bị bust (quá 21) hoặc điểm thấp hơn nhà cái.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="rounded-3xl border border-white/10 bg-zinc-800/60 p-6"
        >
          <h2 className="text-zinc-200 font-black uppercase text-3xl tracking-wide mb-6">Mẹo chơi</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 p-5">
              <p className="text-3xl mb-3">🎯</p>
              <p className="text-zinc-100 text-xl font-black mb-2">Dừng đúng lúc</p>
              <p className="text-zinc-400 text-lg font-semibold">Khi tổng điểm đạt 17-20, nên cân nhắc dừng để tránh bust.</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <p className="text-3xl mb-3">📚</p>
              <p className="text-zinc-100 text-xl font-black mb-2">Ôn lý thuyết</p>
              <p className="text-zinc-400 text-lg font-semibold">Trả lời đúng câu hỏi mới được rút thêm nên hãy nắm chắc kiến thức.</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <Spade className="w-6 h-6 text-zinc-200 mb-3" />
              <p className="text-zinc-100 text-xl font-black mb-2">Nhớ giá trị A</p>
              <p className="text-zinc-400 text-lg font-semibold">A linh hoạt: tính 11 nếu không bust, tính 1 nếu tổng vượt quá 21.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MindmapPage;
