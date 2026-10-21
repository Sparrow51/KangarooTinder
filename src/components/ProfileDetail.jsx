import { useEffect, useState } from 'react'
import Photo from './Photo.jsx'
import AIBadge from './AIBadge.jsx'

const STAT_LABELS = {
  hopDistance: 'Best hop',
  pouch: 'Pouch status',
  favouriteSnack: 'Favourite snack',
}

export default function ProfileDetail({ kangaroo, canDecide, onClose, onDecide }) {
  const [photo, setPhoto] = useState(0)
  const count = kangaroo.photos.length

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="overlay profile-overlay" role="dialog" aria-modal="true" aria-label={`${kangaroo.name}'s profile`}>
      <div className="profile-sheet">
        <div className="profile-photos">
          <Photo src={kangaroo.photos[photo]} alt={`Photo of ${kangaroo.name}`} className="profile-photo" />
          {count > 1 && (
            <>
              <button
                className="photo-nav prev"
                aria-label="Previous photo"
                onClick={() => setPhoto((p) => (p - 1 + count) % count)}
              />
              <button
                className="photo-nav next"
                aria-label="Next photo"
                onClick={() => setPhoto((p) => (p + 1) % count)}
              />
              <div className="photo-bars">
                {kangaroo.photos.map((_, i) => (
                  <span key={i} className={i === photo ? 'active' : ''} />
                ))}
              </div>
            </>
          )}
          {kangaroo.aiImage && <AIBadge label="AI image" className="card-ai-badge" />}
          <button className="close-btn" onClick={onClose} aria-label="Close profile">
            ↓
          </button>
        </div>

        <div className="profile-body">
          <h2>
            {kangaroo.name} <span className="age">{kangaroo.age}</span>
          </h2>
          <p className="distance">📍 {kangaroo.distanceKm} km away</p>
          <p className="tagline">{kangaroo.tagline}</p>

          <section>
            <h3>
              About me {kangaroo.aiText && <AIBadge label="AI text" />}
            </h3>
            <p>{kangaroo.bio}</p>
          </section>

          <section>
            <h3>Interests</h3>
            <ul className="chips chips-light">
              {kangaroo.interests.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Kangaroo stats</h3>
            <dl className="stats">
              {Object.entries(kangaroo.stats).map(([key, value]) => (
                <div key={key}>
                  <dt>{STAT_LABELS[key] ?? key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {canDecide && (
          <div className="actions profile-actions">
            <button className="action action-nope" onClick={() => onDecide('left')} aria-label="Nope">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <button className="action action-like" onClick={() => onDecide('right')} aria-label="Like">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
