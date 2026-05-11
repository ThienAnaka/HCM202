import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Hammer, SunMedium } from 'lucide-react';

const PracticalConnections = () => {
  const examples = [
    {
      icon: Shield,
      title: 'Khi chiến tranh xâm lược xảy ra',
      desc: 'Lợi ích dân tộc trở thành điểm quy tụ lớn nhất, yêu cầu đoàn kết mọi giai cấp, tầng lớp để bảo vệ độc lập, chủ quyền.',
      badge: 'soviet-red'
    },
    {
      icon: Hammer,
      title: 'Khi xây dựng đất nước trong hòa bình',
      desc: 'Mâu thuẫn giai cấp và vấn đề phân phối lợi ích nổi bật hơn, đòi hỏi chính sách xã hội hợp lý và công bằng.',
      badge: 'soviet-orange'
    },
    {
      icon: SunMedium,
      title: 'Trong phát triển lâu dài',
      desc: 'Kết hợp mục tiêu dân tộc với mục tiêu xã hội chủ nghĩa giúp củng cố đoàn kết, tạo động lực phát triển bền vững.',
      badge: 'soviet-gold'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 uppercase">
            Ý Nghĩa Thực Tiễn
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
            Phần này cho thấy cách vận dụng quan hệ giai cấp - dân tộc vào phân tích xã hội và hoạch định chính sách.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((item, index) => {
            const Icon = item.icon;
            const badgeClass = item.badge === 'soviet-red' ? 'bg-soviet-red' : item.badge === 'soviet-orange' ? 'bg-soviet-orange' : 'bg-soviet-gold';
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-3xl border-2 border-zinc-100 shadow-xl"
              >
                <div className={`w-14 h-14 rounded-full ${badgeClass} text-white flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticalConnections;
