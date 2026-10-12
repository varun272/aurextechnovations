import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; radius: number; phase: number; speed: number }
type GalaxyPoint = { radius: number; angle: number; size: number; light: number }
type ShootingStar = { x: number; y: number; vx: number; vy: number; age: number; lifetime: number }

function randomBetween(min: number, max: number) { return min + Math.random() * (max - min) }

export default function GalaxyBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    let scale = 1
    let rotation = 0
    let previousFrame = 0
    let nextShootingStarAt = randomBetween(3000, 4000)
    let stars: Star[] = []
    let galaxy: GalaxyPoint[] = []
    let shootingStars: ShootingStar[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      scale = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.round(width * scale)
      canvas.height = Math.round(height * scale)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(scale, 0, 0, scale, 0, 0)

      const starCount = Math.min(420, Math.floor(width * height / 3800))
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: randomBetween(.35, 1.25),
        phase: randomBetween(0, Math.PI * 2),
        speed: randomBetween(.25, .75),
      }))
      galaxy = Array.from({ length: 4 * 280 }, (_, index) => {
        const arm = Math.floor(index / 280)
        const progress = (index % 280) / 280
        return { radius: progress * .49 + randomBetween(-.012, .012), angle: arm * Math.PI / 2 + progress * 5.7 + randomBetween(-.12, .12), size: randomBetween(.35, 1.45), light: randomBetween(.16, .72) }
      })
      if (reducedMotion) draw(0)
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const centerX = width * .72
      const centerY = height * .43
      const radius = Math.min(width * .74, height * .9)

      context.save()
      context.translate(centerX, centerY)
      context.rotate(rotation)
      context.scale(1.22, .68)
      const glow = context.createRadialGradient(0, 0, 0, 0, 0, radius)
      glow.addColorStop(0, 'rgba(190, 211, 255, .2)')
      glow.addColorStop(.12, 'rgba(215, 171, 83, .13)')
      glow.addColorStop(.42, 'rgba(123, 90, 30, .07)')
      glow.addColorStop(1, 'rgba(85, 63, 22, 0)')
      context.fillStyle = glow
      context.beginPath()
      context.arc(0, 0, radius, 0, Math.PI * 2)
      context.fill()

      for (const point of galaxy) {
        const distance = Math.max(0, point.radius) * radius
        const x = Math.cos(point.angle) * distance
        const y = Math.sin(point.angle) * distance
        context.fillStyle = point.radius < .16 ? `rgba(255, 231, 182, ${point.light * .7})` : `rgba(218, 174, 88, ${point.light * (1 - point.radius * .6)})`
        context.beginPath()
        context.arc(x, y, point.size * (1 - point.radius * .3), 0, Math.PI * 2)
        context.fill()
      }
      context.restore()

      for (const star of stars) {
        const pulse = .38 + (Math.sin(time * .00035 * star.speed + star.phase) + 1) * .28
        context.fillStyle = `rgba(255, 242, 214, ${pulse})`
        context.beginPath()
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fill()
      }

      if (!reducedMotion) {
        if (time >= nextShootingStarAt) {
          shootingStars.push({
            x: randomBetween(width * .08, width * .92),
            y: randomBetween(-20, height * .62),
            vx: randomBetween(7, 10),
            vy: randomBetween(3, 6),
            age: 0,
            lifetime: randomBetween(44, 58),
          })
          nextShootingStarAt = time + randomBetween(3000, 4000)
        }

        const frameStep = previousFrame ? Math.min(2.5, (time - previousFrame) / 16.67) : 1
        previousFrame = time
        shootingStars = shootingStars.filter(meteor => {
          meteor.x += meteor.vx * frameStep
          meteor.y += meteor.vy * frameStep
          meteor.age += frameStep
          if (meteor.age >= meteor.lifetime) return false

          const fadeIn = Math.min(1, meteor.age / 5)
          const fadeOut = Math.min(1, (meteor.lifetime - meteor.age) / 12)
          const tailX = meteor.x - meteor.vx * 12
          const tailY = meteor.y - meteor.vy * 12
          const trail = context.createLinearGradient(tailX, tailY, meteor.x, meteor.y)
          trail.addColorStop(0, 'rgba(240,215,161,0)')
          trail.addColorStop(.72, `rgba(240,215,161,${.42 * fadeIn * fadeOut})`)
          trail.addColorStop(1, `rgba(255,248,228,${fadeIn * fadeOut})`)
          context.beginPath()
          context.moveTo(tailX, tailY)
          context.lineTo(meteor.x, meteor.y)
          context.strokeStyle = trail
          context.lineWidth = 1.6
          context.lineCap = 'round'
          context.shadowColor = 'rgba(240,215,161,.8)'
          context.shadowBlur = 7
          context.stroke()
          context.shadowBlur = 0
          return true
        })

        rotation += .00011
        frame = window.requestAnimationFrame(draw)
      }
    }

    resize()
    if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas className="galaxy-canvas" ref={canvasRef} aria-hidden="true" />
}
