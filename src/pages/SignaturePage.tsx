import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AppShell } from '../components/AppShell'
import { ClientStage } from '../components/ClientStage'
import { SignatureForm } from '../components/SignatureForm'
import { absoluteLogoUrl, defaultFields, type SignatureFields } from '../lib/brand'
import { buildSignatureHtml } from '../lib/buildSignatureHtml'
import { fadeUp, springSoft } from '../lib/motion'

function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'signature'
  )
}

export function SignaturePage() {
  const reduce = useReducedMotion()
  const [fields, setFields] = useState<SignatureFields>(defaultFields)
  const [status, setStatus] = useState<string | null>(null)

  const html = useMemo(
    () => buildSignatureHtml(fields, { logoUrl: absoluteLogoUrl() }),
    [fields],
  )

  useEffect(() => {
    if (!status) return
    const id = window.setTimeout(() => setStatus(null), 4000)
    return () => window.clearTimeout(id)
  }, [status])

  async function copyHtml() {
    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([html], { type: 'text/plain' }),
        })
        await navigator.clipboard.write([item])
      } else {
        await navigator.clipboard.writeText(html)
      }
      setStatus('Signature HTML copied. Paste into Gmail, Outlook, or Apple Mail.')
    } catch {
      try {
        await navigator.clipboard.writeText(html)
        setStatus('Signature HTML copied as plain text.')
      } catch {
        setStatus('Could not copy. Use Download instead.')
      }
    }
  }

  function downloadHtml() {
    const blob = new Blob(
      [
        `<!DOCTYPE html>\n<html><head><meta charset="utf-8"><title>${fields.fullName} — Bravo Signature</title></head><body style="margin:24px;background:#fff;">\n${html}\n</body></html>\n`,
      ],
      { type: 'text/html;charset=utf-8' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bravo-signature-${slugify(fields.fullName)}.html`
    a.click()
    URL.revokeObjectURL(url)
    setStatus('HTML file downloaded.')
  }

  const canExport = fields.fullName.trim().length > 0 && fields.email.trim().length > 0

  return (
    <AppShell>
      <section className="px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="mx-auto w-full max-w-[1240px]">
          <Link
            to="/"
            className="inline-flex min-h-11 w-fit cursor-pointer items-center text-sm font-semibold text-navy hover:text-sky"
          >
            ← Workspace
          </Link>
          <motion.p
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            animate="show"
            transition={springSoft}
            className="mt-4 text-[12px] font-semibold tracking-[0.22em] text-sky uppercase"
          >
            Bravo Digital Workspace
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            animate="show"
            transition={{ ...springSoft, delay: 0.05 }}
            className="mt-2 max-w-[16ch] text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-navy"
          >
            Email signature generator
          </motion.h1>
        </div>
      </section>

      <main className="flex-1 pb-28 lg:pb-16">
        <div className="mx-auto grid w-full max-w-[1320px] min-w-0 grid-cols-1 items-start gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <section className="order-2 rounded-2xl border border-line bg-white p-5 shadow-[0_8px_24px_rgba(8,65,94,0.06)] sm:p-7 lg:order-1">
            <h2 className="text-lg font-semibold text-navy">Your details</h2>
            <p className="mt-1 mb-5 text-sm text-grey">
              Title is optional — leave it blank to hide it from the signature.
            </p>
            <SignatureForm fields={fields} onChange={setFields} />
            <div className="mt-5 hidden flex-wrap gap-2.5 lg:flex">
              <ExportButtons canExport={canExport} onCopy={copyHtml} onDownload={downloadHtml} />
            </div>
            <details className="mt-5 border-t border-line pt-3 text-sm text-grey">
              <summary className="cursor-pointer font-semibold text-navy">How to install</summary>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-charcoal">
                <li>
                  <strong>Gmail:</strong> Settings → See all settings → General → Signature → paste
                  (Cmd/Ctrl+V).
                </li>
                <li>
                  <strong>Outlook (desktop):</strong> File → Options → Mail → Signatures → paste into
                  the editor.
                </li>
                <li>
                  <strong>Apple Mail:</strong> Settings → Signatures → paste into a new signature.
                </li>
              </ul>
            </details>
          </section>

          <section className="order-1 min-w-0 lg:order-2">
            <ClientStage html={html} fromName={fields.fullName} fromEmail={fields.email} />
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 p-3 backdrop-blur-md lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-2.5">
          <ExportButtons canExport={canExport} onCopy={copyHtml} onDownload={downloadHtml} full />
        </div>
      </div>

      <AnimatePresence>
        {status ? (
          <motion.p
            key={status}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed right-4 bottom-24 z-30 max-w-sm rounded-xl bg-navy px-4 py-3 text-sm text-white shadow-[0_12px_32px_rgba(8,65,94,0.24)] lg:bottom-8"
            role="status"
          >
            {status}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </AppShell>
  )
}

function ExportButtons({
  canExport,
  onCopy,
  onDownload,
  full = false,
}: {
  canExport: boolean
  onCopy: () => void
  onDownload: () => void
  full?: boolean
}) {
  const width = full ? 'flex-1' : ''
  return (
    <>
      <button
        type="button"
        disabled={!canExport}
        onClick={onCopy}
        className={`${width} min-h-11 cursor-pointer rounded-full bg-navy px-5 text-sm font-semibold text-white transition duration-150 hover:bg-[#0a5275] disabled:cursor-not-allowed disabled:opacity-45`}
      >
        Copy HTML
      </button>
      <button
        type="button"
        disabled={!canExport}
        onClick={onDownload}
        className={`${width} min-h-11 cursor-pointer rounded-full bg-sky px-5 text-sm font-semibold text-white transition duration-150 hover:bg-sky-light disabled:cursor-not-allowed disabled:opacity-45`}
      >
        Download HTML
      </button>
    </>
  )
}
