/*
 * File: components/TeamMemember.tsx
 * Author: Hannah Murphy
 * Date: 2024-09-14
 * Description: A double component of images and text to display engineering team members.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./TeamMember.css";

interface Props {
  name1: string;
  discipline1: string;
  component1: string;
  name2: string;
  discipline2: string;
  component2: string;
  image1: any;
  image2: any;
}

const TeamMember: React.FC<Props> = ({
  name1,
  discipline1,
  component1,
  name2,
  discipline2,
  component2,
  image1,
  image2,
}) => {
  return (
    <div className="team-member-container">
      <div className="image-text-component right">
        <div className="text-container">
          <div className="text right">
            <div className="name">{name1}</div>
            <br />
            <div className="discipline">{discipline1}</div>
            <br />
            <div className="component">{component1}</div>
          </div>
        </div>
        <div className="image-container">
          <img src={image1} alt="" className="image" />
        </div>
      </div>

      <div className="image-text-component left">
        <div className="image-container">
          <img src={image2} alt="" className="image" />
        </div>
        <div className="text-container">
          <div className="text">
            <div className="name">{name2}</div>
            <br />
            <div className="discipline">{discipline2}</div>
            <br />
            <div className="component">{component2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
