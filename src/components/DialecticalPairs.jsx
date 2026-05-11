import React from 'react';
import { motion } from 'framer-motion';

const pairs = [
  { title: "Giai cấp", desc: "Những tập đoàn người lớn khác nhau về vị trí trong sản xuất xã hội, quan hệ với tư liệu sản xuất và cách hưởng thụ của cải." },
  { title: "Dân tộc", desc: "Cộng đồng người ổn định có lãnh thổ, ngôn ngữ, đời sống kinh tế, văn hóa và tâm lý chung." },
  { title: "Thống nhất", desc: "Giai cấp và dân tộc cùng tồn tại trong một cộng đồng xã hội và cùng chịu tác động của lịch sử." },
  { title: "Mâu thuẫn", desc: "Trong một số bối cảnh, lợi ích giai cấp và lợi ích dân tộc có thể khác nhau và cần được xử lý đúng lúc." },
  { title: "Giải phóng", desc: "Cách mạng Việt Nam kết hợp giải phóng dân tộc với giải phóng giai cấp để đi tới mục tiêu chung." },
  { title: "Ý nghĩa", desc: "Nhận thức đúng giúp xây dựng chính sách hợp lý và củng cố đoàn kết dân tộc." }
];

const DialecticalPairs = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">Các Ý Chính Của Bài Học</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">Các khái niệm trọng tâm giúp hệ thống hóa nội dung giai cấp và dân tộc.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairs.map((pair, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, backgroundColor: '#fff5f5' }}
              className="p-8 rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-soviet-red mb-3 uppercase tracking-wider border-b-2 border-soviet-gold pb-2 w-fit">{pair.title}</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {pair.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DialecticalPairs;
