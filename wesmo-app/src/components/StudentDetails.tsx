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
    <div className="details-container">
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
