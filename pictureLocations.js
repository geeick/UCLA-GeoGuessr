import ImageWithFallback from "./ImageWithFallback.jsx";

export default function PictureRound({ round }) {
  const location = round.location;

  return (
    <section className="clue-card fade-in">
      <div className="clue-header">
        <div>
          <p className="eyebrow">Picture Mode</p>
          <h2>Where on campus is this?</h2>
        </div>
        <span className="mode-pill">Still Image</span>
      </div>

      <ImageWithFallback
        className="clue-image"
        src={location.imageUrl}
        alt="UCLA campus clue"
      />

      <div className="hint-box">
        <span className="label">Hint</span>
        <p>{location.hint}</p>
      </div>
    </section>
  );
}
