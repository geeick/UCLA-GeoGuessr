import CampusImage from "./CampusImage.jsx";

export default function PictureRound({ location }) {
  return (
    <section className="clue-card">
      <div className="clue-header">
        <div>
          <p className="eyebrow">Picture Mode</p>
          <h2>Where on campus is this?</h2>
        </div>
        <span className="pill">Still image</span>
      </div>

      <div className="clue-image-frame">
        <CampusImage src={location.imageUrl} alt="UCLA clue" />
      </div>

      <div className="hint-box">
        <strong>Hint:</strong> {location.hint}
        <p className="muted-small">The exact building name is hidden while you guess.</p>
      </div>
    </section>
  );
}
