import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { SERVICES_LINE, local } from '../lib/brand'

export function HomePage() {
  return (
    <AppShell darkHero>
      <section className="relative isolate flex flex-1 flex-col">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${local.fleet[1]})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-b from-navy/80 via-navy-deep/78 to-navy-deep"
          aria-hidden="true"
        />

        <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-5 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col items-center text-center">
            <img
              src={local.logoHeader}
              alt="Bravo Transport LLC"
              className="mb-6 h-auto w-full max-w-[420px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
            />
            <h1 className="bg-white px-5 py-3 text-[clamp(1.5rem,4vw,2.35rem)] font-bold tracking-[-0.03em] text-title">
              Bravo Digital Workspace
            </h1>
          </div>

          <main className="mt-10 grid flex-1 grid-cols-1 gap-5 md:mt-14 md:grid-cols-2" aria-label="Bravo tools">
            <div
              className="group relative flex min-h-[280px] aspect-square cursor-not-allowed flex-col justify-end overflow-hidden border border-white/15 saturate-[0.72] md:min-h-0"
              aria-disabled="true"
              role="group"
              aria-label="Pre Trip Inspection App, coming soon"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${local.fleet[2]})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/55 to-navy/20" />
              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-flex min-h-7 items-center border border-white/20 bg-white/10 px-2.5 text-[10px] font-bold tracking-[0.12em] text-white/75 uppercase">
                  Coming soon
                </span>
                <h2 className="mt-3 text-[clamp(1.15rem,2.4vw,1.55rem)] font-bold tracking-[-0.02em] text-white">
                  Pre Trip Inspection App
                </h2>
                <p className="mt-1 text-sm text-white/75">Driver inspection workflow</p>
              </div>
            </div>

            <Link
              to="/signature"
              className="group relative flex min-h-[280px] aspect-square flex-col justify-end overflow-hidden border border-white/15 transition duration-200 hover:-translate-y-0.5 hover:border-sky-light/70 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-light motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:min-h-0"
              aria-label="Open Email Signature Generator"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                style={{ backgroundImage: `url(${local.fleet[0]})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/50 to-navy/10" />
              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-flex min-h-7 items-center border border-sky-light/55 bg-sky/35 px-2.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase">
                  Available
                </span>
                <h2 className="mt-3 text-[clamp(1.15rem,2.4vw,1.55rem)] font-bold tracking-[-0.02em] text-white">
                  Email Signature Generator
                </h2>
                <p className="mt-1 text-sm text-white/75">Build and copy Outlook-ready signatures</p>
                <span className="mt-4 inline-flex min-h-11 items-center bg-sky-light px-4 text-xs font-bold tracking-[0.06em] text-navy uppercase group-hover:bg-[#7ec4e4]">
                  Open tool
                </span>
              </div>
            </Link>
          </main>
        </div>

        <div className="border-t border-white/10 bg-navy/85">
          <p className="mx-auto max-w-[1180px] px-5 py-3 text-center text-[11px] font-semibold tracking-[0.16em] text-sky-light uppercase sm:px-6">
            {SERVICES_LINE}
          </p>
        </div>
      </section>
    </AppShell>
  )
}
