/*
 * File: components/dashboard/ErrorContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A dynamic list component which lists any errors related to the vehicle.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./ErrorContainer.css";

interface Props {
  data: string[];
}

const ErrorLog: React.FC<Props> = ({ data }) => {
  const reversedErrorList = [...data].reverse();

  const errorListItems = reversedErrorList.map((error, index) => (
    <li key={index}>{error}</li>
  ));

  return (
    <div className="error_log">
      <div className="title">
        <h4>Vehicle Errors</h4>
      </div>
      <br />
      <div className="scolling_list">
        <ol>{errorListItems}</ol>
      </div>
    </div>
  );
};

export default ErrorLog;
