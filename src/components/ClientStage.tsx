import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { springSoft } from '../lib/motion'

type Props = {
  html: string
  compact?: boolean
  fromName?: string
  fromEmail?: string
}

const threads = [
  { id: 'active', from: 'You', subject: 'Re: Load out of Chicago', preview: 'Thanks for the quote —', unread: false },
  { id: '2', from: 'Dispatch', subject: 'Lane rates — Q3', preview: 'Updated sheet is in the folder.', unread: true },
  { id: '3', from: 'Safety', subject: 'Pre-trip reminder', preview: 'Please complete before 06:00.', unread: false },
]

export function ClientStage({
  html,
  compact = false,
  fromName = 'Dimitri Tarus',
  fromEmail = 'dimitri@bravo-transport.com',
}: Props) {
  const reduce = useReducedMotion()
  const [play, setPlay] = useState(0)

  useEffect(() => {
    setPlay((n) => n + 1)
  }, [html])

  function replay() {
    setPlay((n) => n + 1)
  }

  return (
    <div className={`flex min-w-0 flex-col ${compact ? '' : 'h-full'}`}>
      {!compact ? (
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-grey uppercase">Inbox preview</p>
          <button
            type="button"
            onClick={replay}
            className="min-h-11 cursor-pointer rounded-full px-3 text-xs font-semibold tracking-[0.06em] text-navy uppercase hover:text-sky"
          >
            Replay
          </button>
        </div>
      ) : null}

      <motion.div
        layoutId={reduce ? undefined : 'gmail-letter'}
        className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_rgba(8,65,94,0.12)]"
      >
        <GmailToolbar />
        <div className={`grid min-w-0 ${compact ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-[200px_minmax(0,1fr)]'}`}>
          {!compact ? (
            <aside className="hidden border-r border-line bg-[#f6f8fc] xl:block">
              <p className="px-3 pt-3 pb-2 text-[11px] font-semibold tracking-[0.08em] text-grey uppercase">Inbox</p>
              <ul>
                {threads.map((thread) => (
                  <li
                    key={thread.id}
                    className={`border-l-4 px-3 py-2.5 ${
                      thread.id === 'active'
                        ? 'border-sky bg-white'
                        : 'border-transparent hover:bg-white/70'
                    }`}
                  >
                    <p className={`text-[12px] ${thread.unread ? 'font-semibold text-[#202124]' : 'font-medium text-[#202124]'}`}>
                      {thread.id === 'active' ? fromName : thread.from}
                    </p>
                    <p className="truncate text-[12px] text-[#5f6368]">{thread.subject}</p>
                    <p className="truncate text-[11px] text-[#80868b]">{thread.preview}</p>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className="min-w-0 bg-white">
            <div className="border-b border-[#eee] px-5 py-4 sm:px-6">
              <p className="text-[17px] font-medium text-[#202124]">Re: Load out of Chicago</p>
              <div className="mt-2.5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
                  {initials(fromName)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-[#202124]">{fromName}</p>
                  <p className="truncate text-[13px] text-[#5f6368]">to me · {fromEmail}</p>
                </div>
              </div>
            </div>

            <div className={`bg-white ${compact ? 'px-5 py-5 sm:px-7 sm:py-6' : 'max-h-[min(78vh,760px)] overflow-auto px-5 py-6 sm:px-8 sm:py-7'}`}>
              <p className="mb-5 text-base leading-relaxed text-[#202124]">Thanks for the quote —</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={play}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { ...springSoft, delay: compact ? 0.1 : 0.22 }}
                >
                  <ScaledSignature html={html} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'B'
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function GmailToolbar() {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-white px-3 py-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c5221f] text-sm font-bold text-white">
        M
      </span>
      <div className="flex h-9 min-w-0 flex-1 items-center rounded-full bg-[#f1f3f4] px-4 text-[12px] text-[#5f6368]">
        Search mail
      </div>
    </div>
  )
}

function ScaledSignature({ html }: { html: string }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [fluid, setFluid] = useState(false)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return

    function measure() {
      if (!frame || !inner) return
      const width = frame.clientWidth
      if (width < 560) {
        setFluid(true)
        setScale(1)
        setHeight(undefined)
        return
      }
      setFluid(false)
      const next = Math.min(1.55, Math.max(1, width / 600))
      setScale(next)
      setHeight(inner.scrollHeight * next)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(frame)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [html])

  return (
    <div ref={frameRef} className={`preview-frame ${fluid ? 'preview-frame--fluid' : ''}`} style={fluid ? undefined : { height }}>
      <div
        ref={innerRef}
        className="preview-signature origin-top-left"
        style={fluid ? undefined : { transform: `scale(${scale})` }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
