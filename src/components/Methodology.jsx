import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

const Methodology = () => {
  const points = [
    {
      title: "Quan điểm toàn diện",
      desc: "Khi xem xét giai cấp và dân tộc cần đặt chúng trong toàn bộ bối cảnh xã hội, lịch sử và lợi ích thực tế."
    },
    {
      title: "Phân tích Lịch sử – Cụ thể",
      desc: "Mỗi vấn đề dân tộc hay giai cấp đều phải được phân tích trong điều kiện lịch sử, không gian và thời gian cụ thể."
    },
    {
      title: "Mắt xích quyết định",
      desc: "Xác định lợi ích, lực lượng và thời điểm then chốt để xử lý đúng quan hệ giữa giai cấp và dân tộc."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white border-y border-zinc-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">Phương Pháp Luận</h2>
            <div className="h-2 w-20 bg-soviet-gold mb-8 shadow-sm" />
            <p className="text-zinc-600 mb-8 leading-relaxed text-lg">
              Để vận dụng bài học giai cấp và dân tộc, cần có cách nhìn toàn diện, lịch sử - cụ thể và biết xác định trọng tâm hành động.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            {points.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 items-start p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-soviet-red/30 transition-colors"
              >
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <CircleCheck className="w-6 h-6 text-soviet-red shrink-0" />
                </div>
                <div>
                  <h4 className="text-zinc-900 font-bold mb-2 text-lg uppercase tracking-tight">{point.title}</h4>
                  <p className="text-zinc-600 leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
