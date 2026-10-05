import { motion } from 'framer-motion'
import ClippedImage from './ClippedImage'
import adventureLogo from '../assets/logos/adventure-guide.png'

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0, distance = 16) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

export default function Hero() {
  return (
    <header className="flex flex-col items-center text-center">
      {/* Pill tag */}
      {/* <motion.span
        {...fadeUp(0.05, 8)}
        className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/[0.08] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-teal-soft backdrop-blur-sm sm:text-[11px]"
      >
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="animate-gps-ping absolute inset-0 rounded-full bg-teal" />
          <span className="relative size-1.5 rounded-full bg-teal" />
        </span>
        ADVENTURE GUIDE
        <span className="text-teal/50" aria-hidden="true">•</span>
        CANYONING LIFE
      </motion.span> */}

      {/* Official logo — original file, only the empty padding is clipped via CSS */}
      <motion.div {...fadeUp(0.15, 20)} className="mt-7 w-[min(300px,78vw)]">
        <ClippedImage
          src={adventureLogo}
          alt="Adventure Guide — Canyoning Life"
          natural={[956, 335]}
          crop={[60, 47, 895, 290]}
          fetchPriority="high"
          className="drop-shadow-[0_8px_30px_rgba(0,191,174,0.18)]"
        />
      </motion.div>

      <motion.h1
        {...fadeUp(0.4)}
        className="mt-8 max-w-[18ch] text-[28px] leading-[1.15] font-bold tracking-tight text-balance text-white sm:text-[34px]"
      >
        Tu próxima{' '}
        <span className="bg-gradient-to-r from-teal-soft to-cyan bg-clip-text text-transparent">
          aventura
        </span>{' '}
        comienza aquí.
      </motion.h1>

      <motion.p {...fadeUp(0.55)} className="mt-3 text-[15px] font-medium text-mist sm:text-base">
        Explora. Conecta. Vive la experiencia.
      </motion.p>
    </header>
  )
}
