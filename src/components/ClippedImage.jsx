/**
 * Shows an image cropped to a region WITHOUT touching the original file.
 * The official logo PNGs ship with a lot of empty padding; instead of editing them,
 * we clip the visible box with CSS so the layout can align to the real artwork.
 *
 * @param {[number, number]} natural  - original image size in px [width, height]
 * @param {[number, number, number, number]} crop - visible box in px [x0, y0, x1, y1]
 */
export default function ClippedImage({ src, alt, natural, crop, className = '', ...imgProps }) {
  const [w] = natural
  const [x0, y0, x1, y1] = crop
  const cw = x1 - x0
  const ch = y1 - y0

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ aspectRatio: `${cw} / ${ch}` }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        className="absolute max-w-none select-none"
        style={{
          width: `${(w / cw) * 100}%`,
          left: `${(-x0 / cw) * 100}%`,
          top: `${(-y0 / ch) * 100}%`,
        }}
        {...imgProps}
      />
    </span>
  )
}
