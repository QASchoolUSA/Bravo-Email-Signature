import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { SignatureForm } from '../components/SignatureForm'
import { SignaturePreview } from '../components/SignaturePreview'
import { absoluteLogoUrl, defaultFields, type SignatureFields } from '../lib/brand'
import { buildSignatureHtml } from '../lib/buildSignatureHtml'

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
  const [fields, setFields] = useState<SignatureFields>(defaultFields)
  const [status, setStatus] = useState<string | null>(null)

  const html = useMemo(
    () => buildSignatureHtml(fields, { logoUrl: absoluteLogoUrl() }),
    [fields],
  )

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
      <section className="border-b border-navy/10 bg-navy">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 py-6 sm:px-6">
          <Link
            to="/"
            className="inline-flex min-h-11 w-fit items-center text-sm font-bold tracking-[0.04em] text-sky-light hover:text-white"
          >
            ← Workspace
          </Link>
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-sky-light uppercase">Bravo Transport LLC</p>
            <h1 className="mt-1 text-[clamp(1.45rem,2.4vw,1.9rem)] font-bold tracking-[-0.02em] text-white">
              Email Signature Generator
            </h1>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-white/80">
              Bravo Transport email signature with your name, title, and contact details, then
              copy the ready-to-use HTML for Gmail, Outlook, or Apple Mail.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto grid w-full max-w-[1180px] min-w-0 flex-1 grid-cols-1 items-start gap-5 px-5 py-6 sm:px-6 sm:py-8 lg:grid-cols-2">
        <section className="border border-[#d4dee6] bg-white p-5 shadow-[0_18px_48px_rgba(8,65,94,0.12)] sm:p-6">
          <h2 className="text-lg font-bold text-navy">Your details</h2>
          <p className="mt-1 mb-5 text-sm text-grey">
            Title is optional — leave it blank to hide it from the signature.
          </p>
          <SignatureForm fields={fields} onChange={setFields} />
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              disabled={!canExport}
              onClick={copyHtml}
              className="min-h-11 cursor-pointer bg-navy px-5 text-sm font-semibold tracking-[0.02em] text-white transition duration-150 hover:bg-[#0a5275] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Copy HTML
            </button>
            <button
              type="button"
              disabled={!canExport}
              onClick={downloadHtml}
              className="min-h-11 cursor-pointer border border-[#c5d9e6] bg-soft px-5 text-sm font-semibold tracking-[0.02em] text-navy transition duration-150 hover:border-sky disabled:cursor-not-allowed disabled:opacity-45"
            >
              Download HTML
            </button>
          </div>
          {status ? (
            <p className="mt-3 border border-[#c6e3cc] bg-[#eaf6ec] px-3 py-2.5 text-sm text-[#1f5a2c]" role="status">
              {status}
            </p>
          ) : null}
          <details className="mt-4 border-t border-[#d4dee6] pt-3 text-sm text-muted">
            <summary className="cursor-pointer font-semibold text-navy">How to install</summary>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
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

        <section className="min-w-0 overflow-hidden border border-[#d4dee6] bg-white shadow-[0_18px_48px_rgba(8,65,94,0.12)]">
          <SignaturePreview html={html} />
        </section>
      </main>
    </AppShell>
  )
}
