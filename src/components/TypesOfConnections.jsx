import React from 'react';
import { motion } from 'framer-motion';
import { MapPinned, Languages, BadgeCheck, PartyPopper } from 'lucide-react';

const connections = [
  {
    icon: MapPinned,
    title: "Định Nghĩa Dân Tộc",
    desc: "Dân tộc là một cộng đồng người ổn định, có chung lãnh thổ, ngôn ngữ, đời sống kinh tế, văn hóa và tâm lý."
  },
  {
    icon: Languages,
    title: "Hai Nghĩa Của Dân Tộc",
    desc: "Nghĩa hẹp là cộng đồng tộc người như Kinh, Tày, Thái, H’Mông; nghĩa rộng là một quốc gia hoàn chỉnh gồm nhiều cộng đồng dân tộc."
  },
  {
    icon: BadgeCheck,
    title: "Đặc Trưng Của Dân Tộc",
    desc: "Dân tộc có tính ổn định lâu dài, ý thức tự giác, tinh thần đoàn kết và chung lịch sử phát triển."
  },
  {
    icon: PartyPopper,
    title: "Vai Trò Của Dân Tộc",
    desc: "Dân tộc là nền tảng của nhà nước, tạo nên bản sắc văn hóa và là động lực trong bảo vệ, xây dựng đất nước."
  },
];

const TypesOfConnections = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">
            Dân Tộc Là Gì?
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Phần này hệ thống hóa định nghĩa, hai nghĩa, đặc trưng và vai trò của dân tộc trong triết học Mác - Lênin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border-2 transition-all group cursor-pointer bg-white ${
                idx === 0 
                ? 'border-soviet-orange shadow-lg' 
                : 'border-soviet-red/20 hover:border-soviet-red/50 hover:shadow-md'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ${
                idx === 0 ? 'bg-soviet-red' : 'bg-soviet-orange'
              }`}>
                <c.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-bold text-center mb-4 ${
                idx === 0 ? 'text-soviet-orange' : 'text-soviet-red'
              }`}>
                {c.title}
              </h3>
              <p className="text-zinc-600 text-center text-sm leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypesOfConnections;
