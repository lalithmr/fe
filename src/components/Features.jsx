const features = [
  {
    title: "Puzzle training",
    description:
      "Daily tactical puzzles sharpen calculation, pattern recognition, and confidence in spotting strong moves quickly.",
  },
  {
    title: "Practice games",
    description:
      "Students apply new concepts through guided practice games that build real match experience in a supportive setting.",
  },
  {
    title: "Weekly tournaments",
    description:
      "Friendly tournaments each week let students test progress, build confidence, and enjoy the excitement of real play.",
  },
  {
    title: "Certificate of completion",
    description:
      "Every participant receives a completion certificate to celebrate their effort, discipline, and camp progress.",
  },
];

function Features() {
  return (
    <section className="section">
      <div className="section__header fade-up">
        <span className="section-kicker">What Students Get</span>
        <h2>Designed to make learning serious, fun, and measurable.</h2>
      </div>

      <div className="feature-list">
        {features.map((feature, index) => (
          <article key={feature.title} className="feature-item hover-lift">
            <span className="feature-item__count">0{index + 1}</span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Features;
