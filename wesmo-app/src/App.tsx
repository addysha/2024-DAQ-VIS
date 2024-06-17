// Filename - App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index.tsx";
import Contact from "./pages/contact.tsx";
import About from "./pages/about.tsx";
import Sponsors from "./pages/sponsors.tsx";
import Engineering from "./pages/engineering.tsx";
import History2023 from "./pages/2023.tsx";
import Data from "./pages/data.tsx";
import Fsae from "./pages/fsae.tsx";
import Explore from "./pages/explore.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-wesmo" element={<About />} />
        <Route path="/about-fsae" element={<Fsae />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/engineering-team" element={<Engineering />} />
        <Route path="/race-data" element={<Data />} />
        <Route path="/2023" element={<History2023 />} />
        <Route path="/about-wesmo/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
};

export default App;
