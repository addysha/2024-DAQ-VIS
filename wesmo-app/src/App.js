// Filename - App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index.tsx";
import Contact from "./pages/contact.tsx";
import About from "./pages/about.tsx";
import Sponsors from "./pages/sponsors.tsx";
import Engineering from "./pages/engineering.tsx";
import Wiki from "./pages/wiki.tsx";
import Data from "./pages/data.tsx";
import Fsae from "./pages/fsae.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-wesmo" element={<About />} />
        <Route path="/about-fsae" element={<Fsae />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/engineering-team" element={<Engineering />} />
        <Route path="/race-data" element={<Data />} />
        <Route path="/wiki-login" element={<Wiki />} />
      </Routes>
    </Router>
  );
}

export default App;
