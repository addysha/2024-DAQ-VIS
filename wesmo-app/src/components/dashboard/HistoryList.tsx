import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "../../App.css";

import Log from "../../components/dashboard/ListContainer.tsx";

export interface DataHistory {
  [key: string]: number[];
}

const HistoryList: React.FC = () => {
  const [socketInstance, setSocketInstance] = useState<Socket | undefined>(
    undefined
  );
  const [historicalData, setHistoricalData] = useState<DataHistory[]>();

  useEffect(() => {
    if (!socketInstance) {
      // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5000';

      const socket = io("http://127.0.0.1:5000/", {
        transports: ["websocket"],
      });
      setSocketInstance(socket);

      socket.on("connect", () => {
        console.log(`Connected with list id: ${socket.id}`);
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected with id: ${socket.id}`);
      });

      socket.on("historic_data", (receivedData) => {
        try {
          if (receivedData) {
            console.log("Raw received data:", receivedData);
            setHistoricalData(receivedData);
          } else {
            console.error("Received empty data");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });

      socket.emit("history");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketInstance]);

  const keyToDisplay = "Battery State of Charge";

  if (historicalData) {
    return (
      <div>
        <h3>{keyToDisplay}</h3>
        <div className="data_history">
          <Log data={historicalData[keyToDisplay]}></Log>
        </div>
      </div>
    );
  }
};

export default HistoryList;
