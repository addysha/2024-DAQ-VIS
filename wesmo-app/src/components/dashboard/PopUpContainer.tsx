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
