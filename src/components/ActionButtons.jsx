export default function ActionButtons({ onNope, onInfo, onLike }) {
  return (
    <div className="actions">
      <button className="action action-nope" onClick={onNope} aria-label="Nope">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <button className="action action-info" onClick={onInfo} aria-label="View profile">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7.5v.5" />
        </svg>
      </button>
      <button className="action action-like" onClick={onLike} aria-label="Like">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
      </button>
    </div>
  )
}
