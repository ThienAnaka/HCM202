import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Hammer, SunMedium } from 'lucide-react';

const PracticalConnections = () => {
  const examples = [
    {
      icon: Shield,
      title: 'Cái Gốc Con người',
      desc: 'đạo đức là gốc rễ để xây dựng, hoàn thiện nhân cách con người.',
      badge: 'soviet-red'
    },
    {
      icon: Hammer,
      title: 'Có Ích Cho Xã Hội, Đất Nước',
      desc: 'Giúp xây dựng một xã hội công bằng, văn minh.',
      badge: 'soviet-orange'
    },
    {
      icon: SunMedium,
      title: 'Bản Chất',
      desc: 'Có tài mà không có đức là người vô dụng, có đức mà không có tài thì làm việc gì cũng khó.',
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
            Chủ tịch Hồ Chí Minh để lại nhiều lời dạy sâu sắc về đạo đức.
          </p>
          <div className="mt-10 max-w-3xl mx-auto">
            <img
              src="/image/Picture3.png"
              alt="Minh hoa y nghia thuc tien"
              className="w-full rounded border border-zinc-200 shadow-lg object-cover aspect-[16/9]"
              loading="lazy"
            />
          </div>
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
