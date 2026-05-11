import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Petal = ({ delay, duration, x, size, rotation, color }) => {
  return (
    <motion.div
      initial={{ 
        top: "-10%", 
        left: `${x}%`, 
        opacity: 0, 
        rotate: 0 
      }}
      animate={{ 
        top: "110%", 
        left: `${x + (Math.random() * 20 - 10)}%`, 
        opacity: [0, 1, 1, 0],
        rotate: rotation 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay, 
        ease: "linear" 
      }}
      className="absolute pointer-events-none z-[1]"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "100% 0% 100% 30%",
        filter: "blur(1px)",
      }}
    />
  );
};

const FallingFlowers = () => {
  const petals = useMemo(() => {
    const colors = ['#da251d', '#ffcd00', '#fecaca', '#fca5a5'];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
      x: Math.random() * 100,
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360 + 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} />
      ))}
    </div>
  );
};

export default FallingFlowers;
