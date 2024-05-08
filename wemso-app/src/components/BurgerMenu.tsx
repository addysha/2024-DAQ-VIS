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
        <div className="nav-left">
          <div className="nav-links">{/* Your navigation links here */}</div>
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
