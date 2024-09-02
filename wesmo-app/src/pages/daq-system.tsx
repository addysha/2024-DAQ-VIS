// Filename - pages/daq-system.tsx

import React from "react";
import { Link } from "react-router-dom";

import BurgerMenu from "../components/BurgerMenu.tsx";
import TitleCard from "../components/TitleCard.tsx";
import Logo from "../components/Logo.tsx";
import "../App.css";

import auckland from "../images/daq/auck_fsae.jpg";
import pi from "../images/daq/rpi.jpeg";
import figma from "../images/daq/figma_designing.png";
import car from "../images/backgrounds/wesmo_night.jpeg";

const Daq: React.FC = () => {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css?family=Roboto Condensed"
        rel="stylesheet"
      ></link>
      <div className="background history">
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
        <TitleCard title="Data Acquisition & Visualisation System" />
        <div className="right-display">
          <div className="image-text-component right daq">
            <div className="text-container daq-right">
              <p>
                This project relates to the acquisition and visualisation of the
                data from the Waikato Engineering Students Motorsports
                Organisation (WESMO) 2024 vehicle. This year WESMO is building
                its first EV car, which means that there are vital data points
                within the system which need to be monitored, such as battery
                state of charge, motor speeds, and temperature. The main
                intention of the build is for the car to compete in the FSAE in
                Melbourne, Australia in November 2024.
                <br />
                <br />
                One component of this year’s car is a real-time data logging and
                feedback system for the driver and track crew. My honours
                project is to implement both data acquisition and data feedback
                systems. This involves the collection and interpretation of all
                data points transmitted from the electrical components of the
                vehicle, storing the data, and then appropriately visualising
                the information.
              </p>
            </div>
            <div className="image-container">
              <img src={car} alt="" className="image daq" />
            </div>
          </div>
        </div>
        <div className="left-display">
          <div className="image-text-component left daq">
            <div className="image-container">
              <img src={pi} alt="" className="image daq" />
            </div>
            <div className="text-container daq-left">
              <p>
                <h4>Data Collections and In Vehicle Display</h4>
                Motec C127 Display Logger
                <br />
                <br />
                <h4>Telemetry</h4>
                Raspberry Pi 5
                <br />
                <br />
                <h4> Data Visualisation Dashboard</h4>
                React Web App
              </p>
            </div>
          </div>
        </div>
        <div className="right-display">
          <div className="image-text-component right daq">
            <div className="text-container daq-right">
              <p>
                The digital dashboard is currently in the design phase,
                completed with a combination of paper prototypes and Figma
                digital designs. It will be added as a page on the new WESMO
                website.
                <br />
                <br />
                The aim is to have the live telemetry data translated from
                Controller Area Network (CAN) messages to human-readable
                components on a react-based digital dashboard.
                <br />
                <br />
                This dashboard needs to have a fast refresh time due to the
                real- time data requirements of the DAQ system. This real-time
                speed needs to be reflected through the collection,
                transmission, processing and display processes.
                <br />
                <br />
                Members of the team have real-world needs for this dashboard
                which I must keep in mind. This includes colour blindness but
                mainly retains to the testing of their components for
                optimisation and safety.
              </p>
            </div>
            <div className="image-container">
              <img src={figma} alt="" className="image daq" />
            </div>
          </div>
        </div>
        <div className="left-display">
          <div className="image-text-component left daq">
            <div className="image-container daq">
              <img src={auckland} alt="" className="image daq" />
            </div>
            <div className="text-container daq-left column">
              <p>
                Python
                <br />
                <br />
                Typescript
                <br />
                <br />
                HTML & CSS
                <br />
                <br />
                AWS
                <br />
                <br />
                React
                <br />
                <br />
                Raspberry Pi
                <br />
                <br />
                Time management
                <br />
                <br />
                Figma
              </p>
            </div>
            <div className="text-container daq-left column">
              <p>
                CAN Protocol
                <br />
                <br />
                MQTT
                <br />
                <br />
                Git
                <br />
                <br />
                IoT
                <br />
                <br />
                NoSQL
                <br />
                <br />
                Nginx
                <br />
                <br />
                Motec
                <br />
                <br />
                Teamwork
              </p>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="content-container">
            <div className="content">
              <div>
                <h4>GitHub</h4>
                <Link to="https://github.com/murphyhk" className="link footer">
                  https://github.com/murphyhk
                </Link>
              </div>
              <div>
                <h4>LinkedIn</h4>
                <Link
                  to="https://www.linkedin.com/in/murphyhk"
                  className="link footer"
                >
                  www.linkedin.com/in/murphyhk
                </Link>
              </div>
              <div>
                <h4>Email</h4>
                <Link to="mailto:murphyhk01@gmail.com" className="link footer">
                  murphyhk01@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Daq;
