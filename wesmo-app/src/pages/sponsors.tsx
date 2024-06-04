// Filename - pages/sponsors.js

import React from "react";
import BurgerMenu from "../components/BurgerMenu.tsx";
import "../App.css";

const Sponsors: React.FC = () => {
  return (
    <div className="App">
      <div className="background">
        <div className="navbar">
          <div className="nav-left">
            <p id="logo">
              <a href="/"> 
                <img
                  id="imgLogo"
                  src={require("..//images/WESMOLogo.png")}
                  alt="Wesmo logo"
              />
              </a>
            </p>
          </div>
          <div className="nav-right">
            <BurgerMenu />
            <div className="nav-right"></div>
          </div>
        </div>
        <div id="mainTitle">
          <h1 className="text-3xl font-bold underline">
            Website under construction
          </h1>
          <h3>More coming soon</h3>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
