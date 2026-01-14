import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleEffectProps {
  color?: string;
  count?: number;
}

export function ParticleEffect({ color = '#22c55e', count = 50 }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      });
    }
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: [
              `${particle.y}%`,
              `${particle.y - 30}%`,
              `${particle.y - 50}%`
            ],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      ))}
    </div>
  );
}
