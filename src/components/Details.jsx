const campDetails = [
  { label: "Program", value: "Summer Chess Camp 2026" },
  { label: "Start Date", value: "April 06, 2026" },
  { label: "Duration", value: "4 Weeks" },
  { label: "Age Group", value: "6 to 20 Years" },
  { label: "Daily Time", value: "4 Hours" },
  { label: "Mode", value: "Online and Offline" },
];

function Details() {
  return (
    <section id="details" className="section section--alt">
      <div className="section__header fade-up">
        <span className="section-kicker">Camp Details</span>
        <h2>Structured coaching with flexible access for every family.</h2>
        <p>
          A focused four-week program that combines guided lessons, game
          analysis, and tournament-style practice for steady improvement.
        </p>
      </div>

      <div className="details-grid">
        {campDetails.map((item) => (
          <article key={item.label} className="detail-tile hover-lift">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Details;
