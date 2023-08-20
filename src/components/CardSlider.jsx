import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import Card from "./Card";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const CardSlider = ({ data, title }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(1);
  const listRef = useRef();

  const current_media = window.innerWidth;
  const handleSliderControlsDirection = (direction) => {
    //Apply different sliderPositions for different size screen media
    let sliderPositionMax;
    if (current_media < 600) {
      sliderPositionMax = 6;
    } else if (current_media < 1300) {
      sliderPositionMax = 5;
    } else {
      sliderPositionMax = 4;
    }

    let distance = listRef.current.getBoundingClientRect().x - 44.79999923706055;
    if (direction === "right" && sliderPosition !== sliderPositionMax) {
      listRef.current.style.transform = `translateX(${-450 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
    if (direction === "left" && sliderPosition !== 1) {
      listRef.current.style.transform = `translateX(${450 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };
  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="slider flex column">
        <h3>{title}</h3>
        <div className="slider-action flex ">
          <div className={`slider-icon slider-icon-left ${!showControls ? "none" : ""}`} onClick={() => handleSliderControlsDirection("left")}>
            <MdOutlineArrowBackIos />
          </div>
          <div className="flex slider-card-container" ref={listRef}>
            {data.map((movie, index) => (
              <Card index={index} key={movie.id} movieData={movie} />
            ))}
          </div>
          <div className={`slider-icon slider-icon-right ${!showControls ? "none" : ""}`} onClick={() => handleSliderControlsDirection("right")}>
            <MdOutlineArrowForwardIos />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 2.8rem;
  overflow: hidden;
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
  .slider {
    gap: 0.1rem;
    position: relative;
    .slider-action {
      align-items: center;
      position: relative;
      height: 190px;
      .slider-card-container {
        gap: 0.2rem;
        transform: translateX(0px);
        transition: 0.3s ease-in-out;
      }
      .slider-icon {
        color: white;
        border-radius: 50%;
        background-color: rgb(162, 157, 157, 0.2);
        padding: 0.7rem;
        position: absolute;
        cursor: pointer;
        z-index: 10;
        &:hover {
          color: red;
        }
        svg {
          font-size: 25px;
        }
      }
      .none {
        display: none;
      }
      .slider-icon-left {
        left: 0;
      }
      .slider-icon-right {
        right: 0;
      }
    }
  }
`;

export default CardSlider;
