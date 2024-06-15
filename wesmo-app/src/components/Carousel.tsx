import * as React from "react";
import styled, { css } from "styled-components";

const SCarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  position: relative;
  overflow: hidden;
`;

const LeftButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
`;

const RightButton = styled.button`
  position: absolute;
  transform: translateY(-50%);
  right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
`;

interface ICarouselSlide {
  active?: boolean;
  width: string;
  height: string;
}

const SCarouselSlide = styled.div<ICarouselSlide>`
  flex: 0 0 100%;
  max-height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ICarouselProps {
  currentSlide: number;
  totalSlides: number;
}

const SCarouselSlides = styled.div<ICarouselProps>`
  display: flex;
  transform: translateX(-${(props) => props.currentSlide * 155}%);
  transition: transform 0.5s ease;
  min-width: 150px;
  max-width: 400px;
  width: 100%;
`;

interface IProps {
  children: JSX.Element[];
  width: string;
  height: string;
}

const Carousel = ({ children, width, height }: IProps) => {
  const totalSlides = React.Children.count(children);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  //   }, 15000);

  //   return () => clearInterval(interval);
  // }, [totalSlides]);

  const handlePrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const activeSlide = children.map((slide, index) => (
    <SCarouselSlide
      active={currentSlide === index}
      key={index}
      width={width}
      height={height}
    >
      {slide}
    </SCarouselSlide>
  ));

  return (
    <div>
      <SCarouselWrapper>
        <SCarouselSlides currentSlide={currentSlide} totalSlides={totalSlides}>
          {activeSlide}
        </SCarouselSlides>
        <LeftButton onClick={handlePrevSlide}> &lt; </LeftButton>
        <RightButton onClick={handleNextSlide}>&gt;</RightButton>
      </SCarouselWrapper>
    </div>
  );
};

export default Carousel;
