// Filename - pages/race-data.tsx
import React, { useEffect, useState } from "react";
import "../App.css";
import { io, Socket } from "socket.io-client";

import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import DefaultGrid from "../components/dashboard/DefaultGrid.tsx";
import Spinner from "../components/dashboard/Spinner.tsx";

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

  useEffect(() => {
    if (!socketInstance) {
      // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5000';

      const socket = io("http://127.0.0.1:5000/", {
        transports: ["websocket"],
      });
      setSocketInstance(socket);

      socket.on("connect", () => {
        console.log(`Connected with id: ${socket.id}`);
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected with id: ${socket.id}`);
      });

      socket.on("data", (receivedData) => {
        if (data !== receivedData) {
          setData(receivedData);
        }
      });

      setLoaded(true);

      // Take out when set up dummy data
      socket.emit("testing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketInstance]);

  if (!data || !loaded) {
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
          <DefaultGrid data={data} />
        </div>
      </div>
    );
  }
};

export default Data;
