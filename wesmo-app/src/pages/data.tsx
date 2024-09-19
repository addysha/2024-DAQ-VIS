/*
 * File: pages/data.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: Webpage which connnects to the WESMO digital dashboard for driving analytics.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 *
 */

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "../App.css";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import DefaultGrid from "../components/dashboard/DefaultGrid.tsx";
import Spinner from "../components/dashboard/Spinner.tsx";
import InfoIcon from "../components/dashboard/InfoIcon.tsx";
import ErrorIcon from "../components/dashboard/ErrorIcon.tsx";
import PopUp from "../components/dashboard/PopUpContainer.tsx";

export interface DataItem {
  name: string;
  value: number | string;
  min: number | string;
  max: number | string;
  unit: string;
}

const Data: React.FC = () => {
  const [data, setData] = useState<DataItem[] | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const [socketInstance, setSocketInstance] = useState<Socket | undefined>(
    undefined
  );
  const [noDataReceived, setNoDataReceived] = useState(false);
  const [lastDataTimestamp, setLastDataTimestamp] = useState<number>(
    Date.now()
  );

  const systemErrors = [];
  const errorListItems = systemErrors.map((error, index) => (
    <li key={index}>{error}</li>
  ));

  useEffect(() => {
    if (!socketInstance) {
      // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5000';

      const socket = io("http://127.0.0.1:5000/", {
        transports: ["websocket"],
      });
      setSocketInstance(socket);

      socket.on("connect", () => {
        setLoaded(true);
        setLastDataTimestamp(Date.now());
        console.log(`Connected with id: ${socket.id}`);
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected with id: ${socket.id}`);
      });

      socket.on("data", (receivedData) => {
        if (data !== receivedData) {
          setData(receivedData);
          setLastDataTimestamp(Date.now());
          setNoDataReceived(false);
        }
      });
    }
  }, [socketInstance, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastDataTimestamp > 30000) {
        console.log("Error 503: Lost connection to server");
        setNoDataReceived(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastDataTimestamp]);

  const [isPopUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState<React.ReactNode>(null);

  const togglePopUp = (content?: React.ReactNode) => {
    setPopUpContent(content ?? null);
    setPopUpVisible((prev) => !prev);
  };

  if (!loaded) {
    return (
      <div className="App">
        <div className="background data load">
          <div className="navbar">
            <div className="nav-left">
              <Logo colour="dark" />
            </div>
            <div className="nav-right">
              <BurgerMenu colour="black" />
              <div className="nav-right"></div>
            </div>
          </div>
          <div className="loading">
            <h2>Waiting for connection...</h2>
          </div>
          <Spinner />
        </div>
      </div>
    );
  } else if (!data) {
    return (
      <div className="App">
        <div className="background data load">
          <div className="navbar">
            <div className="nav-left">
              <Logo colour="dark" />
            </div>
            <div className="nav-right">
              <BurgerMenu colour="black" />
              <div className="nav-right"></div>
            </div>
          </div>
          <div className="no-data">
            <h2>W-FS24 isn't racing</h2>
            <br />
            <h4>Come back soon</h4>
          </div>
        </div>
      </div>
    );
  } else if (noDataReceived) {
    return (
      <div className="App">
        <div className="background data load">
          <div className="navbar">
            <div className="nav-left">
              <Logo colour="dark" />
            </div>
            <div className="nav-right">
              <BurgerMenu colour="black" />
              <div className="nav-right"></div>
            </div>
          </div>
          <div className="no-data">
            <h2>Lost connection to W-FS24</h2>
            <br />
            <h4>Service Unavalible</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="background data">
          <div className="navbar">
            <div className="nav-left">
              <Logo colour="dark" />
            </div>
            <div
              onClick={() =>
                togglePopUp(
                  <div className="info-popup">
                    <h4>WESMO Race Dashboard</h4>
                    <div>
                      The 2024 EV is able to communicate data live as it runs.
                      Our team uses this dashboard to monitor the car systems
                      while it's out on the track.
                    </div>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Colours</th>
                          <th></th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ height: "1rem" }}>
                          <td>
                            <span
                              className="dot"
                              style={{ backgroundColor: "#3274b1" }}
                            ></span>
                          </td>
                          <td>Values in blue are just normal data points.</td>
                          <td>
                            1. Clicking on a data widget allows you to see its
                            recent history.
                          </td>
                        </tr>
                        <tr style={{ height: "1rem" }}>
                          <td>
                            <span
                              className="dot"
                              style={{ backgroundColor: "#4da14b" }}
                            ></span>
                          </td>
                          <td>
                            Green is good, the value is in the expected range.
                          </td>
                          <td>
                            2. The system status on the left shows the current
                            status of our car. If the systems are on, heres
                            where youll see.
                          </td>
                        </tr>
                        <tr style={{ height: "1rem" }}>
                          <td>
                            <span
                              className="dot"
                              style={{ backgroundColor: "#eac054" }}
                            ></span>
                          </td>
                          <td>
                            Warnings will be yellow, this is data our team needs
                            to watch.
                          </td>
                          <td>
                            3. In the bottom left are any errors picked up in
                            our vehiclesa system.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span
                              className="dot"
                              style={{ backgroundColor: "#af1713" }}
                            ></span>
                          </td>
                          <td>
                            Red means issues and its time to get the driver to
                            pull over.
                          </td>
                          <td>
                            4. At the top right by the menu is general
                            information about the dashbaord and an indicator if
                            our software has any issues.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )
              }
            >
              <InfoIcon />
            </div>
            <PopUp
              isVisible={isPopUpVisible}
              onClose={() => setPopUpVisible(false)}
            >
              {popUpContent}
            </PopUp>
            <div className="nav-right">
              <BurgerMenu colour="black" />
              <div className="nav-right"></div>
            </div>
          </div>
          <DefaultGrid data={data} />
        </div>
      </div>
    );
  }
};

export default Data;
