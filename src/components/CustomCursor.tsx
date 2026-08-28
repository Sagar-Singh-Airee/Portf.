import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'view' | 'hover' | 'hidden';
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorText = '',
  cursorVariant = 'default',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

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

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Clean up ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (isTouchDevice || !isVisible || cursorVariant === 'hidden') {
    return null;
  }

  const isView = cursorVariant === 'view' || Boolean(cursorText);
  const isHover = cursorVariant === 'hover';

  return (
    <>
      {/* Click Shockwave Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 rounded-full border border-[#FFB52E]"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Layer 1: Outer Spring Ring with Viewfinder / Label */}
      <motion.div
        className="fixed pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full select-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isView ? 82 : isHover ? 48 : 28,
          height: isView ? 82 : isHover ? 48 : 28,
          backgroundColor: isView
            ? 'rgba(5, 5, 5, 0.94)'
            : isHover
            ? 'rgba(255, 181, 46, 0.25)'
            : 'rgba(5, 5, 5, 0.05)',
          borderColor: isView
            ? '#FFB52E'
            : isHover
            ? '#FFB52E'
            : 'rgba(5, 5, 5, 0.35)',
          borderWidth: isView ? '1.5px' : '1px',
          boxShadow: isView
            ? '0 0 20px rgba(255, 181, 46, 0.4)'
            : isHover
            ? '0 0 12px rgba(255, 181, 46, 0.25)'
            : 'none',
        }}
        transition={{
          type: 'spring',
          stiffness: isView ? 450 : 380,
          damping: 28,
          mass: 0.35,
        }}
      >
        {isView && (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[9px] tracking-widest font-mono font-black uppercase text-[#FFB52E]">
              {cursorText || 'INSPECT'}
            </span>
            <div className="w-1 h-1 rounded-full bg-[#FFB52E] mt-0.5" />
          </div>
        )}
      </motion.div>

      {/* Layer 2: Tight Precision Center Dot */}
      <motion.div
        className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isView ? 0 : 5,
          height: isView ? 0 : 5,
          backgroundColor: isHover ? '#FFB52E' : '#050505',
          opacity: isView ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1200,
          damping: 45,
          mass: 0.1,
        }}
      />
    </>
  );
};
