import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Users2, Landmark } from 'lucide-react';

const items = [
  {
    icon: Users2,
    title: 'Giai cấp trong lòng dân tộc',
    desc: 'Mỗi dân tộc đều có nhiều giai cấp và tầng lớp; giai cấp không tồn tại tách rời cộng đồng dân tộc.'
  },
  {
    icon: Scale,
    title: 'Vừa thống nhất vừa mâu thuẫn',
    desc: 'Khi chống xâm lược thì lợi ích dân tộc là ưu tiên; khi hòa bình, khác biệt lợi ích giai cấp nổi bật hơn.'
  },
  {
    icon: ShieldCheck,
    title: 'Quan điểm Mác - Lênin',
    desc: 'Vấn đề dân tộc chịu ảnh hưởng bởi vấn đề giai cấp; chính sách dân tộc cần xuất phát từ lợi ích xã hội lâu dài.'
  },
  {
    icon: Landmark,
    title: 'Cách mạng Việt Nam',
    desc: 'Hồ Chí Minh kết hợp giải phóng dân tộc với giải phóng giai cấp để giải quyết đồng thời nhiệm vụ lịch sử.'
  }
];

const DialecticalCategories = () => {
  return (
    <section className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-soviet-red mb-6 uppercase tracking-tighter italic">
            Quan Hệ Giai Cấp Và Dân Tộc
          </h2>
          <div className="h-2 w-24 bg-soviet-gold mx-auto mb-8 rounded-full" />
          <p className="text-lg text-zinc-500 max-w-3xl mx-auto font-medium">
            Giai cấp và dân tộc vừa gắn bó chặt chẽ, vừa có những thời điểm mâu thuẫn tùy theo điều kiện lịch sử cụ thể.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border-2 border-zinc-100 p-8 shadow-sm hover:shadow-2xl hover:border-soviet-red/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-soviet-red/10 text-soviet-red flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-zinc-800 mb-4 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DialecticalCategories;
