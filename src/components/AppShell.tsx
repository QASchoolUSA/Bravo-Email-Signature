import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { local, socialLinks } from '../lib/brand'

type Props = {
  children: ReactNode
  darkHero?: boolean
}

export function AppShell({ children, darkHero = false }: Props) {
  return (
    <div className={`flex min-h-dvh flex-col ${darkHero ? 'bg-navy-deep' : 'bg-surface'}`}>
      <header className="relative z-20 border-b border-white/10 bg-navy">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <Link to="/" className="flex min-h-11 items-center" aria-label="Bravo Digital Workspace">
            <img
              src={local.logoHeader}
              alt="Bravo Transport LLC"
              className="h-10 w-auto max-w-[220px] object-contain sm:h-12 sm:max-w-[280px]"
            />
          </Link>
          <nav className="flex items-center gap-5 text-[11px] font-semibold tracking-[0.14em] uppercase">
            <Link to="/" className="text-white/85 transition-colors duration-200 hover:text-sky-light">
              Workspace
            </Link>
            <a
              href="https://www.bravo-transport.com/en/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-light transition-colors duration-200 hover:text-white"
            >
              Bravo site
            </a>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>

      <footer className="border-t border-white/10 bg-navy-deep text-white/70">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-sky-light uppercase">Bravo Transport LLC</p>
            <p className="mt-2 text-sm">631 Executive Dr. Willowbrook, IL 60527</p>
            <a href="tel:+16305761131" className="mt-1 block text-sm text-white hover:text-sky-light">
              +1 (630) 576-1131
            </a>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="flex gap-4">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold tracking-[0.12em] uppercase hover:text-sky-light"
              >
                LinkedIn
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold tracking-[0.12em] uppercase hover:text-sky-light"
              >
                Facebook
              </a>
            </div>
            <p className="text-xs">© {new Date().getFullYear()} Bravo Transport. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
