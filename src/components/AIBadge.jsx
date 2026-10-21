// Marks AI-generated content, as the assignment requires
export default function AIBadge({ label = 'AI-generated', className = '' }) {
  return (
    <span className={`ai-badge ${className}`} title="This content was generated with AI">
      ✨ {label}
    </span>
  )
}
