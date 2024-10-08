/*
 * File: components/dashboard/HistoryList.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component which lists the history of the data which name is passed in.
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
import Log from "./ListContainer.tsx";

interface Props {
  keyToDisplay: string;
}

export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface HistoricalData {
  [key: string]: DataPoint[];
}

const HistoryList: React.FC<Props> = ({ keyToDisplay }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | undefined>(
    undefined
  );
  const [historicalData, setHistoricalData] = useState<HistoricalData>({});

  useEffect(() => {
    if (!socketInstance) {
      const socket = io("http://127.0.0.1:5001/", {
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
        setHistoricalData(receivedData);
      });

      socket.emit("send_history", keyToDisplay);
    }
  }, [socketInstance, keyToDisplay]);
  if (historicalData && Object.keys(historicalData).length !== 0) {
    return (
      <div>
        <h3 style={{ color: "black" }}>{keyToDisplay}</h3>
        <div className="graph-box">
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 15, right: 20, left: 0, bottom: 20 }}
                isAnimationActive={false}
              >
                <CartesianGrid strokeDasharray="3 3" fill="white" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) =>
                    new Date(timestamp * 1000).toLocaleTimeString()
                  }
                  angle={-45}
                  textAnchor="end"
                  tickCount={6}
                  tick={{ fontSize: 10, stroke: "black", strokeWidth: 0.25 }}
                  color="black"
                  reversed={true}
                />
                <YAxis
                  tickCount={10}
                  tick={{ fontSize: 12, stroke: "black", strokeWidth: 0.25 }}
                />
                <Tooltip
                  labelFormatter={(timestamp) =>
                    new Date(timestamp * 1000).toLocaleTimeString()
                  }
                  labelStyle={{ color: "black" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4da14b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <Log log_data={historicalData}></Log>
          </div>
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
