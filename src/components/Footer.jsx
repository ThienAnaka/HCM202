import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-white border-t-8 border-t-soviet-red text-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <blockquote className="text-4xl font-serif italic text-zinc-900 mb-16 relative inline-block">
          <span className="absolute -top-12 -left-12 text-9xl text-soviet-red opacity-10">"</span>
          Hiểu giai cấp để hiểu xã hội, hiểu dân tộc để hiểu cộng đồng.
          <span className="absolute -bottom-16 -right-12 text-9xl text-soviet-red opacity-10">"</span>
        </blockquote>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-16 border-t border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-soviet-red rounded-full flex items-center justify-center shadow-lg shadow-soviet-red/20">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <div className="text-left">
              <div className="text-soviet-red font-black text-sm uppercase tracking-widest">Giai Cấp &amp; Dân Tộc</div>
              <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">Học thuyết Mác - Lênin &copy; 2026</div>
            </div>
          </div>
          
          <div className="flex gap-12">
            {[
              { name: 'Lý thuyết', id: 'theory' },
              { name: 'Kết nối', id: 'connections' },
              { name: 'Quan hệ', id: 'dialectics' },
              { name: 'Thực tiễn', id: 'cases' }
            ].map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-zinc-500 hover:text-soviet-red font-black text-xs uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px]"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          <div className="px-6 py-2 bg-soviet-gold text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full shadow-md">
            Quan hệ xã hội và cộng đồng
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
