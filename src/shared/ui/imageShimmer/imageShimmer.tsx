const accentColor = '#e0e0e0'
const bgColor = '#f0f0f0'

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${bgColor}" offset="20%" />
      <stop stop-color="${accentColor}" offset="50%" />
      <stop stop-color="${bgColor}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${bgColor}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export const placeholderShimmer = (w = 700, h = 400): `data:image/${string}` =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
