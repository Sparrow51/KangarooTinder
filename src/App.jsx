import { useEffect, useMemo, useRef, useState } from 'react'
import kangaroos from './data/kangaroos.json'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import NavBar from './components/NavBar.jsx'
import SwipeDeck from './components/SwipeDeck.jsx'
import EmptyDeck from './components/EmptyDeck.jsx'
import MatchModal from './components/MatchModal.jsx'
import ProfileDetail from './components/ProfileDetail.jsx'
import MatchesList from './components/MatchesList.jsx'
import Chat from './components/Chat.jsx'
import About from './components/About.jsx'

const byId = Object.fromEntries(kangaroos.map((k) => [k.id, k]))
const FALLBACK_REPLY = (name) => `*${name} hopped off to graze. Try again later!* 🦘`

export default function App() {
  const [view, setView] = useState('swipe') // swipe | matches | chat | about
  const [likes, setLikes] = useLocalStorage('kt.likes', [])
  const [passes, setPasses] = useLocalStorage('kt.passes', [])
  const [matches, setMatches] = useLocalStorage('kt.matches', [])
  const [chats, setChats] = useLocalStorage('kt.chats', {})
  const [profileId, setProfileId] = useState(null)
  const [chatId, setChatId] = useState(null)
  const [newMatchId, setNewMatchId] = useState(null)
  const [typing, setTyping] = useState({})
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const seen = useMemo(() => new Set([...likes, ...passes]), [likes, passes])
  const deck = kangaroos.filter((k) => !seen.has(k.id))

  function handleSwipe(id, dir) {
    if (seen.has(id)) return
    if (dir === 'right') {
      setLikes((l) => [...l, id])
      if (byId[id].likesYou) {
        setMatches((m) => (m.includes(id) ? m : [...m, id]))
        setNewMatchId(id)
      }
    } else {
      setPasses((p) => [...p, id])
    }
  }

  function openChat(id) {
    setChats((c) =>
      c[id] ? c : { ...c, [id]: [{ from: 'them', text: byId[id].openingLine }] }
    )
    setChatId(id)
    setNewMatchId(null)
    setProfileId(null)
    setView('chat')
  }

  function sendMessage(id, text) {
    setChats((c) => ({ ...c, [id]: [...(c[id] || []), { from: 'me', text }] }))
    setTyping((t) => ({ ...t, [id]: true }))
    const delay = 900 + Math.random() * 900
    timers.current.push(
      setTimeout(() => {
        setChats((c) => {
          const thread = c[id] || []
          // the opening line counts as their first message, so replies start at index 0 after it
          const theirCount = thread.filter((m) => m.from === 'them').length
          const reply = byId[id].replies[theirCount - 1] ?? FALLBACK_REPLY(byId[id].name)
          return { ...c, [id]: [...thread, { from: 'them', text: reply }] }
        })
        setTyping((t) => ({ ...t, [id]: false }))
      }, delay)
    )
  }

  function resetAll() {
    setLikes([])
    setPasses([])
    setMatches([])
    setChats({})
    setChatId(null)
    setView('swipe')
  }

  const profile = profileId && byId[profileId]
  const profileUndecided = profile && !seen.has(profile.id)

  return (
    <div className="app">
      <NavBar
        view={view}
        onNavigate={(v) => {
          setView(v)
          setChatId(null)
        }}
        unread={matches.filter((id) => !chats[id]).length}
      />

      <main className="app-main">
        {view === 'swipe' &&
          (deck.length > 0 ? (
            <SwipeDeck
              deck={deck}
              onSwipe={handleSwipe}
              onInfo={setProfileId}
              paused={!!profile || !!newMatchId}
            />
          ) : (
            <EmptyDeck onReset={resetAll} matchCount={matches.length} onMatches={() => setView('matches')} />
          ))}

        {view === 'matches' && (
          <MatchesList matches={matches.map((id) => byId[id])} chats={chats} onOpen={openChat} />
        )}

        {view === 'chat' && chatId && (
          <Chat
            kangaroo={byId[chatId]}
            messages={chats[chatId] || []}
            typing={!!typing[chatId]}
            onSend={(text) => sendMessage(chatId, text)}
            onBack={() => {
              setChatId(null)
              setView('matches')
            }}
            onProfile={() => setProfileId(chatId)}
          />
        )}

        {view === 'about' && <About onReset={resetAll} />}
      </main>

      {profile && (
        <ProfileDetail
          kangaroo={profile}
          canDecide={profileUndecided}
          onClose={() => setProfileId(null)}
          onDecide={(dir) => {
            setProfileId(null)
            handleSwipe(profile.id, dir)
          }}
        />
      )}

      {newMatchId && (
        <MatchModal
          kangaroo={byId[newMatchId]}
          onMessage={() => openChat(newMatchId)}
          onClose={() => setNewMatchId(null)}
        />
      )}
    </div>
  )
}
