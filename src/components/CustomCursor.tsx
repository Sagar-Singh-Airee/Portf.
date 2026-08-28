import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'view' | 'hover' | 'hidden';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorText = '',
  cursorVariant = 'default',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible || cursorVariant === 'hidden') {
    return null;
  }

  const isView = cursorVariant === 'view' || Boolean(cursorText);
  const isHover = cursorVariant === 'hover';

  return (
    <motion.div
      className="fixed pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-xs transition-colors duration-150"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        width: isView ? 76 : isHover ? 44 : 12,
        height: isView ? 76 : isHover ? 44 : 12,
        backgroundColor: isView
          ? 'rgba(5, 5, 5, 0.92)'
          : isHover
          ? 'rgba(255, 181, 46, 0.4)'
          : 'rgba(5, 5, 5, 0.85)',
        border: isView
          ? '1px solid rgba(255, 181, 46, 0.5)'
          : isHover
          ? '1px solid rgba(5, 5, 5, 0.2)'
          : 'none',
      }}
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 38,
        mass: 0.2,
      }}
    >
      {isView && (
        <span className="text-[10px] tracking-widest font-black uppercase text-[#FFB52E] select-none font-display">
          {cursorText || 'VIEW'}
        </span>
      )}
    </motion.div>
  );
};
