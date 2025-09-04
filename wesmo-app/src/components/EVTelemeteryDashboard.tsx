import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function EVTelemetryDashboard() {
  const url = process.env.REACT_APP_MQTT_URL || "ws://localhost:9001";
  const [status, setStatus] = useState("connecting");
  const [msgs, setMsgs] = useState<any[]>([]);

  useEffect(() => {
    const client = mqtt.connect(url, {
      username: process.env.REACT_APP_MQTT_USERNAME,
      password: process.env.REACT_APP_MQTT_PASSWORD,
    });

    client.on("connect", () => {
      setStatus("connected");
      client.subscribe("wesmo/telemetry/#");
    });

    client.on("message", (_topic, payload) => {
      try {
        const obj = JSON.parse(new TextDecoder().decode(payload));
        setMsgs((m) => [obj, ...m].slice(0, 50));
      } catch {
        // ignore non-JSON
      }
    });

    client.on("error", () => setStatus("error"));
    client.on("close", () => setStatus("closed"));
    return () =>{
        client.end(true);
    }; 
  }, [url]);

  return (
    <div style={{ padding: 16 }}>
      <h2>WESMO • Live Feed ({status})</h2>
      <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
        {msgs.map((m, i) => (
          <div key={i}>{JSON.stringify(m)}</div>
        ))}
      </div>
    </div>
  );
}