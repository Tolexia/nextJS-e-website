const PLACEHOLDER_IMAGE = '/images/icon-cart.svg';

function rejectTraversal(value) {
  return value.includes('..') || value.includes('\\');
}

export function resolveImageSrc(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed || rejectTraversal(trimmed)) {
    return null;
  }
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('/')) {
    return trimmed;
  }
  if (trimmed.startsWith('images/')) {
    return `/${trimmed}`;
  }
  return `/images/${trimmed}`;
}

export function parseImageList(filename) {
  if (Array.isArray(filename)) {
    return filename.map(resolveImageSrc).filter(Boolean);
  }
  if (typeof filename !== 'string' || filename.trim() === '') {
    return [];
  }
  const trimmed = filename.trim();
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(resolveImageSrc).filter(Boolean);
      }
    } catch {
      return [];
    }
  }
  const single = resolveImageSrc(trimmed);
  return single ? [single] : [];
}

export function resolveCartImage(filename) {
  return parseImageList(filename)[0] || PLACEHOLDER_IMAGE;
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
