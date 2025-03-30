import Button from '@/components/Button'
import starsBg from '@/assets/stars.png'
import gridLines from '@/assets/grid-lines.png'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import { RefObject, useEffect, useRef, useState } from 'react'

const useRelativeMousePosition = (to: RefObject<HTMLElement | null>) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const updateMousePosition = (e: MouseEvent) => {
    if (!to.current) return

    // Percentage of the mouse position relative to the element (use % in mask-image)
    // const { top, left, width, height } = to.current.getBoundingClientRect()
    // const x = ((e.x - left) / width) * 100 // Convert to percentage
    // const y = ((e.y - top) / height) * 100 // Convert to percentage

    // Value in pixels
    const { top, left } = to.current.getBoundingClientRect()
    const x = e.x - left
    const y = e.y - top 
    
    mouseX.set(x)
    mouseY.set(y)
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return [mouseX, mouseY]
}

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const borderedRef = useRef<HTMLDivElement>(null)

  const [starsBgWidth, setStarsBgWidth] = useState(0)

  useEffect(() => {
    const img = new Image()
    img.src = starsBg
    img.onload = () => {
      setStarsBgWidth(img.width) // Get the width of the image
    }
  }, [])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

  const [mouseX, mouseY] = useRelativeMousePosition(borderedRef)
  const imageMask = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`

  // useEffect(() => {
  //   mouseX.onChange(value => console.log('mouseX:', value))
  //   mouseY.onChange(value => console.log('mouseY:', value))
  // }, [mouseX, mouseY])
  
  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="container">
        <motion.div
          ref={borderedRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg})`,
          }}
          animate={{ backgroundPositionX: starsBgWidth }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: 'linear',
          }}
        >
          {/* This one stays in place, hidden when hovered. */}
          <div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${gridLines})`,
            }}
          ></div>
          {/* This one shows up when hovered; the animation moves it following the cursor */}
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              maskImage: imageMask,
              WebkitMaskImage: imageMask, // For Safari
              backgroundImage: `url(${gridLines})`,
            }}
          ></motion.div>

          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
              AI-driven SEO for everyone.
            </h2>

            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Achieve clear, impactful results without the complexity.
            </p>

            <div className="flex justify-center mt-8">
              <Button>Join waitlist</Button>
            </div>
          </div>
          {/** content */}
        </motion.div>
      </div>
    </section>
  )
}
