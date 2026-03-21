import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Details from "./components/Details";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import RegisterForm from "./components/RegisterForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";

const campHighlights = [
{ label: "Program", value: "Summer Chess Camp 2026" },
{ label: "Start Date", value: "April 06, 2026" },
{ label: "Duration", value: "4 Weeks" },
{ label: "Age Group", value: "6-16 Years" },
{ label: "Daily Time", value: "2 Hours" },
{ label: "Mode", value: "Online + Offline" },
];

function App() {

useEffect(() => {
const API = import.meta.env.VITE_API_URL;


fetch(`${API}/api/test`)
  .then(res => res.text())
  .then(data => console.log("✅ API RESPONSE:", data))
  .catch(err => console.error("❌ API ERROR:", err));


}, []);

return ( <BrowserRouter>


  <Routes>

    {/* HOME PAGE */}
    <Route path="/" element={
      <div className="app-shell">
        <Navbar />
        <main>
          <Hero highlights={campHighlights} />
          <About />
          <Details details={campHighlights} />
          <Features />
          <Pricing />
          <RegisterForm />
          <Contact />
        </main>
        <Footer />
      </div>
    } />

    {/* ADMIN PAGE */}
    <Route path="/admin" element={<AdminDashboard />} />

  </Routes>

</BrowserRouter>


);
}

export default App;
