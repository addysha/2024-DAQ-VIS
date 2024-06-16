import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Card, CardContent, ClickAwayListener } from "@mui/material";
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
  content: string;
}

const InfoExplore: React.FC<IProps> = ({ x, y, content }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [showFab, setShowFab] = useState(true);

  const handleClick = () => {
    setShowTextField(true);
    setShowFab(false);
  };

  const handleClickAway = () => {
    setShowTextField(false);
    setShowFab(true);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ transform: `translateX(${x}%) translateY(${y}%)` }}>
          {showFab && (
            <Fab
              aria-label="add"
              size="small"
              color="red"
              onClick={handleClick}
            >
              <AddIcon />
            </Fab>
          )}
          {showTextField && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Card sx={{ maxWidth: 300, bgcolor: "#3B3B3B", color: "white" }}>
                <CardContent>{content}</CardContent>
              </Card>
            </ClickAwayListener>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default InfoExplore;
