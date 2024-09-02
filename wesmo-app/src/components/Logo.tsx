import React from "react";
import "./Logo.css";
import WesmoLogo from "../images/wesmo-logo/WESMOLogo.png";
import WesmoLogoDark from "../images/wesmo-logo/WESMOLogoBlack.png";

interface LogoProps {
  colour?: string;
}

const Logo: React.FC<LogoProps> = ({ colour }) => {
  return (
    <p id="logo">
      <a href="/">
        <img
          id="imgLogo"
          src={colour === "dark" ? WesmoLogoDark : WesmoLogo}
          alt="WESMO"
        />
      </a>
    </p>
  );
};

export default Logo;
