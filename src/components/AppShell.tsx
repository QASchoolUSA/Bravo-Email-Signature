import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { local, socialLinks } from '../lib/brand'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
          <Link to="/" className="flex min-h-14 items-center" aria-label="Bravo Digital Workspace">
            <img
              src={local.logoHeader}
              alt="Bravo Transport LLC"
              className="h-14 w-auto max-w-[280px] object-contain sm:h-16 sm:max-w-[360px] md:h-[4.5rem] md:max-w-[420px]"
            />
          </Link>
          <nav className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.12em] uppercase sm:gap-5">
            <Link to="/" className="cursor-pointer text-navy transition-colors duration-200 hover:text-sky">
              Workspace
            </Link>
            <a
              href="https://www.bravo-transport.com/en/"
              target="_blank"
              rel="noreferrer"
              className="hidden cursor-pointer text-navy transition-colors duration-200 hover:text-sky sm:inline"
            >
              Bravo site
            </a>
            <a
              href="https://bravo-transport.com/en/ship-with-us"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-sky px-4 text-white transition-colors duration-200 hover:bg-sky-light"
            >
              Ship with us
            </a>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>

      <footer className="border-t border-line bg-white text-grey">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-navy uppercase">Bravo Transport LLC</p>
            <p className="mt-2 text-sm text-charcoal">631 Executive Dr. Willowbrook, IL 60527</p>
            <a
              href="tel:+16305761131"
              className="mt-1 block min-h-11 w-fit text-sm font-semibold text-navy hover:text-sky"
            >
              +1 (630) 576-1131
            </a>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="flex gap-4">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="min-h-11 cursor-pointer text-xs font-semibold tracking-[0.12em] text-navy uppercase hover:text-sky"
              >
                LinkedIn
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="min-h-11 cursor-pointer text-xs font-semibold tracking-[0.12em] text-navy uppercase hover:text-sky"
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
