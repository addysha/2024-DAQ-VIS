// Filename - pages/race-data.tsx
import React from "react";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import GridLayout from "../components/dashboard/GridLayout.tsx";
import NumberContainer from "../components/dashboard/NumberContainer.tsx";
import BarContainer from "../components/dashboard/BarContainer.tsx";
import StatusBar from "../components/dashboard/StatusBar.tsx";
import DialContainer from "../components/dashboard/FullDialContainer.tsx";

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
              <BarContainer
                textValue="Actual State of Charge (SOC)"
                currentValue={0.5}
                maxValue={1}
                unit="%"
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={3} bkg="#706B6B">
              <NumberContainer
                text="Motor Temp"
                value={38}
                unit="C"
                maxValue={80}
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <DialContainer
                textValue="Actual State of Charge (SOC)"
                currentValue={43}
                maxValue={100}
                unit="%"
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                text="SOC"
                value={86}
                unit="%"
                maxValue={100}
                lightText={true}
              />
            </GridLayout>
          </div>
          <div className="dashboard-row">
            <GridLayout size={3} bkg="#D9D9D9">
              <NumberContainer
                text="SOC"
                value={50}
                unit="%"
                maxValue={100}
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <NumberContainer
                text="SOC"
                value={97}
                unit="%"
                maxValue={100}
                lightText={false}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <NumberContainer
                text="SOC"
                value={50}
                unit="%"
                maxValue={100}
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <NumberContainer
                text="Motor Temp"
                value={25}
                unit="C"
                maxValue={80}
                lightText={true}
              />
            </GridLayout>
          </div>
          <div className="dashboard-row">
            <GridLayout size={2} bkg="#706B6B">
              <DialContainer
                textValue="Actual State of Charge (SOC)"
                currentValue={78}
                maxValue={100}
                unit="%"
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#706B6B">
              <BarContainer
                textValue="Actual State of Charge (SOC)"
                currentValue={0.15}
                maxValue={1}
                unit="%"
                lightText={true}
              />
            </GridLayout>
            <GridLayout size={2} bkg="#D9D9D9">
              <DialContainer
                textValue="Actual State of Charge (SOC)"
                currentValue={15}
                maxValue={100}
                unit="%"
              />
            </GridLayout>
            <GridLayout size={3} bkg="#706B6B">
              <BarContainer
                textValue="Actual State of Charge (SOC)"
                currentValue={0.75}
                maxValue={1}
                unit="%"
                lightText={true}
              />
            </GridLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
