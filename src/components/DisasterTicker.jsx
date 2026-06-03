import { motion } from 'framer-motion'
import './DisasterTicker.css'

const DISASTERS = [
  "🔥 Server room on fire",
  "📉 Portfolio down 99%",
  "💀 Production is dead",
  "🚨 404: Calmness not found",
  "⚠️ npm install failed again",
  "🔥 Kitchen is burning",
  "📊 Metrics are screaming",
  "💣 Deadline was yesterday",
  "🧯 Fire extinguisher also on fire",
  "📱 Users are rioting",
  "🔥 Everything is literally on fire",
  "🐛 Critical bug in prod",
  "💸 Budget evaporated",
  "🔥 The cloud is on fire",
  "⏰ Sprint ended 3 days ago",
  "🔥 WiFi router melting",
  "📧 10,000 unread emails",
  "🔥 Coffee machine exploded",
  "🪦 CI/CD pipeline deceased",
  "🔥 This room is on fire",
]

export default function DisasterTicker() {
  const doubled = [...DISASTERS, ...DISASTERS]

  return (
    <div className="ticker-wrapper">
      <div className="ticker-label">BREAKING NEWS</div>
      <div className="ticker-track">
        <motion.div
          className="ticker-content"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { repeat: Infinity, duration: 40, ease: 'linear' },
          }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot">•</span>
              <span className="ticker-fine">this is fine</span>
              <span className="ticker-dot">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
