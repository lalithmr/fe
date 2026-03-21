const benefits = [
  {
    title: "Strategic thinking",
    description:
      "Students learn how to plan ahead, evaluate positions, and choose stronger moves with clarity instead of guessing.",
  },
  {
    title: "Focus and concentration",
    description:
      "Structured chess sessions help children build patience, stay attentive longer, and think calmly under pressure.",
  },
  {
    title: "Problem-solving skills",
    description:
      "Every lesson trains kids to break down tricky positions, spot patterns, and solve challenges step by step.",
  },
];

function About() {
  return (
    <section id="about" className="section">
      <div className="section__header fade-up">
        <span className="section-kicker">About The Camp</span>
        <h2>Where young minds learn to think several moves ahead.</h2>
        <p>
          ChessIQ is designed for kids aged 6 to 20 who are ready to sharpen
          focus, build confidence, and grow through structured premium chess
          coaching.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="info-card hover-lift">
            <div className="info-card__icon" aria-hidden="true">
              ♞
            </div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default About;
