export default function HomeScreen({ onStart }) {
  return (
    <main className="screen home-screen">
      <section className="hero-card pop-in">
        <p className="eyebrow">UCLA campus guessing game</p>
        <h1>BruinGuessr</h1>
        <p className="hero-text">
          Explore UCLA through photos and campus-map clues. Place your guess on the map,
          see how close you were, and try to score 5,000 points each round.
        </p>
        <button className="primary-button" onClick={onStart}>Start Game</button>
      </section>
    </main>
  );
}
