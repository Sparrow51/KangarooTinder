export default function EmptyDeck({ onReset, matchCount, onMatches }) {
  return (
    <div className="empty">
      <div className="radar" aria-hidden="true">
        <span>🦘</span>
      </div>
      <h2>No more kangaroos nearby</h2>
      <p>You've seen every roo in the outback. Check back after the next mob hops into town.</p>
      {matchCount > 0 && (
        <button className="btn btn-primary" onClick={onMatches}>
          See your {matchCount} match{matchCount === 1 ? '' : 'es'}
        </button>
      )}
      <button className="btn btn-ghost" onClick={onReset}>
        Start over
      </button>
    </div>
  )
}
