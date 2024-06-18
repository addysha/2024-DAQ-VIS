// Filename - pages/sponsors.tsx

import React from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";
import SwipeableTextMobileStepper from "../components/Carousel.tsx";

import proposal from "../files/Sponsorship_Proposal_2024.pdf";

import logo from "../images/logo_header.png";
import nhp from "../images/sponsors/nhp.png";
import hall from "../images/sponsors/hall_machinery_ltd_logo.jpeg";
import industrial from "../images/sponsors/industrial_tube.jpeg";
import initiom from "../images/sponsors/Initiom.png";
import vans from "../images/sponsors/nz_vans.png";
import jlc from "../images/sponsors/jlc_pcb.jpeg";
import island_bay from "../images/sponsors/island_bay.jpeg";
import rml from "../images/sponsors/rml.jpeg";

import "../App.css";
const bronze = [{ label: "JLC PCB", imgPath: jlc }];
const silver = [
  { label: "RML", imgPath: rml },
  { label: "NZ Van Lines", imgPath: vans },
];

const gold = [{ label: "Island Bay Services Club", imgPath: island_bay }];

const platinum = [
  {
    label: "NHP",
    imgPath: nhp,
  },
  {
    label: "Hall Machinery Ltd",
    imgPath: hall,
  },
  {
    label: "Industrial Tube",
    imgPath: industrial,
  },
  {
    label: "Initiom",
    imgPath: initiom,
  },
];

const Sponsors: React.FC = () => {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css?family=Roboto Condensed"
        rel="stylesheet"
      ></link>
      <div className="background sponsors" id="scroll">
        <div className="navbar">
          <div className="nav-left">
            <Logo />
          </div>
          <div className="nav-right">
            <BurgerMenu />
            <div className="nav-right"></div>
          </div>
        </div>
        <TitleCard title="Sponsors"></TitleCard>
        <div className="sponsors">
          <div className="top">
            <div>
              <div className="title">Platinum</div>
              <SwipeableTextMobileStepper
                images={platinum}
                width="400px"
                height="255px"
              />
            </div>
            <div>
              <div className="title">Gold</div>
              <SwipeableTextMobileStepper
                images={gold}
                width="350px"
                height="205px"
              />
            </div>
          </div>
          <div className="bottom">
            <div>
              <div className="title low">Silver</div>
              <SwipeableTextMobileStepper
                images={silver}
                width="300px"
                height="155px"
              />
            </div>
            <div>
              <div className="title low">Bronze</div>
              <SwipeableTextMobileStepper
                images={bronze}
                width="250px"
                height="105px"
              />
            </div>
          </div>
          <div className="info">
            <div className="imagetext-component">
              <div className="image-container">
                <img src={logo} alt="" className="image" />
              </div>
              <div className="text-container">
                <p>
                  Want to sponsor us?
                  <br />
                  <br />
                  <Link
                    to={proposal}
                    target="_blank"
                    rel="noreferrer"
                    className="more"
                  >
                    Find out more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
