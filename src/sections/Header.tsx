import LogoIcon from '@assets/logo.svg?react'
import MenuIcon from '@assets/icon-menu.svg?react'

export default function Header() {
  return (
    <header className="py-4 border-b border-white/15 md:border-none">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <LogoIcon className="w-8 h-8" />
            </div>
          </div>

          <div className='hidden md:block'>
            <nav className='flex gap-8 text-sm'>
              {['Features', 'Developers', 'Pricing', 'Changelog'].map((item: string) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/70 hover:text-white transition"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex gap-4 items-center">
            <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190b2e] to-[#4a2081] shadow-[0px_0px_12px_#8c45ff]">
              <div className="absolute inset-0">
                <div className="absolute border rounded-lg border-white/20 inset-0 [map-image:linear-gradient(to_bottom,black,transparent)]"></div>
                <div className="absolute border rounded-lg border-white/40 inset-0 [map-image:linear-gradient(to_top,black,transparent)]"></div>
                <div className="absolute rounded-lg inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset]"></div>
              </div>

              <span>Join waitlist</span>
            </button>
            <MenuIcon className="md:hidden w-8 h-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
