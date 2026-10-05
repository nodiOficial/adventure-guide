import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Subtle "GPS route" that threads through every card's icon (the waypoints).
 * It measures the real icon positions, so it stays aligned at any screen size / font load.
 * Drawn behind the glass cards: you see it in the gaps and faintly through the blur.
 */
export default function RouteLine() {
  const layerRef = useRef(null)
  const [geo, setGeo] = useState(null)

  useLayoutEffect(() => {
    // Measure the positioned parent that wraps the list.
    // (A ref passed down from the parent isn't attached yet when a child's layout effect runs.)
    const list = layerRef.current?.parentElement
    if (!list) return

    const measure = () => {
      const box = list.getBoundingClientRect()
      const icons = [...list.querySelectorAll('[data-waypoint]')]
      if (icons.length < 2) return
      // Use layout offsets (not getBoundingClientRect) so the entrance transforms don't skew it
      const pts = icons.map((icon) => {
        const card = icon.offsetParent // <a>
        const li = card.offsetParent // <li>
        return {
          x: li.offsetLeft + card.offsetLeft + icon.offsetLeft + icon.offsetWidth / 2,
          y: li.offsetTop + li.offsetHeight / 2,
        }
      })
      setGeo({ w: box.width, h: list.offsetHeight, pts })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {geo && <RoutePath {...geo} />}
    </div>
  )
}

function RoutePath({ w, h, pts }) {
  const x = pts[0].x
  const startY = Math.max(pts[0].y - 56, 0)
  const endY = Math.min(pts.at(-1).y + 56, h + 24)

  // Gentle S-curves between waypoints, alternating sides — like a trail on a slope
  let d = `M${x},${startY} L${x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const bend = i % 2 ? -16 : 16
    const mid = (a.y + b.y) / 2
    d += ` C${x},${a.y + 18} ${x + bend},${mid - 10} ${x + bend},${mid}`
    d += ` S${x},${b.y - 18} ${x},${b.y}`
  }
  d += ` L${x},${endY}`

  return (
    <svg
      className="absolute top-0 left-0 overflow-visible"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <linearGradient id="route-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27C7BE" stopOpacity="0" />
          <stop offset="12%" stopColor="#27C7BE" stopOpacity="0.55" />
          <stop offset="88%" stopColor="#009FE3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#009FE3" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Solid base line that "draws" itself on load */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#route-fade)"
        strokeWidth="1.25"
        strokeOpacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Dashed overlay slowly "walking" along the route */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#route-fade)"
        strokeWidth="1.5"
        strokeDasharray="2 12"
        strokeLinecap="round"
        className="animate-route-flow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      />

      {/* Start & finish markers */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ transformOrigin: `${x}px ${startY + 6}px` }}
      >
        <circle cx={x} cy={startY + 6} r="3" fill="#27C7BE" fillOpacity="0.7" />
        <circle cx={x} cy={startY + 6} r="6.5" fill="none" stroke="#27C7BE" strokeOpacity="0.3" />
      </motion.g>
      <motion.circle
        cx={x}
        cy={endY - 6}
        r="2.5"
        fill="none"
        stroke="#009FE3"
        strokeOpacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      />
    </svg>
  )
}
