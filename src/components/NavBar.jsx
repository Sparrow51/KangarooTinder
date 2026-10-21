const TABS = [
  {
    id: 'swipe',
    label: 'Swipe',
    icon: <path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-1.5.6-2.6 1.3-3.4C9.5 10 10 11 11 11c0-3 1-6 1-8z" />,
  },
  {
    id: 'matches',
    label: 'Matches',
    icon: <path d="M4 5h16v11H9l-5 4z" />,
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7.5v.5" />
      </>
    ),
  },
]

export default function NavBar({ view, onNavigate, unread }) {
  const active = view === 'chat' ? 'matches' : view

  return (
    <header className="navbar">
      <button className="logo" onClick={() => onNavigate('swipe')} aria-label="Kangaroo Tinder home">
        <span aria-hidden="true">🦘</span> kangaroo<b>tinder</b>
      </button>
      <nav className="tabs" aria-label="Main">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab ${active === t.id ? 'active' : ''}`}
            onClick={() => onNavigate(t.id)}
            aria-current={active === t.id ? 'page' : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">{t.icon}</svg>
            <span className="tab-label">{t.label}</span>
            {t.id === 'matches' && unread > 0 && <span className="badge">{unread}</span>}
          </button>
        ))}
      </nav>
    </header>
  )
}
