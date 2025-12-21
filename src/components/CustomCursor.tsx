"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring spring
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't show on touch devices
  }

  return (
    <>
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-coral rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          left: -2,
          top: -2,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Bounding Box Corners (ML/CV inspired) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          left: -12,
          top: -12,
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1.5 : isClicking ? 0.8 : 1,
        }}
      >
        {/* Top Left */}
        <motion.div 
          className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2"
          animate={{ borderColor: isHovered ? "var(--accent-2)" : "var(--accent-1)" }}
        />
        {/* Top Right */}
        <motion.div 
          className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2"
          animate={{ borderColor: isHovered ? "var(--accent-2)" : "var(--accent-1)" }}
        />
        {/* Bottom Left */}
        <motion.div 
          className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2"
          animate={{ borderColor: isHovered ? "var(--accent-2)" : "var(--accent-1)" }}
        />
        {/* Bottom Right */}
        <motion.div 
          className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2"
          animate={{ borderColor: isHovered ? "var(--accent-2)" : "var(--accent-1)" }}
        />
      </motion.div>

      {/* Coordinate Label (Subtle) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] ml-4 mt-4"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible && !isHovered ? 0.4 : 0,
        }}
      >
        <span className="text-[8px] font-mono uppercase tracking-tighter bg-black text-white px-1">
          Target_Locked
        </span>
      </motion.div>
    </>
  );
}
