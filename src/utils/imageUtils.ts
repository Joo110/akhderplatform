// File: src/utils/imageUtils.ts
// Utility helpers for project item images

const DEFAULT_SVG_PLACEHOLDER = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'>
  <rect width='100%' height='100%' fill='#f3f4f6' />
  <g transform='translate(0,0)'>
    <rect x='140' y='120' width='520' height='360' rx='20' fill='#e5e7eb' />
    <g transform='translate(180,160)'>
      <path d='M0 160 L120 40 L240 160 L360 0 L420 80 L480 0' stroke='#d1d5db' stroke-width='10' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
    </g>
  </g>
</svg>`;

/**
 * Returns a data-uri SVG placeholder (safe, no external file needed).
 */
export const getPlaceholderImage = (): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(DEFAULT_SVG_PLACEHOLDER)}`;

/**
 * Normalize/resolve a picture URL coming from the backend.
 *
 * Behavior:
 * - If pictureUrl is falsy -> return placeholder.
 * - If pictureUrl is an absolute URL (starts with http or //) -> return as-is.
 * - If pictureUrl starts with '/' -> prefix with current origin (window.location.origin).
 * - Otherwise, if VITE_API_BASE_URL is set (in .env, e.g. VITE_API_BASE_URL=https://api.example.com),
 *   prefix it. If not set, treat as relative to current origin.
 */
export const getImageUrl = (pictureUrl?: string | null): string => {
  if (!pictureUrl) return getPlaceholderImage();

  const trimmed = pictureUrl.trim();

  // absolute http(s) or protocol-relative //example.com/image.jpg
  if (/^(https?:)?\/\//i.test(trimmed)) {
    // if starts with //, prepend current protocol
    if (trimmed.startsWith("//")) {
      return `${window.location.protocol}${trimmed}`;
    }
    return trimmed;
  }

  // starts with single slash -> root-relative to current origin
  if (trimmed.startsWith("/")) {
    return `${window.location.origin}${trimmed}`;
  }

  // try to use env base URL if provided (Vite envar naming: VITE_*)
  const base = (import.meta.env as any).VITE_API_BASE_URL || (import.meta.env as any).VITE_BASE_URL || "";
  if (base) {
    const cleanBase = String(base).replace(/\/+$/, "");
    return `${cleanBase}/${trimmed.replace(/^\/+/, "")}`;
  }

  // fallback: treat as relative to current origin
  return `${window.location.origin}/${trimmed.replace(/^\/+/, "")}`;
};
