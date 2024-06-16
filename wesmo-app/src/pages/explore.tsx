// Filename - pages/about-wesmo/explore.tsx

import React, { useState } from "react";
import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";
import InfoExplore from "../components/InfoExplore.tsx";

import "../App.css";

const Explore: React.FC = () => {
  return (
    <div className="App">
      <div className="background">
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
        <TitleCard title="Explore the W-SF18" />
        <InfoExplore x="58" y="1" content="Chassis"></InfoExplore>
        <InfoExplore x="50" y="170" content="Steering"></InfoExplore>
        <InfoExplore x="46" y="260" content="Suspension"></InfoExplore>
        <InfoExplore x="30" y="300" content="Breaks"></InfoExplore>
        <InfoExplore x="76" y="0" content="Engine"></InfoExplore>
        <InfoExplore x="60" y="1" content="Ergonomics"></InfoExplore>
        <InfoExplore x="10" y="100" content="Body"></InfoExplore>
      </div>
    </div>
  );
};

export default Explore;
