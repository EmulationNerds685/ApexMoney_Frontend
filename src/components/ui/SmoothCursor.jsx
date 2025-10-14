// src/components/ui/SmoothCursor.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react'; // 1. Import an arrow icon

const SmoothCursor = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = React.useState("default");

  React.useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer') {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const variants = {
    // 2. Adjust the variants for the arrow's shape and position
    default: {
      x: mousePosition.x, // The tip of the arrow will be at the cursor
      y: mousePosition.y,
      scale: 1,
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.8, // Slightly shrink the arrow on hover for a subtle effect
    },
  };

  return (
    // 3. Replace the old div with a wrapper containing the icon
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 800, // Increase stiffness for a more responsive feel
        damping: 40,
        restDelta: 0.001
      }}
    >
      <MousePointer2 className="h-6 w-6 text-black" />
    </motion.div>
  );
};

export default SmoothCursor;