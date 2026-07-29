/**
 * The starfield from the hero painting, made permanent.
 *
 * Rendered as the first child of <main> so it sticks through the entire
 * scroll and then releases to hand off to the footer. Everything here is a
 * static CSS paint — three parallax layers of radial-gradients defined in
 * styles/world.css — so it costs nothing per frame.
 */
export default function Sky() {
  return (
    <div className="sky-track" aria-hidden="true">
      <div className="sky">
        <div className="sky__near" />
        <div className="sky__wash" />
      </div>
    </div>
  )
}
