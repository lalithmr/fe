import logoDark from "../assets/logo-dark-256.png";
import logoLight from "../assets/logo-light-256.png";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Camp Details", href: "#details" },
  { label: "Register", href: "#register" },
];

function Navbar({ theme, onToggleTheme }) {
  const logoSrc = theme === "light" ? logoLight : logoDark;

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="ChessIQ home">
        <img
          className="brand__logo"
          src={logoSrc}
          alt="ChessIQ logo"
          width="58"
          height="58"
          decoding="async"
        />
        <div>
          <span className="brand__title">
            <span>Chess</span>
            <span className="brand__title-accent">IQ</span>
          </span>
          <span className="brand__tagline">Intelligence Meets Strategy</span>
        </div>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        aria-pressed={theme === "light"}
      >
        <span className="theme-toggle__track">
          <span className="theme-toggle__thumb" />
        </span>
      </button>
    </header>
  );
}

export default Navbar;
