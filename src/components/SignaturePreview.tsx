type Props = {
  html: string
}

export function SignaturePreview({ html }: Props) {
  return (
    <div className="flex min-h-full min-w-0 flex-col">
      <div className="flex items-center gap-2 bg-linear-to-r from-navy to-[#0d5a7f] px-4 py-3 text-white">
        <span className="h-2 w-2 rounded-full bg-white/35" />
        <span className="h-2 w-2 rounded-full bg-white/35" />
        <span className="h-2 w-2 rounded-full bg-white/35" />
        <span className="ml-2 text-[11px] font-semibold tracking-[0.14em] uppercase">Live Preview</span>
      </div>
      <div className="min-w-0 overflow-hidden bg-linear-to-b from-white to-[#f7fafc] px-4 py-6 sm:px-5 sm:py-8">
        <div className="preview-signature" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
