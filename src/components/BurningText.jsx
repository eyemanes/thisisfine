import { motion } from 'framer-motion'
import './BurningText.css'

export default function BurningText({ text, isPanic }) {
  const letters = text.split('')

  return (
    <h1 className={`burning-title ${isPanic ? 'panic' : ''}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className={`fire-letter ${letter === ' ' ? 'space' : ''}`}
          animate={isPanic ? {
            y: [0, -5, 0, 5, 0],
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.1, 0.9, 1.1, 1],
          } : {
            y: [0, Math.sin(i) * -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: isPanic ? 0.3 : 2,
            delay: i * 0.08,
            ease: 'easeInOut',
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </h1>
  )
}
