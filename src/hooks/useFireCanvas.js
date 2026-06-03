import { useEffect, useRef, useCallback } from 'react'

class Particle {
  constructor(x, y, opts = {}) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * (opts.spread || 3)
    this.vy = -(Math.random() * (opts.speed || 4) + 2)
    this.life = opts.life || Math.random() * 40 + 20
    this.maxLife = this.life
    this.size = opts.size || Math.random() * 6 + 2
    this.type = opts.type || 'fire'
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy -= 0.05
    this.vx *= 0.99
    this.life--
    this.size *= 0.98
  }

  draw(ctx) {
    const pct = this.life / this.maxLife
    let r, g, b, a

    if (this.type === 'ember') {
      r = 255
      g = Math.floor(100 * pct)
      b = 0
      a = pct * 0.8
      ctx.shadowBlur = 15
      ctx.shadowColor = `rgba(255, 80, 0, ${a})`
    } else if (this.type === 'smoke') {
      r = g = b = 40
      a = pct * 0.3
      ctx.shadowBlur = 0
    } else {
      if (pct > 0.7) {
        r = 255
        g = 255
        b = Math.floor(200 * (pct - 0.7) / 0.3)
      } else if (pct > 0.4) {
        r = 255
        g = Math.floor(200 * (pct - 0.4) / 0.3)
        b = 0
      } else {
        r = Math.floor(255 * pct / 0.4)
        g = 0
        b = 0
      }
      a = Math.min(pct * 1.5, 0.9)
      ctx.shadowBlur = 20
      ctx.shadowColor = `rgba(${r}, ${g}, 0, ${a * 0.5})`
    }

    ctx.beginPath()
    ctx.arc(this.x, this.y, Math.max(this.size, 0.5), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

export function useFireCanvas(intensity = 1) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animFrameRef = useRef(null)
  const intensityRef = useRef(intensity)

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  const spawnBurst = useCallback((x, y, count = 30) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(new Particle(x, y, {
        spread: 8,
        speed: 8,
        life: Math.random() * 30 + 15,
        size: Math.random() * 8 + 3,
        type: Math.random() > 0.7 ? 'ember' : 'fire'
      }))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleClick = (e) => {
      spawnBurst(e.clientX, e.clientY, 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const level = intensityRef.current
      const w = canvas.width
      const h = canvas.height

      const edgeCount = Math.floor(3 * level)
      for (let i = 0; i < edgeCount; i++) {
        particlesRef.current.push(new Particle(
          Math.random() * w, h + 5,
          { speed: 5 * level, size: Math.random() * 8 + 2, life: Math.random() * 50 + 20 }
        ))
      }

      for (let i = 0; i < edgeCount; i++) {
        particlesRef.current.push(new Particle(
          Math.random() * w, h + 5,
          { speed: 3, size: Math.random() * 12 + 4, life: Math.random() * 60 + 30, type: 'smoke' }
        ))
      }

      const sideCount = Math.floor(2 * level)
      for (let i = 0; i < sideCount; i++) {
        particlesRef.current.push(new Particle(
          -5, Math.random() * h,
          { spread: 2, speed: 2 * level, size: Math.random() * 5 + 2, life: Math.random() * 30 + 15 }
        ))
        particlesRef.current.push(new Particle(
          w + 5, Math.random() * h,
          { spread: 2, speed: 2 * level, size: Math.random() * 5 + 2, life: Math.random() * 30 + 15 }
        ))
      }

      if (level > 1.5) {
        for (let i = 0; i < Math.floor(level); i++) {
          particlesRef.current.push(new Particle(
            Math.random() * w, Math.random() * h,
            { spread: 1, speed: 1, size: Math.random() * 2 + 1, life: 15, type: 'ember' }
          ))
        }
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      if (mx > 0 && my > 0) {
        for (let i = 0; i < Math.floor(2 * level); i++) {
          particlesRef.current.push(new Particle(
            mx + (Math.random() - 0.5) * 30,
            my + (Math.random() - 0.5) * 30,
            { spread: 2, speed: 3, size: Math.random() * 4 + 1, life: Math.random() * 20 + 10 }
          ))
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.update()
        p.draw(ctx)
        if (p.life <= 0 || p.size < 0.3) {
          particlesRef.current.splice(i, 1)
        }
      }

      if (particlesRef.current.length > 3000) {
        particlesRef.current.splice(0, particlesRef.current.length - 3000)
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [spawnBurst])

  return { canvasRef, spawnBurst }
}
