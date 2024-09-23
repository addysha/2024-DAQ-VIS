/*
 * File: components/InfoExplore.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: An information pop-up clickable component.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Card, CardContent, CardHeader, Drawer } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomPalette {
    red: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    red: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    red: createColor("#AF1713"),
  },
});

interface IProps {
  x: string;
  y: string;
  contentHeader: { title: string; subheader: string };
  contentBody: React.ReactNode;
  contentExpanded: React.ReactNode;
}

const InfoExplore: React.FC<IProps> = ({
  x,
  y,
  contentHeader,
  contentBody,
  contentExpanded,
}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div
      className="info-explore-container"
      style={{
        position: "relative",
        transform: `translateX(${x}%) translateY(${y}%)`,
      }}
    >
      <ThemeProvider theme={theme}>
        <Fab
          aria-label="add"
          size="small"
          color="red"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <Card sx={{ bgcolor: "#3B3B3B", color: "white" }}>
            <CardHeader
              sx={{ color: "white" }}
              title={contentHeader.title}
              subheader={contentHeader.subheader}
            />
            <CardContent>{contentBody}</CardContent>
            <CardContent>{contentExpanded}</CardContent>
          </Card>
        </Drawer>
      </ThemeProvider>
    </div>
  );
};

export default InfoExplore;
