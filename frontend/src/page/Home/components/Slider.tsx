import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme, styled, Typography } from "@mui/material";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import colors from "libs/ui/color";

const images = [banner1, banner2, banner3, banner4];

const styles = {
  container: (isMobile: boolean): React.CSSProperties => ({
    overflow: "hidden",
    position: "relative",
    height: isMobile ? "20%" : "100%",
  }),
  slider: (currentImage: number): React.CSSProperties => ({
    width: "100%",
    height: "600px",
    position: "relative",
    whiteSpace: "nowrap" as "nowrap",
    transform: `translate3d(${-currentImage * 100}%, 0, 0)`,
    transition: "ease 1000ms",
  }),
  image: (): React.CSSProperties => ({
    display: "inline-block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }),
  dotsContainer: (): React.CSSProperties => ({
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    padding: "10px",
    alignItems: "flex-start",
    gap: "10px",
  }),
  dot: (
    currentImage: number,
    index: number,
    dotSize: string,
  ): React.CSSProperties => ({
    display: "inline-block",
    width: dotSize,
    height: dotSize,
    borderRadius: "50%",
    backgroundColor: currentImage === index ? colors.orange500 : "#D9D9D9",
    margin: "5px",
    cursor: "pointer",
  }),
};

const BlackLayer = styled("div")(({ theme }) => ({
  position: "absolute",
  height: "100%",
  width: "100%",
  background: "linear-gradient(rgba(255,0,0,0), rgba(0,0,0,1))",
  opacity: "0.6",
  top: "0",
  bottom: "0",
}));
const HeroText = styled(Typography)(({ theme }) => ({
  color: "white",
  position: "absolute",
  bottom: "100px",
  left: "80px",
  fontSize: "3rem",
  fontWeight: "600",
}));

export const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dotSize = isMobile ? "5px" : "10px";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prevCurrentImage) => (prevCurrentImage + 1) % images.length,
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container(isMobile)}>
      <div style={styles.slider(currentImage)}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            style={styles.image()}
          />
        ))}
      </div>
      <BlackLayer />
      <HeroText>Chúng tôi là CARE</HeroText>
      <div style={styles.dotsContainer()}>
        {!isMobile &&
          images.map((_, index) => (
            <div
              key={index}
              style={styles.dot(currentImage, index, dotSize)}
              onClick={() => setCurrentImage(index)}
            />
          ))}
      </div>
    </div>
  );
};
