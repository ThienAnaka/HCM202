import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-soviet-offwhite via-white to-soviet-gold/10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-12 text-soviet-red tracking-tight text-center">
            Tóm Tắt Nội Dung
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-b from-soviet-red via-soviet-red to-soviet-gold rounded-lg shadow-2xl border-4 border-soviet-gold p-8 mb-4 max-w-xs mx-auto text-white">
                <p className="text-4xl font-black">I</p>
                <p className="text-sm font-bold uppercase tracking-[0.3em] mt-4">Giai cấp</p>
              </div>
              <p className="text-xl font-black text-soviet-red">Định nghĩa, đặc trưng, nguồn gốc</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-soviet-offwhite rounded-lg shadow-2xl p-12 border-4 border-soviet-gold"
            >
              <p className="text-3xl md:text-4xl font-black italic text-soviet-red mb-8 leading-relaxed">
                "Giai cấp là những tập đoàn người lớn..."
              </p>
              <p className="text-xl text-zinc-600 font-bold">— V. I. Lênin</p>
              <p className="text-sm text-zinc-500 mt-6 italic">
                Trọng tâm của phần mở đầu về giai cấp
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="bg-white rounded-lg shadow-2xl p-8 border-4 border-soviet-red">
          <div className="bg-gradient-to-br from-soviet-red via-soviet-red to-soviet-gold rounded-lg shadow-2xl overflow-hidden border-4 border-soviet-gold aspect-video">
            <video 
              controls 
              className="w-full h-full object-cover"
              poster="/image/video-poster.jpg"
            >
              <source src="/image/video AI.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video HTML5.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
