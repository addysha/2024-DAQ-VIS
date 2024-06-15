// Filename - pages/sponsors.js

import React from "react";
import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";
import Carousel from "../components/Carousel.tsx";
import Slide from "../components/Slide.tsx";

import logo from "../images/fsae-logo.png";
import "../App.css";

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
          <div className="carousel">
            <Carousel width="400px" height="400px">
              <Slide
                company="Test"
                hyperlink="this is a test"
                image={logo}
                width="400px"
                height="400px"
              />
              <Slide
                company="Test1"
                hyperlink="this is a test"
                image={logo}
                width="400px"
                height="400px"
              />
              <Slide
                company="Test2"
                hyperlink="this is a test"
                image={logo}
                width="400px"
                height="400px"
              />
            </Carousel>
          </div>
          <div className="carousel">
            <Carousel width="300px" height="300px">
              <Slide
                company="Test"
                hyperlink="this is a test"
                image={logo}
                width="300px"
                height="300px"
              />
              <Slide
                company="Test1"
                hyperlink="this is a test"
                image={logo}
                width="300px"
                height="300px"
              />
              <Slide
                company="Test2"
                hyperlink="this is a test"
                image={logo}
                width="300px"
                height="300px"
              />
            </Carousel>
          </div>
          <div className="carousel">
            <Carousel width="200px" height="200px">
              <Slide
                company="Test"
                hyperlink="this is a test"
                image={logo}
                width="200px"
                height="200px"
              />
              <Slide
                company="Test1"
                hyperlink="this is a test"
                image={logo}
                width="200px"
                height="200px"
              />
              <Slide
                company="Test2"
                hyperlink="this is a test"
                image={logo}
                width="200px"
                height="200px"
              />
            </Carousel>
          </div>
          <div className="carousel">
            <Carousel width="200px" height="200px">
              <Slide
                company="Test"
                hyperlink="this is a test"
                image={logo}
                width="200px"
                height="200px"
              />
              <Slide
                company="Test1"
                hyperlink="this is a test"
                image={logo}
                width="200px"
                height="200px"
              />
              <Slide
                company="Test2"
                hyperlink="this is a test"
                image={logo}
                width="200px"
                height="200px"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
