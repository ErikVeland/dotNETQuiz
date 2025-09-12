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
    'rgba(99, 102, 241, 0.12)',
    'rgba(168, 85, 247, 0.12)',
    'rgba(236, 72, 153, 0.12)',
    'rgba(16, 185, 129, 0.12)',
    'rgba(245, 158, 11, 0.12)',
    'rgba(239, 68, 68, 0.12)'
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
          backgroundRef.current.style.animation = `gradientFlow ${speed}s ease infinite`;
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
        animation: `gradientFlow ${speed}s ease infinite`,
      }}
    />
  );
};

export default AnimatedBackground;