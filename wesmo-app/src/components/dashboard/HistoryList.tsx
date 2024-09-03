import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Log from "./ListContainer.tsx";

const HistoryList = () => {
  const [socketInstance, setSocketInstance] = useState<Socket | undefined>(
    undefined
  );
  const [historicalData, setHistoricalData] = useState({
    "Battery State of Charge": [],
  });

  useEffect(() => {
    if (!socketInstance) {
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
        console.log("Received Historical Data:", receivedData);
        setHistoricalData(receivedData);
      });

      socket.emit("history");
    }
  }, [socketInstance]);

  const keyToDisplay = "Battery State of Charge";

  return (
    <div style={{ width: "700px", height: "300px" }}>
      <h3 style={{ color: "black" }}>{keyToDisplay}</h3>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={historicalData[keyToDisplay] || []}
            margin={{ top: 15, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" fill="white" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) =>
                new Date(timestamp * 1000).toLocaleTimeString()
              }
              angle={-45}
              textAnchor="end"
              tickCount={10}
              tick={{ fontSize: 10, stroke: "black", strokeWidth: 0.25 }}
              color="black"
            />
            <YAxis
              tickCount={10}
              tick={{ fontSize: 12, stroke: "black", strokeWidth: 0.25 }}
            />
            <Tooltip
              labelFormatter={(timestamp) =>
                new Date(timestamp * 1000).toLocaleTimeString()
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4da14b"
              strokeWidth={2}
              dot={{ strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <Log data={historicalData[keyToDisplay]}></Log>
      </div>
    </div>
  );
};

export default HistoryList;
