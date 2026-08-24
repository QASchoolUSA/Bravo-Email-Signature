import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { AppShell } from '../components/AppShell'
import { ClientStage } from '../components/ClientStage'
import { absoluteLogoUrl, defaultFields, SERVICES_LINE } from '../lib/brand'
import { buildSignatureHtml } from '../lib/buildSignatureHtml'
import { fadeUp, springSoft } from '../lib/motion'

export function HomePage() {
  const reduce = useReducedMotion()
  const previewHtml = useMemo(
    () => buildSignatureHtml(defaultFields, { logoUrl: absoluteLogoUrl() }),
    [],
  )

  return (
    <AppShell>
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12" aria-label="Bravo tools">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <motion.p
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              animate="show"
              transition={springSoft}
              className="text-[12px] font-semibold tracking-[0.22em] text-sky uppercase"
            >
              Bravo Digital Workspace
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              animate="show"
              transition={{ ...springSoft, delay: 0.05 }}
              className="mt-3 max-w-[14ch] text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-navy"
            >
              Internal tools for the next mile.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              animate="show"
              transition={{ ...springSoft, delay: 0.1 }}
              className="mt-4 max-w-[38ch] text-base leading-relaxed text-grey sm:text-lg"
            >
              Build a Bravo email signature and watch it land in the inbox — then copy HTML for Gmail, Outlook, or Apple Mail.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              animate="show"
              transition={{ ...springSoft, delay: 0.14 }}
              className="mt-6"
            >
              <Link
                to="/signature"
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-navy px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0a5275]"
              >
                Open signature generator
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={reduce ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/signature" className="block cursor-pointer" aria-label="Open Email Signature Generator">
              <ClientStage html={previewHtml} compact />
            </Link>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[1240px] grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/signature"
            className="flex min-h-28 cursor-pointer flex-col justify-between rounded-2xl bg-navy p-6 text-white shadow-[0_12px_32px_rgba(8,65,94,0.18)] transition-colors duration-200 hover:bg-[#0a5275]"
            aria-label="Open Email Signature Generator"
          >
            <span className="w-fit rounded-full bg-sky px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase">
              Available
            </span>
            <div>
              <h2 className="text-2xl font-semibold">Email Signature</h2>
              <p className="mt-1 text-sm text-sky-light">Generate, preview, copy HTML</p>
            </div>
          </Link>

          <div
            className="flex min-h-28 flex-col justify-between rounded-2xl border border-line bg-white p-6"
            aria-disabled="true"
            role="group"
            aria-label="Pre Trip Inspection App, coming soon"
          >
            <span className="w-fit rounded-full bg-soft px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-grey uppercase">
              Coming soon
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-navy">Pre Trip Inspection</h2>
              <p className="mt-1 text-sm text-grey">Driver inspection workflow</p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[1240px] text-center text-[11px] font-medium tracking-[0.12em] text-grey uppercase">
          {SERVICES_LINE}
        </p>
      </main>
    </AppShell>
  )
}
