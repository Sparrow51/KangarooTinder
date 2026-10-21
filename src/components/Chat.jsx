import { useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'
import AIBadge from './AIBadge.jsx'

export default function Chat({ kangaroo, messages, typing, onSend, onBack, onProfile }) {
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, typing])

  function submit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  return (
    <div className="chat">
      <header className="chat-header">
        <button className="back-btn" onClick={onBack} aria-label="Back to matches">
          ‹
        </button>
        <button className="chat-who" onClick={onProfile}>
          <Photo src={kangaroo.photos[0]} alt="" className="thread-avatar small" />
          <b>{kangaroo.name}</b>
        </button>
        {kangaroo.aiText && <AIBadge label="AI replies" />}
      </header>

      <ol className="messages" aria-live="polite">
        <li className="system-msg">You matched with {kangaroo.name} 💘</li>
        {messages.map((m, i) => (
          <li key={i} className={`bubble ${m.from === 'me' ? 'me' : 'them'}`}>
            {m.text}
          </li>
        ))}
        {typing && (
          <li className="bubble them typing" aria-label={`${kangaroo.name} is typing`}>
            <span />
            <span />
            <span />
          </li>
        )}
        <li ref={endRef} aria-hidden="true" />
      </ol>

      <form className="composer" onSubmit={submit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${kangaroo.name}…`}
          aria-label="Message"
          maxLength={300}
        />
        <button type="submit" disabled={!text.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
