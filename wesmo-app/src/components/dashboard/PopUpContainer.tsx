/*
 * File: components/dashboard/StatusContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024-09-14
 * Description: A pop up container with an exit button which displays html content passed to it.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "../../App.css";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const PopUp: React.FC<Props> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="pop_up">
      <div className="pop_up_container">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
