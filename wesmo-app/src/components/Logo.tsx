/*
 * File: components/Logo.tsx
 * Author: Hannah Murphy
 * Date: 2024-09-14
 * Description: A WESMO logo component.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

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
