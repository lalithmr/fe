import logoDark from "../assets/logo-dark-256.png";
import logoLight from "../assets/logo-light-256.png";

function Hero({ theme }) {
  const logoSrc = theme === "light" ? logoLight : logoDark;

  return (
    <section id="home" className="hero">
      <div className="hero__content fade-up glass-panel">
        <span className="section-kicker">Premium Chess Academy</span>
        <img
          className="hero__logo"
          src={logoSrc}
          alt="ChessIQ emblem"
          width="100"
          height="100"
          decoding="async"
          fetchPriority="high"
        />
        <h1>
          <span>Chess</span>
          <span className="hero__title-accent">IQ</span>
        </h1>
        <p className="hero__subtitle">Summer Chess Camp 2026</p>
        <p className="hero__tagline">Intelligence Meets Strategy</p>
        <p className="hero__desc">
          Boost your child&apos;s IQ with structured chess training, guided
          practice, and premium mentorship built for young strategic thinkers.
        </p>
        <a href="#register" className="hero__cta hover-lift">
          Register Now
        </a>
      </div>

      <div className="hero__panel fade-up fade-up--delay-2">
        <article className="detail-tile hover-lift">
          <span>Start Date</span>
          <strong>April 06, 2026</strong>
        </article>
        <article className="detail-tile hover-lift">
          <span>Duration</span>
          <strong>4 Weeks</strong>
        </article>
        <article className="detail-tile hover-lift">
          <span>Mode</span>
          <strong>Online and Offline</strong>
        </article>
      </div>
    </section>
  );
}

export default Hero;
