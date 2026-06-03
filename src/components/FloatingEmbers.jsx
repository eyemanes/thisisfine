import { motion } from 'framer-motion'
import { useMemo } from 'react'
import './FloatingEmbers.css'

export default function FloatingEmbers({ count = 15, isPanic }) {
  const embers = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      size: Math.random() * 6 + 2,
      drift: (Math.random() - 0.5) * 200,
    })),
    [count]
  )

  return (
    <div className="floating-embers">
      {embers.map(ember => (
        <motion.div
          key={ember.id}
          className="ember"
          style={{
            left: `${ember.x}%`,
            width: ember.size,
            height: ember.size,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, ember.drift],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 0.8, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: isPanic ? ember.duration * 0.4 : ember.duration,
            delay: ember.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
