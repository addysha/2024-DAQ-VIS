import React from "react";
import "../../App.css";

import GridContainer from "../../components/dashboard/GridContainer.tsx";
import NumberContainer from "../../components/dashboard/NumberContainer.tsx";
import BarContainer from "../../components/dashboard/BarContainer.tsx";
import StatusBar from "../../components/dashboard/StatusBar.tsx";
import DialContainer from "../../components/dashboard/FullDialContainer.tsx";
import StatusContainer from "../../components/dashboard/StatusContainer.tsx";

const DefaultGrid: React.FC = () => {
  return (
    <div className="dashboard">
      <StatusBar />
      <div className="dashboard-row">
        <GridContainer size={2} bkg="#706B6B">
          <BarContainer
            textValue="Actual State of Charge (SOC)"
            currentValue={0.5}
            maxValue={1}
            unit="%"
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={3} bkg="#D9D9D9">
          <StatusContainer
            textValue="All Systems Operational"
            statusValue="Operational"
            stateValue={4}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          <DialContainer
            textValue="Actual State of Charge (SOC)"
            currentValue={43}
            maxValue={100}
            unit="%"
          />
        </GridContainer>
        <GridContainer size={2} bkg="#706B6B">
          <NumberContainer
            text="SOC"
            value={86}
            unit="%"
            maxValue={100}
            lightText={true}
          />
        </GridContainer>
      </div>
      <div className="dashboard-row">
        <GridContainer size={3} bkg="#D9D9D9">
          <NumberContainer text="SOC" value={50} unit="%" />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          <NumberContainer
            text="SOC"
            value={97}
            unit="%"
            maxValue={100}
            lightText={false}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#706B6B">
          <StatusContainer
            textValue="Safety Systems"
            statusValue="Warning"
            stateValue={2}
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          <NumberContainer
            text="Motor Temp"
            value={25}
            unit="C"
            maxValue={80}
            lightText={false}
          />
        </GridContainer>
      </div>
      <div className="dashboard-row">
        <GridContainer size={2} bkg="#706B6B">
          <DialContainer
            textValue="Actual State of Charge (SOC)"
            currentValue={78}
            maxValue={100}
            unit="%"
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#706B6B">
          <BarContainer
            textValue="Actual State of Charge (SOC)"
            currentValue={0.15}
            maxValue={1}
            unit="%"
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          <DialContainer
            textValue="Actual State of Charge (SOC)"
            currentValue={15}
            maxValue={100}
            unit="%"
          />
        </GridContainer>
        <GridContainer size={3} bkg="#706B6B">
          <BarContainer
            textValue="Actual State of Charge (SOC)"
            currentValue={0.75}
            maxValue={1}
            unit="%"
            lightText={true}
          />
        </GridContainer>
      </div>
    </div>
  );
};

export default DefaultGrid;
