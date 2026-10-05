import { motion } from 'framer-motion'
import ClippedImage from './ClippedImage'
// Web-sized copy of the official logo (same artwork, 400px) — originals kept in assets/logos
import nodiLogo from '../assets/logos/nodi-web.png'
import { poweredBy } from '../config/links'

/**
 * Discreet "Powered by NODI" credit.
 * The official NODI logo has navy letters on a white background, so it sits on a small
 * white chip (instead of recoloring the logo). Low opacity at rest; teal glow on hover/focus.
 */
export default function Footer({ className = '' }) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className={`flex flex-col items-center gap-2.5 ${className}`}
    >
      <span className="text-[9.5px] font-semibold tracking-[0.28em] text-mist/60 uppercase">
        Powered by
      </span>
      <a
        href={poweredBy.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Powered by ${poweredBy.name} (se abre en una pestaña nueva)`}
        className="group rounded-lg bg-white px-2 py-1.5 opacity-60 outline-none transition-[opacity,box-shadow] duration-300 hover:opacity-100 hover:shadow-[0_0_0_1px_#4DB8B0,0_0_20px_-2px_rgba(77,184,176,0.65)] focus-visible:opacity-100 focus-visible:shadow-[0_0_0_2px_#4DB8B0]"
      >
        <ClippedImage
          src={nodiLogo}
          alt={poweredBy.name}
          natural={[1254, 1254]}
          crop={[55, 300, 1212, 905]}
          loading="lazy"
          className="w-[52px]"
        />
      </a>
    </motion.footer>
  )
}
