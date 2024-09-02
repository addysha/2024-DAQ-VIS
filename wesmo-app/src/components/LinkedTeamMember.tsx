import React from "react";
import TeamMember from "../components/TeamMember.tsx";
import logo from "../images/wesmo-logo/logo_header.png";
import Hannah from "../images/team/Hannah_murphy.jpeg";

const TeamMemberWithLinkedName = () => {
  const name2 = (
    <a href="/daq-system" style={{ textDecoration: "none", color: "inherit" }}>
      Hannah Murphy
    </a>
  );

  return (
    <TeamMember
      name1="Cameron Mailer"
      discipline1="Mechanical Engineering"
      component1="Accumulator"
      name2={name2}
      discipline2="Software Engineering"
      component2="Data Aquisition and Visualisation"
      image1={logo}
      image2={Hannah}
    />
  );
};

export default TeamMemberWithLinkedName;
