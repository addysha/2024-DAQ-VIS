// Filename - pages/2023.tsx

import React from "react";
import BurgerMenu from "../components/BurgerMenu.tsx";
import TitleCard from "../components/TitleCard.tsx";
import Logo from "../components/Logo.tsx";

import car_2023 from "../images/car_backend_cropped.jpg";
import car_2018 from "../images/backgrounds/wesmo_night.jpeg";
import car_2017 from "../images/2017_car.jpg";
import car_2016 from "../images/2016_car.jpg";
import car_2015 from "../images/2015_car.jpg";
import car_2014 from "../images/2014_car.jpg";

import "../App.css";

const History: React.FC = () => {
  return (
    <div className="App">
      <div className="background history">
        <link
          href="https://fonts.googleapis.com/css?family=Roboto Condensed"
          rel="stylesheet"
        ></link>
        <div className="navbar">
          <div className="nav-left">
            <Logo colour="dark" />
          </div>
          <div className="nav-right">
            <BurgerMenu colour="black" />
            <div className="nav-right"></div>
          </div>
        </div>
        <br />
        <TitleCard title="WESMO Through the Ages" />
        <br />
        <div className="year-title">2023</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine & EV</div>
          <a href="/history-2023">
            <u className="more">Read More</u>
          </a>
        </div>
        <img src={car_2023} alt="W-FS23" className="history-car" />

        {/* <div className="year-title">2022</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine</div>
          <a href="/history-2023">
            <u className="more">Read More</u>
          </a>
        </div>
        <br /> */}

        <div className="year-title">2018</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine</div>
          <a href="/history-2018">
            <u className="more">Read More</u>
          </a>
        </div>
        <img src={car_2018} alt="W-FS18" className="history-car" />

        <div className="year-title">2017</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine</div>
          <a href="/history-2017">
            <u className="more">Read More</u>
          </a>
        </div>
        <img src={car_2017} alt="W-FS17" className="history-car" />

        <div className="year-title">2016</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine</div>
          {/* <a href="/history-2016">
            <u className="more">Read More</u>
          </a> */}
        </div>
        <img src={car_2016} alt="W-FS16" className="history-car" />

        <div className="year-title">2015</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine</div>
          <a href="/history-2015">
            <u className="more">Read More</u>
          </a>
        </div>
        <img src={car_2015} alt="W-FS15" className="history-car" />

        <div className="year-title">2014</div>
        <div className="subtitle">
          <div className="year">Internal Combustion Engine</div>
          <a href="/history-2014">
            <u className="more">Read More</u>
          </a>
        </div>
        <img src={car_2014} alt="W-FS14" className="history-car" />
      </div>
    </div>
  );
};

export default History;
