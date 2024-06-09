// Filename - pages/about-fsae.js

import React from "react";
import { Link } from "react-router-dom";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";

import close_up from "../images/close_up.jpg";
import fsae from "../images/fsae-logo.png";

import "../App.css";

const Fsae: React.FC = () => {
  return (
    <div className="App">
      <div className="background-fsae" id="scroll">
        <div className="navbar">
          <div className="nav-left">
            <Logo />
          </div>
          <div className="nav-right">
            <BurgerMenu />
            <div className="nav-right"></div>
          </div>
        </div>
        <TitleCard title="Formula Society of Automotive Engineers" />
        <div style={{ height: "100px" }}></div>
        <div className="image-text-component-right-fsae">
          <div className="text-container-right-fsae">
            <p>
              Formula Society of Automotive Engineers, more commonly known as
              FSAE. Each year there is a competition where 30-35 teams compete
              against each other from across Oceania. Participants can hail from
              Australia, New Zealand, Japan, India, and Europe, representing a
              fraction of the over 600 teams worldwide. The competition puts the
              student-built race cars through varying events which are
              categorised as either “static” or “dynamic”. <br />
              <br />
              The static events consist of design, cost, and a business pitch to
              investors. The dynamic events consist of skid pad, acceleration,
              autocross, efficiency, and endurance.
              <br />
              <br />
              In recent years, there has been a notable shift from internal
              combustion to electric vehicles among participating teams, with
              electric cars proving increasingly competitive.
            </p>
          </div>
          <div className="image-container-right-fase">
            <img src={close_up} alt="" className="image-right-fsae" />
          </div>
        </div>
        <div style={{ height: "450px" }}></div>
        <div className="image-text-component-left-fsae">
          <div className="image-container-left-fase">
            <img src={fsae} alt="" className="image-left-fsae" />
          </div>
          <div className="text-container-left-fsae">
            <p>
              This years competition runs from the 5th to 8th December 2024 at
              Calder Park Raceway, in Calder Park, Victoria, Australia.
              <br />
              <br />
              To find out more about SAEA: <br />
              <Link to="https://www.saea.com.au/" className="link">
                {" "}
                https://www.saea.com.au/
              </Link>
            </p>
          </div>
        </div>
        <div style={{ height: "50px" }}></div>
      </div>
    </div>
  );
};

export default Fsae;
