import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinned, Languages, BadgeCheck, PartyPopper } from 'lucide-react';

const connections = [
  {
    icon: MapPinned,
    title: "Trung với nước",
    id: 'theory-nation',
    desc: "Tuyệt đối trung thành với Tổ quốc. Kiên định mục tiêu độc lập dân tộc và chủ nghĩa xã hội. Đặt lợi ích của đất nước lên trên hết. Sẵn sàng hy sinh vì sự nghiệp bảo vệ và xây dựng đất nước.",
    imageSrc: "/image/Picture15.jpg",
    imageAlt: "Minh hoa trung voi nuoc"
  },
  {
    icon: Languages,
    title: "Hiếu với dân",
    id: 'theory-nation',
    desc: "Nhân dân là chủ của đất nước. Mọi quyền lực đều thuộc về nhân dân. Cán bộ phải kính trọng, gần gũi và phục vụ nhân dân. Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh.",
    imageSrc: "/image/Picture13.jpg",
    imageAlt: "Minh hoa hieu voi dan"
  },
  {
    icon: Languages,
    title: "Cần, kiệm, liêm, chính, chí công vô tư",
    id: 'theory-nation',
    desc: "Đây là những phẩm chất đạo đức cơ bản của người cán bộ cách mạng. Theo Hồ Chí Minh, đây là phẩm chất cao nhất của đạo đức cách mạng.",
    imageSrc: "/image/Picture11.jpg",
    imageAlt: "Minh hoa can kiem liem chinh"
  },
  {
    icon: PartyPopper,
    title: "Thương yêu con người, sống có tình nghĩa",
    id: 'theory-nation',
    desc: "Yêu thương nhân dân lao động. Quan tâm đến người nghèo khổ, bị áp bức. Khoan dung với con người. Giúp đỡ nhau cùng tiến bộ. Đoàn kết, giúp đỡ đồng chí và đồng bào.",
    imageSrc: "/image/Picture17.jpg",
    imageAlt: "Minh hoa thuong yeu con nguoi"
  },
  {
    icon: PartyPopper,
    title: "Có tinh thần quốc tế trong sáng",
    id: 'theory-nation',
    desc: "Tinh thần quốc tế trong sáng thể hiện ở đoàn kết với nhân dân lao động và các dân tộc bị áp bức trên thế giới. Tôn trọng độc lập, chủ quyền của các quốc gia. Hợp tác hữu nghị vì hòa bình và tiến bộ xã hội.",
    imageSrc: "/image/Picture12.jpg",
    imageAlt: "Minh hoa tinh than quoc te"
  },
  {
    icon: PartyPopper,
    title: "Vai Trò",
    id: 'theory-nation',
    desc: "Hết lòng chăm lo đời sống nhân dân. Tôn trọng quyền làm chủ của nhân dân. Lắng nghe ý kiến của nhân dân. Chống quan liêu, hách dịch, xa dân.",
    imageSrc: "/image/Picture16.jpg",
    imageAlt: "Minh hoa vai tro"
  },
];

const TypesOfConnections = () => {
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center md:text-left">
              <h2 id="theory-nation" className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 italic">
                Quan điểm của Hồ Chí Minh về chuẩn mực đạo đức
              </h2>
              <p className="text-lg text-zinc-500 max-w-2xl md:max-w-none">
                Hồ Chí Minh kế thừa tư tưởng “trung quân ái quốc” của Nho giáo nhưng phát triển lên thành “trung với nước”. Trung ở đây không phải trung với vua mà là trung với Tổ quốc, với nhân dân.
              </p>
            </div>
            <div className="w-full">
              <img
                src="/image/Picture4.jpg"
                alt="Minh hoa dan toc"
                className="w-full rounded-3xl border border-zinc-200 shadow-lg object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {connections.map((c, idx) => {
            const isOpen = openIndexes.includes(idx);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border-2 transition-all bg-white border-soviet-red/20 hover:border-soviet-red/50 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full p-8 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`connection-panel-${idx}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm bg-soviet-orange">
                      <c.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-soviet-red">
                      {c.title}
                    </h3>
                  </div>
                  <span
                    className={`text-soviet-red text-2xl font-semibold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`connection-panel-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8">
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {c.desc}
                    </p>
                    <img
                      src={c.imageSrc}
                      alt={c.imageAlt}
                      className="mt-6 w-full rounded-2xl border border-zinc-200 shadow-md object-cover aspect-[4/3]"
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

export default TypesOfConnections;
