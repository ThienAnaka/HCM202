import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, Factory, Swords } from 'lucide-react';

const theories = [
  {
    title: "Định Nghĩa",
    icon: <Users className="w-8 h-8 text-soviet-red" />,
    description: "Theo V. I. Lênin, giai cấp là những tập đoàn người lớn khác nhau về vị trí trong hệ thống sản xuất xã hội, quan hệ với tư liệu sản xuất, vai trò trong tổ chức lao động và cách hưởng thụ của cải."
  },
  {
    title: "Đặc Trưng",
    icon: <Scale className="w-8 h-8 text-soviet-red" />,
    description: "Giai cấp được nhận diện qua quan hệ với tư liệu sản xuất, vai trò trong tổ chức lao động, cách thức phân phối của cải và địa vị xã hội."
  },
  {
    title: "Nguồn Gốc",
    icon: <Factory className="w-8 h-8 text-soviet-red" />,
    description: "Giai cấp xuất hiện khi có tư hữu về tư liệu sản xuất, phân công lao động xã hội và sự chênh lệch giàu nghèo; từ đó xã hội phân hóa thành giai cấp thống trị và bị trị."
  },
  {
    title: "Đấu Tranh Giai Cấp",
    icon: <Swords className="w-8 h-8 text-soviet-red" />,
    description: "Theo Marx, lịch sử xã hội loài người là lịch sử đấu tranh giai cấp; lợi ích đối lập giữa các giai cấp thường dẫn tới xung đột kinh tế và chính trị."
  }
];

const TheorySection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">Giai Cấp Là Gì?</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Giai cấp là phạm trù trung tâm để nhận diện phân hóa xã hội và các quan hệ lợi ích trong phương thức sản xuất.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {theories.map((theory, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glow-card p-8 rounded-xl group border-t-4 border-t-soviet-red shadow-lg"
            >
              <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300 p-3 bg-soviet-red/5 rounded-lg w-fit">
                {theory.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-wide">{theory.title}</h3>
              <p className="text-zinc-600 leading-relaxed">
                {theory.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheorySection;
