import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

const meanings = [
  {
    title: "Hiểu cấu trúc xã hội",
    desc: "Nhận ra rằng trong mỗi xã hội luôn có phân hóa giai cấp và những cộng đồng dân tộc với vị trí, lợi ích khác nhau.",
  },
  {
    title: "Xây dựng chính sách hợp lý",
    desc: "Khi hoạch định chính sách phải kết hợp lợi ích giai cấp, lợi ích dân tộc và mục tiêu phát triển lâu dài.",
  },
  {
    title: "Tăng cường đoàn kết dân tộc",
    desc: "Biết đặt lợi ích dân tộc lên trên trong những thời điểm cần thiết để tránh chia rẽ, xung đột cực đoan.",
  },
];

const MethodologicalMeaning = () => {
  return (
    <section className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-8 uppercase tracking-tighter">
              Ý Nghĩa
            </h2>
            <div className="h-2 w-24 bg-soviet-gold mb-8 shadow-sm" />
            <p className="text-xl text-zinc-600 leading-relaxed font-medium">
              Từ nội dung giai cấp và dân tộc có thể rút ra những định hướng quan trọng cho nhận thức và hành động thực tiễn.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            {meanings.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 items-start p-8 rounded-2xl bg-white border-2 border-soviet-red/10 hover:border-soviet-red/40 shadow-xl transition-all"
              >
                <div className="bg-soviet-red/5 p-3 rounded-xl shadow-inner">
                  <CircleCheck className="w-8 h-8 text-soviet-red shrink-0" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-900 mb-3 uppercase tracking-tight">{m.title}</h4>
                  <p className="text-zinc-500 leading-relaxed font-medium">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologicalMeaning;
