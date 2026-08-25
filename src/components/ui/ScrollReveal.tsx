import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 35, opacity: 0 };
      case 'down': return { y: -35, opacity: 0 };
      case 'left': return { x: 35, opacity: 0 };
      case 'right': return { x: -35, opacity: 0 };
      case 'none': return { opacity: 0 };
      default: return { y: 35, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
