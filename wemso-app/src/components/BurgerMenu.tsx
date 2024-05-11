import React, { useState } from "react";

const HamburgerMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleCoverClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  };

  return (
    <React.Fragment>
      <div
        className={`nav-cover ${isMenuOpen ? "active" : ""}`}
        onClick={handleCoverClick}
      >
        <div className="nav-links">
          <a href="/about-wesmo">About us</a>
          <a href="/about-fsae">About FSAE</a>
          <a href="/sponsors">Sponsors</a>
          <a href="/race-data">Race Data</a>
          <a href="/engineering-team">Engineering Team</a>
          <a href="/contact-us">Contact us</a>
          <a href="/wiki-login">Wiki</a>
          <a href="/">Home</a>
        </div>
      </div>
      <div
        className={`hamburger-menu ${isMenuOpen ? "toggle" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </React.Fragment>
  );
};

export default HamburgerMenu;
