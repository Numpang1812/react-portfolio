import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './PangGPT.css'

const chatbotAvatar = '/panggpt.jpg'

/* ── Types ──────────────────────────────────── */
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/* ── Suggestion chips shown on empty state ─── */
const SUGGESTIONS = [
  "What's your background?",
  "What are you passionate about?",
  "What projects have you built?",
  "How do you approach problem-solving?",
]

/* ── Main Component ─────────────────────────── */
export default function PangGPT() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isWidgetVisible, setIsWidgetVisible] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  /* Lock body scroll when chat is open */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [isOpen])

  /* Escape key to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  const openChat = () => {
    setIsOpen(true)
    setIsWidgetVisible(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsWidgetVisible(true)
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/panggpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json().catch(() => null)
      const reply = data?.reply ?? "Hmm, I couldn't process that. Try again?"

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again later!",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const handleSuggestion = (text: string) => sendMessage(text)

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* ── Floating Widget ── */}
      {isWidgetVisible && (
        <button
          id="panggpt-widget"
          className="panggpt-widget"
          onClick={openChat}
          aria-label="Open PangGPT chat"
        >
          {/* Animated ring */}
          <span className="panggpt-ring panggpt-ring--1" />
          <span className="panggpt-ring panggpt-ring--2" />

          {/* Avatar */}
          <div className="panggpt-widget-avatar">
            <img src={chatbotAvatar} alt="PangGPT" />
          </div>

          {/* Title */}
          <div className="panggpt-widget-title">PangGPT 1.1</div>

          {/* Badge */}
          <span className="panggpt-online-dot" aria-hidden="true" />

          {/* Subtitle */}
          <div className="panggpt-widget-subtitle">Ask Me Anything!</div>
        </button>
      )}

      {/* ── Chat Screen (Portal) ── */}
      {isOpen && createPortal(
        <div className="panggpt-backdrop" role="presentation" onClick={closeChat}>
          <div
            className="panggpt-window"
            role="dialog"
            aria-modal="true"
            aria-label="PangGPT Chat"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="panggpt-header">
              <div className="panggpt-header-avatar">
                <img src={chatbotAvatar} alt="PangGPT" />
                <span className="panggpt-header-dot" aria-hidden="true" />
              </div>
              <div className="panggpt-header-info">
                <span className="panggpt-header-name">PangGPT 1.1</span>
                <span className="panggpt-header-status">
                  {isLoading ? 'Thinking…' : 'Online'}
                </span>
              </div>
              <button
                id="panggpt-close-btn"
                className="panggpt-close-btn"
                onClick={closeChat}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="panggpt-messages" role="log" aria-live="polite">
              {/* Intro card */}
              {messages.length === 0 && (
                <div className="panggpt-intro">
                  <div className="panggpt-intro-avatar">
                    <img src={chatbotAvatar} alt="Pang" />
                  </div>
                  <div className="panggpt-intro-bubble">
                    <p>
                      Hey there! 👋 I'm <strong>PangGPT</strong> — an AI version of{' '}
                      <strong>Piseth Tyvirakpoung</strong>. I can tell you about my experiences,
                      projects, hobbies, and pretty much anything about me. Ask me anything!
                    </p>
                  </div>
                  <div className="panggpt-suggestions">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        className="panggpt-suggestion-chip"
                        onClick={() => handleSuggestion(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`panggpt-msg panggpt-msg--${msg.role}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="panggpt-msg-avatar">
                      <img src={chatbotAvatar} alt="PangGPT" />
                    </div>
                  )}
                  <div className="panggpt-msg-body">
                    <div className="panggpt-msg-bubble">{msg.content}</div>
                    <span className="panggpt-msg-time">{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="panggpt-msg panggpt-msg--assistant">
                  <div className="panggpt-msg-avatar">
                    <img src={chatbotAvatar} alt="PangGPT" />
                  </div>
                  <div className="panggpt-msg-body">
                    <div className="panggpt-msg-bubble panggpt-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="panggpt-input-bar">
              <textarea
                ref={inputRef}
                id="panggpt-input"
                className="panggpt-input"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me something…"
                rows={1}
                disabled={isLoading}
                aria-label="Chat input"
              />
              <button
                id="panggpt-send-btn"
                className={`panggpt-send-btn ${inputValue.trim() ? 'panggpt-send-btn--active' : ''}`}
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
