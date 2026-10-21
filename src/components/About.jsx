const TOOLS = [
  { name: 'Higgsfield', role: 'All 44 kangaroo profile photos', type: 'Image generator' },
  { name: 'ChatGPT', role: 'The 44 profile bios', type: 'Language model' },
  {
    name: 'Claude Code',
    role: 'All of the programming (React + Vite), plus names, taglines, stats and chat lines',
    type: 'AI coding agent',
  },
]

export default function About({ onReset }) {
  return (
    <div className="about">
      <h2>About Kangaroo Tinder</h2>
      <p>
        Kangaroo Tinder is a playful dating app for the hoppiest singles in the outback. It was made as a
        school project to show how several generative AI tools can work together to build a finished product.
      </p>

      <h3>Made with AI</h3>
      <ul className="tool-list">
        {TOOLS.map((t) => (
          <li key={t.name}>
            <b>{t.name}</b>
            <span className="tool-type">{t.type}</span>
            <span>{t.role}</span>
          </li>
        ))}
      </ul>
      <p className="note">
        Content marked <span className="ai-badge">✨ AI-generated</span> was created with these tools. All
        kangaroos are fictional, and no personal data is collected. Your likes and chats are only stored in
        your own browser.
      </p>

      <h3>How to use</h3>
      <ul className="howto">
        <li>Drag a card right to like or left to pass. You can also use the buttons or the ← → arrow keys.</li>
        <li>Tap the photo to see more pictures, and tap the name (or ↑) to open the full profile.</li>
        <li>If a kangaroo likes you back, it's a match, and you can chat with them.</li>
      </ul>

      <button className="btn btn-ghost" onClick={onReset}>
        Reset all likes and chats
      </button>
    </div>
  )
}
