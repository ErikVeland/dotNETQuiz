'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  colors?: string[];
  speed?: number;
  blur?: number;
  opacity?: number;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  colors = [
    'rgba(99, 102, 241, 0.12)',   // indigo (blue)
    'rgba(168, 85, 247, 0.12)',   // purple
    'rgba(236, 72, 153, 0.12)',   // pink
    'rgba(16, 185, 129, 0.12)',   // green
    'rgba(245, 158, 11, 0.12)',   // yellow
    'rgba(239, 68, 68, 0.12)',    // red
    'rgba(59, 130, 246, 0.12)',   // blue
    'rgba(139, 92, 246, 0.12)',   // violet
    'rgba(251, 146, 60, 0.12)',   // orange
    'rgba(14, 165, 233, 0.12)'    // sky blue
  ],
  speed = 25,
  blur = 55,
  opacity = 0.77,
  className = ''
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundRef.current) {
      const updateGradient = () => {
        if (backgroundRef.current) {
          backgroundRef.current.style.background = `linear-gradient(
            45deg,
            ${colors.join(', ')}
          )`;
          backgroundRef.current.style.backgroundSize = '600% 600%';
          
          // Check if user prefers reduced motion
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          // Only animate if user doesn't prefer reduced motion
          if (!prefersReducedMotion) {
            backgroundRef.current.style.animation = `gradientFlow ${speed}s ease infinite`;
          } else {
            // Apply a static gradient when reduced motion is preferred
            backgroundRef.current.style.animation = 'none';
          }
          
          backgroundRef.current.style.filter = `blur(${blur}px)`;
          backgroundRef.current.style.opacity = `${opacity}`;
        }
      };

      updateGradient();
    }
  }, [colors, speed, blur, opacity]);

  return (
    <div 
      ref={backgroundRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{
        // Check if user prefers reduced motion
        animation: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
          ? 'none' 
          : `gradientFlow ${speed}s ease infinite`,
      }}
    />
  );
};

export default AnimatedBackground;