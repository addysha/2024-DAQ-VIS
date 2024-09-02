import React, { useState, useEffect } from "react";
import "./ListContainer.css";

interface Props {
  data: number[];
}

const Log: React.FC<Props> = ({ data }) => {
  const [data_log, setData] = useState<string[]>([]);

  useEffect(() => {
    const newData = data.map((item) => String(item));

    setData((prevData) => [...newData, ...prevData]);
  }, [data]);

  const listItems = data_log.map((item, index) => <li key={index}>{item}</li>);
  return (
    <div className="log">
      <div className="scolling_list">
        <ol reversed>
          <li>{listItems}</li>
        </ol>
      </div>
    </div>
  );
};

export default Log;
