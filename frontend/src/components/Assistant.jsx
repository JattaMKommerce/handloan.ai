import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { site } from '../config/site.js'
import { PARTNER_LINE, appHref, appLabel, appLinkProps, whatsappHref as WHATSAPP } from '../lib/derived.js'

const BOT = site.chatbot

/**
 * Pop-up messages shown beside the girl, one at a time.
 * `chat: true` opens the chatbot. Keep them welcoming and factual — Meta rejects
 * copy that promises approval, speed ("instant", "in 10 minutes") or targets
 * money worries ("urgent cash?").
 */
const MESSAGES = [
  { text: 'Hi there! 👋 Welcome to HandLoan.ai', chat: true },
  { text: 'Looking for a personal or business loan? Let us explain your options.', href: '/services/' },
  { text: 'Start a loan enquiry online — no PAN or Aadhaar needed ✅', href: '/contact/#enquiry' },
  { text: 'Plan ahead — check your EMI before you apply 🧮', href: '/emi-calculator/' },
  { text: 'No fee from HandLoan.ai for your enquiry. Never pay anyone upfront 🙌', href: '/faq/' },
  { text: 'Have a question? Tap here to chat with me 💬', chat: true },
  { text: 'Prefer WhatsApp? We’re there too 📱', href: WHATSAPP, external: true },
]

const FIRST_DELAY = 2500 // before the first message
const TYPING = 1000 // "typing…" dots
const SHOW = 5200 // each message stays this long
const GAP = 900 // between messages
const REST = 45000 // pause before the messages start again

export default function Assistant() {
  const [menuOpen, setMenuOpen] = useState(false) // fallback menu (when no chatbot)
  const [chatOpen, setChatOpen] = useState(false) // iamkratu chat (iframe)
  const [chatMounted, setChatMounted] = useState(false) // iframe loads on first tap, then stays
  const [frameReady, setFrameReady] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [phase, setPhase] = useState('idle') // idle | typing | show
  const [idx, setIdx] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [hover, setHover] = useState(false)
  const videoRef = useRef(null)
  const stillRef = useRef(null)
  const mediaRef = useRef(null)

  // Load the transparent video after the page has painted, so it never slows the page down.
  // Chrome/Edge/Firefox/Android play a VP9 WebM with alpha. Safari/iPhone can't show WebM
  // transparency, so they get an animated WebP (also transparent) in the <img> instead.
  useEffect(() => {
    const v = videoRef.current
    const img = stillRef.current
    const box = mediaRef.current
    if (!v || !img || !box) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined // keep the still
    const ua = navigator.userAgent
    const webkitOnly =
      /iP(hone|ad|od)/.test(ua) || (/Safari\//.test(ua) && !/(Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android)/.test(ua))
    const t = setTimeout(() => {
      if (webkitOnly) {
        img.src = '/video/assistant.webp'
        return
      }
      v.addEventListener('playing', () => box.classList.add('is-playing'), { once: true })
      v.muted = true
      v.src = '/video/assistant.webm'
      v.play().catch(() => {})
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  // Esc closes the chat / menu
  useEffect(() => {
    if (!chatOpen && !menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setChatOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chatOpen, menuOpen])

  // Message timeline: idle → typing → show → idle (next message)
  useEffect(() => {
    if (menuOpen || chatOpen || dismissed) return undefined
    if (phase === 'show' && hover) return undefined // pause while the visitor reads
    let delay
    let next
    if (phase === 'idle') {
      delay = idx === 0 ? (cycle === 0 ? FIRST_DELAY : REST) : GAP
      next = () => setPhase('typing')
    } else if (phase === 'typing') {
      delay = TYPING
      next = () => setPhase('show')
    } else {
      delay = SHOW
      next = () => {
        setPhase('idle')
        if (idx + 1 >= MESSAGES.length) {
          setIdx(0)
          setCycle((c) => c + 1)
        } else setIdx(idx + 1)
      }
    }
    const t = setTimeout(next, delay)
    return () => clearTimeout(t)
  }, [phase, idx, cycle, menuOpen, chatOpen, dismissed, hover])

  // × hides the messages on this page only; they start again on the next page
  function dismiss() {
    setDismissed(true)
    setPhase('idle')
  }

  /** Tap on the girl (or a "chat" message): open the chatbot, else the fallback menu. */
  function startChat() {
    setHover(false)
    if (BOT.iframeSrc) {
      setChatMounted(true)
      setMenuOpen(false)
      setChatOpen((v) => !v)
      return
    }
    setMenuOpen((v) => !v)
  }

  const msg = MESSAGES[idx]
  const anyOpen = menuOpen || chatOpen
  const showBubble = !anyOpen && !dismissed && phase !== 'idle'

  return (
    <div className={`assistant ${anyOpen ? 'assistant--open' : ''}`}>
      {chatMounted ? (
        <div
          className={`assistant__chat ${chatOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-label={BOT.title}
          aria-hidden={!chatOpen}
        >
          <div className="assistant__chat-body">
            {!frameReady ? (
              <div className="assistant__chat-loading">
                <span className="assistant__typing" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                Connecting you to our assistant…
              </div>
            ) : null}
            <iframe
              src={BOT.iframeSrc}
              title={`${BOT.title} chat`}
              allow="microphone; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
              onLoad={() => setFrameReady(true)}
            />
          </div>
          <p className="assistant__chat-note">
            <strong>AI assistant</strong> · It can&apos;t approve loans or make lending decisions. {site.brand} is not a
            lender.
            Talk to a person:{' '}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            · <a href={`tel:${site.contact.phoneHref}`}>Call</a>
          </p>
        </div>
      ) : null}

      {menuOpen ? (
        <div className="assistant__panel" role="dialog" aria-label="How can we help?">
          <div className="assistant__panel-head">
            <img src="/video/assistant-face.jpg" alt="" width="48" height="48" />
            <div>
              <p className="assistant__panel-title">Hi there! 👋</p>
              <p className="assistant__panel-sub">How can we help you today?</p>
            </div>
            <button type="button" className="assistant__x" aria-label="Close" onClick={() => setMenuOpen(false)}>
              <Icon name="x" size={20} />
            </button>
          </div>
          <div className="assistant__actions">
            <a className="assistant__action assistant__action--wa" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} /> Chat on WhatsApp
            </a>
            <a className="assistant__action" href={`tel:${site.contact.phoneHref}`}>
              <Icon name="phone" size={18} /> Call {site.contact.phoneDisplay}
            </a>
            <a className="assistant__action" href="/services/">
              <Icon name="briefcase" size={18} /> Explore loan options
            </a>
            <a className="assistant__action" href="/emi-calculator/">
              <Icon name="calculator" size={18} /> Calculate your EMI
            </a>
            <a className="assistant__action" href={appHref} {...appLinkProps}>
              <Icon name="smartphone" size={18} /> {appLabel}
            </a>
          </div>
          <p className="assistant__fine">
            {site.brand} is not a lender. {PARTNER_LINE}
          </p>
        </div>
      ) : null}

      {showBubble ? (
        <div
          className="assistant__bubble"
          key={`${cycle}-${idx}-${phase}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {phase === 'typing' ? (
            <span className="assistant__typing" aria-label="typing">
              <i />
              <i />
              <i />
            </span>
          ) : msg.href ? (
            <a href={msg.href} {...(msg.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {msg.text}
            </a>
          ) : (
            <button type="button" className="assistant__bubble-btn" onClick={startChat}>
              {msg.text}
            </button>
          )}
          <button type="button" className="assistant__bubble-x" aria-label="Hide messages" onClick={dismiss}>
            <Icon name="x" size={14} />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="assistant__avatar"
        aria-label={anyOpen ? 'Close chat' : 'Chat with us'}
        aria-expanded={anyOpen}
        onClick={startChat}
      >
        <span className="assistant__media" ref={mediaRef}>
          <img ref={stillRef} src="/video/assistant.png" alt="" width="480" height="360" decoding="async" />
          <video ref={videoRef} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        </span>
        <span className="assistant__badge" aria-hidden="true">
          <Icon name={anyOpen ? 'x' : BOT.iframeSrc ? 'message' : 'whatsapp'} size={16} strokeWidth={2.2} />
        </span>
      </button>
    </div>
  )
}
