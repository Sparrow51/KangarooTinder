import Photo from './Photo.jsx'

export default function MatchModal({ kangaroo, onMessage, onClose }) {
  return (
    <div className="overlay match-overlay" role="dialog" aria-modal="true" aria-label="It's a match">
      <div className="match-content">
        <h2 className="match-title">It's a Match!</h2>
        <p>You and {kangaroo.name} have liked each other.</p>
        <div className="match-avatars">
          <div className="avatar avatar-you" aria-label="You">🙋</div>
          <span className="match-heart" aria-hidden="true">💘</span>
          <Photo src={kangaroo.photos[0]} alt={kangaroo.name} className="avatar" />
        </div>
        <button className="btn btn-primary" onClick={onMessage} autoFocus>
          Send a message
        </button>
        <button className="btn btn-ghost light" onClick={onClose}>
          Keep swiping
        </button>
      </div>
    </div>
  )
}
