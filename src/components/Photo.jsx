import { useState } from 'react'

export const PLACEHOLDER = 'images/kangaroos/placeholder.svg'

// <img> that falls back to the placeholder until the Higgsfield photo exists.
// Remembers *which* src failed, so switching photos retries without a reset effect
// (a reset effect can race with a fast-failing image and undo the fallback).
export default function Photo({ src, alt, className }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const showPlaceholder = !src || failedSrc === src

  return (
    <img
      src={showPlaceholder ? PLACEHOLDER : src}
      alt={alt}
      className={className}
      draggable={false}
      onError={() => setFailedSrc(src)}
    />
  )
}
