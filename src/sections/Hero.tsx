import Button from '@components/Button'
import starsBg from '@assets/stars.png'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  // Logging the scroll progress
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    console.log('scrollYProgress', latest)
  })

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])
  
  return (
    <motion.section
      ref={sectionRef}
      animate={{
        backgroundPositionX: '100%',
      }}
      transition={{
        duration: 120,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{ backgroundImage: `url(${starsBg})`, backgroundPositionY }}
    >
      {/* outer purple blur */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>

      {/* Start planet */}
      <div className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,white,rgb(184,148,255,.5)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
      {/* End planet */}

      {/* Start ring 1 */}
      <motion.div
        animate={{
          rotate: '1turn',
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        // Author recommended this to not overwrite the default Tailwind styles,
        // we need to add the translations to the style prop (don't do it, it breaks the animation):
        // style={{ translateX: '50%', translateY: '-50%' }}
        className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-2 w-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-5 w-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex justify-center items-center">
          <div className="absolute h-2 w-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
      {/* End ring 1 */}

      {/* Start ring 2 */}
      <motion.div
        animate={{
          rotate: '-1turn',
        }}
        transition={{
          duration: 360,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] border border-white/20 border-dashed rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
      {/* End ring 2 */}

      {/* Start ring 3 */}
      <motion.div
        animate={{
          rotate: '-1turn',
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
      >
        <div className="absolute h-2 w-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
      {/* Start ring 3 */}

      <div className="relative container mt-16">
        <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center">
          AI SEO
        </h1>

        <p className="text-lg md:text-xl text-center text-white/70 mt-5 max-w-xl mx-auto">
          Elevate your site's visibility effortlessly with AI, where smart
          technology meets user-friendly SEO tools.
        </p>

        <div className="flex justify-center mt-5">
          <Button>Join waitlist</Button>
        </div>
      </div>
    </motion.section>
  )
}
