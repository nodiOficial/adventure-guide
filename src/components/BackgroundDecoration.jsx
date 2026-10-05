import { memo, useMemo } from 'react'

/* ------------------------------------------------------------------
 * Topographic contour generator (deterministic → same drawing every load)
 * Each ring is a closed, slightly irregular loop: radius + a few sine "bumps".
 * Points are smoothed into cubic Béziers (Catmull-Rom → Bézier).
 * ------------------------------------------------------------------ */
function contourPath(cx, cy, r, seed, wobble = 0.12, points = 48) {
  const pts = []
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2
    const n =
      Math.sin(a * 3 + seed) * 0.5 +
      Math.sin(a * 5 + seed * 1.7) * 0.3 +
      Math.sin(a * 2 - seed * 0.6) * 0.4
    const rr = r * (1 + wobble * n)
    pts.push([cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr])
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % points]
    const p3 = pts[(i + 2) % points]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return `${d} Z`
}

function contourSet(cx, cy, rings, start, step, seed) {
  return Array.from({ length: rings }, (_, i) =>
    contourPath(cx, cy, start + i * step, seed + i * 0.35, 0.1 + i * 0.012),
  )
}

/* Small GPS waypoints scattered in the background */
const WAYPOINTS = [
  { top: '5%', left: '7%', delay: '0s', label: '21°12′N 99°28′W' },
  { top: '38%', left: '88%', delay: '1.1s' },
  { top: '64%', left: '3%', delay: '2.2s', label: 'WP-04' },
  { top: '86%', left: '80%', delay: '0.6s' },
]

/* "Water" particles: tiny bubbles rising slowly. Fixed list = no layout work at runtime */
const PARTICLES = [
  { left: '6%', size: 3, duration: 22, delay: 0 },
  { left: '18%', size: 2, duration: 28, delay: 6 },
  { left: '31%', size: 2, duration: 25, delay: 12 },
  { left: '47%', size: 3, duration: 30, delay: 3 },
  { left: '63%', size: 2, duration: 24, delay: 9 },
  { left: '76%', size: 3, duration: 27, delay: 15 },
  { left: '89%', size: 2, duration: 23, delay: 4 },
  { left: '96%', size: 2, duration: 29, delay: 18 },
]

function BackgroundDecoration() {
  const topoA = useMemo(() => contourSet(820, 180, 9, 40, 34, 1.3), [])
  const topoB = useMemo(() => contourSet(140, 860, 8, 50, 38, 4.1), [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#0d2a40_0%,#0b1f32_38%,#081a2a_75%)]" />

      {/* Turquoise glow behind the main content */}
      <div className="animate-glow absolute top-[6%] left-1/2 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,191,174,0.18)_0%,rgba(0,159,227,0.08)_40%,transparent_70%)] blur-2xl" />

      {/* Topographic lines — two clusters drifting very slowly in opposite directions */}
      <svg
        className="animate-topo absolute -inset-[10%] h-[120%] w-[120%] will-change-transform"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="#27C7BE" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {topoA.map((d, i) => (
            <path key={i} d={d} opacity={0.11 - i * 0.008} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      <svg
        className="animate-topo-reverse absolute -inset-[10%] h-[120%] w-[120%] will-change-transform"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="#009FE3" strokeWidth="1">
          {topoB.map((d, i) => (
            <path key={i} d={d} opacity={0.1 - i * 0.008} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {/* A faint dashed trail between two waypoints */}
        <path
          d="M120 140 C 260 260, 180 420, 420 520 S 760 640, 880 380"
          fill="none"
          stroke="#8FA4B8"
          strokeOpacity="0.12"
          strokeDasharray="2 8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* GPS waypoints */}
      {WAYPOINTS.map((wp, i) => (
        <div key={i} className="absolute" style={{ top: wp.top, left: wp.left }}>
          <span className="relative block size-1.5">
            <span
              className="animate-gps-ping absolute inset-0 rounded-full bg-teal"
              style={{ animationDelay: wp.delay }}
            />
            <span className="absolute inset-0 rounded-full bg-teal/60" />
          </span>
          {wp.label && (
            <span className="absolute top-3 left-3 hidden font-mono text-[9px] md:block tracking-wider whitespace-nowrap text-mist/30">
              {wp.label}
            </span>
          )}
        </div>
      ))}

      {/* Rising water particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="animate-rise absolute bottom-[-10px] rounded-full bg-teal-soft/50"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Abstract mountain ridges anchoring the bottom */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[34vh] min-h-[200px] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ridge-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27C7BE" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#27C7BE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ridge-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#009FE3" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#081A2A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 230 L120 170 L210 205 L330 110 L420 165 L520 120 L640 190 L760 90 L860 150 L980 115 L1100 180 L1220 120 L1340 170 L1440 140 L1440 320 L0 320 Z"
          fill="url(#ridge-back)"
        />
        <path
          d="M0 230 L120 170 L210 205 L330 110 L420 165 L520 120 L640 190 L760 90 L860 150 L980 115 L1100 180 L1220 120 L1340 170 L1440 140"
          fill="none"
          stroke="#27C7BE"
          strokeOpacity="0.12"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 280 L160 220 L280 250 L400 200 L540 245 L690 185 L820 235 L960 205 L1080 250 L1220 210 L1340 240 L1440 220 L1440 320 L0 320 Z"
          fill="url(#ridge-front)"
        />
      </svg>

      {/* Vignette keeps edges calm and focus on the center */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent_55%,rgba(5,14,24,0.7)_100%)]" />
    </div>
  )
}

export default memo(BackgroundDecoration)
