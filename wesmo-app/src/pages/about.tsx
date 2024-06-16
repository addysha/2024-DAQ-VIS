// Filename - pages/about-wesmo.tsx

import React from "react";
import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";

import logo from "../images/logo_header.png";

import "../App.css";

const About: React.FC = () => {
  return (
    <div className="App">
      <div className="background about">
        <link
          href="https://fonts.googleapis.com/css?family=Roboto Condensed"
          rel="stylesheet"
        ></link>
        <div className="navbar">
          <div className="nav-left">
            <Logo />
          </div>
          <div className="nav-right">
            <BurgerMenu />
            <div className="nav-right"></div>
          </div>
        </div>
        <br />
        <TitleCard title="Waikato Engineering School Motorsport Organisation" />
        <div className="right-display about">
          <div className="image-text-component about">
            <div className="text-container alt about">
              WESMO was founding in 2006.
              <br />
              <br />
              The Wesmo team is gearing up for the Formula SAE competition, a
              competition in which the University of Waikato, under the name
              WESMO, competes against 30-35 other teams from across Oceania.
            </div>
            <div className="image-container right">
              <img src={logo} alt="" className="image right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
