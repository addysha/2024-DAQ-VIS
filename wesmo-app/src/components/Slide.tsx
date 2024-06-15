import * as React from "react";
import "./Slide.css";
import { Link } from "react-router-dom";

interface Props {
  company: String;
  hyperlink: any;
  image: any;
  width: string;
  height: string;
}

const Slide: React.FC<Props> = ({
  company,
  hyperlink,
  image,
  width,
  height,
}) => (
  <div
    className="slider-container"
    style={{ maxWidth: width, maxHeight: height }}
  >
    <link
      href="https://fonts.googleapis.com/css?family=Roboto Condensed"
      rel="stylesheet"
    ></link>
    <div
      className="image-container"
      style={{ maxWidth: width, maxHeight: height }}
    >
      <img
        src={image}
        alt=""
        className="image"
        style={{ maxWidth: width, maxHeight: height }}
      />
    </div>
    <div className="text">
      <Link to={hyperlink} className="link">
        {company}
      </Link>
    </div>
  </div>
);

export default Slide;
