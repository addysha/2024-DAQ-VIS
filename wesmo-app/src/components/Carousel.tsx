import * as React from "react";
import { useTheme, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#3b3b3b",
    },
    secondary: {
      main: "#AF1713",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

interface Image {
  label: string;
  imgPath: string;
}
interface IProps {
  images: Image[];
  width: string;
  height: string;
}

function SwipeableTextMobileStepper({ images, width, height }: IProps) {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: width, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          pl: 2,
          bgcolor: darkTheme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: height,
                  display: "block",
                  maxWidth: width,
                  overflow: "hidden",
                  width: "100%",
                  bgcolor: darkTheme.palette.primary.main,
                  color: "white",
                  objectFit: "contain",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          bgcolor: darkTheme.palette.primary.main,
          color: "rgba(175, 23, 19, 1)",
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: darkTheme.palette.secondary.main,
          },
        }}
        nextButton={
          <Button
            sx={{
              color: darkTheme.palette.secondary.main,
            }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            sx={{
              color: darkTheme.palette.secondary.main,
            }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
