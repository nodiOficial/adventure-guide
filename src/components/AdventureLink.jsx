import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/** Stagger child — the parent list controls timing via `staggerChildren` */
export const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * Glass card link used for every main action.
 * Desktop: lift + teal glow + brighter border + arrow nudge + icon micro-motion (CSS `hover:` only
 * fires on devices that really hover, so phones don't get "sticky" hover states).
 * Mobile: tap feedback with scale 0.98.
 */
export default function AdventureLink({ href, title, subtitle, icon, external = true }) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <motion.li variants={cardVariants} className="relative z-10 list-none">
      <motion.a
        href={href}
        {...externalProps}
        aria-label={external ? `${title} (se abre en una pestaña nueva)` : title}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="group relative flex min-h-[78px] items-center gap-4 overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-[#13304a]/80 to-[#0c2236]/70 p-4 pr-4 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 outline-none hover:border-teal/45 hover:shadow-[0_14px_44px_-14px_rgba(0,191,174,0.45)] focus-visible:border-teal/60 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-abyss active:border-teal/50 sm:min-h-[84px] sm:p-5"
      >
        {/* Top edge highlight (glass rim) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        {/* Light sweep on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-teal/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[300%] group-hover:opacity-100"
        />

        {/* Icon = waypoint on the route */}
        <span
          aria-hidden="true"
          data-waypoint
          className="relative grid size-12 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-teal/25 to-cyan/20 text-teal-soft ring-1 ring-teal/35 ring-inset transition-[color,box-shadow] duration-300 group-hover:text-white group-hover:shadow-[0_0_22px_-4px_rgba(0,191,174,0.7)]"
        >
          <span className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-teal to-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
            {icon}
          </span>
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-snug font-semibold text-white sm:text-base">
            {title}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-mist sm:text-sm">
            {subtitle}
          </span>
        </span>

        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-mist transition-colors duration-300 group-hover:border-teal/40 group-hover:text-teal-soft group-focus-visible:text-teal-soft"
        >
          <ArrowRight
            size={17}
            strokeWidth={2.2}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </span>
      </motion.a>
    </motion.li>
  )
}
