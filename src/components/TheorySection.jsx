import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, Factory, Swords } from 'lucide-react';

const theories = [
  {
    title: "Định Nghĩa",
    id: 'theory-class',
    icon: <Users className="w-8 h-8 text-soviet-red" />,
    description: "Đạo đức là nền tảng tạo nên nhân cách của mỗi con người, đặc biệt đối với cán bộ, đảng viên. Người cho rằng người cán bộ muốn hoàn thành nhiệm vụ phải vừa có đức vừa có tài, trong đó đức là gốc."
  },
  {
    title: "Đặc Trưng",
    id: 'theory-class',
    icon: <Scale className="w-8 h-8 text-soviet-red" />,
    description: "Đạo đức không chỉ là phẩm chất cá nhân mà còn là sức mạnh tinh thần của cả dân tộc. Trong mọi giai đoạn cách mạng, đạo đức giúp con người vượt qua khó khăn, gian khổ để hoàn thành nhiệm vụ."
  },
  {
    title: "Sức Mạnh Tinh Thần To Lớn",
    id: 'theory-class',
    icon: <Factory className="w-8 h-8 text-soviet-red" />,
    description: "●	Nhờ có đạo đức cách mạng mà cán bộ, chiến sĩ và nhân dân ta đã vượt qua nhiều thử thách trong chiến tranh.Đạo đức tạo nên tinh thần đoàn kết, lòng yêu nước và ý chí đấu tranh."
  },
  {
    title: "Nhân Tố Quyết Định Sự Thành Bại",
    id: 'theory-class',
    icon: <Swords className="w-8 h-8 text-soviet-red" />,
    description: "Hồ Chí Minh khẳng định rằng một Đảng cách mạng muốn lãnh đạo được nhân dân thì phải thật sự trong sạch và có đạo đức.Do đó, việc xây dựng đạo đức cách mạng luôn gắn liền với công tác xây dựng Đảng và xây dựng hệ thống chính trị trong sạch, vững mạnh."
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
          className="mb-16"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center md:text-left">
              <h2 id="theory-class" className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">Đạo đức là gốc của người cách mạng</h2>
              <p className="text-zinc-600 max-w-2xl md:max-w-none text-lg leading-relaxed">
                Đạo đức là nền tảng và sức mạnh nội sinh giúp người cách mạng vượt qua mọi khó khăn, thử thách.và là yếu tố quyết định sự thành công của cách mạng
              </p>
            </div>
            <div className="w-full">
              <img
                src="/image/NgauNhienTatNhien.jpg"
                alt="Minh hoa giai cap"
                className="w-full rounded-3xl border border-zinc-200 shadow-lg object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
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
              {theory.id === 'theory-class' && (
                  <img
                    src="/image/NgauNhienTatNhien.jpg"
                    alt="Minh hoa cach mang Viet Nam"
                    className="mt-6 w-full rounded-2xl border border-zinc-200 shadow-md object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheorySection;
