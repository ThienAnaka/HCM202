import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Users2, Landmark } from 'lucide-react';

const items = [
  {
    icon: Users2,
    title: 'Nói đi đôi với làm, phải nêu gương về đạo đức',
    id: 'theory-revolution',
    desc: 'Lời nói phải đi đôi với việc làm.Nói mà không làm sẽ làm mất lòng tin của nhân dân.Người cán bộ phải làm gương cho quần chúng.',
    imageSrc: '/image/Picture18.jpg',
    imageAlt: 'Minh hoa noi di doi voi lam'
  },
  {
    icon: Scale,
    title: 'Xây đi đôi với chống',
    id: 'theory-revolution',
    desc: 'Theo Hồ Chí Minh, xây và chống phải tiến hành đồng thời, trong đó xây là cơ bản, lâu dài. Muốn xây dựng đạo đức mới phải đồng thời chống lại cái xấu, cái ác và các biểu hiện tiêu cực.',
    imageSrc: '/image/Picture19.jpg',
    imageAlt: 'Minh hoa xay di doi voi chong'
  },
  {
    icon: ShieldCheck,
    title: 'Phải tu dưỡng đạo đức suốt đời',
    id: 'theory-revolution',
    desc: 'Thường xuyên tự phê bình và phê bình.Không ngừng học tập và rèn luyện.Kiên trì sửa chữa khuyết điểm.Giữ gìn phẩm chất đạo đức trong mọi hoàn cảnh.',
    imageSrc: '/image/Picture20.jpg',
    imageAlt: 'Minh hoa tu duong dao duc'
  },
  {
    icon: Landmark,
    id: 'theory-revolution',
    title: 'Kết hợp giữa giáo dục và tự rèn luyện',
    desc: 'Theo tư tưởng của Hồ Chí Minh, đạo đức cách mạng không tự nhiên mà có. Nó được hình thành thông qua giáo dục và đặc biệt là sự tự rèn luyện của mỗi cá nhân.',
    imageSrc: '/image/Picture21.jpg',
    imageAlt: 'Minh hoa giao duc va tu ren luyen'
  }
];

const DialecticalCategories = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (index) => {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index]
    );
  };

  return (
    <section className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center md:text-left">
              <h2 id="theory-relationship" className="text-4xl md:text-6xl font-black text-soviet-red mb-6 uppercase tracking-tighter italic">
                Những nguyên tắc xây dựng đạo đức cách mạng
              </h2>
              <div className="h-2 w-24 bg-soviet-gold mx-auto md:mx-0 mb-8 rounded-full" />
              <p className="text-lg text-zinc-500 max-w-3xl md:max-w-none font-medium">
                Giai cấp và dân tộc vừa gắn bó chặt chẽ, vừa có những thời điểm mâu thuẫn tùy theo điều kiện lịch sử cụ thể.
              </p>
            </div>
            <div className="w-full">
              <img
                src="/image/Picture22.jpg"
                alt="Minh hoa quan he giai cap dan toc"
                className="w-full rounded-3xl border border-zinc-200 shadow-lg object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndexes.includes(index);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border-2 border-zinc-100 shadow-sm hover:shadow-2xl hover:border-soviet-red/30 transition-all duration-500"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full p-8 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`dialectic-panel-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-soviet-red/10 text-soviet-red flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 id={item.id} className="text-2xl font-black text-zinc-800 uppercase tracking-tight">
                      {item.title}
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
                  id={`dialectic-panel-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8">
                    <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
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

export default DialecticalCategories;
