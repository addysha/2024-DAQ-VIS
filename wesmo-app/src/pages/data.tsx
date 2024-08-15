// Filename - pages/race-data.tsx
import React from "react";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import GridLayout from "../components/dashboard/GridLayout.tsx";
import NumberContainer from "../components/dashboard/NumberContainer.tsx";
import StatusBar from "../components/dashboard/StatusBar.tsx";

import "../App.css";

const Data: React.FC = () => {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/font-awesome.min.css"
      ></link>
      <div className="background data">
        <div className="navbar">
          <div className="nav-left">
            <Logo colour="dark" />
          </div>
          <div className="nav-right">
            <BurgerMenu colour="black" />
            <div className="nav-right"></div>
          </div>
        </div>
        <div className="dashboard">
          <StatusBar />
          <div className="dashboard-row">
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
                warning_colour="critical"
              />
            </GridLayout>
            <GridLayout size={3} bkg="#3B3B3B">
              <NumberContainer
                parameterOne={{ text: "Motor Temp", value: 38, unit: "C" }}
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                warning_colour="warning"
              />
            </GridLayout>
            <GridLayout size={2} bkg="#3B3B3B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
                warning_colour="critical"
              />
            </GridLayout>
          </div>
          <div className="dashboard-row">
            <GridLayout size={3} bkg="#3B3B3B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
                warning_colour="average"
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={false}
                warning_colour="critical"
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                parameterOne={{ text: "Motor Temp", value: 25, unit: "C" }}
                lightText={true}
              />
            </GridLayout>
          </div>
          <div className="dashboard-row">
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
                warning_colour="average"
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={false}
                warning_colour="warning"
              />
            </GridLayout>
            <GridLayout size={3} bkg="#3B3B3B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
                warning_colour="average"
              />
            </GridLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
