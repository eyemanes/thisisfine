import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TokenData.css'

const CONTRACT = 'CPV5kijeSj5ns5vWgH7attMfhKGQLaen2wXeqCDjpump'
const API_URL = `https://api.dexscreener.com/tokens/v1/solana/${CONTRACT}`
const DEXSCREENER_URL = 'https://dexscreener.com/solana/FpNwUnr27PjcX2dAfmzzybseHRcnKPsyHhEbXnPBLJ91'

function formatNumber(num) {
  if (!num && num !== 0) return '—'
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`
  return `$${num.toFixed(2)}`
}

function formatPrice(price) {
  if (!price) return '—'
  const num = parseFloat(price)
  if (num < 0.0001) return `$${num.toFixed(8)}`
  if (num < 0.01) return `$${num.toFixed(6)}`
  if (num < 1) return `$${num.toFixed(4)}`
  return `$${num.toFixed(2)}`
}

function PriceChange({ value, label }) {
  if (value === null || value === undefined) return null
  const isPositive = value >= 0
  return (
    <div className={`price-change ${isPositive ? 'up' : 'down'}`}>
      <span className="change-label">{label}</span>
      <span className="change-value">
        {isPositive ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
      </span>
    </div>
  )
}

export default function TokenData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [prevPrice, setPrevPrice] = useState(null)
  const [priceFlash, setPriceFlash] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(API_URL)
      const json = await res.json()
      const pair = Array.isArray(json) ? json[0] : json
      if (pair) {
        setData(prev => {
          if (prev) {
            const oldPrice = parseFloat(prev.priceUsd)
            const newPrice = parseFloat(pair.priceUsd)
            if (oldPrice !== newPrice) {
              setPrevPrice(oldPrice)
              setPriceFlash(newPrice > oldPrice ? 'up' : 'down')
              setTimeout(() => setPriceFlash(null), 1200)
            }
          }
          return pair
        })
        setLastUpdate(new Date())
      }
    } catch (err) {
      console.error('DexScreener fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [fetchData])

  if (loading) {
    return (
      <div className="token-data">
        <div className="token-loading">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Loading $FINE data...
          </motion.span>
        </div>
      </div>
    )
  }

  if (!data) return null

  const txns24h = data.txns?.h24 ? data.txns.h24.buys + data.txns.h24.sells : 0
  const txns1h = data.txns?.h1 ? data.txns.h1.buys + data.txns.h1.sells : 0

  return (
    <div className="token-data">
      <div className="token-header-row">
        <div className="token-name-block">
          <span className="token-symbol">$FINE</span>
          <span className="token-fullname">This is Fine</span>
        </div>
        <a
          href={DEXSCREENER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="dex-link"
        >
          <span className="dex-live-dot" />
          Live on DexScreener
        </a>
      </div>

      {/* Price */}
      <div className={`price-hero ${priceFlash || ''}`}>
        <AnimatePresence mode="wait">
          <motion.span
            className="price-value"
            key={data.priceUsd}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formatPrice(data.priceUsd)}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Price changes */}
      <div className="price-changes-row">
        <PriceChange value={data.priceChange?.m5} label="5m" />
        <PriceChange value={data.priceChange?.h1} label="1h" />
        <PriceChange value={data.priceChange?.h6} label="6h" />
        <PriceChange value={data.priceChange?.h24} label="24h" />
      </div>

      {/* Stats grid */}
      <div className="token-stats-grid">
        <div className="token-stat">
          <span className="token-stat-label">Market Cap</span>
          <span className="token-stat-value">{formatNumber(data.marketCap)}</span>
        </div>
        <div className="token-stat">
          <span className="token-stat-label">24h Volume</span>
          <span className="token-stat-value">{formatNumber(data.volume?.h24)}</span>
        </div>
        <div className="token-stat">
          <span className="token-stat-label">Liquidity</span>
          <span className="token-stat-value">{formatNumber(data.liquidity?.usd)}</span>
        </div>
        <div className="token-stat">
          <span className="token-stat-label">FDV</span>
          <span className="token-stat-value">{formatNumber(data.fdv)}</span>
        </div>
      </div>

      {/* Txns */}
      <div className="txns-row">
        <div className="txn-block">
          <span className="txn-label">24h Txns</span>
          <span className="txn-value">{txns24h.toLocaleString()}</span>
          <div className="txn-split">
            <span className="txn-buys">🟢 {data.txns?.h24?.buys?.toLocaleString()}</span>
            <span className="txn-sells">🔴 {data.txns?.h24?.sells?.toLocaleString()}</span>
          </div>
        </div>
        <div className="txn-block">
          <span className="txn-label">1h Txns</span>
          <span className="txn-value">{txns1h.toLocaleString()}</span>
          <div className="txn-split">
            <span className="txn-buys">🟢 {data.txns?.h1?.buys?.toLocaleString()}</span>
            <span className="txn-sells">🔴 {data.txns?.h1?.sells?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Contract */}
      <div className="contract-row">
        <span className="contract-label">CA:</span>
        <span className="contract-addr">{CONTRACT.slice(0, 6)}...{CONTRACT.slice(-4)}</span>
        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(CONTRACT)}
        >
          📋
        </button>
      </div>

      {lastUpdate && (
        <div className="last-update">
          updates every 15s • {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}
