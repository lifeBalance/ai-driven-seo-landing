import Logo from '@assets/logo.svg?react'
import XSocial from '@assets/social-x.svg?react'
import InstaSocial from '@assets/social-instagram.svg?react'
import YTSocial from '@assets/social-youtube.svg?react'

export default function Footer() {
  return (
    <footer className="py-5 border-t border-white/15">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex gap-2 items-center lg:flex-1">
            <Logo className="h-6 w-6" />

            <div className="font-medium">AI Startup landing page</div>
          </div>

          <nav className="flex flex-col lg:flex-row lg:flex-1 gap-5 lg:gap-7 lg:justify-center">
            {['Features', 'Developers', 'Company', 'Blog', 'Changelog'].map(
              (item: string, idx: number) => (
                <a
                  key={`${item}-${idx}`}
                  href="#"
                  className="text-white/70 hover:text-white text-xs md:text-sm transition"
                >
                  {item}
                </a>
              ),
            )}
          </nav>

          <div className="flex gap-5 lg:flex-1 lg:justify-end">
            <XSocial className="text-white/40 hover:text-white transition" />

            <InstaSocial className="text-white/40 hover:text-white transition" />

            <YTSocial className="text-white/40 hover:text-white transition" />
          </div>
        </div>
      </div>
    </footer>
  )
}
