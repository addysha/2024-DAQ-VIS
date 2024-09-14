/*
 * File: components/dashboard/InfoIcon.tsx
 * Author: Hannah Murphy
 * Date: 2024-09-14
 * Description: A clickable information icon.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./Icons.css";

const InfoIcon: React.FC = () => {
  return (
    <div>
      <i className="fa-solid fa-circle-info info_icon"></i>
    </div>
  );
};

export default InfoIcon;
