// Filename - pages/2018.tsx

import React from "react";
import BurgerMenu from "../components/BurgerMenu.tsx";
import TitleCard from "../components/TitleCard.tsx";
import Logo from "../components/Logo.tsx";

import car_2018 from "../images/wesmoBackGround.jpg";

import "../App.css";

const History_2023: React.FC = () => {
  return (
    <div className="App">
      <div className="background history-table">
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
        <TitleCard title="W-FS18" />
        <br />
        <img src={car_2018} alt="W-FS18" className="history-car" />
        <table id="car_table" className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th id="table_col">Engine</th>
              <td>2016 KTM 690 Duke-R ~ 60KW</td>
              <td>6 - Speed Sequential Gearbox</td>
            </tr>
            <tr>
              <th id="table_col">Drive Chain</th>
              <td>Drexler - LSD unit weight is approximately 2.6 kg</td>
              <td>Custom Sprocket and Carrier</td>
            </tr>
            <tr>
              <th id="table_col">Chassis</th>
              <td>Space-Frame Chassis</td>
              <td>1020 Mild Steel</td>
            </tr>
            <tr>
              <th id="table_col">Suspension</th>
              <td>Double Wish-bone Front and Rear</td>
              <td>
                Ohlins Shock Absorbers
                <br />
                3D Printed Titanium Suspension Inserts
                <br />
                Carbon/Kevlar Suspension Tubes
              </td>
            </tr>
            <tr>
              <th id="table_col">Braking System / Hub / Uprights</th>
              <td>AP Racing Calipers with Custom Discs</td>
              <td>Aluminium Up-rights</td>
            </tr>
            <tr>
              <th id="table_col">Ergonomics</th>
              <td>
                Mechanical Cable Shifter / Linked Hydraulic Clutch
                <br />
                Custom Steering Wheel
                <br />
                Custom Seat
              </td>
              <td>
                Shift Lever w/ Clutch Handle
                <br />
                Aluminium w/ Driver Display
                <br />
                Carbon Fibre Seat
              </td>
            </tr>
            <tr>
              <th id="table_col">Body Kit</th>
              <td>
                Nose Cone / Body Shell
                <br />
                Diffuser
              </td>
              <td>
                Carbon Fibre Body Kit
                <br />
                Carbon Fibre Diffuser w/ Kevlar
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History_2023;
