import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Network, Zap } from 'lucide-react';

const principles = [
  {
    icon: Globe,
    title: "Giai Cấp",
    description: "Nhận diện phân hóa xã hội dựa trên vị trí trong sản xuất, tư liệu sản xuất và cách phân phối của cải.",
  },
  {
    icon: Network,
    title: "Dân Tộc",
    description: "Hiểu dân tộc như một cộng đồng ổn định, có lãnh thổ, ngôn ngữ, kinh tế, văn hóa và tâm lý chung.",
  },
  {
    icon: Zap,
    title: "Quan Hệ",
    description: "Nắm được mối quan hệ vừa thống nhất vừa mâu thuẫn giữa giai cấp và dân tộc trong từng hoàn cảnh.",
  },
];

const TheoryFoundation = () => {
  return (
    <section className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">
            Cơ Sở Lý Luận
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
            Ba ý chính để hiểu đúng nội dung giai cấp và dân tộc trong triết học Mác - Lênin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.2 }}
              className="relative bg-white p-10 rounded-2xl border-2 border-soviet-red/30 shadow-xl hover:shadow-soviet-red/20 transition-all group overflow-hidden"
            >
              {/* Corner accent from image */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-soviet-orange/20 to-transparent rounded-full" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-soviet-orange rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-soviet-orange/30">
                  <p.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-soviet-red text-center mb-4 uppercase tracking-tight">
                  {p.title}
                </h3>
                <p className="text-zinc-600 text-center leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheoryFoundation;
