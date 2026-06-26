export default function HomeScreen({ onStart }) {
  return (
    <main className="screen hero-screen">
      <section className="hero-card fade-in">
        <p className="eyebrow">UCLA Campus Game</p>
        <h1>BruinGuessr</h1>
        <p className="hero-copy">
          Explore UCLA through photo clues and campus navigation clues. Study the view,
          click your guess on the map, and see how close you got.
        </p>
        <button className="primary-button" onClick={onStart}>Start Game</button>
      </section>
    </main>
  );
}
