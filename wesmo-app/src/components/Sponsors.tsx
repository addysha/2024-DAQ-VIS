import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface Image {
  title: string;
  img: string;
  link: string;
}

interface IProps {
  images: Image[];
  width: number;
}

function SponsorRow({ images, width }: IProps) {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const cols = isXs ? 1 : isSm ? 2 : isMd ? 3 : 5;

  const maxHeight = isXs || isSm ? 150 : 300;
  const responsiveWidth = isXs || isSm ? 100 : isMd ? width / 1.5 : width;

  return (
    <ImageList
      cols={cols}
      sx={{
        marginLeft: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        padding: isXs ? "0.5rem" : "1rem",
      }}
    >
      {images.map((item) => (
        <ImageListItem
          key={item.img}
          sx={{
            objectFit: "contain",
            marginLeft: "1vw",
            marginRight: "1vw",
            width: responsiveWidth,
            maxHeight: maxHeight,
            overflowY: "hidden",
            margin: isXs || isSm ? "0.5rem 0" : "1vw",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              objectFit: "cover",
              verticalAlign: "middle",
            }}
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                src={item.img}
                srcSet={item.img}
                alt={item.title}
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  maxHeight: maxHeight + "px",
                  width: "100%",
                }}
              />
            </a>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default SponsorRow;
