import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Details from "./components/Details";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import RegisterForm from "./components/RegisterForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("chesscamp-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function App() {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("chesscamp-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app-shell">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Details />
        <Features />
        <Pricing />
        <RegisterForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
