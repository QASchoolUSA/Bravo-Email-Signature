type Props = {
  html: string
}

export function SignaturePreview({ html }: Props) {
  return (
    <div className="preview-shell">
      <div className="preview-chrome">
        <span className="preview-dot" />
        <span className="preview-dot" />
        <span className="preview-dot" />
        <span className="preview-title">Live Preview</span>
      </div>
      <div className="preview-canvas">
        <div
          className="preview-signature"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
