import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Droplets, CircleAlert } from 'lucide-react';

const PracticalCases = () => {
  const [co2, setCo2] = useState(400);

  const getTemp = (val) => ((val - 400) * 0.05).toFixed(1);

  return (
    <section className="py-24 px-6 bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-20 text-center tracking-tight">Biểu Hiện Thực Tiễn</h2>

        <div className="mb-32">
          <h3 className="text-2xl font-bold text-soviet-red mb-10 flex items-center gap-3">
            <CircleAlert className="w-6 h-6" /> Xung Đột Lợi Ích Xã Hội
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white border-2 border-zinc-100 shadow-sm">
                <label className="block text-zinc-500 mb-6 uppercase tracking-widest text-xs font-bold">Mô phỏng mức độ căng thẳng xã hội</label>
                <input 
                  type="range" 
                  min="400" 
                  max="600" 
                  value={co2} 
                  onChange={(e) => setCo2(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-soviet-red"
                />
                <div className="flex justify-between mt-6 text-zinc-900 font-bold text-xl">
                  <span>{co2}%</span>
                  <span className="text-soviet-red">+{getTemp(co2)} điểm</span>
                </div>
              </div>

              <div className="relative pt-4">
                {[
                  { icon: <Wind />, label: "Mâu thuẫn âm ỉ", color: "text-zinc-400" },
                  { icon: <Droplets />, label: "Yêu cầu đoàn kết", color: "text-blue-500" },
                  { icon: <Thermometer />, label: "Chính sách phù hợp", color: "text-cyan-500" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: [0, 8, 0], opacity: co2 > 450 ? 1 : 0.6 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className={`p-4 rounded-xl bg-white shadow-sm border border-zinc-100 ${item.color}`}>{item.icon}</div>
                    <div className="h-0.5 flex-1 bg-zinc-200" />
                    <span className="text-zinc-700 font-bold uppercase text-xs tracking-widest">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl border-2 border-soviet-gold/30 shadow-lg relative">
              <div className="absolute -top-4 -left-4 bg-soviet-gold text-white p-2 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md">Phân tích</div>
              <h4 className="text-zinc-900 font-bold mb-4 italic text-lg">Mối liên hệ xã hội:</h4>
              <p className="text-zinc-600 leading-relaxed text-lg">
                Các vấn đề xã hội không tồn tại đơn lẻ mà luôn gắn với <span className="text-soviet-red font-bold">quan hệ giai cấp - dân tộc</span>. 
                Khi điều kiện lịch sử thay đổi, cách giải quyết cũng phải thay đổi theo để giữ được ổn định và đoàn kết.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm border-l-8 border-l-soviet-red">
            <h4 className="text-zinc-900 font-bold text-xl mb-4">Trong chiến tranh</h4>
            <p className="text-zinc-600 leading-relaxed">
              Lợi ích dân tộc trở thành điểm quy tụ lớn nhất, làm nền tảng để huy động mọi giai cấp, tầng lớp vào nhiệm vụ chống xâm lược.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm border-l-8 border-l-soviet-gold">
            <h4 className="text-zinc-900 font-bold text-xl mb-4">Trong hòa bình</h4>
            <p className="text-zinc-600 leading-relaxed">
              Mâu thuẫn giai cấp và các chính sách phân phối lợi ích sẽ nổi bật hơn, đòi hỏi cách nhìn đúng để giữ ổn định xã hội và phát triển bền vững.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalCases;
