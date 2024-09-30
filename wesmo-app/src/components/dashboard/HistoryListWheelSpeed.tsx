/*
 * File: components/dashboard/HistoryListWheelSpeed.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component which lists the data history of the wheel speed.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

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
import LogQuad from "./ListContainerQuad.tsx";

interface Props {
  keyToDisplay: string;
}

const HistoryList: React.FC<Props> = ({ keyToDisplay }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | undefined>(
    undefined
  );
  const [historicalData, setHistoricalData] = useState({
    keyToDisplay: [],
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

      socket.on("recieve_historic_data", (receivedData) => {
        const formattedData = receivedData.reduce(
          (acc, { timestamp, value, name }) => {
            const existingEntry = acc.find(
              (entry) => entry.timestamp === timestamp
            ) || { timestamp };

            existingEntry[name] = value;

            if (!acc.includes(existingEntry)) {
              acc.push(existingEntry);
            }

            return acc;
          },
          []
        );

        console.log("Formatted Data:", formattedData);

        setHistoricalData(formattedData);
      });

      socket.emit("send_history", "Wheel Speed");
    }
  }, [socketInstance, keyToDisplay]);

  if (historicalData && Object.keys(historicalData).length !== 0) {
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
              data={historicalData}
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
                dataKey="Wheel Speed FR"
                stroke="#4da14b"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Wheel Speed RL"
                stroke="#eac054"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Wheel Speed RR"
                stroke="#af1317"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Wheel Speed FL"
                stroke="#3274B1"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <LogQuad data={historicalData || []}></LogQuad>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h4>{keyToDisplay}</h4>
        <br />
        <p>No data history is avaliable</p>
      </div>
    );
  }
};

export default HistoryList;
