/*
 * File: components/TypeWriter.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A text component which types the content out slowly.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./TypeWriter.css";

class TypeWriter extends React.PureComponent {
  unmounted: boolean;
  loopNum: number;
  period: number;
  isDeleting: boolean;
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.unmounted = false;
    this.loopNum = 0;
    this.period = 3000;
    this.isDeleting = false;
    this.tick();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  tick() {
    if (this.unmounted) {
      return;
    }

    const { data: toRotate } = this.props;
    const i = this.loopNum % toRotate.length;
    const fullTxt = toRotate[i];

    let newText = "";
    if (this.isDeleting) {
      newText = fullTxt.substring(0, this.state.text.length - 1);
    } else {
      newText = fullTxt.substring(0, this.state.text.length + 1);
    }

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && newText === fullTxt) {
      this.isDeleting = true;
      delta = 3000;
    } else if (this.isDeleting && newText === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 4000;
    }

    this.setState({ text: newText });

    setTimeout(() => {
      this.tick();
    }, delta);
  }

  render() {
    return <div id="typewriter">{this.state.text}</div>;
  }
}

export default TypeWriter;
