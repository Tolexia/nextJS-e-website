const PLACEHOLDER_IMAGE = '/images/icon-cart.svg';

/**
 * Resolve a cart/product filename to a usable image path.
 * Accepts: JSON string array, real array, path string, or missing values.
 */
export function resolveCartImage(filename) {
  if (filename == null || filename === '') {
    return PLACEHOLDER_IMAGE;
  }

  let mainPic = null;

  if (Array.isArray(filename)) {
    mainPic = filename[0];
  } else if (typeof filename === 'string') {
    const trimmed = filename.trim();
    if (trimmed.startsWith('/') || trimmed.includes('images/')) {
      return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        mainPic = parsed[0];
      } else if (typeof parsed === 'string') {
        mainPic = parsed;
      }
    } catch {
      mainPic = trimmed;
    }
  }

  if (mainPic == null || mainPic === '') {
    return PLACEHOLDER_IMAGE;
  }

  if (typeof mainPic !== 'string') {
    return PLACEHOLDER_IMAGE;
  }

  if (mainPic.includes('images')) {
    return mainPic.startsWith('/') ? mainPic : `/${mainPic}`;
  }

  return `/images/${mainPic}`;
}

export function parseCartFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem('cart');
  if (raw == null || raw === '') {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    localStorage.removeItem('cart');
    return [];
  }
}
