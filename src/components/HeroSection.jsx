import React from 'react';
import { motion } from 'framer-motion';
import NetworkBackground from './NetworkBackground';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden border-b-8 border-soviet-red">
      <NetworkBackground />
      
      <div className="z-10 text-center px-4 max-w-5xl -mt-8 md:-mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-5xl font-bold tracking-tighter text-soviet-red mb-6 uppercase leading-[1]">
            Quan điểm của Hồ Chí Minh <br /> <span className="text-soviet-orange">về vai trò và sức mạnh của đạo đức</span>
          </h1>
          <div className="h-2 w-48 bg-soviet-gold mx-auto mb-10 shadow-sm rounded-full" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-2xl md:text-4xl font-serif italic text-zinc-700 leading-tight max-w-4xl mx-auto"
        >
          "Đạo đức là “gốc” của người cách mạng, là nền tảng của sự nghiệp cách mạng, là sức mạnh nội sinh để con người vượt qua mọi khó khăn, thử thách, hoàn thành sứ mệnh lịch sử của mình."
          <footer className="mt-8 text-sm md:text-xl font-sans uppercase tracking-[0.3em] text-soviet-red font-black not-italic">
            — Hồ Chí Minh —
          </footer>
        </motion.blockquote>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
