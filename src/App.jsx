import { motion } from 'framer-motion'
import { useFireCanvas } from './hooks/useFireCanvas'
import BurningText from './components/BurningText'
import Dog from './components/Dog'
import BurningEdges from './components/BurningEdges'
import FloatingEmbers from './components/FloatingEmbers'
import DisasterTicker from './components/DisasterTicker'
import TokenData from './components/TokenData'
import './App.css'

export default function App() {
  const { canvasRef } = useFireCanvas(2)

  return (
    <>
      <canvas ref={canvasRef} className="fire-canvas" />
      <BurningEdges isPanic={false} />
      <FloatingEmbers count={20} isPanic={false} />

      <div className="app-container">

        {/* Top ticker */}
        <DisasterTicker />

        {/* Hero */}
        <header className="hero">
          <motion.div
            className="pfp-wrapper"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          >
            <img src="/pfps.jpg" alt="$FINE" className="pfp-image" />
          </motion.div>

          <BurningText text="$FINE" isPanic={false} />

          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            everything is on fire. this is fine.
          </motion.p>
        </header>

        {/* Banner */}
        <motion.section
          className="banner-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Dog />
        </motion.section>

        {/* Live Token Data */}
        <motion.section
          className="token-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <TokenData />
        </motion.section>

        {/* Marquee quotes */}
        <motion.section
          className="vibes-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="vibes-marquee">
            <motion.div
              className="vibes-track"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ x: { repeat: Infinity, duration: 25, ease: 'linear' } }}
            >
              {[...Array(2)].map((_, j) => (
                <span key={j} className="vibes-repeat">
                  THIS IS FINE • $FINE • EVERYTHING IS FINE • WE'RE ALL GONNA MAKE IT • THIS IS FINE • NOTHING TO SEE HERE • VIBES ONLY •&nbsp;
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-flames">
            {'🔥'.repeat(25)}
          </div>
          <p className="footer-text">
            $FINE — when everything is on fire but you're still vibing
          </p>
          <p className="footer-sub">this is fine. the website is fine. you are fine. we are all fine.</p>
        </footer>
      </div>
    </>
  )
}
