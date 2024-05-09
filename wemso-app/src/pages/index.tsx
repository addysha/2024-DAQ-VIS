// Filename - pages/index.js

import React from "react";
import Typewriter from "../components/TypeWriter.tsx";
import BurgerMenu from "../components/BurgerMenu.tsx";
import "../App.css";

const typeWriter = ["University", "Engineers", "Students"];

const Home: React.FC = () => {
  return (
    <div className="App">
      <div className="background">
        <div className="navbar">
          <div className="nav-left">
            <p id="logo">
              <img
                id="imgLogo"
                src={require("..//images/WESMOLogo.png")}
                alt="Wesmo logo"
              />
            </p>
          </div>
          <div className="nav-right">
            <BurgerMenu />
            <div className="nav-right"></div>
          </div>
        </div>
        <div id="mainTitle">
          <div id="year">2024</div>
          <h1 className="text-3xl font-bold underline">
            Support Your Local
            <Typewriter data={typeWriter} />
            With WESMO
          </h1>
          <a href="/about-wesmo">
            <div href="#" id="subTitle">
              FIND OUT MORE{" "}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
