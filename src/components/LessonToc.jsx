import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const tocItems = [
  {
    title: 'Đạo đức là gì?',
    desc: 'Đạo đức là gốc của người cách mạng.',
    href: '/#theory-class',
    image: '/image/NgauNhienTatNhien.jpg',
    imageAlt: 'Minh hoa dao duc la goc',
    content:
      'Đạo đức là nền tảng tạo nên nhân cách, đặc biệt với cán bộ, đảng viên. Người nhấn mạnh đức là gốc, tạo sức mạnh nội sinh giúp vượt qua khó khăn và hoàn thành nhiệm vụ.',
  },
  {
    title: 'Quan điểm về Chuẩn mực đạo đức',
    desc: 'Trung với nước, hiếu với dân và tinh thần quốc tế.',
    href: '/#theory-nation',
    image: '/image/NgauNhienTatNhien.jpg',
    imageAlt: 'Minh hoa chuan muc dao duc',
    content:
      'Chuẩn mực đạo đức gồm trung với nước, hiếu với dân, cần kiệm liêm chính, chí công vô tư; thương yêu con người và có tinh thần quốc tế trong sáng.',
  },
  {
    title: 'Nguyên tắc xây dựng đạo đức cách mạng',
    desc: 'Những nguyên tắc xây dựng đạo đức cách mạng.',
    href: '/#theory-relationship',
    image: '/image/NgauNhienTatNhien.jpg',
    imageAlt: 'Minh hoa nguyen tac dao duc',
    content:
      'Nói đi đôi với làm; xây đi đôi với chống; tu dưỡng đạo đức suốt đời; kết hợp giáo dục với tự rèn luyện.',
  },
  {
    title: 'Xây dựng đạo đức',
    desc: 'Tu dưỡng và rèn luyện đạo đức suốt đời.',
    href: '/#theory-revolution',
    image: '/image/NgauNhienTatNhien.jpg',
    imageAlt: 'Minh hoa xay dung dao duc',
    content:
      'Đạo đức cách mạng được hình thành qua rèn luyện bền bỉ, tự phê bình, nêu gương và kiên trì sửa chữa khuyết điểm.',
  },
  {
    title: 'Ý nghĩa và tóm tắt',
    desc: 'Giá trị và ý nghĩa đối với thế hệ trẻ.',
    href: '/#theory-meaning',
    image: '/image/NgauNhienTatNhien.jpg',
    imageAlt: 'Minh hoa y nghia',
    content:
      'Tư tưởng đạo đức Hồ Chí Minh vẫn còn nguyên giá trị, giúp sinh viên hoàn thiện nhân cách và đóng góp tích cực cho xã hội.',
  },
];

const LessonToc = () => {
  const [activeItem, setActiveItem] = useState(null);

  const closeModal = () => setActiveItem(null);

  return (
    <section className="relative py-20 px-6 bg-zinc-50 border-b-4 border-soviet-red">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-soviet-red/10 text-soviet-red font-bold text-xs uppercase tracking-widest mb-4">
            Mục lục bài học
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-soviet-red">
            5 phần nội dung chính
          </h2>
          <div className="w-24 h-2 bg-soviet-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tocItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button
                type="button"
                onClick={() => setActiveItem(item)}
                className="text-left block w-full h-full rounded-2xl bg-white border-2 border-zinc-100 p-6 shadow-sm hover:shadow-xl hover:border-soviet-red/40 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-soviet-red text-white flex items-center justify-center font-black italic">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-900 group-hover:text-soviet-red transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-2xl border-2 border-soviet-red/20"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-toc-title"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-soviet-red text-white flex items-center justify-center font-black italic">
                  {tocItems.findIndex((item) => item.title === activeItem.title) + 1}
                </span>
                <h3 id="lesson-toc-title" className="text-xl font-bold uppercase tracking-wide text-soviet-red">
                  {activeItem.title}
                </h3>
              </div>
            </div>
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-72px)]">
              <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] items-start">
                <div>
                  <p className="text-zinc-700 leading-relaxed text-base">
                    {activeItem.content}
                  </p>
                </div>
                <div className="w-full">
                  <img
                    src={activeItem.image}
                    alt={activeItem.imageAlt}
                    className="w-full rounded-2xl border border-zinc-200 shadow-lg object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={activeItem.href}
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-full bg-soviet-red px-5 py-2 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:bg-soviet-orange transition-colors"
                >
                  Xem chi tiết
                </Link>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-full border-2 border-soviet-red/20 px-5 py-2 text-sm font-bold uppercase tracking-widest text-soviet-red hover:border-soviet-red"
                >
                  Đóng
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default LessonToc;
