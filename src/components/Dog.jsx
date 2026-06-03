import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Dog.css'

const PHRASES = [
  "This is fine.",
  "Everything is fine.",
  "I'm okay with the events that are unfolding currently.",
  "That's okay, things are going to be okay.",
  "It's fine. I'm fine.",
  "Totally normal Tuesday.",
  "At least it's warm in here.",
  "This is my life now.",
  "I don't smell smoke. Do you smell smoke?",
  "The fire adds ambiance.",
  "Room temperature is... rising.",
  "Cozy.",
  "Could be worse.",
  "It works on my machine.",
  "Just vibing.",
  "Nothing to see here.",
  "Situation: handled.",
  "We move.",
  "No cap, this is fine.",
  "Warming up nicely.",
]

export default function Dog() {
  const [phrase, setPhrase] = useState("This is fine.")
  const [showBubble, setShowBubble] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBubble(false)
      setTimeout(() => {
        setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)])
        setShowBubble(true)
      }, 200)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dog-scene">
      <AnimatePresence mode="wait">
        {showBubble && (
          <motion.div
            className="speech-bubble"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <span className="speech-text">{phrase}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="dog-character"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <img
          src="/banner.jpg"
          alt="$FINE - This is fine"
          className="meme-image"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
