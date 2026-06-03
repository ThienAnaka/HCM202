import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, Factory, Swords } from 'lucide-react';

const theories = [
  {
    title: "Định Nghĩa",
    id: 'theory-class',
    icon: <Users className="w-8 h-8 text-soviet-red" />,
    description: "Đạo đức là nền tảng tạo nên nhân cách của mỗi con người, đặc biệt đối với cán bộ, đảng viên. Người cho rằng người cán bộ muốn hoàn thành nhiệm vụ phải vừa có đức vừa có tài, trong đó đức là gốc.",
    imageSrc: "/image/Picture7.jpg",
    imageAlt: "Minh hoa cach mang Viet Nam"
  },
  {
    title: "Đặc Trưng",
    id: 'theory-class',
    icon: <Scale className="w-8 h-8 text-soviet-red" />,
    description: "Đạo đức không chỉ là phẩm chất cá nhân mà còn là sức mạnh tinh thần của cả dân tộc. Trong mọi giai đoạn cách mạng, đạo đức giúp con người vượt qua khó khăn, gian khổ để hoàn thành nhiệm vụ.",
    imageSrc: "/image/Picture6.jpg",
    imageAlt: "Minh hoa doi song cach mang"
  },
  {
    title: "Sức Mạnh Tinh Thần To Lớn",
    id: 'theory-class',
    icon: <Factory className="w-8 h-8 text-soviet-red" />,
    description: "Nhờ có đạo đức cách mạng mà cán bộ, chiến sĩ và nhân dân ta đã vượt qua nhiều thử thách trong chiến tranh.Đạo đức tạo nên tinh thần đoàn kết, lòng yêu nước và ý chí đấu tranh.",
    imageSrc: "/image/Picture10.jpg",
    imageAlt: "Minh hoa doan ket dan toc"
  },
  {
    title: "Nhân Tố Quyết Định Sự Thành Bại",
    id: 'theory-class',
    icon: <Swords className="w-8 h-8 text-soviet-red" />,
    description: "Hồ Chí Minh khẳng định rằng một Đảng cách mạng muốn lãnh đạo được nhân dân thì phải thật sự trong sạch và có đạo đức.Do đó, việc xây dựng đạo đức cách mạng luôn gắn liền với công tác xây dựng Đảng và xây dựng hệ thống chính trị trong sạch, vững mạnh.",
    imageSrc: "/image/Picture9.jpg",
    imageAlt: "Minh hoa xay dung Dang"
  }
];

const TheorySection = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (index) => {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index]
    );
  };

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
              <h2 id="theory-class" className="text-3xl md:text-5xl font-bold text-soviet-red mb-6 tracking-tight italic">Đạo đức là gốc của người cách mạng</h2>
              <p className="text-zinc-600 max-w-2xl md:max-w-none text-lg leading-relaxed">
                “Cũng như sông có nguồn mới có nước, cây có gốc mới nở ngành xanh lá, người cách mạng phải có đạo đức, không có đạo đức thì dù tài giỏi mấy cũng không lãnh đạo được nhân dân.” - Hồ Chí Minh
              </p>
            </div>
            <div className="w-full">
              <img
                src="/image/Picture5.jpg"
                alt="Minh hoa giai cap"
                className="w-full rounded-3xl border border-zinc-200 shadow-lg object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {theories.map((theory, idx) => {
            const isOpen = openIndexes.includes(idx);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glow-card rounded-xl border-2 border-soviet-red/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-soviet-red/60"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full p-8 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`theory-panel-${idx}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="transform transition-transform group-hover:scale-110 duration-300 p-3 bg-soviet-red/5 rounded-lg">
                      {theory.icon}
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 tracking-wide">{theory.title}</h3>
                  </div>
                  <span
                    className={`text-soviet-red text-2xl font-semibold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`theory-panel-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8">
                    <p className="text-zinc-600 leading-relaxed">
                      {theory.description}
                    </p>
                    <img
                      src={theory.imageSrc}
                      alt={theory.imageAlt}
                      className="mt-6 w-full rounded-2xl border border-zinc-200 shadow-md object-cover aspect-[4/3] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TheorySection;
