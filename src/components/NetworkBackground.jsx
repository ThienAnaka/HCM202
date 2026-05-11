import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NetworkBackground = () => {
  const nodes = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 6,
    }));
  }, []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        if (dist < 22) {
          lines.push({ i, j, opacity: (22 - dist) / 22 });
        }
      }
    }
    return lines;
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map((conn, idx) => (
          <motion.line
            key={`line-${idx}`}
            x1={nodes[conn.i].x}
            y1={nodes[conn.i].y}
            x2={nodes[conn.j].x}
            y2={nodes[conn.j].y}
            stroke="#da251d"
            strokeWidth="0.08"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: conn.opacity }}
            transition={{ duration: 2, delay: idx * 0.005 }}
          />
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.x}
            cy={node.y}
            r={node.size / 12}
            fill="#ffcd00"
            stroke="#da251d"
            strokeWidth="0.05"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default NetworkBackground;
