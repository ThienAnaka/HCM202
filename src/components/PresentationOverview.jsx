import React from 'react';
import { motion } from 'framer-motion';
import { Users, ListOrdered, BookOpen, Cpu, MessageSquare, PenTool, Terminal, Book } from 'lucide-react';

const PresentationOverview = () => {
  const members = [
    { name: "Nguyễn Đức Thiên Ân", id: "SE182633" },
    { name: "Nguyễn Phi Khanh", id: "SE183527" },
    { name: "Hạ Cao Thanh Trúc", id: "SE180264" },
    { name: "Trần Mạnh Tú", id: "SE181566" },
  ];

  const outline = [
    { title: "Giai cấp là gì?", desc: "Định nghĩa của Lênin, đặc trưng, nguồn gốc và đấu tranh giai cấp." },
    { title: "Dân tộc là gì?", desc: "Định nghĩa, hai nghĩa của dân tộc, đặc trưng và vai trò." },
    { title: "Quan hệ giữa giai cấp và dân tộc", desc: "Mối quan hệ vừa thống nhất vừa mâu thuẫn trong xã hội." },
    { title: "Trong cách mạng Việt Nam", desc: "Kết hợp giải phóng dân tộc với giải phóng giai cấp theo Hồ Chí Minh." },
    { title: "Ý nghĩa và tóm tắt", desc: "Rút ra ý nghĩa nhận thức, thực tiễn và phần tóm tắt trọng tâm." },
  ];

  const tools = [
    { name: "Nội dung", icon: <Book className="w-6 h-6" />, color: "bg-blue-500", desc: "Tổng hợp theo đúng dàn ý giai cấp và dân tộc" },
    { name: "Diễn giải", icon: <MessageSquare className="w-6 h-6" />, color: "bg-emerald-500", desc: "Biến ý chính thành nội dung dễ học, dễ nhớ" },
    { name: "Thiết kế", icon: <PenTool className="w-6 h-6" />, color: "bg-purple-500", desc: "Trình bày lại nội dung thành giao diện thuyết trình" },
    { name: "Biên tập", icon: <Terminal className="w-6 h-6" />, color: "bg-sky-500", desc: "Chỉnh sửa các section và điều hướng trong web" },
    { name: "Hệ thống hóa", icon: <Cpu className="w-6 h-6" />, color: "bg-orange-500", desc: "Tạo sơ đồ tư duy và mạch học tập liên kết" },
  ];

  return (
    <section id="overview" className="min-h-screen py-32 px-6 bg-zinc-50 text-zinc-800 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.05)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-soviet-red/10 text-soviet-red font-bold text-sm uppercase tracking-widest mb-4">
            Môn học: Triết học Mác – Lênin
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic text-soviet-red">
            Tổng quan <span className="text-zinc-800">Bài học</span>
          </h2>
          <p className="text-xl font-medium text-zinc-500 mb-8">
            Chủ đề: <span className="text-zinc-900 font-bold underline decoration-soviet-red underline-offset-4">Giai cấp và dân tộc</span>
          </p>
          <div className="w-24 h-2 bg-soviet-red mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Section 1: Team Members */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
              <h3 className="text-2xl font-bold flex items-center gap-4 uppercase tracking-widest text-soviet-red">
              <Users className="w-8 h-8" /> Thành viên thực hiện
            </h3>
            <div className="space-y-4">
              {members.map((member) => (
                <div 
                  key={member.id}
                  className="p-6 bg-white border-2 border-zinc-100 border-l-soviet-red hover:border-soviet-red transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
                >
                  <div className="text-xl font-bold text-zinc-900 group-hover:text-soviet-red transition-colors">{member.name}</div>
                  <div className="text-soviet-red font-mono font-bold tracking-tighter text-lg">{member.id}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 2: Outline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
              <h3 className="text-2xl font-bold flex items-center gap-4 uppercase tracking-widest text-soviet-red">
              <ListOrdered className="w-8 h-8" /> Nội dung bài học
            </h3>
            <div className="space-y-6">
              {outline.map((item, index) => (
                <div key={index} className="flex gap-6 relative group">
                  <div className="flex-none w-12 h-12 rounded-full bg-soviet-red text-white flex items-center justify-center text-xl font-black italic shadow-lg shadow-soviet-red/20 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  {index !== outline.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-zinc-200" />
                  )}
                  <div className="pb-8">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-soviet-orange transition-colors uppercase text-zinc-800">{item.title}</h4>
                    <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 3: Appendix - Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Cpu className="w-32 h-32" />
          </div>
          
          <h3 className="text-2xl font-bold text-center uppercase tracking-widest text-zinc-400 mb-12">
            Phụ lục: Cách triển khai nội dung
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {tools.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center group text-center">
                <div className={`w-16 h-16 rounded-2xl ${tool.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <div className="font-bold text-zinc-800 uppercase text-xs tracking-widest mb-2">{tool.name}</div>
                <p className="text-[10px] text-zinc-500 font-medium leading-tight px-2">{tool.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresentationOverview;
