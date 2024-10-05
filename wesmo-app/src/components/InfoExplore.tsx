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
import {
  Fab,
  Card,
  CardContent,
  CardHeader,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteColorOptions } from "@mui/material/styles";

// Extend Material-UI theme to include custom palette options (red in this case)
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

// Create a global theme for this component
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    red: createColor("#AF1713"),
    text: {
      primary: "white",
      secondary: "white",
    },
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <div
        className="info-explore-container"
        style={{
          position: "relative",
          transform: `translateX(${x}%) translateY(${y}%)`,
        }}
      >
        <Fab
          aria-label="add"
          size="small"
          color="red"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>

        <SwipeableDrawer
          id="info-drawer"
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          disableSwipeToOpen={false}
          sx={{
            maxHeight: isMobile ? "90%" : "50%",
            height: isMobile ? "90%" : "50%",
          }}
        >
          <Card
            sx={{
              bgcolor: "#3B3B3B",
              color: "white",
              overflow: "auto",
              maxHeight: "100%",
              height: "100%",
            }}
          >
            <CardHeader
              sx={{ color: "white" }}
              title={contentHeader.title}
              subheader={contentHeader.subheader}
            />
            <CardContent>{contentBody}</CardContent>
            <CardContent>{contentExpanded}</CardContent>
          </Card>
        </SwipeableDrawer>
      </div>
    </ThemeProvider>
  );
};

export default InfoExplore;
