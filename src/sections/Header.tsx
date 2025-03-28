import LogoIcon from '@assets/logo.svg?react'
import MenuIcon from '@assets/icon-menu.svg?react'
import Button from '@components/Button'

export default function Header() {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <LogoIcon className="w-8 h-8" />
            </div>
          </div>

          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              {['Features', 'Developers', 'Pricing', 'Changelog'].map(
                (item: string) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white/70 hover:text-white transition"
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
          </div>

          <div className="flex gap-4 items-center">
            <Button>Join waitlist</Button>
            <MenuIcon className="md:hidden w-8 h-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
