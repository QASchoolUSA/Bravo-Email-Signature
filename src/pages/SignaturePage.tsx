import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SignatureForm } from '../components/SignatureForm'
import { SignaturePreview } from '../components/SignaturePreview'
import { defaultFields, local, absoluteLogoUrl, type SignatureFields } from '../lib/brand'
import { buildSignatureHtml } from '../lib/buildSignatureHtml'
import '../styles/app.css'

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
    <div className="app">
      <Link to="/" className="back-tools">
        ← Tools
      </Link>

      <header className="hero">
        <img src={local.logoHeader} alt="Bravo Transport LLC" className="hero-logo" />
        <div className="hero-brand">
          <p className="eyebrow">Bravo Transport LLC</p>
          <h1>Email Signature Generator</h1>
          <p className="lede">
            Build a client-ready signature with your name and title, then copy or
            download the HTML for Gmail, Outlook, or Apple Mail.
          </p>
        </div>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <div className="panel-head">
            <h2>Your details</h2>
            <p>Title is optional — leave it blank to hide it from the signature.</p>
          </div>
          <SignatureForm fields={fields} onChange={setFields} />
          <div className="actions">
            <button type="button" className="btn btn-primary" disabled={!canExport} onClick={copyHtml}>
              Copy HTML
            </button>
            <button type="button" className="btn btn-secondary" disabled={!canExport} onClick={downloadHtml}>
              Download HTML
            </button>
          </div>
          {status ? <p className="status" role="status">{status}</p> : null}
          <details className="tips">
            <summary>How to install</summary>
            <ul>
              <li>
                <strong>Gmail:</strong> Settings → See all settings → General → Signature →
                paste (Cmd/Ctrl+V).
              </li>
              <li>
                <strong>Outlook (desktop):</strong> File → Options → Mail → Signatures →
                paste into the editor.
              </li>
              <li>
                <strong>Apple Mail:</strong> Settings → Signatures → paste into a new
                signature.
              </li>
            </ul>
          </details>
        </section>

        <section className="panel preview-panel">
          <SignaturePreview html={html} />
        </section>
      </main>

      <footer className="footer">
        <span>Assets &amp; brand colors from bravo-transport.com</span>
        <a href="https://www.bravo-transport.com/en/" target="_blank" rel="noreferrer">
          www.bravo-transport.com
        </a>
      </footer>
    </div>
  )
}
