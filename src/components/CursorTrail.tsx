import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!cursor || reducedMotion) return

    let lastX = 0
    let lastY = 0
    let idleTimer = 0

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      const angle = lastX || lastY ? Math.atan2(dy, dx) * (180 / Math.PI) : 0
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) rotate(${angle}deg)`
      cursor.style.opacity = '1'
      lastX = event.clientX
      lastY = event.clientY
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => { cursor.style.opacity = '0' }, 950)
    }

    const leave = () => { cursor.style.opacity = '0' }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', leave)
    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', leave)
    }
  }, [])

  return <div className="shooting-star-cursor" ref={cursorRef} aria-hidden="true"><span className="star-tail" /><span className="star-head" /><span className="star-flare" /></div>
}
