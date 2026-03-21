import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Contact from "./components/Contact";
import Details from "./components/Details";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./pages/AdminDashboard";

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("chesscamp-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  if (typeof window.matchMedia !== "function") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function HomePage({ theme, onToggleTheme }) {
  return (
    <div className="app-shell">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
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

function App() {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem("chesscamp-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage theme={theme} onToggleTheme={toggleTheme} />}
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
