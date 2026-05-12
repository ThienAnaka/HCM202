import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 'class', label: 'Nguyên tắc', x: 25, y: 50, color: '#008001' },
  { id: 'nation', label: 'Phẩm chất', x: 75, y: 50, color: '#008001' },
  { id: 'definition', label: 'Định nghĩa', x: 50, y: 20, color: '#f59e0b' },
  { id: 'origin', label: 'Rèn luyện', x: 15, y: 78, color: '#f59e0b' },
  { id: 'relation', label: 'Đời Sống Đạo Đức', x: 50, y: 78, color: '#f59e0b' },
  { id: 'meaning', label: 'Ý nghĩa', x: 85, y: 78, color: '#f59e0b' },
];

const links = [
  { source: 'definition', target: 'class' },
  { source: 'definition', target: 'nation' },
  { source: 'origin', target: 'class' },
  { source: 'origin', target: 'nation' },
  { source: 'relation', target: 'class' },
  { source: 'relation', target: 'nation' },
  { source: 'meaning', target: 'relation' },
];

const MindMap = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const isRelated = (nodeId) => {
    if (!hoveredNode) return false;
    if (hoveredNode === nodeId) return true;
    return links.some(link => 
      (link.source === hoveredNode && link.target === nodeId) ||
      (link.target === hoveredNode && link.source === nodeId)
    );
  };

  return (
    <section className="py-24 px-6 bg-soviet-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 tracking-tight uppercase">Sơ Đồ Tư Duy</h2>
        <div className="h-2 w-24 bg-soviet-gold mx-auto mb-8 rounded-full shadow-sm" />
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em]">Di chuột qua các nút để thấy các mối liên hệ chính của bài học</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="relative aspect-video max-w-5xl mx-auto bg-white rounded-[3rem] border-4 border-zinc-100 p-12 shadow-2xl"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {links.map((link, i) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            const active = hoveredNode === link.source || hoveredNode === link.target;
            
            return (
              <motion.line
                key={i}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={active ? '#da251d' : '#f4f4f5'}
                strokeWidth={active ? 0.8 : 0.4}
                transition={{ duration: 0.3 }}
              />
            );
          })}

          {nodes.map((node) => (
            <motion.g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isRelated(node.id) ? 6 : 4.5}
                fill={isRelated(node.id) ? node.color : 'white'}
                stroke={node.color}
                strokeWidth="1"
                animate={{
                  r: isRelated(node.id) ? 7 : 5,
                  strokeWidth: isRelated(node.id) ? 2 : 1,
                  fillOpacity: isRelated(node.id) ? 1 : 0.4
                }}
              />
              <text
                x={node.x}
                y={node.y + 12}
                textAnchor="middle"
                fill={isRelated(node.id) ? '#da251d' : '#a1a1aa'}
                fontSize="4"
                fontWeight="900"
                className="pointer-events-none select-none transition-colors duration-300 uppercase tracking-tight"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
};

export default MindMap;
