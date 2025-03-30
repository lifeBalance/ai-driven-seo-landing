import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react'
import productImage from '@assets/product-image.png'
import { useState } from 'react'

export default function Features() {
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

        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab: Tab, idx: number) => (
            <Tab key={`${idx}-${tab.title}`} tab={tab} />
          ))}
        </div>

        <div className="border border-white/20 flex p-2.5 rounded-xl mt-3">
          <div
            className="aspect-video h-64 w-full bg-cover border border-white/20 rounded-lg"
            style={{
              backgroundImage: `url(${productImage})`,
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}

const Tab = ({ tab }: { tab: (typeof tabs)[number] }) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  const dotLottieRefCallback: (
    dotLottie: DotLottie | null,
  ) => void = dotLottie => {
    setDotLottie(dotLottie)
  }

  function play() {
    if (dotLottie) {
      dotLottie.play()
    }
  }

  return (
    <div
      onMouseEnter={play}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1"
    >
      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottieReact
          dotLottieRefCallback={dotLottieRefCallback}
          src={tab.icon}
          autoplay
          className="w-5 h-5"
        />
      </div>

      <div>{tab.title}</div>

      {tab.isNew && (
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
