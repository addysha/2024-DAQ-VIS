// Filename - pages/race-data.tsx
import React, { useEffect, useState } from "react";
import "../App.css";
import { io } from "socket.io-client";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import DefaultGrid from "../components/dashboard/DefaultGrid.tsx";
import Spinner from "../components/dashboard/Spinner.tsx";

const Data: React.FC = () => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

    const socket = io("http://127.0.0.1:5000/", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(`Connected with id: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected with id: ${socket.id}`);
    });

    socket.on("test_data", (receivedData) => {
      setData(receivedData);
    });

    setLoaded(true);

    socket.emit("register_for_data");
    const element = document.getElementById("test_id");
    if (element) {
      element.innerHTML = data.SOC;
    }
  }, []);

  if (!loaded) {
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
          <div className="loading">
            <p>Waiting for WebSocket connection...</p>
          </div>
          <Spinner />
        </div>
      </div>
    );
  } else {
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
          <p>
            <strong id="test_id" style={{ color: "black" }}>
              SOC: {`${data.SOC}`}
            </strong>
          </p>
          <p>
            <strong style={{ color: "black" }}>Temp: {`${data.Temp}`}</strong>
          </p>
          <p>
            <strong style={{ color: "black" }}>RPM: {`${data.RPM}`}</strong>
          </p>
          <DefaultGrid />
        </div>
      </div>
    );
  }
};

export default Data;
