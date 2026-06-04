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

          <motion.a
            href="https://x.com/thisisfineusdc"
            target="_blank"
            rel="noopener noreferrer"
            className="x-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255,102,0,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="x-icon" fill="currentColor" width="18" height="18">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Follow @thisisfineusdc</span>
          </motion.a>
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
          <a
            href="https://x.com/thisisfineusdc"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-x-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @thisisfineusdc
          </a>
          <p className="footer-text">
            $FINE — when everything is on fire but you're still vibing
          </p>
          <p className="footer-sub">this is fine. the website is fine. you are fine. we are all fine.</p>
        </footer>
      </div>
    </>
  )
}
