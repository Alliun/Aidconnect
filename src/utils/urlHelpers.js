// Helper function to ensure URL has proper protocol
export function normalizeUrl(url) {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return 'https://' + url
}

// Validate URL format
export function isValidUrl(url) {
  if (!url) return false
  try {
    const normalized = normalizeUrl(url)
    new URL(normalized)
    return true
  } catch {
    return false
  }
}
