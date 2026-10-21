import Photo from './Photo.jsx'

export default function MatchesList({ matches, chats, onOpen }) {
  if (matches.length === 0) {
    return (
      <div className="empty">
        <div className="radar" aria-hidden="true">
          <span>💌</span>
        </div>
        <h2>No matches yet</h2>
        <p>Keep swiping – your soulmate could be one hop away.</p>
      </div>
    )
  }

  const fresh = matches.filter((k) => !chats[k.id])
  const talking = matches.filter((k) => chats[k.id])

  return (
    <div className="matches">
      {fresh.length > 0 && (
        <section>
          <h3 className="section-title">New matches</h3>
          <ul className="new-matches">
            {fresh.map((k) => (
              <li key={k.id}>
                <button onClick={() => onOpen(k.id)}>
                  <Photo src={k.photos[0]} alt={k.name} className="match-thumb" />
                  <span>{k.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {talking.length > 0 && (
        <section>
          <h3 className="section-title">Messages</h3>
          <ul className="threads">
            {talking.map((k) => {
              const last = chats[k.id][chats[k.id].length - 1]
              return (
                <li key={k.id}>
                  <button onClick={() => onOpen(k.id)}>
                    <Photo src={k.photos[0]} alt={k.name} className="thread-avatar" />
                    <span className="thread-text">
                      <b>{k.name}</b>
                      <span>
                        {last.from === 'me' ? 'You: ' : ''}
                        {last.text}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
