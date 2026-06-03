import './BurningEdges.css'

export default function BurningEdges({ isPanic }) {
  return (
    <div className={`burning-edges ${isPanic ? 'panic' : ''}`}>
      <div className="edge edge-top" />
      <div className="edge edge-bottom" />
      <div className="edge edge-left" />
      <div className="edge edge-right" />
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />
    </div>
  )
}
