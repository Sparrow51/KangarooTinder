import { useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'
import AIBadge from './AIBadge.jsx'

const THRESHOLD = 110 // px of horizontal drag needed to count as a swipe
const FLY_MS = 300

export default function SwipeCard({ kangaroo, index, isTop, forcedDir, onSwipe, onInfo }) {
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false })
  const [fly, setFly] = useState(null)
  const [photo, setPhoto] = useState(0)
  const start = useRef(null)
  const moved = useRef(false)

  // swipe triggered from the buttons or keyboard
  useEffect(() => {
    if (forcedDir) setFly(forcedDir)
  }, [forcedDir])

  useEffect(() => {
    if (!fly) return
    const t = setTimeout(() => onSwipe(fly), FLY_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fly])

  function handlePointerDown(e) {
    if (!isTop || fly) return
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { x: e.clientX, y: e.clientY }
    moved.current = false
    setDrag({ x: 0, y: 0, active: true })
  }

  function handlePointerMove(e) {
    if (!start.current) return
    const x = e.clientX - start.current.x
    const y = e.clientY - start.current.y
    if (Math.hypot(x, y) > 6) moved.current = true
    setDrag({ x, y, active: true })
  }

  function handlePointerUp(e) {
    if (!start.current) return
    const x = e.clientX - start.current.x
    start.current = null

    if (x > THRESHOLD) return setFly('right')
    if (x < -THRESHOLD) return setFly('left')
    setDrag({ x: 0, y: 0, active: false })

    if (!moved.current) handleTap(e)
  }

  function handleTap(e) {
    if (e.target.closest('.card-info')) return onInfo()
    const photos = kangaroo.photos
    if (photos.length < 2) return
    const rect = e.currentTarget.getBoundingClientRect()
    const forward = e.clientX - rect.left > rect.width / 2
    setPhoto((p) => (forward ? Math.min(p + 1, photos.length - 1) : Math.max(p - 1, 0)))
  }

  function handlePointerCancel() {
    start.current = null
    setDrag({ x: 0, y: 0, active: false })
  }

  let transform
  let transition
  if (fly) {
    const dir = fly === 'right' ? 1 : -1
    transform = `translate(${dir * window.innerWidth * 1.3}px, ${drag.y}px) rotate(${dir * 30}deg)`
    transition = `transform ${FLY_MS}ms ease-in`
  } else if (isTop) {
    transform = `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 18}deg)`
    transition = drag.active ? 'none' : 'transform 300ms cubic-bezier(.2,.9,.3,1.3)'
  } else {
    transform = `translateY(${index * 10}px) scale(${1 - index * 0.04})`
    transition = 'transform 300ms ease'
  }

  const likeOpacity = fly === 'right' ? 1 : Math.min(Math.max(drag.x / THRESHOLD, 0), 1)
  const nopeOpacity = fly === 'left' ? 1 : Math.min(Math.max(-drag.x / THRESHOLD, 0), 1)

  return (
    <article
      className={`swipe-card ${isTop ? 'is-top' : ''}`}
      style={{ transform, transition, zIndex: 10 - index }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      aria-label={`${kangaroo.name}, ${kangaroo.age}`}
    >
      <Photo src={kangaroo.photos[photo]} alt={`Photo of ${kangaroo.name}`} className="card-photo" />

      {kangaroo.photos.length > 1 && (
        <div className="photo-bars">
          {kangaroo.photos.map((_, i) => (
            <span key={i} className={i === photo ? 'active' : ''} />
          ))}
        </div>
      )}

      {kangaroo.aiImage && <AIBadge label="AI image" className="card-ai-badge" />}

      <span className="stamp stamp-like" style={{ opacity: likeOpacity }}>LIKE</span>
      <span className="stamp stamp-nope" style={{ opacity: nopeOpacity }}>NOPE</span>

      <div className="card-info">
        <div className="card-title">
          <h2>
            {kangaroo.name} <span className="age">{kangaroo.age}</span>
          </h2>
          <button
            className="info-btn"
            aria-label={`More about ${kangaroo.name}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onInfo}
          >
            i
          </button>
        </div>
        <p className="distance">
          {kangaroo.tagline} · 📍 {kangaroo.distanceKm} km
        </p>
        <p className="tagline">{kangaroo.bio}</p>
        <ul className="chips">
          {kangaroo.interests.slice(0, 3).map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
