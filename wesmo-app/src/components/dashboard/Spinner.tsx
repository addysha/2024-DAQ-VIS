/*
 * File: components/dashboard/Spinner.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A loading wheel component.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./Spinner.css";

const Spinner: React.FC = () => (
  <div className="spinner-container">
    <svg className="spinner" viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  </div>
);

export default Spinner;
