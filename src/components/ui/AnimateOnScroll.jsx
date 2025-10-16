// src/components/ui/AnimateOnScroll.jsx

import React from 'react';
import { motion } from 'framer-motion';

const AnimateOnScroll = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start hidden and 50px down
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
      viewport={{ once: true }} // Only animate once
      transition={{ duration: 0.8, ease: 'easeInOut' }} // Animation timing
      className={className} // Pass through any additional classes
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;