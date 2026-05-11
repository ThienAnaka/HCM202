import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const connections = [
  {
    id: 'internal',
    title: 'Liên Hệ Bên Trong',
    subtitle: 'Bản Chất Cốt Lõi',
    content: 'Các mối liên hệ nằm ngay trong bản thân sự vật, quy định bản chất nền tảng và thúc đẩy sự phát triển của nó. Đây là động lực chính của sự thay đổi.'
  },
  {
    id: 'necessary',
    title: 'Liên Hệ Tất Nhiên',
    subtitle: 'Sự Kết Nối Tất Yếu',
    content: 'Các quan hệ nảy sinh tất yếu từ bản chất của các sự vật liên quan. Chúng được quyết định bởi các quy luật tồn tại và không thể khác đi.'
  },
  {
    id: 'essential',
    title: 'Liên Hệ Bản Chất',
    subtitle: 'Liên Kết Nền Tảng',
    content: 'Những mắt xích quan trọng cho sự tồn tại của hiện tượng. Thiếu đi những liên kết này, sự vật sẽ mất đi bản sắc và chuyển hóa thành thứ khác.'
  }
];

const ConnectionTypes = () => {
  const [active, setActive] = useState(connections[0]);

  return (
    <section className="py-24 px-6 bg-zinc-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-soviet-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-16 text-center tracking-tight">Các Loại Hình Liên Hệ</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {connections.map((conn) => (
              <button
                key={conn.id}
                onClick={() => setActive(conn)}
                className={`text-left p-6 rounded-xl transition-all duration-500 border-2 ${
                  active.id === conn.id 
                    ? 'bg-white border-soviet-red text-soviet-red shadow-md scale-105' 
                    : 'bg-white/50 border-zinc-200 text-zinc-500 hover:border-zinc-300'
                }`}
              >
                <div className="text-xs uppercase tracking-widest mb-1 opacity-60 font-bold">{conn.subtitle}</div>
                <div className="text-xl font-bold">{conn.title}</div>
              </button>
            ))}
          </div>

          <div className="w-full lg:w-2/3 h-[300px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-2 border-zinc-100 p-10 rounded-2xl h-full flex flex-col justify-center shadow-sm"
              >
                <h3 className="text-3xl font-bold text-soviet-red mb-6">{active.title}</h3>
                <p className="text-xl text-zinc-700 leading-relaxed italic border-l-4 border-soviet-gold pl-6">
                  "{active.content}"
                </p>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-soviet-gold"
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectionTypes;
