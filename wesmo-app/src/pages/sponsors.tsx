// Filename - pages/sponsors.tsx

import React from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import Logo from "../components/Logo.tsx";
import TitleCard from "../components/TitleCard.tsx";
import SponsorRow from "../components/Sponsors.tsx";

import proposal from "../files/Sponsorship_Proposal_2024.pdf";

import logo from "../images/logo_header.png";
import nhp from "../images/sponsors/nhp.png";
import hall from "../images/sponsors/hall_machinery_ltd_logo.jpeg";
import industrial from "../images/sponsors/industrial_tube.jpeg";
import initiom from "../images/sponsors/Initiom.png";
import vans from "../images/sponsors/nz_vans.png";
import jlc from "../images/sponsors/jlc_pcb.jpeg";
import island_bay from "../images/sponsors/IBC_logo_HR.jpg";
import rml from "../images/sponsors/rml.jpeg";
import enepaq from "../images/sponsors/ENEPAQ-logo-with-tagline-full-color-rgb_2_1_1.svg";
import adhesive from "../images/sponsors/adhesive_tech.png";
import gurit from "../images/sponsors/gurit.jpg";
import kilwell from "../images/sponsors/kilwell.jpeg";
import performance from "../images/sponsors/performance_boats.png";
import bearings from "../images/sponsors/bearings.jpeg";
import flight from "../images/sponsors/flight_struct.jpeg";
import lg from "../images/sponsors/lg.png";
import ansys from "../images/sponsors/ansys.jpg";
import profile from "../images/sponsors/marsh_profile.jpeg";
import ndl from "../images/sponsors/ndl.jpg";
import meg from "../images/sponsors/meg.webp";

import "../App.css";

const bronze = [
  { title: "JLC PCB", img: jlc, link: "https://jlcpcb.com/" },
  { title: "RML", img: rml, link: "https://www.rmlnz.com/" },
];
const silver = [
  {
    title: "NDL Engineering",
    img: ndl,
    link: "https://www.ndlengineering.co.nz/",
  },
  {
    title: "Gurit",
    img: gurit,
    link: "https://www.gurit.com/",
  },
];

const gold = [
  {
    title: "Island Bay Services Club",
    img: island_bay,
    link: "https://www.islandbaytsc.org.nz/",
  },
  { title: "NZ Van Lines", img: vans, link: "https://nzvanlines.co.nz/" },
  {
    title: "Adhesive Tech",
    img: adhesive,
    link: "https://adhesivetechnologies.co.nz/",
  },
  {
    title: "KillWell Fibrelab",
    img: kilwell,
    link: "https://www.kilwellfibrelab.co.nz/",
  },
  {
    title: "Marshall Profiling",
    img: profile,
    link: "https://marshallprofiling.co.nz/",
  },
];

const platinum = [
  {
    title: "NHP",
    img: nhp,
    link: "https://www.nhpnz.co.nz/",
  },
  {
    title: "Enepaq",
    img: enepaq,
    link: "https://enepaq.com/",
  },
  {
    title: "Industrial Tube",
    img: industrial,
    link: "https://www.industrialtube.co.nz/",
  },
  {
    title: "Initiom",
    img: initiom,
    link: "https://www.initiom.co.nz/",
  },
  {
    title: "Hall Machinery Ltd",
    img: hall,
    link: "https://www.hallmach.co.nz/",
  },
];
const platinum_second = [
  {
    title: "Performance Boat Building",
    img: performance,
    link: "https://www.facebook.com/p/Performance-Boatbuilding-100072364330870/",
  },
  {
    title: "Waikato Bearings",
    img: bearings,
    link: "https://www.waikatobearings.co.nz/",
  },
  {
    title: "Flight Structures",
    img: flight,
    link: "https://www.flightstructures.co.nz/",
  },
  {
    title: "LG Panel and Paint",
    img: lg,
    link: "https://www.lgpanelandpaint.co.nz/",
  },
  {
    title: "Ansys",
    img: ansys,
    link: "https://www.ansys.com/",
  },
];
const platinum_third = [
  {
    title: "MEG",
    img: meg,
    link: "https://www.mechanical-engineering-group.org.nz/",
  },
];

const Sponsors: React.FC = () => {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css?family=Roboto Condensed"
        rel="stylesheet"
      ></link>
      <div className="background sponsors" id="scroll">
        <div className="navbar">
          <div className="nav-left">
            <Logo />
          </div>
          <div className="nav-right">
            <BurgerMenu />
            <div className="nav-right"></div>
          </div>
        </div>
        <TitleCard title="Sponsors"></TitleCard>
        <div className="sponsors">
          <div className="title platinum">Platinum</div>
          <SponsorRow images={platinum} width={250} />
          <SponsorRow images={platinum_second} width={250} />
          <SponsorRow images={platinum_third} width={250} />
          <div className="title gold">Gold</div>
          <SponsorRow images={gold} width={250} />
          <div className="title silver">Silver</div>
          <SponsorRow images={silver} width={150} />

          <div className="title bronze">Bronze</div>
          <SponsorRow images={bronze} width={120} />

          <div className="info">
            <div className="imagetext-component">
              <div className="image-container">
                <img src={logo} alt="" className="image" />
              </div>
              <div className="text-container">
                <p>
                  Want to sponsor us?
                  <br />
                  <br />
                  <Link
                    to={proposal}
                    target="_blank"
                    rel="noreferrer"
                    className="more"
                  >
                    Find out more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
