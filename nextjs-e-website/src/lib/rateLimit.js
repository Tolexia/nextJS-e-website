const buckets = new Map();

/**
 * In-memory sliding window limiter (per process).
 * Soft protection against spam; not a substitute for WAF/CDN limits.
 */
export function checkRateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (buckets.get(key) || []).filter((ts) => ts > windowStart);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { allowed: false, retryAfterMs: hits[0] + windowMs - now };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { allowed: true, retryAfterMs: 0 };
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}
