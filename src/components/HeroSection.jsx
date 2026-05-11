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
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-soviet-red mb-6 uppercase leading-[0.95]">
            Giai Cấp <br /> <span className="text-soviet-orange">&amp; Dân Tộc</span>
          </h1>
          <div className="h-2 w-48 bg-soviet-gold mx-auto mb-10 shadow-sm rounded-full" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-2xl md:text-4xl font-serif italic text-zinc-700 leading-tight max-w-4xl mx-auto"
        >
          "Giai cấp là cơ sở kinh tế, dân tộc là hình thức cộng đồng xã hội."
          <footer className="mt-8 text-sm md:text-xl font-sans uppercase tracking-[0.3em] text-soviet-red font-black not-italic">
            — Triết học Mác - Lênin
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-black">Khám phá cấu trúc xã hội</span>
          <div className="w-1 h-16 bg-gradient-to-b from-soviet-red via-soviet-gold to-transparent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
