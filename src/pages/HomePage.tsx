import { Link } from 'react-router-dom'
import { local } from '../lib/brand'
import '../styles/home.css'

export function HomePage() {
  return (
    <div className="hub">
      <div className="hub-atmosphere" aria-hidden="true" />

      <header className="hub-hero">
        <img src={local.logoHeader} alt="Bravo Transport LLC" className="hub-logo" />
        <div className="hub-hero-copy">
          <h1 className="hub-title">Bravo Digital Workspace</h1>
          <p className="hub-lede">
            Bravo Transport email signature with your name, title, and contact
            details, then copy the ready-to-use HTML for Gmail, Outlook, or Apple Mail.
          </p>
        </div>
      </header>

      <main className="hub-grid" aria-label="Bravo tools">
        <div
          className="hub-tile hub-tile--soon"
          aria-disabled="true"
          role="group"
          aria-label="Pre Trip Inspection App, coming soon"
        >
          <div
            className="hub-tile-media"
            style={{ backgroundImage: `url(${local.fleet[2]})` }}
          />
          <div className="hub-tile-body">
            <span className="hub-badge">Coming soon</span>
            <h2 className="hub-tile-title">Pre Trip Inspection App</h2>
            <p className="hub-tile-sub">Driver inspection workflow</p>
          </div>
        </div>

        <Link
          to="/signature"
          className="hub-tile hub-tile--active"
          aria-label="Open Email Signature Generator"
        >
          <div
            className="hub-tile-media"
            style={{ backgroundImage: `url(${local.fleet[0]})` }}
          />
          <div className="hub-tile-body">
            <span className="hub-badge hub-badge--live">Available</span>
            <h2 className="hub-tile-title">Email Signature Generator</h2>
            <p className="hub-tile-sub">Build and copy Outlook-ready signatures</p>
            <span className="hub-cta">Open tool</span>
          </div>
        </Link>
      </main>

      <footer className="hub-footer">
        <a href="https://www.bravo-transport.com/en/" target="_blank" rel="noreferrer">
          bravo-transport.com
        </a>
      </footer>
    </div>
  )
}
