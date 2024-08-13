// Filename - pages/race-data.tsx
import React from "react";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import GridLayout from "../components/dashboard/GridLayout.tsx";
import NumberContainer from "../components/dashboard/NumberContainer.tsx";
import "../App.css";

const Data: React.FC = () => {
  return (
    <div className="App">
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
            <GridLayout size={3} bkg="#D9D9D9">
              <NumberContainer
                parameterOne={{ text: "Motor Temp", value: 67, unit: "C" }}
                lightText={false}
                warning_colour="warning"
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                parameterOne={{ text: "SOC", value: 50, unit: "%" }}
                lightText={true}
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
