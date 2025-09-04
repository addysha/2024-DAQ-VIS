/*
 * File: pages/about-wesmo.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: Webpage describing the WESMO club and what they do.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 *
 */
import React from "react";

import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";
import Button from "@mui/material/Button";
import logo from "../images/wesmo-logo/logo_header.png";

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
      
            <div className="nav-right"></div>
          </div>
        </div>
        <br />
        <TitleCard title="Waikato Engineering School Motorsport Organisation" />
        <div className="right-display about">
          <div className="image-text-component about">
            <div className="text-container alt about">
              WESMO was founded in 2006.
              <br />
              <br />
              The Wesmo team is gearing up for the Formula SAE competition, a
              competition in which the University of Waikato, under the name
              WESMO, competes against 30-35 other teams from across Oceania.
              <br />
              <br />
              Previously we have built and raced with Internal Combustion (IC)
              engine cars. These cars have done very well at the FSAE
              competition, such as in 2023 we placed second in the skidpad
              event.
              <br />
              Starting in 2024 we will be building our cars to be Electric (EV)
              and for the first time we will be entering into the EV
              competition. The team will be building the car with the knowledge
              collected from the 2023 EV research.
            </div>
            <div className="image-container right">
              <img src={logo} alt="" className="image right" />
            </div>
          </div>
        </div>
        <div className="explore">
          <Button
            variant="outlined"
            color="error"
            size="medium"
            href="/about-wesmo/explore"
          >
            Explore our car
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
