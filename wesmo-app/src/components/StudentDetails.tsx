/*
 * File: components/StudentDetails.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component, to hold text and images used on the engineering team page.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./StudentDetails.css";

interface StudentDetailsProps {
  name: string;
  discipline: string;
  component: string;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({
  name,
  discipline,
  component,
}) => {
  return (
    <div className="student-details-container">
      <div className="left-container">
        <div className="info-container">
          <div className="name">{name}</div>
          <div className="discipline">{discipline}</div>
        </div>
      </div>
      <div className="right-container">
        <div className="component">{component}</div>
      </div>
    </div>
  );
};

export default StudentDetails;
