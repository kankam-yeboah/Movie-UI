import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import Card from "./Card";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const CardSlider = ({ data, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const listRef = useRef();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="slider flex column">
        <h3>{title}</h3>
        <div className="slider-action flex ">
          <div className={`slider-icon slider-icon-left ${!isHovered ? "none" : ""}`}>
            <MdOutlineArrowBackIos />
          </div>
          <div className="flex slider-card-container" ref={listRef}>
            {data.map((movie, index) => (
              <Card index={index} key={movie.id} movieData={movie} />
            ))}
          </div>
          <div className={`slider-icon slider-icon-right ${!isHovered ? "none" : ""}`}>
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
    gap: 0.5rem;
    position: relative;
    .slider-action {
      align-items: center;
      position: relative;
      cursor: pointer;
      .slider-card-container {
        gap: 0.2rem;
      }
      .slider-icon {
        color: white;
        border-radius: 50%;
        background-color: rgb(162, 157, 157, 0.2);
        padding: 0.7rem;
        position: absolute;
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
