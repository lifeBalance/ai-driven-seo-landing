import avatar1 from '@assets/avatar-1.png'
import avatar2 from '@assets/avatar-2.png'
import avatar3 from '@assets/avatar-3.png'
import avatar4 from '@assets/avatar-4.png'
import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">
          Beyond expectations
        </h2>

        <p className="text-white/70 text-lg md:text-2xl text-center mt-5 tracking-tight max-w-sm mx-auto">
          Our revolutionary AI SEO tools have transformed our clients strategies
        </p>

        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: '-50%' }}
            animate={{ translateX: '0' }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 30,
            }}
            className="flex flex-none gap-5"
          >
            {[...testimonials, ...testimonials].map(
              (testimonial: Testimonial, idx: number) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className="border border-white/15 rounded-xl p-6 md:p-10 bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs md:max-w-sm flex-none"
                >
                  <div className="text-lg md:text-xl tracking-tight">
                    "{testimonial.text}"
                  </div>

                  <div className="flex items-center gap-3 mt-5">
                    <div className='relative after:content-[""] after:absolute after:inset-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light before:content-[""] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg'>
                      <img
                        src={testimonial.avatar}
                        alt={`Avatar for ${testimonial.name}`}
                        className="h-11 w-11 rounded-lg grayscale"
                      />
                    </div>

                    <div className="">
                      <div>{testimonial.name}</div>
                      <div className="text-white/50 text-sm">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface Testimonial {
  text: string
  name: string
  title: string
  avatar: string
}

const testimonials = [
  {
    text: 'This product has completely transformed the way I work. I can’t imagine going back to my old workflow.',
    name: 'Sophia Perez',
    title: 'Product Designer @ Creative Agency',
    avatar: avatar1,
  },
  {
    text: 'The level of detail and care that has gone into this product is truly impressive. It’s a game changer.',
    name: 'Liam Johnson',
    title: 'Software Engineer @ TechCorp',
    avatar: avatar2,
  },
  {
    text: 'I love how intuitive and user-friendly this product is. It has made my life so much easier.',
    name: 'Olivia Martinez',
    title: 'Marketing Specialist @ Digital Agency',
    avatar: avatar3,
  },
  {
    text: 'This product has exceeded my expectations in every way. I can’t recommend it highly enough.',
    name: 'Noah Brown',
    title: 'Project Manager @ Startup Inc.',
    avatar: avatar4,
  },
]
