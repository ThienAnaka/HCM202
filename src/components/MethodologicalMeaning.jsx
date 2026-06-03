import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

const meanings = [
  {
    title: "Rèn luyện lý tưởng sống đúng đắn.",
    desc: "Có trách nhiệm với gia đình, xã hội và đất nước. Trung thực trong học tập và thi cử.",
  },
  {
    title: "Có tinh thần đoàn kết và giúp đỡ người khác.",
    desc: "Không ngừng học tập, nâng cao tri thức và đạo đức. Chống lối sống thực dụng, ích kỷ và các tệ nạn xã hội.",
  },
  {
    title: "Học tập và làm theo tư tưởng, đạo đức Hồ Chí Minh",
    desc: "Việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh giúp sinh viên hoàn thiện nhân cách, trở thành công dân tốt và đóng góp tích cực cho xã hội.",
  },
];

const MethodologicalMeaning = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (index) => {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index]
    );
  };

  return (
    <section className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          <div className="w-full md:w-1/2">
            <h2 id="theory-meaning" className="text-4xl md:text-6xl font-bold text-soviet-red mb-8 uppercase tracking-tighter italic">
              Ý Nghĩa
            </h2>
            <div className="h-2 w-24 bg-soviet-gold mb-8 shadow-sm" />
            <p className="text-xl text-zinc-600 leading-relaxed font-medium">
              Trong giai đoạn hiện nay, tư tưởng Hồ Chí Minh về đạo đức vẫn giữ nguyên giá trị và có ý nghĩa rất lớn đối với thế hệ trẻ, đặc biệt là sinh viên.
            </p>
            <div className="mt-10">
              <img
                src="/image/Picture10.jpg"
                alt="Minh hoa y nghia"
                className="w-full rounded-3xl border border-zinc-200 shadow-lg object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            {meanings.map((m, i) => {
              const isOpen = openIndexes.includes(i);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.2 }}
                  className="rounded-2xl bg-white border-2 border-soviet-red/10 hover:border-soviet-red/40 shadow-xl transition-all"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(i)}
                    className="w-full p-8 text-left flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`meaning-panel-${i}`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="bg-soviet-red/5 p-3 rounded-xl shadow-inner">
                        <CircleCheck className="w-8 h-8 text-soviet-red shrink-0" />
                      </div>
                      <h4 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight">
                        {m.title}
                      </h4>
                    </div>
                    <span
                      className={`text-soviet-red text-2xl font-semibold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`meaning-panel-${i}`}
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-8 pb-8">
                      <p className="text-zinc-500 leading-relaxed font-medium">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologicalMeaning;
