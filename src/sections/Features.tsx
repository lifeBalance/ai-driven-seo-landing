import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react'
import productImage from '@assets/product-image.png'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  ValueAnimationTransition,
} from 'framer-motion'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

export default function Features() {
  const [selectedTab, setSelectedTab] = useState(0)
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSize)

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`

  const handleSelectTab = (index: number) => {
    setSelectedTab(index)
    // Quick test
    // backgroundPositionX.set(tabs[index].backgroundPositionX)
    // backgroundPositionY.set(tabs[index].backgroundPositionY)
    // backgroundSizeX.set(tabs[index].backgroundSize)

    animate(
      backgroundSizeX,
      [backgroundSizeX.get(), 100, tabs[index].backgroundSize],{
        duration: 2,
        ease: 'easeInOut',
      },
    )
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX],{
        duration: 2,
        ease: 'easeInOut',
      },

    )
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY],{
        duration: 2,
        ease: 'easeInOut',
      },
    )
  }
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Elevate your SEO efforts
        </h2>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">
          From small startups to large enterprises, our AI-driven tool has
          revolutionized the way businesses approach SEO.
        </p>

        <div className="mt-10 flex flex-col lg:flex-row gap-3 cursor-pointer">
          {tabs.map((tab: Tab, idx: number) => (
            <Tab
              key={`${idx}-${tab.title}`}
              {...tab}
              selected={idx === selectedTab}
              // onClick={() => setSelectedTab(idx)}
              onClick={() => handleSelectTab(idx)}
            />
          ))}
        </div>

        <div className="border border-white/20 flex p-2.5 rounded-xl mt-3">
          <motion.div
            className="aspect-video w-full bg-cover border border-white/20 rounded-lg"
            style={{
              backgroundImage: `url(${productImage})`,
              backgroundPosition,
              backgroundSize,
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  )
}

const Tab = (
  props: (typeof tabs)[number] &
    ComponentPropsWithoutRef<'div'> & { selected: boolean },
) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const tabRef = useRef<HTMLDivElement>(null)

  // For the border animation
  useEffect(() => {
    if (!tabRef.current || !props.selected) return

    // Reset the border animation
    xPercentage.set(0)
    yPercentage.set(0)

    const { height, width } = tabRef.current.getBoundingClientRect()
    const perimeter = height * 2 + width * 2
    // 'times' is a sequence of values between 0 and 1 that represent the percentage of the animation
    const times = [
      0,
      width / perimeter,
      (width + height) / perimeter,
      (width * 2 + height) / perimeter,
      1,
    ]
    const options: ValueAnimationTransition = {
      times,
      duration: 5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
    }
    animate(xPercentage, [0, 100, 100, 0, 0], options)
    animate(yPercentage, [0, 0, 100, 100, 0], options)
  }, [props.selected])

  const dotLottieRefCallback: (
    dotLottie: DotLottie | null,
  ) => void = dotLottie => {
    setDotLottie(dotLottie)
  }

  function play() {
    if (dotLottie) {
      dotLottie.play()
    }
    setIsHovered(true)
  }

  function stop() {
    setIsHovered(false)
  }

  // Border animation
  const xPercentage = useMotionValue(0)
  const yPercentage = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%,black,transparent)`

  return (
    <div
      ref={tabRef}
      onMouseEnter={play}
      onMouseLeave={stop}
      onClick={props.onClick}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative"
    >
      {props.selected && (
        <motion.div
          style={{ maskImage }}
          className="absolute inset-0 border border-[#a369ff] -m-px rounded-xl"
        ></motion.div>
      )}

      <div
        className={twMerge(
          'h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center transition-colors duration-300',
          isHovered && 'border-white/35',
        )}
      >
        <DotLottieReact
          dotLottieRefCallback={dotLottieRefCallback}
          src={props.icon}
          autoplay
          className="w-5 h-5"
        />
      </div>

      <div>{props.title}</div>

      {props.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          new
        </div>
      )}
    </div>
  )
}

interface Tab {
  icon: string
  title: string
  isNew: boolean
  backgroundPositionX: number
  backgroundPositionY: number
  backgroundSize: number
}

// Lottie icons come from the public folder
const tabs = [
  {
    icon: '/assets/lottie/vroom.lottie',
    title: 'User-friendly dashboard',
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSize: 150,
  },
  {
    icon: '/assets/lottie/click.lottie',
    title: 'One-click optimization',
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSize: 135,
  },
  {
    icon: '/assets/lottie/stars.lottie',
    title: 'Smart keyword generation',
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSize: 177,
  },
]
