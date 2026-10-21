import { useEffect, useState } from 'react'
import SwipeCard from './SwipeCard.jsx'
import ActionButtons from './ActionButtons.jsx'

export default function SwipeDeck({ deck, onSwipe, onInfo, paused }) {
  const [forced, setForced] = useState(null) // { id, dir } while a button-swipe animates
  const top = deck[0]

  function swipeTop(dir) {
    if (!top || forced) return
    setForced({ id: top.id, dir })
  }

  useEffect(() => {
    if (paused) return
    function onKey(e) {
      if (e.key === 'ArrowLeft') swipeTop('left')
      else if (e.key === 'ArrowRight') swipeTop('right')
      else if (e.key === 'ArrowUp' && top) onInfo(top.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="deck-wrap">
      <div className="deck">
        {deck
          .slice(0, 3)
          .map((k, i) => (
            <SwipeCard
              key={k.id}
              kangaroo={k}
              index={i}
              isTop={i === 0}
              forcedDir={forced?.id === k.id ? forced.dir : null}
              onSwipe={(dir) => {
                setForced(null)
                onSwipe(k.id, dir)
              }}
              onInfo={() => onInfo(k.id)}
            />
          ))
          .reverse()}
      </div>
      <ActionButtons
        onNope={() => swipeTop('left')}
        onInfo={() => top && onInfo(top.id)}
        onLike={() => swipeTop('right')}
      />
    </div>
  )
}
