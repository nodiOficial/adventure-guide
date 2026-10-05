import { MotionConfig, motion } from 'framer-motion'
import BackgroundDecoration from './components/BackgroundDecoration'
import Hero from './components/Hero'
import SocialLink from './components/SocialLink'
import RouteLine from './components/RouteLine'
import Footer from './components/Footer'
import { links } from './config/links'

const listVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.75, staggerChildren: 0.12 } },
}

export default function App() {
  return (
    // reducedMotion="user" → Framer Motion skips transforms when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <BackgroundDecoration />

      <main
        className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[480px] flex-col md:max-w-[540px]"
        style={{
          paddingTop: 'max(2.75rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
        }}
      >
        <div className="flex flex-1 flex-col justify-center">
          <Hero />

          <nav aria-label="Enlaces de Adventure Guide" className="mt-10 sm:mt-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mb-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-mist/60"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-mist/25" />
              ELIGE TU RUTA
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-mist/25" />
            </motion.p>

            {/* Positioned wrapper: the route SVG sits behind the list (keeps <ul> valid: only <li> children) */}
            <div className="relative">
              <RouteLine />
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="m-0 flex list-none flex-col gap-3.5 p-0 sm:gap-4"
              >
                {links.map(({ id, ...link }) => (
                  <SocialLink key={id} {...link} />
                ))}
              </motion.ul>
            </div>
          </nav>
        </div>

        <Footer className="pt-14" />
      </main>
    </MotionConfig>
  )
}
